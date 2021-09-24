import { useQuery } from 'react-query';
import toCamelCase from 'utils/toCamelCase';
import supabase from '../lib/supabase';

const fetchPosts = async (classId: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('class_id', classId);

  if (error) {
    throw new Error(error.message);
  }

  return toCamelCase(data);
};

export default function usePosts(classId: string) {
  return useQuery('posts', () => fetchPosts(classId));
}
