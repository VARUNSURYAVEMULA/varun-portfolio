import React from 'react';
import { Sparkles, HeartPulse, Compass, Layers } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-wrapper">
          <div className="about-content animate-fade-up">
            <span className="about-label">ABOUT</span>
            <h2 className="about-title">
              I design calm, <br />
              <span className="text-gradient">human-first</span> <br />
              products.
            </h2>
            <p className="about-desc">
              I'm Varun — a product designer focused on healthcare and enterprise software. I believe interfaces should reduce the cognitive load of complex work, not add to it. I work closely with engineers, clinicians and operators to ship things that actually get used.
            </p>
          </div>

          <div className="about-features-grid">
            <div className="about-feature-card glass animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="feature-icon-wrapper">
                <Sparkles size={24} />
              </div>
              <h3 className="feature-title">1.5+ year shipping product</h3>
              <p className="feature-desc">End-to-end UI/UX across healthcare, enterprise dashboards and mobile apps.</p>
            </div>

            <div className="about-feature-card glass animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="feature-icon-wrapper">
                <HeartPulse size={24} />
              </div>
              <h3 className="feature-title">Healthcare specialist</h3>
              <p className="feature-desc">Radiology, kidney health, claims and hospital operations — designed with clinicians, not for them.</p>
            </div>

            <div className="about-feature-card glass animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <div className="feature-icon-wrapper">
                <Compass size={24} />
              </div>
              <h3 className="feature-title">Strategy → Visuals</h3>
              <p className="feature-desc">UX strategy, IA, wireframes, prototypes and pixel-precise visual design.</p>
            </div>

            <div className="about-feature-card glass animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <div className="feature-icon-wrapper">
                <Layers size={24} />
              </div>
              <h3 className="feature-title">Design systems</h3>
              <p className="feature-desc">Reusable, themeable component libraries that scale with engineering teams.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
