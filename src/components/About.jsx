import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">
          About <span className="text-gradient">Me</span>
        </h2>
        
        <div className="about-grid">
          <div className="about-card glass animate-fade-up accessibility-badge-card" style={{ gridColumn: '1 / -1', borderLeft: '4px solid var(--primary-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '12px', borderRadius: '50%' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              </div>
              <div>
                <h3 className="card-title" style={{ marginBottom: '0.25rem' }}>Accessibility First Design</h3>
                <p className="card-desc" style={{ color: 'var(--text-secondary)' }}>
                  This portfolio is designed using accessibility, usability, and inclusive design principles following WCAG 2.2 AA standards.
                </p>
              </div>
            </div>
          </div>

          <div className="about-card glass animate-fade-up">
            <h3 className="card-title">Experience</h3>
            <p className="card-value">1+ Year</p>
            <p className="card-desc">UI/UX Design in professional environments</p>
          </div>
          
          <div className="about-card glass animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="card-title">Focus Areas</h3>
            <p className="card-desc">Healthcare & Enterprise Products</p>
          </div>
          
          <div className="about-card glass animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="card-title">Expertise</h3>
            <ul className="expertise-list">
              <li>UX Strategy & Research</li>
              <li>Wireframing & Prototyping</li>
              <li>Visual Design Systems</li>
            </ul>
          </div>
          
          <div className="about-card glass feature-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="card-title">My Philosophy</h3>
            <p className="card-desc">
              I have a deep passion for solving complex user problems with intuitive interfaces. 
              By blending analytical research with modern aesthetics, I strive to build products 
              that not only look beautiful but fundamentally improve how users interact with technology.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
