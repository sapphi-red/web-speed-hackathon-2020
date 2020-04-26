import React from 'react';
import { SimpleImg } from 'react-simple-img';
import classNames from 'classnames';
import './ProportionalImage.css';

export function ProportionalImage({
  boxAspectRatio,
  roundedAsCardThumbnail,
  isLazy = true,
  ...imageProps
}) {
  return (
    <div
      className={classNames('foundation-ProportionalImage', {
        ['foundation-ProportionalImage--rounded-as-card-thumbnail']: roundedAsCardThumbnail,
      })}
      style={{ paddingTop: `calc(100% * ${boxAspectRatio})` }}
    >
      <div className={`foundation-ProportionalImage__inner ${isLazy ? 'lazy' : ''}`}>
        {isLazy ? (
          <SimpleImg
            className="foundation-ProportionalImage__img"
            {...imageProps}
          />
        ) : (
          <img className="foundation-ProportionalImage__img" {...imageProps} />
        )}
      </div>
    </div>
  );
}
