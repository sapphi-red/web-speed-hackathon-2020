import React, { useEffect } from 'react';
import { addScript } from '../../addScript';

const TWITTER_SDK = 'https://platform.twitter.com/widgets.js';

export function TwitterShareButton() {
  let script$, id;
  if (!globalThis?.twttr?.widgets?.load) {
    id = requestIdleCallback(() => {
      script$ = addScript({
        src: TWITTER_SDK
      })
    })
  }

  useEffect(() => {
    if (globalThis?.twttr?.widgets?.load) {
      globalThis?.twttr?.widgets?.load();
      return
    }

    return () => {
      script$?.remove();
      if (id !== undefined) {
        cancelIdleCallback(id);
      }
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
