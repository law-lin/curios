import { Box, Heading } from '@chakra-ui/layout';
import { Class } from 'types';

interface Props {
  classItem: Class;
}

const Preferences = ({ classItem }: Props) => {
  return (
    <Box padding='50px'>
      <Box marginBottom='30px'>
        <Heading size='md'>Feature Preferences</Heading>
      </Box>
    </Box>
  );
};

export default Preferences;
