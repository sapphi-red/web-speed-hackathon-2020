import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import './Entry.css';

import { Main } from '../../foundation/components/Main';

import { renderNotFound } from '../../domains/error/error_actions';

import { fetchBlog } from '../../domains/blog/blog_actions';
import { BlogHeader } from '../../domains/blog/components/BlogHeader';

import { fetchEntry, likeEntry } from '../../domains/entry/entry_actions';
import { EntryHeader } from '../../domains/entry/components/EntryHeader/EntryHeader';
import { EntryView } from '../../domains/entry/components/EntryView';
import { EntryFooter } from '../../domains/entry/components/EntryFooter';

import { fetchCommentList } from '../../domains/comment_list/comment_list_actions';
import { CommentList } from '../../domains/comment_list/components/CommentList';

export function Entry() {
  const location = useLocation();
  const { blogId, entryId } = useParams();
  const dispatch = useDispatch();
  const blog = useSelector((state) => ({ ...state.blog }));
  const entry = useSelector((state) => ({ ...state.entry }));
  const commentList = useSelector((state) => [...state.commentList]);
  const [hasHeaderFetchFinished, setHasHeaderFetchFinished] = useState(false);
  const [hasFetchFinished, setHasFetchFinished] = useState(false);
  const [hasCommentFetchFinished, setHasCommentFetchFinished] = useState(false);

  useEffect(() => {
    setHasHeaderFetchFinished(false);
    setHasFetchFinished(false);
    setHasCommentFetchFinished(false);

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
        await fetchEntry({ dispatch, blogId, entryId });
      } catch {
        await renderNotFound({ dispatch });
      }

      setHasFetchFinished(true);
    })();
    (async () => {
      try {
        await fetchCommentList({ dispatch, blogId, entryId });
      } catch {}

      setHasCommentFetchFinished(true);
    })();
  }, [dispatch, blogId, entryId]);

  return (
    <>
      <Helmet>
        <title>
          {hasHeaderFetchFinished && hasFetchFinished
            ? `${entry.title} - ${blog.nickname} - `
            : ''}
          {'Amida Blog: あみぶろ'}
        </title>
      </Helmet>
      <div className="Entry">
        <BlogHeader blog={hasFetchFinished ? blog : undefined} />

        <Main>
          <article className="Entry__contents">
            {hasFetchFinished ? (
              <>
                <header className="Entry__header">
                  <EntryHeader
                    title={entry.title}
                    location={location}
                    publishedAt={entry.published_at}
                  />
                </header>
                <section>
                  <EntryView items={entry.items} />
                </section>
                <footer className="Entry__footer">
                  <EntryFooter
                    likeCount={entry.like_count}
                    location={location}
                    publishedAt={entry.published_at}
                    onClickLike={() => likeEntry({ dispatch, blogId, entryId })}
                  />
                </footer>
              </>
            ) : (
              <div>Loading...</div>
            )}
          </article>
          <article className="Entry__comment-list">
            <header className="Entry__comment-list-header">
              <h2>コメント一覧</h2>
            </header>
            {hasCommentFetchFinished ? (
              <CommentList list={commentList} />
            ) : (
              <div>Loading...</div>
            )}
          </article>
        </Main>
      </div>
    </>
  );
}
