import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';
import { Answer } from '../types';

const deleteAnswer = async (id, createdBy, postId) => {
  const { data, error } = await supabase.from('answers').delete().match({
    id: id,
    created_by: createdBy,
    post_id: postId,
  });

  console.log(data);

  if (error) throw error;

  return data;
};

export default function useDeleteAnswer(id: number, postId: number) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();

  return useMutation(() => deleteAnswer(id, user?.id ?? '', postId), {
    onSuccess: () => {
      queryClient.refetchQueries('answers');
    },
  });
}
