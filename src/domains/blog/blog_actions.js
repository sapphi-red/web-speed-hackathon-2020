import { fetch } from '../../foundation/gateway';

export const ACTION_BLOG_FETCHED = 'BLOG_FETCHED';

export async function fetchBlog({ dispatch, blogId }) {
  const blog = await fetch(`/api/blog/${blogId}`);
  if (blog.image) {
    blog.image = `https://images.weserv.nl/?url=${blog.image}&output=webp`;
  }

  dispatch({
    type: ACTION_BLOG_FETCHED,
    data: {
      blog,
    },
  });
}
