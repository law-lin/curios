import React, { Dispatch, SetStateAction } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
// import './styles.scss';

interface Props {
  preview?: any;
  content?: string;
}
const Preview = ({ preview, content }: Props) => {
  let previewEditor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
    editable: false,
  });

  return <EditorContent editor={preview ? preview : previewEditor} />;
};

export default Preview;
