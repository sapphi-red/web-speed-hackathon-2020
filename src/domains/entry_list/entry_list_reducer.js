import { List, fromJS } from 'immutable';
import { ACTION_ENTRY_LIST_FETCHED } from './entry_list_actions';

export function entryListReducer(state = List(), action) {
  switch (action.type) {
    case ACTION_ENTRY_LIST_FETCHED: {
      return action.data.isInitial
        ? fromJS(action.data.entries)
        : state.concat(action.data.entries);
    }

    default: {
      return state;
    }
  }
}
