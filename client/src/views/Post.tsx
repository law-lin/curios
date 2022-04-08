import React, { useEffect, useState } from 'react';
import useCreateAnswer from '../hooks/useCreateAnswer';
import useAnswers from '../hooks/useAnswers';
// import usePostsCount from 'hooks/usePostsCount';
// import useUpdatePostsCount from 'hooks/useUpdatePostsCount';
import useUserClassStatistic from 'hooks/useUserClassStatistic';
import useUpdateUserClassStatistic from 'hooks/useUpdateUserClassStatistic';

import supabase from 'lib/supabase';

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
import useUpdateArchive from 'hooks/useUpdateArchive';
import useUpdatePostsViewed from 'hooks/useUpdatePostsViewed';
import useUser from 'hooks/useUser';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Post = ({ classId, post, role }) => {
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

  const user = supabase.auth.user();

  const { data, isLoading } = useAnswers(post.id, 'student');
  const { data: instructorData, isLoading: instructorDataIsLoading } =
    useAnswers(post.id, 'instructor');
  const { data: postsCountData, isLoading: postsCountDataIsLoading } =
    useUserClassStatistic('posts', user!.id, classId);
  const { data: answersCountData, isLoading: answersCountDataIsLoading } =
    useUserClassStatistic('answers', user!.id, classId);
  const { data: posterData, isLoading: posterDataIsLoading } = useUser(
    post.createdBy
  );

  const updateArchiveMutation = useUpdateArchive(post.id, post.isArchived);
  const updateAnswersCountMutation = useUpdateUserClassStatistic(
    'answers',
    classId,
    answersCountData ? answersCountData[0].answers + 1 : 0
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

  const handleInstructorAnswerPost = () => {
    setContent('');
    setAnonymous(false);
    setInstructorAnswerPost(false);
    createAnswerMutation.mutate();
    updateAnswersCountMutation.mutate();
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
    updateAnswersCountMutation.mutate();
  };

  const handleStudentAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setStudentAnswerPost(false);
  };

  const handleArchive = () => {
    updateArchiveMutation.mutate();
  };

  useUpdatePostsViewed(user!.id, post.id, classId);

  if (
    isLoading ||
    instructorDataIsLoading ||
    answersCountDataIsLoading ||
    posterDataIsLoading
  )
    return null;

  const poster = posterData[0];
  return (
    <Stack spacing={4} pt={5} px='22'>
      <Box pt={5} shadow='sm' borderWidth='1px' borderRadius='5'>
        <Flex flexDirection='column' justifyContent='space-between'>
          <Flex px={5} justifyContent='space-between'>
            <Box borderRadius='5'>
              <Text>
                {capitalizeFirstLetter(post?.type)} @{post?.number}
              </Text>
              <Heading fontSize='xl'>{post?.title}</Heading>
              <Preview content={post?.content} />
            </Box>
            {role === 'instructor' && !post?.isArchived ? (
              <Box borderRadius='5'>
                <Button onClick={handleArchive}>Archive</Button>
              </Box>
            ) : null}
            {role === 'instructor' && post?.isArchived ? (
              <Box borderRadius='5'>
                <Button onClick={handleArchive}>Undo Archive</Button>
              </Box>
            ) : null}
          </Flex>
          <Flex pt={0} px={5} justify='end' bg='whiteAlpha.300'>
            Updated on {post.createdAt} By
            {post.isAnonymous ? ' Anonymous Pizza' : ` ${poster.name}`}
          </Flex>
        </Flex>
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px' borderRadius='5'>
        <Heading pb={5} fontSize='xl'>
          Instructor Answer
        </Heading>

        {role === 'instructor' && instructorData!.length == 0 ? (
          instructorAnswerPost ? (
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius='5'>
              <Box p={5} borderRadius='5'>
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
              borderRadius='5'
              onClick={() => setInstructorAnswerPost(true)}
            >
              <Text>Click to contribute an answer.</Text>
            </Box>
          )
        ) : null}

        {instructorData!.length > 0 ? (
          <Box mt={5} pt={5} shadow='sm' borderWidth='1px' borderRadius='5'>
            <InstructorAnswerView
              instructorAnswer={instructorData![0]}
              role={role}
              classId={classId}
            />
          </Box>
        ) : null}
      </Box>

      <Box p={5} shadow='sm' borderWidth='1px' borderRadius='5'>
        <Heading pb={5} fontSize='xl'>
          Student Answers
        </Heading>

        {role === 'student' ? (
          studentAnswerPost ? (
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius='5'>
              <Box p={5} borderRadius='5'>
                <FormControl display='flex' alignItems='center' p={5}>
                  <FormLabel htmlFor='user-anonymous' mb='0'>
                    Anonymous
                  </FormLabel>
                  <Switch onChange={(e) => setAnonymous(!anonymous)}></Switch>
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
              borderRadius='5'
              onClick={() => setStudentAnswerPost(true)}
            >
              <Text>Click to contribute an answer.</Text>
            </Box>
          )
        ) : null}
        <StudentAnswersView
          studentAnswers={data!}
          role={role}
          classId={classId}
        />
      </Box>
    </Stack>
  );
};

// const StudentInstructorAnswers = ( props ) => {
//   const isPostTypeNote = props.postType === 'note';
//   if(!isPostTypeNote) {
//     return <StudentInstructorAnswersTemplate />;
//   }
//   return null;
// }
export default Post;
