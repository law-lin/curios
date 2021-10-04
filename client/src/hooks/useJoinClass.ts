import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const joinClass = async (classId: string, userId: string) => {
  const { error } = await supabase.from('users_classes').insert({
    user_id: userId,
    class_id: classId,
    role: 'student',
  });

  if (error) {
    throw error;
  }
};

export default function useJoinClass(classId: string) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  return useMutation(() => joinClass(classId, user?.id ?? ''), {
    onSuccess: () => {
      queryClient.refetchQueries('classes');
    },
  });
}
