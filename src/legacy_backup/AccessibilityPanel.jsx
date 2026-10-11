import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import './AccessibilityPanel.css';

const UniversalAccessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
    <path d="M2 12h20"></path>
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Grid Icons
const IconBiggerText = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7V4h16v3M12 4v16M8 20h8" />
  </svg>
);

const IconSmallerText = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7V4h16v3M12 4v16M8 20h8" />
  </svg>
);

const IconTextSpacing = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 16v-8l-4 8h8l-4-8z" />
    <path d="M2 18h20M5 21l-3-3 3-3M19 21l3-3-3-3" />
  </svg>
);

const IconLineHeight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20M1 5l3-3 3 3M1 19l3 3 3-3M10 6h12M10 12h12M10 18h12" />
  </svg>
);

const IconDyslexia = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 4v16M6 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm12-8v16m0-8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  </svg>
);

const IconAdhd = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M6 12l4-4 4 8 4-4" />
  </svg>
);

const IconSaturation = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const IconLightDark = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const IconInvert = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    <path d="M12 2.69v17.62" fill="currentColor" stroke="none" />
  </svg>
);

const IconLinks = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const IconTextToSpeech = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v16M8 8v8M16 8v8M4 11v2M20 11v2" />
  </svg>
);

const IconCursor = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M10 16l6-6-6-6v12z" />
  </svg>
);

const IconPause = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M10 15V9M14 15V9" />
  </svg>
);

const IconHideImages = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
    <line x1="3" y1="3" x2="21" y2="21" />
  </svg>
);


const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);
  const { preferences, updatePreference, changeFontSize, resetPreferences } = useAccessibility();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const togglePanel = () => setIsOpen(!isOpen);

  const GridButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button 
      className={`a11y-grid-btn ${isActive ? 'active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      <div className="a11y-grid-icon"><Icon /></div>
      <div className="a11y-grid-label">{label}</div>
    </button>
  );

  return (
    <>
      <button 
        className="a11y-floating-btn" 
        onClick={togglePanel}
        aria-label="Accessibility Options"
        aria-expanded={isOpen}
      >
        <UniversalAccessIcon />
      </button>

      {isOpen && (
        <div className="a11y-panel-overlay" onClick={() => setIsOpen(false)}>
          <div 
            className="a11y-panel" 
            ref={panelRef} 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-panel-title"
          >
            <div className="a11y-panel-header">
              <h2 id="a11y-panel-title">Accessibility Options</h2>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <button 
                  className="a11y-reset-btn" 
                  onClick={resetPreferences} 
                  aria-label="Reset Settings"
                  style={{ fontSize: '0.85rem', padding: '4px 10px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-primary)', transition: 'background 0.2s' }}
                >
                  Reset
                </button>
                <button className="a11y-close-btn" onClick={() => setIsOpen(false)} aria-label="Close">
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="a11y-panel-grid">
              <GridButton 
                icon={IconBiggerText} 
                label="Bigger Text" 
                onClick={() => changeFontSize(1)} 
              />
              <GridButton 
                icon={IconSmallerText} 
                label="Smaller Text" 
                onClick={() => changeFontSize(-1)} 
              />
              <GridButton 
                icon={IconTextSpacing} 
                label="Text Spacing" 
                isActive={preferences.textSpacing}
                onClick={() => updatePreference('textSpacing')} 
              />
              <GridButton 
                icon={IconLineHeight} 
                label="Line Height" 
                isActive={preferences.lineHeight}
                onClick={() => updatePreference('lineHeight')} 
              />
              <GridButton 
                icon={IconDyslexia} 
                label="Dyslexia Friendly" 
                isActive={preferences.dyslexiaFriendly}
                onClick={() => updatePreference('dyslexiaFriendly')} 
              />
              <GridButton 
                icon={IconAdhd} 
                label="ADHD Mode" 
                isActive={preferences.adhdMode}
                onClick={() => updatePreference('adhdMode')} 
              />
              <GridButton 
                icon={IconSaturation} 
                label="Saturation" 
                isActive={preferences.saturation}
                onClick={() => updatePreference('saturation')} 
              />
              <GridButton 
                icon={IconLightDark} 
                label="Light-Dark" 
                isActive={preferences.lightDark}
                onClick={() => updatePreference('lightDark')} 
              />
              <GridButton 
                icon={IconInvert} 
                label="Invert Colors" 
                isActive={preferences.invertColors}
                onClick={() => updatePreference('invertColors')} 
              />
              <GridButton 
                icon={IconLinks} 
                label="Highlight Links" 
                isActive={preferences.highlightLinks}
                onClick={() => updatePreference('highlightLinks')} 
              />
              <GridButton 
                icon={IconTextToSpeech} 
                label="Text To Speech" 
                isActive={preferences.textToSpeech}
                onClick={() => updatePreference('textToSpeech')} 
              />
              <GridButton 
                icon={IconCursor} 
                label="Cursor" 
                isActive={preferences.bigCursor}
                onClick={() => updatePreference('bigCursor')} 
              />
              <GridButton 
                icon={IconPause} 
                label="Pause Animation" 
                isActive={preferences.pauseAnimation}
                onClick={() => updatePreference('pauseAnimation')} 
              />
              <GridButton 
                icon={IconHideImages} 
                label="Hide Images" 
                isActive={preferences.hideImages}
                onClick={() => updatePreference('hideImages')} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPanel;
