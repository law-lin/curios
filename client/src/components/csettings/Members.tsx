import { Input, InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { Class } from "types";
import { AiOutlineDown, AiOutlineSearch } from "react-icons/ai";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useEffect, useState } from "react";
import useMembers from "hooks/useMembers";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import useUpdateRole from "hooks/useUpdateRole";
import useCurrentRole from "hooks/useCurrentRole";
import { couldStartTrivia } from "typescript";
import supabase from '../../lib/supabase';

interface Props {
  classItem: Class;
}

const sort = ["A-Z", "Role"];
const roles = ["instructor", "teaching assistant", "student"];

const Members = ({ classItem }: Props) => {
  const [value, setValue] = useState("");
  const [sortBy, setSortBy] = useState(sort[0]);
  const { data, isLoading, refetch } = useMembers(
    classItem.id.toString(),
    value
  );
  const { data: currentRole } = useCurrentRole(classItem.id.toString());
  const updateRoleMutation = useUpdateRole();

  const handleRoleChange = (values) => {
    updateRoleMutation.mutate(values);
    refetch();
  }

  useEffect(() => {
    refetch();
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  if (isLoading) {
    return null;
  }

  /*
    disabled supabase policies to make role changes work
  */
  const changeRole = (targetId, targetCurrentRole, targetFutureRole, currentClassId) => {
    handleRoleChange({ currentRole, targetCurrentRole, targetFutureRole, targetId, currentClassId });
  }

  return (
    <Box padding="50px">
      <Box marginBottom="30px">
        <Heading size="md">Class members {`(${data.length})`}</Heading>
      </Box>
      <Box d="flex" marginBottom="30px">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<AiOutlineSearch color="gray.300" />}
          />
          <Input
            variant="filled"
            placeholder="Search for people who are in this class"
            value={value}
            onChange={handleChange}
          />
        </InputGroup>
        <Box marginLeft="10px">
          <Menu>
            <MenuButton as={Button} rightIcon={<AiOutlineDown />}>
              {`Sort By: ${sortBy}`}
            </MenuButton>
            <MenuList>
              {sort.map((field) => {
                return (
                  <MenuItem
                    minH="48px"
                    onClick={() => {
                      setSortBy(field);
                    }}
                  >
                    <span>{field}</span>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Box>
        <Table
          variant="simple"
          border="1px solid #E0E0E0"
          borderRadius="1000px"
        >
          <Thead>
            <Th> Name </Th>
            <Th width="170px"> Last seen </Th>
            <Th width="125px"> Role </Th>
            <Th width="112px"> Actions </Th>
          </Thead>
          <Tbody>
            {data.map((member) => {
              if (member !== undefined) {
                return (
                  <Tr>
                    <Td>{member.users.name}</Td>
                    <Td>{member.users.status}</Td>
                    <Td>
                    <Menu>
            <MenuButton as={Button} rightIcon={<AiOutlineDown />}>
              {member.role}
            </MenuButton>
            <MenuList>
              {roles.map((role) => {
                return (
                  <MenuItem
                    minH="48px"
                    onClick={ () => {
                      changeRole(member.users.id, member.role, role, classItem.id.toString());
                    }}
                  >
                    <span>{role}</span>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
                    </Td>
                    <Td>
                      <Button>{'...'}</Button>
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
