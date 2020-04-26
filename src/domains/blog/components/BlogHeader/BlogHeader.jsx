import React from 'react';
import { Link } from 'react-router-dom';
import './BlogHeader.css';

import { ProportionalImage } from '../../../../foundation/components/ProportionalImage';

export function BlogHeader({ blog }) {
  return (
    <header className="blog-BlogHeader">
      <div className="blog-BlogHeader__bg-image">
        <ProportionalImage src={`${blog.image}&w=800`} alt="" boxAspectRatio={9 / 16} importance="high" />
      </div>
      <div className="blog-BlogHeader__contents">
        <h1 className="blog-BlogHeader__title">
          <Link to={`/${blog.blog_id}`} className="blog-BlogHeader__title-link">
            {blog.nickname}
          </Link>
        </h1>
        <p className="blog-BlogHeader__intro">{blog.self_introduction}</p>
      </div>
    </header>
  );
}
