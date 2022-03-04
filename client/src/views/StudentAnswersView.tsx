import { Answer } from '../types/index';
import { List } from '@chakra-ui/react';
import StudentAnswerView from './StudentAnswerView';

interface Props {
  studentAnswers: Answer[];
  role: string;
  classId: string;
}

const StudentAnswersView = ({ studentAnswers, role, classId }: Props) => {
  return (
    <List mt={5}>
      {studentAnswers.map((studentAnswer) => {
        return (
          <StudentAnswerView
            studentAnswer={studentAnswer}
            role={role}
            classId={classId}
          />
        );
      })}
    </List>
  );
};

export default StudentAnswersView;
