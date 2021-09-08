import React, { Dispatch, SetStateAction } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
// import './styles.scss';

interface Props {
  preview: any;
}
const Preview = ({ preview }: Props) => {
  return <EditorContent editor={preview} />;
};

export default Preview;
