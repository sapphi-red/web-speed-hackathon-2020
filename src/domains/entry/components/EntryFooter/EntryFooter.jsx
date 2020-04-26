import React from 'react';
import { Link } from 'react-router-dom';
import { UTCISOtoLocalISO, fromNow } from '../../../date';
import './EntryFooter.css';

import { AmidaLikeButton } from '../AmidaLikeButton';
import { TwitterShareButton } from '../TwitterShareButton';
import { FacebookShareButton } from '../FacebookShareButton';
import { HatenaBookmarkButton } from '../HatenaBookmarkButton';

export function EntryFooter({ location, likeCount, publishedAt, onClickLike }) {
  return (
    <div className="entry-EntryFooter">
      {publishedAt !== undefined ? (
        <Link
          to={location.pathname}
          className="entry-EntryFooter__published-at"
        >
          <time dateTime={UTCISOtoLocalISO(publishedAt)}>
            {fromNow(publishedAt)}
          </time>
        </Link>
      ) : (
        <time>XXXX-XX-XX</time>
      )}
      <div className="entry-EntryFooter__share">
        <div className="entry-EntryFooter__share-item">
          {likeCount !== undefined ? (
            <AmidaLikeButton likeCount={likeCount} onClick={onClickLike} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="entry-EntryFooter__share-item">
          <TwitterShareButton />
        </div>
        <div className="entry-EntryFooter__share-item">
          <FacebookShareButton />
        </div>
        <div className="entry-EntryFooter__share-item">
          <HatenaBookmarkButton />
        </div>
      </div>
    </div>
  );
}
