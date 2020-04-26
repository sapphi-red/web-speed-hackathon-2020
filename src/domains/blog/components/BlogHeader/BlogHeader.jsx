import React from 'react';
import { Link } from 'react-router-dom';
import './BlogHeader.css';

import { ProportionalImage } from '../../../../foundation/components/ProportionalImage';

export function BlogHeader({ blog }) {
  return (
    <header className="blog-BlogHeader">
      {blog ? (
        <div className="blog-BlogHeader__bg-image">
          <ProportionalImage
            src={`${blog.image}&w=800&q=50`}
            alt=""
            isLazy={false}
            boxAspectRatio={9 / 16}
            importance="high"
          />
        </div>
      ) : (
        ''
      )}
      <div className="blog-BlogHeader__contents">
        <h1 className="blog-BlogHeader__title">
          {blog ? (
            <Link
              to={`/${blog.blog_id}`}
              className="blog-BlogHeader__title-link"
            >
              {blog.nickname}
            </Link>
          ) : (
            <div className="blog-BlogHeader__title-link">Loading...</div>
          )}
        </h1>
        <p className="blog-BlogHeader__intro">
          {blog ? blog.self_introduction : 'Loading...'}
        </p>
      </div>
    </header>
  );
}
