import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helmet from 'react-helmet';
import { shuffle } from './shuffle';
import './Entrance.css';

import { renderNotFound } from '../../domains/error/error_actions';

import { fetchBlogList } from '../../domains/blog_list/blog_list_actions';
import { BlogCardList } from '../../domains/blog_list/components/BlogCardList';

import { Main } from '../../foundation/components/Main';
import { ProportionalImage } from '../../foundation/components/ProportionalImage';

import AmidaImage from '../../assets/amida.webp';
import Amida2Image from '../../assets/amida2.webp';

const PICKUP_LENGTH = 10;
const INITIAL_FETCH_LENGTH = 12;

export function Entrance() {
  const dispatch = useDispatch();
  const blogList = useSelector((state) => [...state.blogList]);
  const [pickups, setPickups] = useState([]);
  const [hasFetchFinished, setHasFetchFinished] = useState(false);
  const heroTextJaList = ['あみぶろ', '阿弥ぶろ', 'アミブロ'];
  const [heroTextJa, setHeroTextJa] = useState(heroTextJaList[0]);

  useEffect(() => {
    setHasFetchFinished(false);

    (async () => {
      try {
        await fetchBlogList({
          dispatch,
          limit: INITIAL_FETCH_LENGTH,
          isInitial: true,
        });
      } catch {
        await renderNotFound({ dispatch });
      }

      setHasFetchFinished(true);
    })();
  }, [dispatch]);

  const [hasMore, setHasMore] = useState(true);
  const fetchNext = async () => {
    const data = await fetchBlogList({ dispatch, offset: blogList.length });
    if (!data.hasMore) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    // 初回取得後に縦幅足りない用
    window.dispatchEvent(new Event('scroll'));
  });

  useEffect(() => {
    const timers = [];
    const displayDurationInTotal = 3000;
    const typingDurationInTotal = 800;

    const setText = () => {
      const text = heroTextJaList.shift();
      const length = text.length;
      const charInterval = typingDurationInTotal / length;

      setHeroTextJa('　'.repeat(length));

      for (let i = 1; i <= length; i++) {
        timers[i] = setTimeout(() => {
          setHeroTextJa(text.substring(0, i) + '　'.repeat(length - i));
        }, charInterval * i);
      }

      heroTextJaList.push(text);
    };

    setText();

    timers[0] = setInterval(() => setText(), displayDurationInTotal);

    return () => {
      clearInterval(timers[0]);
      timers.filter((_, i) => i !== 0).forEach((timer) => clearTimeout(timer));
    };
  }, []);

  if (pickups.length === 0 && blogList.length !== 0) {
    setPickups(shuffle(blogList.slice(0, PICKUP_LENGTH)).slice(0, 4));
  }

  return (
    <>
      <Helmet>
        <title>Amida Blog: あみぶろ</title>
      </Helmet>
      <div className="Entrance">
        <section className="Entrance__hero">
          <div className="Entrance__hero-bg">
            <ProportionalImage
              src={Amida2Image}
              alt=""
              boxAspectRatio={9 / 16}
            />
          </div>
          <div className="Entrance__hero-contents">
            <img src={AmidaImage} className="Entrance__hero-logo" alt="" />
            <p className="Entrance__hero-text">
              <span className="Entrance__hero-text-en">Amida Blog:</span>
              <span className="Entrance__hero-text-ja">{heroTextJa}</span>
            </p>
          </div>
        </section>

        <Main>
          <article className="Entrance__section Entrance__pickup">
            <h2 className="Entrance__title">Pickups</h2>
            {hasFetchFinished ? (
              <BlogCardList list={pickups} columnCount={4} />
            ) : (
              <div>Loading...</div>
            )}
          </article>
          <article className="Entrance__section Entrance__blog-list">
            <h2 className="Entrance__title">ブログ一覧</h2>
            {hasFetchFinished ? (
              <BlogCardList
                list={blogList}
                columnCount={4}
                fetchNext={fetchNext}
                hasMore={hasMore}
              />
            ) : (
              <div>Loading...</div>
            )}
          </article>
        </Main>
      </div>
    </>
  );
}
