import { useQuery } from 'react-query';
import supabase from '../lib/supabase';

const fetchAnswers = async (postId: string) => {
  const { data, error } = await supabase
    .from('answers')
    .select('*')
    .eq('post_id', postId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useAnswers(postId: string) {
  return useQuery('answers', () => fetchAnswers(postId));
}
