import React, { Dispatch, SetStateAction } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { Button, Image } from '@chakra-ui/react';

import { ReactComponent as BoldSvg } from '../../assets/bold.svg';

import './styles.scss';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <BoldSvg /> 
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        code
      </Button>
      <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </Button>
      <Button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </Button>
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        paragraph
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        h2
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        h3
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        h4
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        h5
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        h6
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        bullet list
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        ordered list
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        code block
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        blockquote
      </Button>
      <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </Button>
      <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break
      </Button>
      <Button onClick={() => editor.chain().focus().undo().run()}>undo</Button>
      <Button onClick={() => editor.chain().focus().redo().run()}>redo</Button>
    </>
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
