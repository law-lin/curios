import React, { useState } from 'react';
import { Stack, Box, Heading, Text, Button } from '@chakra-ui/react';
import { Class } from 'types';
import Preview from 'components/preview/Preview';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const StudentInstructorAnswersTemplate = () => {
  return (
    <>
          <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading fontSize='xl'>Instructor Answers</Heading>
        <Text mt={4}>I can help you.</Text>
        </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading fontSize='xl'>Student Answers</Heading>
        <Text mt={4}>I can help you.</Text>
      </Box>
    </>
  )
}

const Post = ({ post }) => {
  return (
    <Stack spacing={4} pt={5} px='22'>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Text>
          {capitalizeFirstLetter(post?.type)} @{post?.number}
        </Text>
        <Heading fontSize='xl'>{post?.title}</Heading>
        <Preview content={post?.content} />
      </Box>
      <StudentInstructorAnswers postType={post?.type} />
    </Stack>
  )
}

const StudentInstructorAnswers = ( props ) => {
  const isPostTypeNote = props.postType === 'note';
  if(!isPostTypeNote) {
    return <StudentInstructorAnswersTemplate />;
  }
  return null;
}
export default Post;
