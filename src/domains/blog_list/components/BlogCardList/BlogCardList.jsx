import React from 'react';
import { chunk } from './chunk';
import './BlogCardList.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { BlogCard } from '../BlogCard';

export function BlogCardList({ list, columnCount, fetchNext, hasMore }) {
  const rows = chunk(list, columnCount);

  const items = rows.map((rowItems, i) => (
    <div key={i} className="blog-list-BlogCardList__row">
      {rowItems.map((item, j) => (
        <div
          key={j}
          className="blog-list-BlogCardList__column"
          style={{ width: `calc(100% / ${columnCount})` }}
        >
          <BlogCard blog={item} />
        </div>
      ))}
    </div>
  ));

  return (
    <div className="blog-list-BlogCardList">
      {fetchNext ? (
        <InfiniteScroll
          dataLength={list.length}
          next={fetchNext}
          hasMore={hasMore}
        >
          {items}
        </InfiniteScroll>
      ) : (
        items
      )}
    </div>
  );
}
