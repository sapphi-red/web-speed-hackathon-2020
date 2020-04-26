import React from 'react';
import { Link } from 'react-router-dom';
import { UTCISOtoLocalISO, format } from '../../../date';
import './EntryHeader.css';

export function EntryHeader({ title, publishedAt, location }) {
  return (
    <div className="entry-EntryHeader">
      <h2 className="entry-EntryHeader__title">
        <Link to={location.pathname} className="entry-EntryHeader__title-link">
          {title}
        </Link>
      </h2>
      <time
        className="entry-EntryHeader__published-at"
        dateTime={UTCISOtoLocalISO(publishedAt)}
        title={UTCISOtoLocalISO(publishedAt)}
      >
        {format(publishedAt)}
      </time>
    </div>
  );
}
