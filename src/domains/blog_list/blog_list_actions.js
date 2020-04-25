import { fetch } from '../../foundation/gateway';

export const ACTION_BLOG_LIST_FETCHED = 'BLOG_LIST_FETCHED';

export async function fetchBlogList({ dispatch, limit = 30, offset }) {
  const blogs = await fetch(`/api/blogs`, {
    limit,
    offset,
  });

  dispatch({
    type: ACTION_BLOG_LIST_FETCHED,
    data: {
      blogs,
    },
  });

  return {
    hasMore: blogs.length !== 0,
  };
}
