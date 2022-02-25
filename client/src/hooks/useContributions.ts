import { useQuery } from 'react-query';
import supabase from '../lib/supabase';

const fetchContributions = async (userId: string, classId: string) => {
  const { data, error } = await supabase
    .from('users_classes')
    .select('contributions')
    .eq('user_id', userId)
    .eq('class_id', classId);
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useContributions(userId: string, classId: string) {
  return useQuery(`contributions-${userId}`, () =>
    fetchContributions(userId, classId)
  );
}
