import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Entrance = React.lazy(() => import('../pages/entrance'));
const BlogHome = React.lazy(() => import('../pages/blog_home'));
const Entry = React.lazy(() => import('../pages/entry'));
const NotFound = React.lazy(() => import('../pages/not_found'));

export function Routes() {
  const error = useSelector((state) => ({ ...state.error }));

  if (error.error !== undefined) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    );
  }

  return (
    <Switch>
      <Route exact path="/">
        <Suspense fallback={<div>Loading...</div>}>
          <Entrance />
        </Suspense>
      </Route>
      <Route exact path="/:blogId">
        <Suspense fallback={<div>Loading...</div>}>
          <BlogHome />
        </Suspense>
      </Route>
      <Route exact path="/:blogId/entry/:entryId">
        <Suspense fallback={<div>Loading...</div>}>
          <Entry />
        </Suspense>
      </Route>
      <Route path="*">
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      </Route>
    </Switch>
  );
}
