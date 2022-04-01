import { useState } from 'react';
import { Box, Text, Button, HStack } from '@chakra-ui/react';
import useUpdateAnswer from '../hooks/useUpdateAnswer';
import useDeleteAnswer from '../hooks/useDeleteAnswer';

import { Answer } from '../types';

import Editor from 'components/editor/Editor';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';

interface Props {
  instructorAnswer: Answer;
  role: string;
}

const InstructorAnswerView = ({ instructorAnswer, role }: Props) => {
  const { id, postId } = instructorAnswer;
  const [instructorAnswerEdit, setInstructorAnswerEdit] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [upvotes] = useState('0');
  const [content, setContent] = useState(instructorAnswer?.content);

  const updateAnswerMutation = useUpdateAnswer(
    id,
    postId,
    role,
    anonymous,
    upvotes,
    content
  );

  const deleteAnswerMutation = useDeleteAnswer(id, postId, role);

  const preview = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: ``,
    editable: false,
  });

  const onContentUpdate = (newContent: string) => {
    setContent(newContent);
    preview?.commands.setContent(newContent);
  };

  const handleInstructorAnswerEdit = () => {
    setAnonymous(false);
    setInstructorAnswerEdit(false);
    updateAnswerMutation.mutate();
  };

  const handleInstructorAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setInstructorAnswerEdit(false);
  };

  const handleInstructorAnswerDelete = () => {
    setContent('');
    setAnonymous(false);
    deleteAnswerMutation.mutate();
  };

  return (
    <>
      {instructorAnswerEdit ? (
        <Box p={5} shadow='sm' borderWidth='1px'>
          <Box p={5}>
            <Editor
              onChange={onContentUpdate}
              defaultContent={content}
            ></Editor>
            <Button mr={5} onClick={handleInstructorAnswerEdit}>
              Update
            </Button>
            <Button onClick={handleInstructorAnswerCancel}>Cancel</Button>
          </Box>
        </Box>
      ) : (
        <>
          <Text
            dangerouslySetInnerHTML={(() => ({
              __html: instructorAnswer?.content,
            }))()}
          />
          {!instructorAnswerEdit && role === 'instructor' ? (
            <HStack p={5} mt={5}>
              <Button onClick={() => setInstructorAnswerEdit(true)}>
                Edit
              </Button>
              <Button onClick={handleInstructorAnswerDelete}>Delete</Button>
            </HStack>
          ) : null}
        </>
      )}
    </>
  );
};

export default InstructorAnswerView;
