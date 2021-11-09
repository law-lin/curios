import { Answer } from '../types/index';
import { List } from '@chakra-ui/react';
import StudentAnswerView from './StudentAnswerView';

interface Props {
  studentAnswers: Answer[];
  postId: number;
  role: string;
}

const StudentAnswersView = ({ studentAnswers, postId, role }: Props) => {
  console.log(studentAnswers);
  return (
    <List mt={5}>
      {studentAnswers.map((studentAnswer) => {
        return (
          <StudentAnswerView
            studentAnswer={studentAnswer}
            postId={postId}
            role={role}
          />
        );
      })}
    </List>
  );
};

export default StudentAnswersView;
