import { List } from 'immutable';
import { ACTION_BLOG_LIST_FETCHED } from './blog_list_actions';

export function blogListReducer(state = List(), action) {
  switch (action.type) {
    case ACTION_BLOG_LIST_FETCHED: {
      return state.concat(action.data.blogs);
    }

    default: {
      return state;
    }
  }
}
