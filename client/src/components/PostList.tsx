import React from 'react';
import ReactList from 'react-list';
import { Box, Heading, Text } from '@chakra-ui/react';
import { matchPath } from 'react-router';
import { useLocation } from 'react-router-dom';

import './post.css';

const PostList = ({ courseId, posts, handleClick }) => {
  const location = useLocation();
  console.log('RERENDER');
  const PostCard = (index, key, handleClick) => {
    const isActive = !!matchPath(
      location.pathname,
      `/c/${courseId}/p/${posts[index].id}`
    );

    return (
      <div
        className={`post-card ${isActive ? 'active' : ''}`}
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
          </Text>
        </div>
      </div>
    );
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
