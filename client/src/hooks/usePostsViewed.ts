import { useQuery } from 'react-query';
import supabase from '../lib/supabase';

const fetchPostsViewed = async (
  classId: string,
  postId?: string,
  userId?: string
) => {
  if (typeof postId !== 'undefined') {
    const { data, error } = await supabase
      .from('users_posts')
      .select('user_id, post_id')
      .eq('post_id', postId);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } else {
    // Given class and user
    if (typeof userId !== 'undefined') {
      const { data, error } = await supabase
        .from('users_posts')
        .select('user_id, post_id')
        .match({ user_id: userId, class_id: classId });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    }
  }

  const { data, error } = await supabase // Fetches posts viewed for a class
    .from('users_posts')
    .select('user_id, post_id')
    .eq('class_id', classId)
    .order('user_id');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function usePostsViewed(
  classId: string,
  postId?: string,
  userId?: string
) {
  return useQuery(
    `posts-viewed-${typeof userId !== 'undefined' ? userId + '-' : null}${
      typeof postId !== 'undefined' ? postId : classId
    }`,
    () => fetchPostsViewed(classId, postId, userId)
  );
}
