import React, { useState } from 'react';
import { Stack, Box, Heading, Text, Button } from '@chakra-ui/react';

import Editor from 'components/editor/Editor';
import Preview from 'components/preview/Preview';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Class } from 'types';
import { stringify } from 'querystring';
import { ConsoleSqlOutlined } from '@ant-design/icons';

const Post = ({ post }) => {
  const [instructorAnswer, setInstructorAnswer] = useState('');
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [instructorAnswerEdit, setInstructorAnswerEdit] = useState(false);
  const [studentAnswerEdit, setStudentAnswerEdit] = useState(false);
  const [content, setContent] = useState('');

  const preview = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: ``,
    editable: false,
  });

  const onContentUpdate = (newContent: string) => {
    setContent(newContent);
    preview?.commands.setContent(newContent);
  };

  const handleInstructorAnswerPost = () => {};

  const handleInstructorAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setInstructorAnswerEdit(false);
  };

  const handleStudentAnswerPost = () => {};

  const handleStudentAnswerCancel = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    setStudentAnswerEdit(false);
  };

  return (
    <Stack spacing={4} pt={5} px='22'>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Text>Question @{post?.number}</Text>
        <Heading fontSize='xl'>{post?.title}</Heading>
        <Preview content={post?.content} />
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading pb={5} fontSize='xl'>
          Instructor Answers
        </Heading>
        <Box
          p={5}
          shadow='sm'
          borderWidth='1px'
          onClick={() => setInstructorAnswerEdit(true)}
        >
          {instructorAnswerEdit ? (
            <Box p={5}>
              <Editor onChange={onContentUpdate}></Editor>
              <Button mr={5} onClick={handleInstructorAnswerPost}>
                Post
              </Button>
              <Button onClick={handleInstructorAnswerCancel}>Cancel</Button>
            </Box>
          ) : (
            <Text>Click to contribute an answer.</Text>
          )}
        </Box>
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading pb={5} fontSize='xl'>
          Student Answers
        </Heading>
        <Box
          p={5}
          shadow='sm'
          borderWidth='1px'
          onClick={() => setStudentAnswerEdit(true)}
        >
          {studentAnswerEdit ? (
            <Box p={5}>
              <Editor onChange={onContentUpdate}></Editor>
              <Button mr={5} onClick={handleStudentAnswerPost}>
                Post
              </Button>
              <Button onClick={handleStudentAnswerCancel}>Cancel</Button>
            </Box>
          ) : (
            <Text>Click to contribute an answer.</Text>
          )}
        </Box>
      </Box>
    </Stack>
  );
};
export default Post;
