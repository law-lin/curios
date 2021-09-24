import React, { Dispatch, SetStateAction } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Button, Flex } from '@chakra-ui/react';

import Icons from '../../assets/icons';

import './styles.scss';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Flex flexWrap='wrap'>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}      >
        <Icons.BoldIcon /> 
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icons.ItalicIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Icons.StrikethoughIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Icons.CodeIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Icons.ParagraphIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Icons.HeadingOneIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Icons.HeadingTwoIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icons.BulletListIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icons.OrderedListIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Icons.CodeBlockIcon />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Icons.BlockquoteIcon />
      </Button>
      <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Icons.HorizontalRuleIcon />
      </Button>
      <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
        <Icons.HardBreakIcon />
      </Button>
      <Button onClick={() => editor.chain().focus().undo().run()}><Icons.UndoIcon /></Button>
      <Button onClick={() => editor.chain().focus().redo().run()}><Icons.RedoIcon /></Button>
    </Flex>
  );
};

interface Props {
  onChange: (newContent: string) => void;
}

const Editor = ({ onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: `Write your post here`,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
