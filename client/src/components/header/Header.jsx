import { useState, useEffect } from 'react';
import gsap from 'gsap';

import logo from '../../assets/logo.png';
import './Header.scss';

import Langmenu from '../langmenu/Langmenu';
import nations from '../../utils/nations';

function Header() {
  const [langMenuState, setLangMenuState] = useState(false);

  const toggleLangmenu = () => {
    setLangMenuState(prev => !prev);
  };

  useEffect(() => {
    if (langMenuState) {
      gsap.fromTo(
        '.lang-options',
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          display: 'block',
        }
      );
    } else {
      gsap.to('.lang-options', {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          const menu = document.querySelector('.lang-options');
          if (menu) menu.style.display = 'none';
        },
      });
    }
  }, [langMenuState]);

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
