import React, { useEffect, useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

const ReadingGuide = () => {
  const { preferences } = useAccessibility();
  const [mouseY, setMouseY] = useState(-100); // Start off-screen

  useEffect(() => {
    if (!preferences.adhdMode) return;

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMouseY(e.clientY);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [preferences.adhdMode]);

  if (!preferences.adhdMode) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: mouseY - 30, // center the bar slightly above mouse
        height: '80px',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderTop: '2px solid var(--primary-color, #3b82f6)',
        borderBottom: '2px solid var(--primary-color, #3b82f6)',
        pointerEvents: 'none',
        zIndex: 9998,
        backdropFilter: 'brightness(1.5)',
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)' // Dim the rest of the screen
      }}
      aria-hidden="true"
    />
  );
};

export default ReadingGuide;
