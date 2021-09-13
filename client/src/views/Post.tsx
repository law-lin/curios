import React, { useState } from 'react';
import { Stack, Box, Heading, Text, Button } from '@chakra-ui/react';
import { Class } from 'types';

const Post = ({ post }) => {
  return (
    <Stack spacing={4} pt={5} px='22'>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Text>Question @{post?.number}</Text>
        <Heading fontSize='xl'>{post?.title}</Heading>
        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading fontSize='xl'>Instructor Answers</Heading>
        <Text mt={4}>I can help you.</Text>
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Heading fontSize='xl'>Student Answers</Heading>
        <Text mt={4}>I can help you.</Text>
      </Box>
    </Stack>
  );
};
export default Post;
