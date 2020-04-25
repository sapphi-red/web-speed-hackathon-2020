import React, { useEffect } from 'react';
import { addScript } from '../../addScript';

const TWITTER_SDK = 'https://platform.twitter.com/widgets.js';

export function TwitterShareButton() {
  useEffect(() => {
    const script$ = addScript({
      src: TWITTER_SDK
    })

    return () => {
      script$.remove();
    };
  }, []);

  return (
    <div className="entry-TwitterShareButton">
      <a
        className="twitter-share-button"
        href="https://twitter.com/intent/tweet"
      >
        Tweet
      </a>
    </div>
  );
}
