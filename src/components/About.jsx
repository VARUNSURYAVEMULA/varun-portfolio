import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartPulse, Compass, Layers } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-wrapper">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="about-label">ABOUT</span>
            <h2 className="about-title">
              I design calm,<br/>
              <span className="text-gradient">human-first</span> products.
            </h2>
            <p className="about-desc">
              I'm Varun — a product designer focused on healthcare and enterprise software. 
              I believe interfaces should reduce the cognitive load of complex work, not add to it. 
              I work closely with engineers, clinicians and operators to ship things that 
              actually get used.
            </p>
          </motion.div>
          
          <div className="about-features-grid">
            <motion.div 
              className="about-feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="feature-icon-wrapper">
                <Sparkles size={20} className="feature-icon" />
              </div>
              <h3 className="feature-title">1+ year shipping product</h3>
              <p className="feature-desc">End-to-end UI/UX across healthcare, enterprise dashboards and mobile apps.</p>
            </motion.div>

            <motion.div 
              className="about-feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="feature-icon-wrapper">
                <HeartPulse size={20} className="feature-icon" />
              </div>
              <h3 className="feature-title">Healthcare specialist</h3>
              <p className="feature-desc">Radiology, kidney health, claims and hospital operations — designed with clinicians, not for them.</p>
            </motion.div>

            <motion.div 
              className="about-feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="feature-icon-wrapper">
                <Compass size={20} className="feature-icon" />
              </div>
              <h3 className="feature-title">Strategy → Visuals</h3>
              <p className="feature-desc">UX strategy, IA, wireframes, prototypes and pixel-precise visual design.</p>
            </motion.div>

            <motion.div 
              className="about-feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="feature-icon-wrapper">
                <Layers size={20} className="feature-icon" />
              </div>
              <h3 className="feature-title">Design systems</h3>
              <p className="feature-desc">Reusable, themeable component libraries that scale with engineering teams.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
