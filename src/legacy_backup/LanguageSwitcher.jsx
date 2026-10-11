import React from 'react';
import { useTranslation } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <select 
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        aria-label="Select Language"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'var(--text-primary, #fff)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '0.4rem 0.5rem',
          borderRadius: '6px',
          outline: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: '0.875rem'
        }}
      >
        <option value="en" style={{ background: '#1a1a2e', color: '#fff' }}>🇺🇸 EN</option>
        <option value="es" style={{ background: '#1a1a2e', color: '#fff' }}>🇪🇸 ES</option>
        <option value="fr" style={{ background: '#1a1a2e', color: '#fff' }}>🇫🇷 FR</option>
        <option value="de" style={{ background: '#1a1a2e', color: '#fff' }}>🇩🇪 DE</option>
        <option value="hi" style={{ background: '#1a1a2e', color: '#fff' }}>🇮🇳 HI</option>
        <option value="te" style={{ background: '#1a1a2e', color: '#fff' }}>🇮🇳 TE</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
