import { List, fromJS } from 'immutable';
import { ACTION_BLOG_LIST_FETCHED } from './blog_list_actions';

export function blogListReducer(state = List(), action) {
  switch (action.type) {
    case ACTION_BLOG_LIST_FETCHED: {
      return action.data.isInitial
        ? fromJS(action.data.blogs)
        : state.concat(action.data.blogs);
    }

    default: {
      return state;
    }
  }
}
