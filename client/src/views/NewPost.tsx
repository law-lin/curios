import React, { useState } from 'react';
import { Stack, Box, Heading, Text, Button, Input } from '@chakra-ui/react';
import Editor from 'components/editor/Editor';
const NewPost = () => {
  return (
    <Stack spacing={4} pt={5} px='22'>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Input />
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Editor />
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'></Box>
    </Stack>
  );
};

export default NewPost;
