import React, { useEffect } from 'react';
import { addScript } from '../../addScript';

const TWITTER_SDK = 'https://platform.twitter.com/widgets.js';

export function TwitterShareButton() {
  useEffect(() => {
    let script$
    const id = requestIdleCallback(() => {
      script$ = addScript({
        src: TWITTER_SDK
      })
    })

    return () => {
      script$?.remove();
      cancelIdleCallback(id)
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
