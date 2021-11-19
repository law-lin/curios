import React, { Dispatch, SetStateAction } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Button, Flex, Spacer } from '@chakra-ui/react';

import Icons from '../../assets/icons';

import './styles.scss';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <Flex flexWrap='wrap'>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('bold') ? true : false}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Icons.BoldIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('italic') ? true : false}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Icons.ItalicIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('strike') ? true : false}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Icons.StrikethoughIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('code') ? true : false}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Icons.CodeIcon />
      </Button>
      {/* <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('paragraph') ? true : false}
        onClick={() => editor.chain().focus().setParagraph().run()}
      >
        <Icons.ParagraphIcon />
      </Button> */}
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('heading', { level: 1 }) ? true : false}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Icons.HeadingOneIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('heading', { level: 2 }) ? true : false}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Icons.HeadingTwoIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('bulletList') ? true : false}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <Icons.BulletListIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('orderedList') ? true : false}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <Icons.OrderedListIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('codeBlock') ? true : false}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Icons.CodeBlockIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        isActive={editor.isActive('blockquote') ? true : false}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Icons.BlockquoteIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Icons.HorizontalRuleIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        <Icons.HardBreakIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Icons.UndoIcon />
      </Button>
      <Button
        size='sm'
        margin='1px'
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Icons.RedoIcon />
      </Button>
    </Flex>
  );
};

interface Props {
  onChange: (newContent: string) => void;
  defaultContent: string;
}

const Editor = ({ onChange, defaultContent }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: defaultContent,
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
