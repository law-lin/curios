import React, { useState } from 'react';
import useCreateAnswer from '../hooks/useCreateAnswer';
import useAnswers from '../hooks/useAnswers';

import {
  Stack,
  HStack,
  Box,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Flex,
} from '@chakra-ui/react';

import Editor from 'components/editor/Editor';
import Preview from 'components/preview/Preview';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Class } from 'types';
import { stringify } from 'querystring';
import { ConsoleSqlOutlined, UserAddOutlined } from '@ant-design/icons';

import StudentAnswersView from './StudentAnswersView';
import InstructorAnswerView from './InstructorAnswerView';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Post = ({ post, role }) => {
  const [instructorAnswerPost, setInstructorAnswerPost] = useState(false);
  const [studentAnswerPost, setStudentAnswerPost] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [upvotes, setUpvotes] = useState('0');
  const [content, setContent] = useState('');
  const createAnswerMutation = useCreateAnswer(
    post.id,
    role,
    anonymous,
    upvotes,
    content
  );

  const { data, isLoading } = useAnswers(post.id, 'student');
  const { data: instructorData, isLoading: instructorDataIsLoading } =
    useAnswers(post.id, 'instructor');

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
    setContent('');
    setAnonymous(false);
    setInstructorAnswerPost(false);
    createAnswerMutation.mutate();
  };

  const handleInstructorAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setInstructorAnswerPost(false);
  };

  const handleStudentAnswerPost = () => {
    setContent('');
    setStudentAnswerPost(false);
    createAnswerMutation.mutate();
  };

  const handleStudentAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setStudentAnswerPost(false);
  };

  const handleArchive = () => {
    console.log('potato');
  }

  if (isLoading || instructorDataIsLoading) {
    return null;
  }

  //setRole(classData[0].role);
  return (
    <Stack spacing={4} pt={5} px='22'>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Flex justifyContent='space-between'>
          <Box>
            <Text>
              {capitalizeFirstLetter(post?.type)} @{post?.number}
            </Text>
            <Heading fontSize='xl'>{post?.title}</Heading>
            <Preview content={post?.content} />
          </Box>
          {role === 'instructor' ? (
            <Box>
              <Button onClick={handleArchive}>Archive</Button>
            </Box>
          ) : null}
        </Flex>
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading pb={5} fontSize='xl'>
          Instructor Answer
        </Heading>

        {role === 'instructor' && instructorData!.length == 0 ? (
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
          ) : (
            <Box
              p={5}
              shadow='sm'
              borderWidth='1px'
              onClick={() => setInstructorAnswerPost(true)}
            >
              <Text>Click to contribute an answer.</Text>
            </Box>
          )
        ) : null}

        {instructorData!.length > 0 ? (
          <Box mt={5} p={5} shadow='sm' borderWidth='1px'>
            <InstructorAnswerView
              instructorAnswer={instructorData![0]}
              role={role}
            />
          </Box>
        ) : null}
      </Box>

      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading pb={5} fontSize='xl'>
          Student Answers
        </Heading>

        {role === 'student' ? (
          studentAnswerPost ? (
            <Box p={5} shadow='sm' borderWidth='1px'>
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
        <StudentAnswersView studentAnswers={data!} role={role} />
      </Box>
    </Stack>
  )
}

// const StudentInstructorAnswers = ( props ) => {
//   const isPostTypeNote = props.postType === 'note';
//   if(!isPostTypeNote) {
//     return <StudentInstructorAnswersTemplate />;
//   }
//   return null;
// }
export default Post;
