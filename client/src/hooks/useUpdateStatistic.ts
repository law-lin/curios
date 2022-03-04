import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const updateStatistic = async (type, userId, classId, value) => {
  let update = {};
  update[type] = value;
  const { data, error } = await supabase
    .from('users_classes')
    .update(update)
    .match({
      user_id: userId,
      class_id: classId,
    });

  if (error) throw error;

  return data;
};

export default function useUpdateStatistic(type, classId, value) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();

  return useMutation(() => updateStatistic(type, user!.id, classId, value), {
    onSuccess: () => {
      queryClient.refetchQueries(`${type}-${user!.id}`);
    },
  });
}
