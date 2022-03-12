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
import usePostsViewed from 'hooks/usePostsViewed';

interface Props {
  classItem: Class;
}

const StatisticsView = ({ classItem }: Props) => {
  const { user } = useUser();
  const { id } = classItem;
  const { data: membersData, isLoading: isMembersLoading } = useMembers(
    id.toString(),
    '',
    'A-Z'
  );
  const { data: postsViewedData, isLoading: isPostsViewedLoading } =
    usePostsViewed(id.toString());
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

  if (isMembersLoading || isPostsViewedLoading || user === null) return null;

  console.log(postsViewedData);

  // User statistics
  const {
    users: { name: userName, email: userEmail },
    posts: userPostsCount,
    answers: userAnswersCount,
    edits: userEditsCount,
  } = membersData.filter((d) => d.users.id === user!.id.toString())[0];
  const userContributions = userPostsCount + userAnswersCount + userEditsCount;
  const userPostsViewed = postsViewedData!.filter(
    (d) => d.user_id === user!.id.toString()
  ).length;

  const members = {
    instructor: sortMembersByContributions(
      getMembersByRole(membersData, 'instructor')
    ),
    'teaching assistant': sortMembersByContributions(
      getMembersByRole(membersData, 'teaching assistant')
    ),
    student: sortMembersByContributions(
      getMembersByRole(membersData, 'student')
    ),
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
                    <Text>{userPostsViewed}</Text>
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
              {/* User report */}
              <HStack align='start'>
                <Heading size='sm'>Top Contributors</Heading>
                <Select onChange={handleSelectTopContributorRole}>
                  <option value='student'>Student</option>
                  <option value='instructor'>Instructor</option>
                  <option value='teaching assistant'>Teaching Assistant</option>
                </Select>
              </HStack>
              {/* Top contributors */}
              {members[topContributorRole]
                .slice(0, Math.min(members[topContributorRole].length, 5))
                .map((topContributor) => {
                  return (
                    <Table p={5}>
                      <Tbody>
                        <Tr>
                          <Td>
                            <Text>{topContributor.users.name}</Text>
                          </Td>
                          <Td>
                            <Text>
                              {`${
                                topContributor.posts +
                                topContributor.answers +
                                topContributor.edits
                              }
                        Contributions`}
                            </Text>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
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
