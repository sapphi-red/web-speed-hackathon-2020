import { ACTION_BLOG_LIST_FETCHED } from './blog_list_actions';

export function blogListReducer(state = [], action) {
  switch (action.type) {
    case ACTION_BLOG_LIST_FETCHED: {
      return action.data.isInitial
        ? [...action.data.blogs]
        : state.concat(action.data.blogs);
    }

    default: {
      return state;
    }
  }
}
