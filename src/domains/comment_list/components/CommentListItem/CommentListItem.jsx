import React from 'react';
import { Link } from 'react-router-dom';
import { UTCISOtoLocalISO, fromNow } from '../../../date';
import './CommentListItem.css';

import { ProportionalImage } from '../../../../foundation/components/ProportionalImage';

export function CommentListItem({ comment }) {
  // var(--comment-CommentListItem-avatar-size)
  return (
    <article
      id={`comment-${comment.comment_id}`}
      className="comment-CommentListItem"
    >
      <div className="comment-CommentListItem__avatar">
        <ProportionalImage src={`${comment.commenter.image}?w=50`} boxAspectRatio={1} />
      </div>
      <div className="comment-CommentListItem__body">
        <h3 className="comment-CommentListItem__commenter">
          {comment.commenter.user_name}
        </h3>
        <p className="comment-CommentListItem__comment">{comment.comment}</p>
        <footer className="comment-CommentListItem__footer">
          <Link to={`#comment-${comment.comment_id}`}>
            <time
              dateTime={UTCISOtoLocalISO(comment.posted_at)}
              title={UTCISOtoLocalISO(comment.posted_at)}
            >
              {fromNow(comment.posted_at)}
            </time>
          </Link>
        </footer>
      </div>
    </article>
  );
}
