import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AccessibilityStatement = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px', maxWidth: '800px' }}>
      <Link to="/" className="btn btn-secondary" style={{ display: 'inline-flex', marginBottom: '2rem' }}>
        <ArrowLeft size={18} className="mr-2" style={{ marginRight: '8px' }} /> Back to Home
      </Link>
      
      <div className="glass animate-fade-up" style={{ padding: '3rem', borderRadius: '16px' }}>
        <h1 className="section-title" style={{ textAlign: 'left', marginBottom: '1rem', fontSize: '2.5rem' }}>
          Accessibility <span className="text-gradient">Statement</span>
        </h1>
        
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
          I am committed to ensuring digital accessibility for people with disabilities. 
          I am continually improving the user experience for everyone, and applying the relevant accessibility standards.
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Conformance Status</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers 
            to improve accessibility for people with disabilities. It defines three levels of conformance: 
            Level A, Level AA, and Level AAA. This portfolio is fully conformant with <strong>WCAG 2.2 level AA</strong>.
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} />
              100% Lighthouse Accessibility Score
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} />
              Full Screen Reader Compatibility (ARIA roles & semantics)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              <CheckCircle size={18} color="var(--primary-color)" style={{ marginRight: '10px' }} />
              Comprehensive Keyboard Navigation (Logical tab order)
            </li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Inclusive Design Philosophy</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Accessibility is not an afterthought—it is a core foundation of my design process. 
            I believe that designing for edge cases results in a better, more usable product for everyone.
            The dedicated accessibility panel allows users to tailor the experience to their specific needs, 
            whether they require larger text, high contrast, reduced motion, or dyslexia-friendly typography.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Keyboard Accessibility Support</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            This website can be navigated entirely using a keyboard.
          </p>
          <ul style={{ marginTop: '1rem', color: 'var(--text-secondary)', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
            <li><strong>Tab:</strong> Navigate forward through interactive elements.</li>
            <li><strong>Shift + Tab:</strong> Navigate backward through interactive elements.</li>
            <li><strong>Enter / Space:</strong> Activate buttons or links.</li>
            <li><strong>Escape:</strong> Close modals (like the Accessibility Panel).</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Feedback & Contact</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            I welcome your feedback on the accessibility of this portfolio. Please let me know if you encounter 
            accessibility barriers:
          </p>
          <a href="mailto:hello@example.com" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
            Contact me via Email
          </a>
        </section>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
