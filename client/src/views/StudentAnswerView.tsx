import { Box, Text, Button, ListItem, HStack } from '@chakra-ui/react';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Editor from 'components/editor/Editor';
import useUpdateAnswer from 'hooks/useUpdateAnswer';
import useDeleteAnswer from 'hooks/useDeleteAnswer';
import { useUser } from 'providers/AuthProvider';
import { useState } from 'react';
import { Answer } from '../types';

interface Props {
  studentAnswer: Answer;
  role: string;
}

const StudentAnswerView = ({ studentAnswer, role }: Props) => {
  const { user } = useUser();
  const { id, createdBy, postId } = studentAnswer;
  const [studentAnswerEdit, setStudentAnswerEdit] = useState(false);
  const [anonymous] = useState(false);
  const [upvotes] = useState('0');
  const [content, setContent] = useState(studentAnswer?.content);

  const preview = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: ``,
    editable: false,
  });

  const updateAnswerMutation = useUpdateAnswer(
    id,
    postId,
    role,
    anonymous,
    upvotes,
    content
  );

  const deleteAnswerMutation = useDeleteAnswer(id, postId, role);

  const handleStudentAnswerEdit = () => {
    updateAnswerMutation.mutate();
    setStudentAnswerEdit(false);
  };

  const handleStudentAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setStudentAnswerEdit(false);
  };

  const handleStudentAnswerDelete = () => {
    deleteAnswerMutation.mutate();
  };

  const onContentUpdate = (newContent: string) => {
    setContent(newContent);
    preview?.commands.setContent(newContent);
  };
  if (user === null) return null;

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
          <>
            <Text
              dangerouslySetInnerHTML={(() => ({
                __html: studentAnswer?.content,
              }))()}
            />
            {user.id === createdBy ? (
              <HStack p={5} mt={5}>
                <Button onClick={() => setStudentAnswerEdit(true)}>Edit</Button>
                <Button onClick={handleStudentAnswerDelete}>Delete</Button>
              </HStack>
            ) : null}
          </>
        )}
      </Box>
    </ListItem>
  );
};

export default StudentAnswerView;
