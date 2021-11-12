import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const createAnswer = async (
  createdBy,
  postId,
  type,
  isAnonymous,
  upvotes,
  content
) => {
  const { data, error } = await supabase.from('answers').insert([
    {
      created_by: createdBy,
      post_id: postId,
      type: type,
      is_anonymous: isAnonymous,
      upvotes: upvotes,
      content: content,
    },
  ]);

  if (error) throw error;

  return data;
};

export default function useCreateAnswer(
  postId: number,
  type: string,
  isAnonymous: boolean,
  upvotes: string,
  content: string
) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();

  return useMutation(
    () =>
      createAnswer(user?.id ?? '', postId, type, isAnonymous, upvotes, content),
    {
      onSuccess: () => {
        queryClient.refetchQueries('answers');
      },
    }
  );
}
