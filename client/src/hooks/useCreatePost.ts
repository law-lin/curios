import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const createPost = async (
  classId: string,
  type: string,
  title: string,
  visibility: string,
  isAnonymous: boolean,
  content: string,
  userId: string
) => {
  const { data, error } = await supabase.from('posts').insert({
    class_id: classId,
    created_by: userId,
    visibility,
    is_anonymous: isAnonymous,
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
  visibility: string,
  isAnonymous: boolean,
  content: string
) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  return useMutation(
    () =>
      createPost(
        classId,
        type,
        title,
        visibility,
        isAnonymous,
        content,
        user?.id ?? ''
      ),
    {
      onSuccess: () => {
        queryClient.refetchQueries('posts');
      },
    }
  );
}
