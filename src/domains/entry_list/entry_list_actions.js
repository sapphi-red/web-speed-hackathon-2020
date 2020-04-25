import { fetch } from '../../foundation/gateway';

export const ACTION_ENTRY_LIST_FETCHED = 'ENTRY_LIST_FETCHED';

export async function fetchEntryList({ dispatch, blogId, limit = 30, offset }) {
  const entries = (
    await fetch(`/api/blog/${blogId}/entries`, {
      limit,
      offset,
    })
  ).map((entry) => {
    if (entry.thumbnail) {
      entry.thumbnail = `https://images.weserv.nl/?url=${entry.thumbnail}`;
    }
    return entry;
  });

  dispatch({
    type: ACTION_ENTRY_LIST_FETCHED,
    data: {
      entries,
    },
  });

  return {
    hasMore: entries.length !== 0,
  };
}
