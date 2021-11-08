import React, { useState } from 'react';
import useCreateAnswer from '../hooks/useCreateAnswer';
import useUpdateAnswer from '../hooks/useUpdateAnswer';
import useAnswers from '../hooks/useAnswers';
import useClasses from 'hooks/useClasses';

import {
  Stack,
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react';

import Editor from 'components/editor/Editor';
import Preview from 'components/preview/Preview';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Class } from 'types';
import { stringify } from 'querystring';
import { ConsoleSqlOutlined } from '@ant-design/icons';

import StudentAnswersView from './StudentAnswersView';
import InstructorAnswerView from './InstructorAnswerView';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Post = ({ post, role }) => {
  const [instructorAnswer, setInstructorAnswer] = useState('');
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [instructorAnswerPost, setInstructorAnswerPost] = useState(false);
  const [instructorAnswerEdit, setInstructorAnswerEdit] = useState(false);
  const [studentAnswerPost, setStudentAnswerPost] = useState(false);
  const [studentAnswerEdit, setStudentAnswerEdit] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [content, setContent] = useState('');
  const createAnswerMutation = useCreateAnswer(
    post.id,
    role,
    anonymous,
    '0',
    content
  );
  const updateAnswerMutation = useUpdateAnswer(
    post.id,
    'instructor',
    anonymous,
    '0',
    content
  );
  const { data, isLoading } = useAnswers(post.id, 'student');
  const { data: instructorData, isLoading: instructorDataIsLoading } =
    useAnswers(post.id, 'instructor');

  const { data: classData, isLoading: classIsLoading } = useClasses();

  const preview = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: ``,
    editable: false,
  });

  const onContentUpdate = (newContent: string) => {
    setContent(newContent);
    preview?.commands.setContent(newContent);
  };

  const handleInstructorAnswerPost = () => {
    createAnswerMutation.mutate();
  };

  const handleInstructorAnswerEdit = () => {
    updateAnswerMutation.mutate();
  };

  const handleInstructorAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setInstructorAnswerPost(false);
    setInstructorAnswerEdit(false);
  };

  const handleStudentAnswerPost = () => {
    createAnswerMutation.mutate();
  };

  const handleStudentAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setStudentAnswerPost(false);
    setStudentAnswerEdit(false);
  };

  if (isLoading || instructorDataIsLoading || classIsLoading) {
    return null;
  }

  //setRole(classData[0].role);
  console.log(instructorAnswerPost);

  return (
    <Stack spacing={4} pt={5} px='22'>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Text>
          {capitalizeFirstLetter(post?.type)} @{post?.number}
        </Text>
        <Heading fontSize='xl'>{post?.title}</Heading>
        <Preview content={post?.content} />
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading pb={5} fontSize='xl'>
          Instructor Answer
        </Heading>

        {role === 'instructor' ? (
          instructorAnswerPost ? (
            <Box p={5} shadow='sm' borderWidth='1px'>
              <Box p={5}>
                <Editor
                  onChange={onContentUpdate}
                  defaultContent={content}
                ></Editor>
                <Button mr={5} onClick={handleInstructorAnswerPost}>
                  Post
                </Button>
                <Button onClick={handleInstructorAnswerCancel}>Cancel</Button>
              </Box>
            </Box>
          ) : instructorData!.length == 0 ? (
            <Box
              p={5}
              shadow='sm'
              borderWidth='1px'
              onClick={() => setInstructorAnswerPost(true)}
            >
              <Text>Click to contribute an answer.</Text>
            </Box>
          ) : null
        ) : null}
        {role === 'instructor' ? (
          instructorAnswerEdit && instructorData!.length > 0 ? (
            <Box
              p={5}
              shadow='sm'
              borderWidth='1px'
              onClick={() => setInstructorAnswerEdit(true)}
            >
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
          ) : null
        ) : null}

        {role === 'instructor' ? (
          !instructorAnswerEdit && instructorData!.length > 0 ? (
            <Box mt={5} p={5} shadow='sm' borderWidth='1px'>
              <InstructorAnswerView instructorAnswer={instructorData![0]} />
              <Button mt={5} onClick={() => setInstructorAnswerEdit(true)}>
                Edit
              </Button>
            </Box>
          ) : null
        ) : null}
      </Box>

      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading pb={5} fontSize='xl'>
          Student Answers
        </Heading>

        {role === 'student' ? (
          studentAnswerEdit ? (
            <Box
              p={5}
              shadow='sm'
              borderWidth='1px'
              onClick={() => setStudentAnswerEdit(true)}
            >
              <Box p={5}>
                <FormControl display='flex' alignItems='center' p={5}>
                  <FormLabel htmlFor='user-anonymous' mb='0'>
                    Anonymous
                  </FormLabel>
                  <Switch onChange={() => setAnonymous(!anonymous)}></Switch>
                </FormControl>
                <Editor
                  onChange={onContentUpdate}
                  defaultContent={content}
                ></Editor>
                <Button mr={5} onClick={handleStudentAnswerPost}>
                  Post
                </Button>
                <Button onClick={handleStudentAnswerCancel}>Cancel</Button>
              </Box>
            </Box>
          ) : (
            <Box
              p={5}
              shadow='sm'
              borderWidth='1px'
              onClick={() => setStudentAnswerPost(true)}
            >
              <Text>Click to contribute an answer.</Text>
            </Box>
          )
        ) : null}
        <StudentAnswersView studentAnswers={data!} />
      </Box>
    </Stack>
  );
};
export default Post;
