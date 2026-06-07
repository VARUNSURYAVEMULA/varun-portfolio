import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <Router>
        <div className="app-wrapper">
          <a href="#main-content" className="skip-to-content">Skip to Main Content</a>
          <ReadingGuide />
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/case-study/:id" element={<CaseStudyDetail />} />
              <Route path="/accessibility" element={<AccessibilityStatement />} />
            </Routes>
          </main>
          <AccessibilityPanel />
        </div>
        </Router>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}

export default App;
