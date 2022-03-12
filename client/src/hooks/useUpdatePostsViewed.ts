import { useMutation, useQueryClient } from 'react-query';
import supabase from '../lib/supabase';

const updatePostsViewed = async (
  userId: string,
  postId: string,
  classId: string
) => {
  const { data, error } = await supabase.from('users_posts').upsert(
    {
      user_id: userId,
      post_id: postId,
      class_id: classId,
      viewed: true,
    },
    { ignoreDuplicates: true }
  );

  if (error) throw error;

  return data;
};

export default function useUpdatePostsViewed(
  userId: string,
  postId: string,
  classId: string
) {
  return updatePostsViewed(userId, postId, classId);
}
