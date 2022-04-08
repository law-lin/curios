import { useQuery } from 'react-query';
import toCamelCase from 'utils/toCamelCase';
import supabase from '../lib/supabase';

const fetchUser = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select(
      `
      *
    `
    )
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return toCamelCase(data);
};

export default function useUser(userId: string) {
  return useQuery('user', () => fetchUser(userId));
}
