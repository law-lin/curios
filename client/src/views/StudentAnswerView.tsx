import { Box, Text, Button, ListItem } from '@chakra-ui/react';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Editor from 'components/editor/Editor';
import useUpdateAnswer from 'hooks/useUpdateAnswer';
import { useUser } from 'providers/AuthProvider';
import { useState } from 'react';
import { Answer } from '../types';

interface Props {
  studentAnswer: Answer;
  postId: number;
  role: string;
}

const StudentAnswerView = ({ studentAnswer, postId, role }: Props) => {
  const { user } = useUser();
  const [studentAnswerEdit, setStudentAnswerEdit] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [content, setContent] = useState('');

  const preview = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: ``,
    editable: false,
  });

  const updateAnswerMutation = useUpdateAnswer(
    postId,
    role,
    anonymous,
    '0',
    content
  );

  const handleStudentAnswerEdit = () => {
    updateAnswerMutation.mutate();
  };

  const handleStudentAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setStudentAnswerEdit(false);
  };

  const onContentUpdate = (newContent: string) => {
    setContent(newContent);
    preview?.commands.setContent(newContent);
  };

  return (
    <ListItem>
      <Box p={5} shadow='sm' borderWidth='1px'>
        {studentAnswerEdit ? (
          <Box p={5}>
            <Editor
              onChange={onContentUpdate}
              defaultContent={content}
            ></Editor>
            <Button mr={5} onClick={handleStudentAnswerEdit}>
              Update
            </Button>
            <Button onClick={handleStudentAnswerCancel}>Cancel</Button>
          </Box>
        ) : (
          <Text
            dangerouslySetInnerHTML={(() => ({
              __html: studentAnswer?.content,
            }))()}
          />
        )}
        {!studentAnswerEdit ? (
          <Button mt={5} onClick={() => setStudentAnswerEdit(true)}>
            Edit
          </Button>
        ) : null}
      </Box>
    </ListItem>
  );
};

export default StudentAnswerView;
