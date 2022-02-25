import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const updateContributions = async (userId, classId, contributions) => {
  const { data, error } = await supabase
    .from('users_classes')
    .update({
      contributions: contributions,
    })
    .match({
      user_id: userId,
      class_id: classId,
    });

  if (error) throw error;

  return data;
};

export default function useUpdateContributions(classId, contributions) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();

  return useMutation(
    () => updateContributions(user!.id, classId, contributions),
    {
      onSuccess: () => {
        queryClient.refetchQueries(`contributions-${user!.id}`);
      },
    }
  );
}
