import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

const defaultPreferences = {
  fontSizeLevel: 0, // 0 = default, can go positive or negative
  textSpacing: false,
  lineHeight: false,
  dyslexiaFriendly: false,
  adhdMode: false,
  saturation: false, // true = grayscale or low saturation
  lightDark: false, // true = high contrast / light dark
  invertColors: false,
  highlightLinks: false,
  textToSpeech: false,
  bigCursor: false,
  pauseAnimation: false,
  hideImages: false,
};

export const AccessibilityProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('a11y-preferences-v2');
      if (saved) {
        return { ...defaultPreferences, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not read accessibility preferences from local storage");
    }
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return { ...defaultPreferences, pauseAnimation: prefersReducedMotion };
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value !== undefined ? value : !prev[key]
    }));
  };

  const changeFontSize = (amount) => {
    setPreferences(prev => ({
      ...prev,
      fontSizeLevel: Math.max(-2, Math.min(3, prev.fontSizeLevel + amount))
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  useEffect(() => {
    localStorage.setItem('a11y-preferences-v2', JSON.stringify(preferences));

    const root = document.documentElement;
    root.dataset.a11yFontSize = preferences.fontSizeLevel;
    root.dataset.a11yTextSpacing = preferences.textSpacing;
    root.dataset.a11yLineHeight = preferences.lineHeight;
    root.dataset.a11yDyslexiaFriendly = preferences.dyslexiaFriendly;
    root.dataset.a11yAdhdMode = preferences.adhdMode;
    root.dataset.a11ySaturation = preferences.saturation;
    root.dataset.a11yLightDark = preferences.lightDark;
    root.dataset.a11yInvertColors = preferences.invertColors;
    root.dataset.a11yHighlightLinks = preferences.highlightLinks;
    root.dataset.a11yBigCursor = preferences.bigCursor;
    root.dataset.a11yPauseAnimation = preferences.pauseAnimation;
    root.dataset.a11yHideImages = preferences.hideImages;
    root.dataset.a11yTextToSpeech = preferences.textToSpeech;
    
  }, [preferences]);

  return (
    <AccessibilityContext.Provider value={{ preferences, updatePreference, changeFontSize, resetPreferences }}>
      {children}
    </AccessibilityContext.Provider>
  );
};
