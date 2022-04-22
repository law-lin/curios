import { Box, Text, Button, ListItem, Flex, HStack } from '@chakra-ui/react';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Editor from 'components/editor/Editor';
import useUpdateAnswer from 'hooks/useUpdateAnswer';
import useDeleteAnswer from 'hooks/useDeleteAnswer';
import useUserClassStatistic from 'hooks/useUserClassStatistic';
import useUpdateUserClassStatistic from 'hooks/useUpdateUserClassStatistic';
import { useUser as useUserAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { Answer } from '../types';
import useUser from 'hooks/useUser';
import moment from 'moment';

interface Props {
  studentAnswer: Answer;
  role: string;
  classId: string;
}

const StudentAnswerView = ({ studentAnswer, role, classId }: Props) => {
  const { user } = useUserAuth();
  const { id, createdBy, postId } = studentAnswer;

  const [studentAnswerEdit, setStudentAnswerEdit] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [upvotes, setUpvotes] = useState('0');
  const [content, setContent] = useState(studentAnswer?.content);

  const { data: editsCountData, isLoading: editsCountDataIsLoading } =
    useUserClassStatistic('edits', user!.id, classId);
  const { data: answererData, isLoading: answererDataIsLoading } =
    useUser(createdBy);

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

  const updateEditsCountMutation = useUpdateUserClassStatistic(
    'edits',
    classId,
    editsCountData ? editsCountData[0].edits + 1 : 0
  );

  const handleStudentAnswerEdit = () => {
    updateAnswerMutation.mutate();
    setStudentAnswerEdit(false);
    updateEditsCountMutation.mutate();
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
  if (user === null || editsCountDataIsLoading || answererDataIsLoading)
    return null;

  const answerer = answererData[0];
  const createdAt = new Date(studentAnswer.createdAt);
  const createdAtFormatted = moment(createdAt).format(
    'MMMM Do, YYYY [at] h:mm a'
  );

  return (
    <ListItem>
      <Box p={5} shadow='sm' borderWidth='1px' borderRadius='5'>
        {studentAnswerEdit ? (
          <>
            <Editor
              onChange={onContentUpdate}
              defaultContent={content}
            ></Editor>
            <Button mr={5} onClick={handleStudentAnswerEdit}>
              Update
            </Button>
            <Button onClick={handleStudentAnswerCancel}>Cancel</Button>
          </>
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
      <Flex pt={0} px={5} justify='end' bg='whiteAlpha.300'>
        Updated on {createdAtFormatted} By
        {studentAnswer.isAnonymous ? ' Anonymous Pizza' : ` ${answerer.name}`}
      </Flex>
    </ListItem>
  );
};

export default StudentAnswerView;
