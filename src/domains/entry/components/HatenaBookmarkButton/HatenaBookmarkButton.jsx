import React, { useEffect } from 'react';
import { addScript } from '../../addScript';

const HATENA_SDK = 'https://b.st-hatena.com/js/bookmark_button.js';

export function HatenaBookmarkButton({ location }) {
  let script$, id;
  if (!globalThis.Hatena?.Bookmark?.BookmarkButton?.setup) {
    id = requestIdleCallback(() => {
      script$ = addScript({
        src: HATENA_SDK
      })
    })
  }

  useEffect(() => {
    if (globalThis.Hatena?.Bookmark?.BookmarkButton?.setup) {
      globalThis.Hatena.Bookmark.BookmarkButton.setup();
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
    <div className="entry-HatenaBookmarkButton">
      <a
        href="https://b.hatena.ne.jp/entry/"
        className="hatena-bookmark-button"
        data-hatena-bookmark-layout="basic-label-counter"
        data-hatena-bookmark-lang="ja"
        title="このエントリーをはてなブックマークに追加"
      >
        <img
          src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
          alt="このエントリーをはてなブックマークに追加"
          width="20"
          height="20"
          style={{ border: 'none' }}
        />
      </a>
    </div>
  );
}
