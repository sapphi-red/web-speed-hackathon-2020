import React from 'react';
import { Link } from 'react-router-dom';
import './GlobalHeader.css';

export function GlobalHeader() {
  return (
    <header className="foundation-GlobalHeader">
      <Link to="/" className="foundation-GlobalHeader__link">
        <span className="foundation-GlobalHeader__en">Amida Blog:</span>
        <span className="foundation-GlobalHeader__ja">あみぶろ</span>
      </Link>
    </header>
  );
}
