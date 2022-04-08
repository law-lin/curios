import { useQuery } from 'react-query';
import supabase from '../lib/supabase';

const fetchPostsViewed = async (classId: string, postId?: string) => {
  if (typeof postId !== 'undefined') {
    const { data, error } = await supabase
      .from('users_posts')
      .select('user_id, post_id, viewed')
      .eq('post_id', postId);
    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  const { data, error } = await supabase
    .from('users_posts')
    .select('user_id, post_id')
    .eq('class_id', classId)
    .order('user_id');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function usePostsViewed(classId: string, postId?: string) {
  return useQuery(
    `posts-viewed-${typeof postId !== 'undefined' ? postId : classId}`,
    () => fetchPostsViewed(classId, postId)
  );
}
