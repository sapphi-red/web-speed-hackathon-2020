import React, { useEffect } from 'react';
import { addScript } from '../../addScript';

const FACEBOOK_SDK =
  'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';

export function FacebookShareButton() {
  let script$, id;
  if (!('FB' in globalThis)) {
    id = requestIdleCallback(() => {
      script$ = addScript({
        crossorigin: 'anonymous',
        src: FACEBOOK_SDK
      })
    })
  }

  useEffect(() => {
    if ('FB' in globalThis) {
      globalThis.FB.XFBML.parse();
      return;
    }

    return () => {
      script$?.remove();
      if (id !== undefined) {
        cancelIdleCallback(id);
      }
    };
  }, []);

  return (
    <div className="entry-FacebookShareButton">
      <div id="fb-root" />
      <div
        className="fb-like"
        data-href={globalThis.location.href}
        data-width=""
        data-layout="button_count"
        data-action="like"
        data-size="small"
        data-share="false"
      ></div>
    </div>
  );
}
