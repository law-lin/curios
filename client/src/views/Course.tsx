import React, { useState } from 'react';
import PostList, { Post } from 'components/PostList';
import { useHistory, useParams } from 'react-router-dom';
import { Stack, Box, Heading, Text, Button } from '@chakra-ui/react';
import { Class } from 'types';
import PostItem from './Post';
import NewPost from './NewPost';

interface Params {
  courseId: string;
  postId?: string;
}

const courses = [
  {
    id: '1',
    title: 'Systems Fundamentals I',
    number: 'CSE 220',
    term: 'Fall 2021',
  },
  {
    id: '2',
    title: 'Systems Fundamentals II',
    number: 'CSE 320',
    term: 'Fall 2021',
  },
  {
    id: '3',
    title: 'Analysis of Algorithms',
    number: 'CSE/MAT 373',
    term: 'Fall 2021',
  },
];

const posts = [
  {
    number: '1',
    title: 'My program crashes. I need help!!!',
    details:
      'I have no idea what to do!!! I have no idea what to do!!! I have no idea what to do!!!',
    date: '5/24/21',
  },
  {
    number: '2',
    title: 'office hours?',
    details: 'Are there office hours today?',
    date: '5/24/21',
  },
  {
    number: '3',
    title: 'Impact of server.c on grade',
    details:
      "If our implementation of server.c isn't perfect, but the other models are implemented satisfactorily, is it better to submit with or without the server module implementation?",
    date: '5/23/21',
  },
  {
    number: '4',
    title: 'Can we modify the terminate() function in main?',
    details:
      'So, I can call pthread_exit in order to make sure there are no hanging threads so valgrind is clean.',
    date: '5/24/21',
  },
  {
    number: '5',
    title: 'Gitlab Runner Error',
    details:
      'Gitlab is again having the issue where it has no runners available!',
    date: '5/24/21',
  },
  {
    number: '6',
    title: 'Pipeline failed',
    details:
      'For each time I submit homework, since yesterday, it always said pipeline failed, what should I do?',
    date: '5/24/21',
  },
  {
    number: '7',
    title: 'Gitlab pipeline cancelled',
    details:
      "Im trying to submit my latest commit to gitlab, it automatically cancels the job. And even if i try to re run it, it just stays in the 'pending' state .  I've changed the .gitlab-ci.yml and tried it, it still gets cancelled as soon as I submit.",
    date: '5/24/21',
  },
  {
    number: '8',
    title: 'Send_ack and send_nack issue?',
    details:
      'For some reason, on valgrind, getting this issue on my client.c, basically any time I send an ACK or NACK',
    date: '5/24/21',
  },
  {
    number: '10',
    title: 'office hours?',
    details: 'I have no idea what to do!!! I have no idea what to do!!!',
    date: '5/24/21',
  },
  {
    number: '11',
    title: 'office hours?',
    details: 'I have no idea what to do!!! I have no idea what to do!!!',
    date: '5/24/21',
  },
  {
    number: '12',
    title: 'office hours?',
    details: 'I have no idea what to do!!! I have no idea what to do!!!',
    date: '5/24/21',
  },
  {
    number: '13',
    title: 'office hours?',
    details: 'I have no idea what to do!!! I have no idea what to do!!!',
    date: '5/24/21',
  },
];

interface Props {
  classes: Class[];
}
function Course({ classes }: Props) {
  const { courseId, postId } = useParams<Params>();
  const history = useHistory();
  const [showNewPost, setShowNewPost] = useState(false);

  const classItem = classes.find(
    (classes) => classes.id === parseInt(courseId)
  );
  const post = posts.find((post) => post.number === postId);

  console.log(postId);
  console.log(post);

  if (!classItem) {
    return <div>No such class exists!</div>;
  }
  return (
    <>
      <aside
        style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: 'rgba(120,127,133,0.12) 1px solid',
          // margin: '24px 16px',
          // padding: 24,
        }}
      >
        <Box p={5}>
          <Heading size='lg'>{classItem.classNumber}</Heading>
          <Heading size='sm'>{classItem.className}</Heading>
          <Heading size='sm'>{classItem.classTerm}</Heading>
          <Box d='flex' paddingTop='6' justifyContent='space-evenly'>
            <Button onClick={() => setShowNewPost(true)}>Add Post</Button>
            <Button onClick={() => history.replace(`/c/${courseId}/settings`)}>Settings</Button>
          </Box>
        </Box>

        <PostList
          courseId={courseId}
          posts={posts}
          handleClick={(post: Post) =>
            history.replace(`/c/${courseId}/${post.number}`)
          }
        />
      </aside>
      <Box flex={1}>{showNewPost ? <NewPost /> : <PostItem post={post} />}</Box>
    </>
  );
}

export default Course;
