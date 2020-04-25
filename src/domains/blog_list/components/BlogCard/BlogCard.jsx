import React from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

import { ProportionalImage } from '../../../../foundation/components/ProportionalImage';

export function BlogCard({ blog }) {
  return (
    <Link className="blog-list-BlogCard" to={`/${blog.blog_id}`}>
      <div className="blog-list-BlogCard__thumbnail">
        <ProportionalImage
          src={`${blog.image}&w=600`}
          alt=""
          boxAspectRatio={9 / 16}
          roundedAsCardThumbnail
        />
      </div>
      <p className="blog-list-BlogCard__title">{blog.nickname}</p>
    </Link>
  );
}
