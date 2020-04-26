import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import './BlogHome.css';

import { renderNotFound } from '../../domains/error/error_actions';

import { fetchBlog } from '../../domains/blog/blog_actions';
import { BlogHeader } from '../../domains/blog/components/BlogHeader';

import { fetchEntryList } from '../../domains/entry_list/entry_list_actions';
import { EntryList } from '../../domains/entry_list/components/EntryList';

import { Main } from '../../foundation/components/Main';

const INITIAL_FETCH_LENGTH = 5;

export function BlogHome() {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => ({ ...state.blog }));
  const entryList = useSelector((state) => [...state.entryList]);
  const [hasHeaderFetchFinished, setHasHeaderFetchFinished] = useState(false);
  const [hasFetchFinished, setHasFetchFinished] = useState(false);

  useEffect(() => {
    setHasHeaderFetchFinished(false);
    setHasFetchFinished(false);

    (async () => {
      try {
        await fetchBlog({ dispatch, blogId });
      } catch {
        await renderNotFound({ dispatch });
      }

      setHasHeaderFetchFinished(true);
    })();
    (async () => {
      try {
        await fetchEntryList({
          dispatch,
          blogId,
          limit: INITIAL_FETCH_LENGTH,
          isInitial: true,
        });
      } catch {
        await renderNotFound({ dispatch });
      }

      setHasFetchFinished(true);
    })();
  }, [dispatch, blogId]);

  const [hasMore, setHasMore] = useState(true);
  const fetchNext = async () => {
    const data = await fetchEntryList({
      dispatch,
      blogId,
      offset: entryList.length,
    });
    if (!data.hasMore) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    // 初回取得後に縦幅足りない用
    window.dispatchEvent(new Event('scroll'));
  });

  return (
    <>
      <Helmet>
        {hasHeaderFetchFinished ? (
          <title>{blog.nickname} - Amida Blog: あみぶろ</title>
        ) : (
          <title>Amida Blog: あみぶろ</title>
        )}
      </Helmet>
      <div className="BlogHome">
        <BlogHeader blog={blog} />

        <Main>
          <section className="BlogHome__entry-list">
            <h2 className="BlogHome__entry-list-title">記事一覧</h2>
            {hasFetchFinished ? (
              <EntryList
                blogId={blogId}
                list={entryList}
                fetchNext={fetchNext}
                hasMore={hasMore}
              />
            ) : (
              <div>Loading...</div>
            )}
          </section>
        </Main>
      </div>
    </>
  );
}
