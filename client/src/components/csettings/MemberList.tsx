import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import useMembers from 'hooks/useMembers';
import { Class } from 'types';

interface Props {
  value: string;
  sortBy: string;
  classItem: Class;
}

const MemberList = ({ value, sortBy, classItem }: Props) => {
  let { data, isLoading, isFetching, refetch } = useMembers(
    classItem.id.toString(),
    value,
    sortBy
  );
  if (isLoading) {
    return null;
  }
  return (
    <>
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
    </>
  );
};

export default MemberList;
