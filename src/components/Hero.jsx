import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LinkedinIcon, BehanceIcon, MailIcon } from './Icons';
import './Hero.css';

const Hero = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-bg-gradient"></div>
        <div className="hero-bg-dots"></div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-dot"></span>
            AVAILABLE FOR SELECT WORK &middot; HYDERABAD, INDIA
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-name">
            Varun Surya <br />
            <span className="text-gradient">Vemula</span>
          </motion.h1>

          <div className="hero-bottom-section">
            <div className="hero-text-block">
              <motion.p variants={itemVariants} className="hero-tagline">
                Designing intuitive digital experiences for healthcare<br />
                and enterprise platforms.
              </motion.p>
              <motion.p variants={itemVariants} className="hero-roles">
                UI/UX DESIGNER &middot; PRODUCT DESIGNER
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="hero-ctas">
              <a href="#work" className="btn-hero-primary">
                View Projects &nbsp;&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-hero-secondary">
                Download Resume
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="container hero-footer">
        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a href="https://www.linkedin.com/in/varunsuryavemula" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-pill">
            <LinkedinIcon size={16} /> LinkedIn
          </a>
          <a href="https://www.behance.net/varunsurya1" target="_blank" rel="noreferrer" aria-label="Behance" className="social-pill">
            <BehanceIcon size={16} /> Behance
          </a>
          <a href="mailto:hello@example.com" aria-label="Email" className="social-pill">
            <MailIcon size={16} /> Email
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
