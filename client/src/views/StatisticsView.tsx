import React from 'react';

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

  if (isLoading || user === null) return null;

  const {
    users: { name: userName, email: userEmail },
    contributions: userContributions,
  } = data.filter((d) => d.users.id === user!.id.toString())[0];
  return (
    <Box padding='50px'>
      <Box marginBottom='30px'>
        <Heading size='md' marginBottom='15px'>
          Statistics
        </Heading>
        <VStack>
          <HStack align='start'>
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
              <Heading size='sm'>Top Student Contributors</Heading>
              <Text>Student 1</Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default StatisticsView;
