import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.work'), href: '#work' },
    { name: t('nav.process'), href: '#process' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="logo-link">
          <img src="/logo.svg" alt="VSV Logo" className="navbar-logo" />
        </a>
        
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <LanguageSwitcher />
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <div className="nav-mobile-toggle">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: '1rem' }}>
            <LanguageSwitcher />
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="nav-mobile-menu glass">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link-mobile"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
