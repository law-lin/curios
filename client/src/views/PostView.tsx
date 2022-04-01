import React  from 'react';
import { useParams } from 'react-router-dom';
import { Post } from 'types';
import PostItem from './Post';

interface Params {
  courseId: string;
  postId: string;
}

interface Props {
  posts: Post[];
  role: String;
}

function PostView({ posts, role }: Props) {
  const { postId } = useParams<Params>();
  const post = posts.find((post: Post) => post.id === parseInt(postId));
  return post ? <PostItem post={post} role={role} /> : null;
}

export default PostView;
