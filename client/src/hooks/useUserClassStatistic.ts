import { useQuery } from 'react-query';
import supabase from '../lib/supabase';

const fetchUserClassStatistic = async (
  type: string,
  userId: string,
  classId: string
) => {
  const { data, error } = await supabase
    .from('users_classes')
    .select(type)
    .eq('user_id', userId)
    .eq('class_id', classId);
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useUserClassStatistic(
  type: string,
  userId: string,
  classId: string
) {
  return useQuery(`${type}-${userId}`, () =>
    fetchUserClassStatistic(type, userId, classId)
  );
}
