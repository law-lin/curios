import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import { Class } from 'types';
import { AiOutlineDown, AiOutlineSearch } from 'react-icons/ai';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { useEffect, useState } from 'react';
import useMembers from 'hooks/useMembers';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import MemberList from './MemberList';

interface Props {
  classItem: Class;
}

const sort = ['A-Z', 'Role'];

const Members = ({ classItem }: Props) => {
  const [value, setValue] = useState('');
  const [sortBy, setSortBy] = useState(sort[0]);
  let { data, isLoading, isFetching, refetch } = useMembers(
    classItem.id.toString(),
    value,
    sortBy
  );

  // const [members, setMembers] = useState(data);

  useEffect(() => {
    refetch();
  }, [value, sortBy]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  if (isLoading) {
    return null;
  }
  return (
    <Box padding='50px'>
      <Box marginBottom='30px'>
        <Heading size='md'>Class members</Heading>
      </Box>
      <Box d='flex' marginBottom='30px'>
        <InputGroup>
          <InputLeftElement
            pointerEvents='none'
            children={<AiOutlineSearch color='gray.300' />}
          />
          <Input
            variant='filled'
            placeholder='Search for people who are in this class'
            value={value}
            onChange={handleChange}
          />
        </InputGroup>
        <Box marginLeft='10px'>
          <Menu>
            <MenuButton as={Button} rightIcon={<AiOutlineDown />}>
              {`Sort: ${sortBy}`}
            </MenuButton>
            <MenuList>
              {sort.map((field) => {
                return (
                  <MenuItem
                    minH='48px'
                    // bg={sortBy == sort ?}
                    onClick={() => {
                      setSortBy(field);
                    }}
                  >
                    <span>{`Sort by ${field}`}</span>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Box>
        <Table
          variant='simple'
          border='1px solid #E0E0E0'
          borderRadius='1000px'
        >
          <Thead>
            <Th> Name </Th>
            <Th width='170px'> Last seen </Th>
            <Th width='125px'> Role </Th>
            <Th width='112px'> Actions </Th>
          </Thead>
          <Tbody>
            {/* <MemberList value={value} sortBy={sortBy} classItem={classItem} /> */}
            {data.map((member) => {
              if (member !== undefined) {
                return (
                  <Tr>
                    <Td>{member.users.name}</Td>
                    <Td>{member.users.status}</Td>
                    <Td>{member.role}</Td>
                    <Td>
                      <Button variant='ghost'>...</Button>
                    </Td>
                  </Tr>
                );
              }
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Members;
