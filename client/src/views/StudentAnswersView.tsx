import { Answer } from '../types/index';
import { List } from '@chakra-ui/react';
import StudentAnswerView from './StudentAnswerView';

interface Props {
  studentAnswers: Answer[];
  role: string;
}

const StudentAnswersView = ({ studentAnswers, role }: Props) => {
  return (
    <List mt={5}>
      {studentAnswers.map((studentAnswer) => {
        return <StudentAnswerView studentAnswer={studentAnswer} role={role} />;
      })}
    </List>
  );
};

export default StudentAnswersView;
