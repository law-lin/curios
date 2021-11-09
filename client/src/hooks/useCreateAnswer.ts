import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';
import { Answer } from '../types';

const createAnswer = async (answer: Answer) => {
  const { userID, postID, type, isAnonymous, upvotes, content } = answer;

  const { data, error } = await supabase.from('answers').insert([
    {
      created_by: userID,
      post_id: postID,
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
  postID: number,
  type: string,
  isAnonymous: boolean,
  upvotes: string,
  content: string
) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  const answer: Answer = {
    userID: user?.id ?? '',
    postID: postID,
    type: type,
    isAnonymous: isAnonymous,
    upvotes: upvotes,
    content: content,
  };

  return useMutation(() => createAnswer(answer), {
    onSuccess: () => {
      queryClient.refetchQueries('answers');
    },
  });
}
