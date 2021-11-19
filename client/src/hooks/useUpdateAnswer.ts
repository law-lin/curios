import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';
import { Answer } from '../types';

const updateAnswer = async (answer: Answer) => {
  const { id, createdBy, postId, type, isAnonymous, upvotes, content } = answer;

  const { data, error } = await supabase
    .from('answers')
    .update({
      content: content,
    })
    .match({
      id: id,
      created_by: createdBy,
      post_id: postId,
      type: type,
      is_anonymous: isAnonymous,
      upvotes: upvotes,
    });

  if (error) throw error;

  return data;
};

export default function useUpdateAnswer(
  id: number,
  postId: number,
  type: string,
  isAnonymous: boolean,
  upvotes: string,
  content: string
) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  const answer: Answer = {
    id: id,
    createdBy: user?.id ?? '',
    postId: postId,
    type: type,
    isAnonymous: isAnonymous,
    upvotes: upvotes,
    content: content,
  };

  return useMutation(() => updateAnswer(answer), {
    onSuccess: () => {
      queryClient.refetchQueries('answers');
    },
  });
}
