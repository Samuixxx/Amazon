import { useState, useEffect } from 'react';
import Spawn from './index';

import logo from '../../assets/logo.png';
import './Header.scss';

import Langmenu from '../langmenu/Langmenu';
import nations from '../../utils/nations';

function Header() {
  const [langMenuState, setLangMenuState] = useState(false)

  const toggleLangmenu = () => {
    setLangMenuState(prev => !prev)
  };

  Spawn(langMenuState, '.lang-options')

  return (
    <header>
      <img src={logo} alt="Logo" className="homepage_logo" />
      <h1 className="homepage_title">ShopHub</h1>
      <nav className="homepage_nav">
        <div className="lang_container">
          <button className="lang_button" onClick={toggleLangmenu}>🌍</button>
          <Langmenu nations={nations} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
