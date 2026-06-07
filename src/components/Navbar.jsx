import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../context/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [hoveredLink, setHoveredLink] = useState(null);
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
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}
    >
      <div className="container nav-container">
        <a href="#" className="logo-link">
          <img src="/logo.svg" alt="VSV Logo" className="navbar-logo" />
        </a>
        
        <div className="nav-links-desktop" onMouseLeave={() => setHoveredLink(null)}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link"
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredLink(link.name)}
            >
              {link.name}
              {hoveredLink === link.name && (
                <motion.div
                  layoutId="navHover"
                  className="nav-hover-bg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    position: 'absolute',
                    inset: '-4px -8px',
                    background: 'var(--border-color)',
                    borderRadius: '8px',
                    zIndex: -1
                  }}
                />
              )}
            </a>
          ))}
          <LanguageSwitcher />
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} 
            className="theme-toggle" 
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </motion.button>
        </div>

        <div className="nav-mobile-toggle">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: '1rem' }}>
            <LanguageSwitcher />
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme} 
              className="theme-toggle" 
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
          </div>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="nav-mobile-menu glass"
            style={{ overflow: 'hidden' }}
          >
            {navLinks.map((link, i) => (
              <motion.a 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={link.name} 
                href={link.href} 
                className="nav-link-mobile"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
