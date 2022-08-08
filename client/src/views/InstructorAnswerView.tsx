import { useState } from 'react';
import {
  Box,
  Text,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BsPencilSquare } from 'react-icons/bs';

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
import moment from 'moment';

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

  const createdAt = new Date(instructorAnswer.createdAt);
  const createdAtFormatted = moment(createdAt).format(
    'MMMM Do, YYYY [at] h:mm a'
  );

  return (
    <>
      <Box p={5}>
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
            <HStack justify='space-between' align='start'>
              <Text
                dangerouslySetInnerHTML={(() => ({
                  __html: instructorAnswer?.content,
                }))()}
              />
              {!instructorAnswerEdit && role === 'instructor' ? (
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    <Icon as={BsPencilSquare} />
                  </MenuButton>
                  <MenuList width='50px'>
                    <MenuItem onClick={() => setInstructorAnswerEdit(true)}>
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={handleInstructorAnswerDelete}
                      color='#FC144B'
                      _hover={{
                        filter: 'brightness(95%)',
                        backgroundColor: '#FC144B',
                        color: 'white',
                      }}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : null}
            </HStack>
          </>
        )}
      </Box>
      <Flex pt={0} px={5} justify='end' bg='whiteAlpha.300' borderRadius='5'>
        Updated on {createdAtFormatted} By
        {instructorAnswer.isAnonymous
          ? ' Anonymous Pizza'
          : ` ${answerer.name}`}
      </Flex>
    </>
  );
};

export default InstructorAnswerView;
