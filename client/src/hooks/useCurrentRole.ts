import { useQuery } from 'react-query';
import supabase from '../lib/supabase';

const fetchCurrentRole = async (userId: string, classId: string) => {
  const { data, error } = await supabase 
    .from('users_classes')
    .select('role')
    .eq('user_id', userId)
    .eq('class_id', classId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useCurrentRole(classId: string) {
	const user = supabase.auth.user();
  return useQuery('users_classes', () => fetchCurrentRole(user?.id ?? '', classId));
}
