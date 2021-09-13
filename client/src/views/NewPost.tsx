import React, { useState } from 'react';
import {
  Stack,
  Box,
  Heading,
  FormLabel,
  Radio,
  RadioGroup,
  Input,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Editor from 'components/editor/Editor';
import Preview from 'components/preview/Preview';

// tiptap
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { createPost } from 'lib/supabase/store';

const NewPost = () => {
  const [type, setType] = useState('question');
  const [title, setTitle] = useState('');
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

  const handleCreate = () => {
    createPost(type, title, content);
  };

  if (!preview) {
    return null;
  }
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
        <Input
          id='title'
          placeholder='Enter a title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <Grid mt={4} h='400px' templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem colSpan={1}>
            <Editor onChange={onContentUpdate} />
          </GridItem>
          <GridItem colSpan={1}>
            <Preview preview={preview} />
          </GridItem>
        </Grid>

        {/* <Button onClick={handleCreate}>Create</Button> */}
      </Box>
    </Stack>
  );
};

export default NewPost;
