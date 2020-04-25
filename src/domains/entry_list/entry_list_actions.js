import { fetch } from '../../foundation/gateway';

export const ACTION_ENTRY_LIST_FETCHED = 'ENTRY_LIST_FETCHED';

export async function fetchEntryList({
  dispatch,
  blogId,
  limit = 30,
  offset,
  isInitial,
}) {
  const entries = (
    await fetch(`/api/blog/${blogId}/entries`, {
      limit,
      offset,
    })
  ).map((entry) => {
    if (entry.thumbnail) {
      entry.thumbnail = `https://images.weserv.nl/?url=${entry.thumbnail}&output=webp`;
    }
    return entry;
  });

  dispatch({
    type: ACTION_ENTRY_LIST_FETCHED,
    data: {
      entries,
      isInitial,
    },
  });

  return {
    hasMore: entries.length !== 0,
  };
}
