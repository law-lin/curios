import PostList from 'components/PostList';
import React, { useState } from 'react';
import { useParams, useHistory, Route } from 'react-router-dom';
import { Stack, Box, Heading, Text, Button } from '@chakra-ui/react';
import { Class, Post } from 'types';
import PostItem from './Post';
import NewPost from './NewPost';

interface Params {
  courseId: string;
  postId: string;
}

interface Props {
  posts: Post[];
  role: String;
}

function PostView({ posts, role }: Props) {
  const { courseId, postId } = useParams<Params>();
  const post = posts.find((post: Post) => post.id === parseInt(postId));
  return !post?.isArchived ? <PostItem post={post} role={role} /> : null;
}

export default PostView;
