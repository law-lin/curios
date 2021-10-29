import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';
import { Answer } from '../types';

const updateAnswer = async (answer: Answer) => {
  const { userID, postID, type, isAnonymous, upvotes, content } = answer;

  const { data, error } = await supabase
    .from('answers')
    .update({
      content: content,
    })
    .match({
      created_by: userID,
      post_id: postID,
      type: type,
      is_anonymous: isAnonymous,
      upvotes: upvotes,
    });

  if (error) throw error;

  return data;
};

export default function useUpdateAnswer(
  postID: string,
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

  return useMutation(() => updateAnswer(answer), {
    onSuccess: () => {
      queryClient.refetchQueries('answers');
    },
  });
}
