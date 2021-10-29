import { Box, Text, Button } from '@chakra-ui/react';
import { Answer } from '../types';

interface Props {
  instructorAnswer: Answer;
}

const instructorAnswerView = ({ instructorAnswer }: Props) => {
  return (
    <Text
      dangerouslySetInnerHTML={(() => ({
        __html: instructorAnswer?.content,
      }))()}
    />
  );
};

export default instructorAnswerView;
