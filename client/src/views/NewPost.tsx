import React, { useState, useEffect } from 'react';
import {
  Stack,
  HStack,
  Box,
  Heading,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  Input,
  Grid,
  GridItem,
  Switch,
} from '@chakra-ui/react';
import Editor from 'components/editor/Editor';
import Preview from 'components/preview/Preview';
import { useLocation, useHistory } from 'react-router-dom';
// tiptap
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import useCreatePost from 'hooks/useCreatePost';

interface Props {
  classId: string;
}

interface Location {
  pathname: string;
}
const NewPost = ({ classId }: Props) => {
  const [type, setType] = useState('question');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [visibility, setVisibility] = useState('public');
  const location = useLocation<Location>();
  const history = useHistory();
  const createPostMutation = useCreatePost(
    classId,
    type,
    title,
    visibility,
    anonymous,
    content
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

  const handleCreate = () => {
    createPostMutation.mutate();
  };

  const handleCancel = () => {
    history.push(location.state.pathname);
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
        <RadioGroup onChange={setVisibility} value={visibility}>
          <Stack direction='row'>
            <Radio value='public'>Public</Radio>
            <Radio value='private'>Private</Radio>
          </Stack>
        </RadioGroup>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <HStack pb={5}>
          <FormLabel htmlFor='anonymous' mb='0'>
            Anonymous
          </FormLabel>
          <Switch id='anonymous' onChange={() => setAnonymous(!anonymous)} />
        </HStack>
        <Input
          id='title'
          placeholder='Enter a title'
          onChange={(e) => setTitle(e.target.value)}
        />
        <Grid mt={4} h='400px' templateColumns='repeat(2, 1fr)' gap={4}>
          <GridItem colSpan={1}>
            <Editor onChange={onContentUpdate} defaultContent={''} />
          </GridItem>
          <GridItem colSpan={1}>
            <Preview preview={preview} />
          </GridItem>
        </Grid>

        <Button onClick={handleCreate}>Create</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </Box>
    </Stack>
  );
};

export default NewPost;
