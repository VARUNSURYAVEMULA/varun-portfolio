import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CaseStudyDetail from './components/CaseStudyDetail';
import AccessibilityStatement from './components/AccessibilityStatement';
import AccessibilityPanel from './components/AccessibilityPanel';
import ReadingGuide from './components/ReadingGuide';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { LanguageProvider } from './context/LanguageContext';
import './styles/accessibility.css';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            <Home />
          </motion.div>
        } />
        <Route path="/case-study/:id" element={
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            <CaseStudyDetail />
          </motion.div>
        } />
        <Route path="/accessibility" element={
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
            <AccessibilityStatement />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimal loading experience
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <Router>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loader"
                className="loader-container"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', zIndex: 9999 }}
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary-color)' }}
                />
              </motion.div>
            ) : (
              <div className="app-wrapper" key="app">
                <a href="#main-content" className="skip-to-content">Skip to Main Content</a>
                <ReadingGuide />
                <Navbar />
                <main id="main-content">
                  <AnimatedRoutes />
                </main>
                <AccessibilityPanel />
              </div>
            )}
          </AnimatePresence>
        </Router>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
