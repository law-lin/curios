import { useState } from 'react';
import { Box, Text, Button, Flex, HStack } from '@chakra-ui/react';
import useUpdateAnswer from '../hooks/useUpdateAnswer';
import useDeleteAnswer from '../hooks/useDeleteAnswer';
import { useUser as useUserAuth } from 'providers/AuthProvider';
import useUserClassStatistic from 'hooks/useUserClassStatistic';
import useUpdateUserClassStatistic from 'hooks/useUpdateUserClassStatistic';
import useUser from 'hooks/useUser';

import { Answer } from '../types';

import Editor from 'components/editor/Editor';
import Preview from 'components/preview/Preview';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';

interface Props {
  instructorAnswer: Answer;
  role: string;
  classId: string;
}

const InstructorAnswerView = ({ instructorAnswer, role, classId }: Props) => {
  const { user } = useUserAuth();
  const { id, postId, createdBy } = instructorAnswer;
  const [instructorAnswerEdit, setInstructorAnswerEdit] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [upvotes, setUpvotes] = useState('0');
  const [content, setContent] = useState(instructorAnswer?.content);

  const { data: editsCountData, isLoading: editsCountDataIsLoading } =
    useUserClassStatistic('edits', user!.id, classId);
  const { data: answererData, isLoading: answererDataIsLoading } =
    useUser(createdBy);

  const updateAnswerMutation = useUpdateAnswer(
    id,
    postId,
    role,
    anonymous,
    upvotes,
    content
  );

  const deleteAnswerMutation = useDeleteAnswer(id, postId, role);

  const updateEditsCountMutation = useUpdateUserClassStatistic(
    'edits',
    classId,
    editsCountData ? editsCountData[0].edits + 1 : 0
  );

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
    updateEditsCountMutation.mutate();
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

  if (user === null || editsCountDataIsLoading || answererDataIsLoading)
    return null;

  const answerer = answererData[0];

  return (
    <>
      <Box px={5}>
        {instructorAnswerEdit ? (
          <>
            <Editor
              onChange={onContentUpdate}
              defaultContent={content}
            ></Editor>
            <Button mr={5} onClick={handleInstructorAnswerEdit}>
              Update
            </Button>
            <Button onClick={handleInstructorAnswerCancel}>Cancel</Button>
          </>
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
      </Box>
      <Flex pt={0} px={5} justify='end' bg='whiteAlpha.300'>
        Updated on {answerer.createdAt} By
        {instructorAnswer.isAnonymous
          ? ' Anonymous Pizza'
          : ` ${answerer.name}`}
      </Flex>
    </>
  );
};

export default InstructorAnswerView;
