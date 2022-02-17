import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const createPost = async (
  classId: string,
  type: string,
  title: string,
  visibility: string,
  archived: boolean,
  content: string,
  userId: string
) => {
  const { data, error } = await supabase.from('posts').insert({
    class_id: classId,
    created_by: userId,
    visibility,
    type,
    title,
    content,
    archived
  });

  if (error) {
    throw error;
  }

  return data;
};

export default function useCreatePost(
  classId: string,
  type: string,
  title: string,
  archived: boolean,
  visibility: string,
  content: string
) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  return useMutation(
    () => createPost(classId, type, title, visibility, archived, content, user?.id ?? ''),
    {
      onSuccess: () => {
        queryClient.refetchQueries('posts');
      },
    }
  );
}
