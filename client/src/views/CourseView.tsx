import React, { useState, useEffect } from 'react';
import {
  useHistory,
  useParams,
  useRouteMatch,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import MessagesView from 'views/MessagesView';
import SearchView from 'views/SearchView';
import PostsView from './PostsView';
import { Class } from 'types';

interface Params {
  courseId: string;
}

interface Props {
  classes: Class[];
  match?: any;
}

function CourseView({ classes, match }: Props) {
  const { courseId } = useParams<Params>();
  const { url } = useRouteMatch();

  const classItem = classes.find(
    (classes) => classes.id === parseInt(courseId)
  );

  if (!classItem) {
    return <div>No such class exists!</div>;
  }
  return (
    <Switch>
      <Route exact path={'/c/settings'} component={MessagesView} />
      <Route exact path={'/c/search'} component={SearchView} />
      <Route
        path={'/c/:courseId/:postId'}
        render={() => <PostsView classItem={classItem as Class} />}
      />
      <Route
        path={'/c/:courseId/p'}
        render={() => <PostsView classItem={classItem as Class} />}
      />

      <Route
        path={'/c/:courseId'}
        render={() => <Redirect to={`/c/${courseId}/p`} />}
      />
    </Switch>
  );
}

export default CourseView;
