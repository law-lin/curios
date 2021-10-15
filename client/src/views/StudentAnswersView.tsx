import { Answer } from '../types/index';
import { List } from '@chakra-ui/react';
import StudentAnswerView from './StudentAnswerView';

interface Props {
  studentAnswers: Answer[];
}

const StudentAnswersView = ({ studentAnswers }: Props) => {
  return (
    <List mt={5}>
      {studentAnswers.map((studentAnswer) => {
        return <StudentAnswerView studentAnswer={studentAnswer} />;
      })}
    </List>
  );
};

export default StudentAnswersView;
