import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const createPost = async (
  classId: string,
  type: string,
  title: string,
  content: string,
  userId: string
) => {
  const { data, error } = await supabase.from('posts').insert({
    class_id: classId,
    created_by: userId,
    type,
    title,
    content,
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
  content: string
) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  return useMutation(
    () => createPost(classId, type, title, content, user?.id ?? ''),
    {
      onSuccess: () => {
        queryClient.refetchQueries('posts');
      },
    }
  );
}
