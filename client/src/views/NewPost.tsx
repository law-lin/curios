import React, { useState } from 'react';
import {
  Stack,
  Box,
  Heading,
  Text,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  Input,
} from '@chakra-ui/react';
import Editor from 'components/editor/Editor';
import Preview from 'components/preview/Preview';
const NewPost = () => {
  const [type, setType] = useState('question');
  const [content, setContent] = useState('');
  console.log(content);
  return (
    <Stack spacing={4} pt={5} px='22'>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <RadioGroup onChange={setType} value={type}>
          <Stack direction='row'>
            <Radio value='question'>Question</Radio>
            <Radio value='note'>Note</Radio>
          </Stack>
        </RadioGroup>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input id='title' placeholder='Enter a title' />
        <Editor onChange={setContent} />
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'>
        <Preview content={content} />
      </Box>
      <Box p={5} shadow='sm' borderWidth='1px'></Box>
    </Stack>
  );
};

export default NewPost;
