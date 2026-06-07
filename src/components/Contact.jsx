import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { LinkedinIcon, BehanceIcon, MailIcon } from './Icons';
import './Contact.css';

const MagneticButton = ({ children, className, href, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="contact-section">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="contact-wrapper glass"
        >
          <div className="contact-content">
            <h2 className="contact-title">Let’s build meaningful digital experiences together.</h2>
            <p className="contact-desc">
              I'm currently available for freelance projects and full-time opportunities. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <MagneticButton href="mailto:hello@example.com" className="btn btn-primary contact-btn">
              Say Hello <ArrowRight size={18} className="ml-2" />
            </MagneticButton>
          </div>
          
          <div className="contact-socials">
            <h3 className="socials-title">Connect with me</h3>
            <div className="social-links-grid">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:hello@example.com" className="social-pill">
                <MailIcon size={20} /> Email
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://www.linkedin.com/in/varunsuryavemula" target="_blank" rel="noreferrer" className="social-pill">
                <LinkedinIcon size={20} /> LinkedIn
              </motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://www.behance.net/varunsurya1" target="_blank" rel="noreferrer" className="social-pill">
                <BehanceIcon size={20} /> Behance
              </motion.a>
            </div>
          </div>
        </motion.div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Varun Surya Vemula. All rights reserved.</p>
          <p>Designed with passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
