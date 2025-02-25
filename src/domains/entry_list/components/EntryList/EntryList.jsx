import React from 'react';
import { Link } from 'react-router-dom';
import { UTCISOtoLocalISO, format } from '../../../date';
import './EntryList.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { ProportionalImage } from '../../../../foundation/components/ProportionalImage';

export function EntryList({ blogId, list, fetchNext, hasMore }) {
  const filteredList = list.filter((entry) => entry.publish_flag === 'open')

  return (
    <ul className="entry-list-EntryList">
      <InfiniteScroll
        dataLength={filteredList.length}
        next={fetchNext}
        hasMore={hasMore}
      >
        {filteredList
          .map((entry, i) => {
            return (
              <li key={i} className="entry-list-EntryList__entry">
                <Link
                  to={`/${blogId}/entry/${entry.entry_id}`}
                  className="entry-list-EntryList__entry-inner"
                >
                  <div className="entry-list-EntryList__thumbnail">
                    <ProportionalImage
                      src={`${entry.thumbnail}&w=120`}
                      alt=""
                      boxAspectRatio={9 / 16}
                    />
                  </div>
                  <div className="entry-list-EntryList__text">
                    <time
                      className="entry-list-EntryList__published-at"
                      dateTime={UTCISOtoLocalISO(entry.published_at)}
                      title={UTCISOtoLocalISO(entry.published_at)}
                    >
                      {format(entry.published_at)}
                    </time>
                    <p className="entry-list-EntryList__title">{entry.title}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </InfiniteScroll>
    </ul>
  );
}
