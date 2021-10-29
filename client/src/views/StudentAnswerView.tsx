import { Box, Text, ListItem } from '@chakra-ui/react';
import { Answer } from '../types';

interface Props {
  studentAnswer: Answer;
}

const StudentAnswerView = ({ studentAnswer }: Props) => {
  return (
    <ListItem>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Text
          dangerouslySetInnerHTML={(() => ({
            __html: studentAnswer?.content,
          }))()}
        />
      </Box>
    </ListItem>
  );
};

export default StudentAnswerView;
