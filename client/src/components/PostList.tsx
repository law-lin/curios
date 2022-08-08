import React from 'react';
import ReactList from 'react-list';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';
import Preview from './preview/Preview';
import './post.css';
import { Post } from 'types';
import { useUser } from 'providers/AuthProvider';
import usePostsViewed from 'hooks/usePostsViewed';
import moment from 'moment';

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
      const unread = viewed !== undefined && viewed.length === 0 && !isActive;
      const createdAt = new Date(posts[index].createdAt);
      const createdAtFormatted = moment(createdAt).format('M/DD/YY');

      return (
        <div
          className={`post-card ${isActive ? 'active' : ''} ${
            unread ? 'unread' : ''
          }`}
          key={key}
          onClick={() => handleClick(posts[index])}
        >
          <div style={{ float: 'right' }}>
            <VStack align='flex-end'>
              <div>{createdAtFormatted}</div>
              {/*for unanswered posts <div>{unread ? <WarningIcon /> : null}</div> */}
            </VStack>
          </div>
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
