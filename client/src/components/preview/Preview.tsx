import React, { Dispatch, SetStateAction } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
// import './styles.scss';

interface Props {
  content: string;
}
const Preview = ({ content }: Props) => {
  console.log('Preview', content);
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
    editable: false,
  });

  return <EditorContent editor={editor} />;
};

export default Preview;
