import React from 'react';
import ReactList from 'react-list';
import { Box, Heading, Text } from '@chakra-ui/react';
import { matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';
import Preview from './preview/Preview';
import './post.css';
import { Post } from 'types';
import { useUser } from 'providers/AuthProvider';
import usePostsViewed from 'hooks/usePostsViewed';

interface Props {
  courseId: string;
  posts: Post[];
  handleClick: (post: Post) => void;
  isArchived: boolean;
}
const PostList = ({ courseId, posts, handleClick, isArchived }: Props) => {
  const location = useLocation();
  const { user } = useUser();
  const { data: postsViewedData, isLoading: postsViewedIsLoading } =
    usePostsViewed(courseId, undefined, user!.id);

  const PostCard = (index, key, handleClick) => {
    const isActive = !!matchPath(
      location.pathname,
      `/c/${courseId}/p/${posts[index].id}`
    );

    const showArchivedPosts = isArchived && posts[index].isArchived;
    const showPosts = !isArchived && !posts[index].isArchived;

    if (showPosts || (showArchivedPosts && !postsViewedIsLoading)) {
      const viewed = postsViewedData?.filter(
        (d) => d.post_id === posts[index].id
      );
      console.log(viewed);

      return (
        <div
          className={`post-card ${isActive ? 'active' : ''} ${
            viewed !== undefined && viewed.length === 0 && !isActive
              ? 'unread'
              : ''
          }`}
          key={key}
          onClick={() => handleClick(posts[index])}
        >
          <div style={{ float: 'right' }}>{posts[index].date}</div>
          <div style={{ marginRight: '75px' }}>
            <Heading
              size='sm'
              whiteSpace='nowrap'
              overflow='hidden'
              textOverflow='ellipsis'
            >
              {posts[index].title}
            </Heading>

            <Text
              maxH={12}
              fontSize={11}
              overflow='hidden'
              textOverflow='ellipsis'
            >
              <div dangerouslySetInnerHTML={{ __html: posts[index].content }} />
              {/* <Preview content={posts[index].content} /> */}
            </Text>
          </div>
        </div>
      );
    }
  };

  return (
    <Box maxH='78vh' overflow='auto'>
      <ReactList
        itemRenderer={(index, key) => PostCard(index, key, handleClick)}
        length={posts.length}
        type='uniform'
      />
    </Box>
  );
};

export default PostList;
