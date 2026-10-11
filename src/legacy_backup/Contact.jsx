import React from 'react';
import { motion } from 'framer-motion';
import { LinkedinIcon, BehanceIcon, MailIcon } from './Icons';
import './Contact.css';

const Contact = () => {
  return (
    <footer id="contact" className="contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="contact-wrapper"
        >
          <div className="contact-badge">GET IN TOUCH</div>

          <h2 className="contact-title">
            Let's build <span className="contact-highlight">meaningful</span><br />
            digital experiences together.
          </h2>

          <p className="contact-desc">
            I'm currently open to product design roles and select freelance collaborations in healthcare<br />
            and enterprise. Drop a note — I read every email.
          </p>

          <div className="contact-actions">
            <a href="mailto:hello@varunsurya.design" className="contact-btn-primary">
              <MailIcon size={18} className="btn-icon" /> ux.varunsurya@gmail.com
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2" style={{ transform: 'rotate(-45deg)' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>

            <a href="https://www.linkedin.com/in/varunsuryavemula" target="_blank" rel="noreferrer" className="contact-btn-secondary">
              <LinkedinIcon size={18} className="btn-icon" /> LinkedIn
            </a>

            <a href="https://www.behance.net/varunsurya1" target="_blank" rel="noreferrer" className="contact-btn-secondary">
              <BehanceIcon size={18} className="btn-icon" /> Behance
            </a>
          </div>
        </motion.div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; 2026 Varun Surya Vemula. Design &amp; code by Varun.
          </div>
          <div className="footer-links">
            <a href="mailto:hello@varunsurya.design">Email</a>
            <a href="https://www.linkedin.com/in/varunsuryavemula" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.behance.net/varunsurya1" target="_blank" rel="noreferrer">Behance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
