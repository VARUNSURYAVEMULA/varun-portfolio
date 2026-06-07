import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
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

  const ctaVariants = {
    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.6 }
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <motion.div
          className="glow glow-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        ></motion.div>
        <motion.div
          className="glow glow-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        ></motion.div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants} className="hero-greeting text-gradient">
            Hello, I'm
          </motion.span>
          <motion.h1 variants={itemVariants} className="hero-name">
            Varun Surya Vemula
          </motion.h1>
          <motion.h2 variants={itemVariants} className="hero-role">
            UI/UX Designer
          </motion.h2>

          <motion.p variants={itemVariants} className="hero-tagline">
            Crafting intuitive, accessible, and beautiful digital experiences.
          </motion.p>

          <motion.div variants={ctaVariants} initial="hidden" animate="visible" className="hero-ctas">
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#work" className="btn btn-primary">
              View My Work <ArrowRight size={18} className="ml-2" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="/resume.pdf" className="btn btn-secondary">
              Download Resume <Download size={18} className="ml-2" />
            </motion.a>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-socials">
            <motion.a whileHover={{ y: -3 }} href="https://www.linkedin.com/in/varunsuryavemula" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link">
              <LinkedinIcon size={20} /> LinkedIn
            </motion.a>
            <motion.a whileHover={{ y: -3 }} href="https://www.behance.net/varunsurya1" target="_blank" rel="noreferrer" aria-label="Behance" className="social-link">
              <BehanceIcon size={20} /> Behance
            </motion.a>
            <motion.a whileHover={{ y: -3 }} href="mailto:hello@example.com" aria-label="Email" className="social-link">
              <MailIcon size={20} /> Email
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
