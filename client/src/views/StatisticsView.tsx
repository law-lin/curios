import React, { useState } from 'react';

import {
  Box,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  VStack,
  Tbody,
  Menu,
  MenuButton,
  Select,
} from '@chakra-ui/react';
import { Heading, Text } from '@chakra-ui/react';

import { Class } from 'types';
import { useUser } from 'providers/AuthProvider';
import useMembers from 'hooks/useMembers';

interface Props {
  classItem: Class;
}

const StatisticsView = ({ classItem }: Props) => {
  const { user } = useUser();
  const { id } = classItem;
  const { data, isLoading } = useMembers(id.toString(), '', 'A-Z');
  const [topContributorRole, setTopContributorRole] = useState('student');

  const handleSelectTopContributorRole = (e) => {
    setTopContributorRole(e.target.value);
  };

  const getMembersByRole = (members, role) => {
    return members.filter((member) => member.role === role);
  };

  const sortMembersByContributions = (members) => {
    return members.sort((a, b) =>
      a.posts + a.answers + a.edits < b.posts + b.answers + b.edits ? 1 : -1
    );
  };

  if (isLoading || user === null) return null;

  const {
    users: { name: userName, email: userEmail },
    posts: userPostsCount,
    answers: userAnswersCount,
    edits: userEditsCount,
  } = data.filter((d) => d.users.id === user!.id.toString())[0];
  const userContributions = userPostsCount + userAnswersCount + userEditsCount;

  const members = {
    instructor: sortMembersByContributions(
      getMembersByRole(data, 'instructor')
    ),
    'teaching assistant': sortMembersByContributions(
      getMembersByRole(data, 'teaching assistant')
    ),
    student: sortMembersByContributions(getMembersByRole(data, 'student')),
  };

  console.log(members);

  return (
    <Box padding='50px'>
      <Box marginBottom='30px'>
        <Heading size='md' marginBottom='15px'>
          Statistics
        </Heading>
        <VStack align='start'>
          <Box p={5} shadow='sm' borderWidth='1px'>
            <Heading size='sm'>Your Report</Heading>
            <Table>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Days Online</Th>
                  <Th>Posts Viewed</Th>
                  <Th>Contributions</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Text>{userName}</Text>
                  </Td>
                  <Td>
                    <Text>{userEmail}</Text>
                  </Td>
                  <Td>
                    <Text>N/A</Text>
                  </Td>
                  <Td>
                    <Text>N/A</Text>
                  </Td>
                  <Td>
                    <Text>{userContributions}</Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Box p={5} shadow='sm' borderWidth='1px'>
            <VStack align='start'>
              <HStack p={5} align='start'>
                <Heading size='sm'>Top Contributors</Heading>
                <Select onChange={handleSelectTopContributorRole}>
                  <option value='student'>Student</option>
                  <option value='instructor'>Instructor</option>
                  <option value='teaching assistant'>Teaching Assistant</option>
                </Select>
              </HStack>
              {members[topContributorRole]
                .slice(0, Math.min(members[topContributorRole].length, 5))
                .map((topContributor) => {
                  return (
                    <HStack p={5}>
                      <Text>{topContributor.users.name}</Text>
                      <Text>
                        {`${
                          topContributor.posts +
                          topContributor.answers +
                          topContributor.edits
                        }
                        Contributions`}
                      </Text>
                    </HStack>
                  );
                })}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default StatisticsView;
