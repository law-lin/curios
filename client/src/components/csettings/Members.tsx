import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import { Box, Heading } from '@chakra-ui/layout';
import { Class } from 'types';
import { AiOutlineSearch } from 'react-icons/ai';

interface Props {
  classItem: Class;
}

const Members = ({ classItem }: Props) => {
  return (
    <Box padding='50px'>
      <Box marginBottom='30px'>
        <Heading size='md'>Class members</Heading>
      </Box>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<AiOutlineSearch color='gray.300' />}
        />
        <Input
          variant='filled'
          placeholder='Search for people who are in this class'
        />
      </InputGroup>
    </Box>
  );
};

export default Members;
