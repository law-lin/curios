import { useQuery } from 'react-query';
import supabase from '../lib/supabase';

const fetchAnswers = async (postId: string, type: string) => {
  const { data, error } = await supabase
    .from('answers')
    .select('*')
    .eq('post_id', postId)
    .eq('type', type);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useAnswers(postId: string, type: string) {
  return useQuery(`answers-${type}`, () => fetchAnswers(postId, type));
}
