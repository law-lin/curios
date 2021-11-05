import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const inviteUser = async (classId: string, email: string, role: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('user_id')
    .eq('email', email);
  if (error) {
    throw error;
  }
  if (data && data.length > 0) {
    const { error: inviteError } = await supabase.from('users_classes').insert({
      user_id: data[0].user_id,
      class_id: classId,
      role,
    });

    if (inviteError) {
      throw inviteError;
    }
  }
};

export default function useInviteUser(classId: string) {
  const queryClient = useQueryClient();
  const user = supabase.auth.user();
  return useMutation(({ email, role }: { email: string; role: string }) =>
    inviteUser(classId, email, role)
  );
}
