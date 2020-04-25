import React from 'react';
import { SimpleImg } from 'react-simple-img';
import classNames from 'classnames';

export function ProportionalImage({
  boxAspectRatio,
  roundedAsCardThumbnail,
  ...imageProps
}) {
  return (
    <div
      className={classNames('foundation-ProportionalImage', {
        ['foundation-ProportionalImage--rounded-as-card-thumbnail']: roundedAsCardThumbnail,
      })}
      style={{ paddingTop: `calc(100% * ${boxAspectRatio})` }}
    >
      <div className="foundation-ProportionalImage__inner">
        <SimpleImg className="foundation-ProportionalImage__img lozad" {...imageProps} />
      </div>
    </div>
  );
}
