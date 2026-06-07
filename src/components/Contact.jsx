import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LinkedinIcon, BehanceIcon, MailIcon } from './Icons';
import './Contact.css';

const Contact = () => {
  return (
    <footer id="contact" className="contact-section">
      <div className="container">
        <div className="contact-wrapper glass animate-fade-up">
          <div className="contact-content">
            <h2 className="contact-title">Let’s build meaningful digital experiences together.</h2>
            <p className="contact-desc">
              I'm currently available for freelance projects and full-time opportunities. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a href="mailto:hello@example.com" className="btn btn-primary contact-btn">
              Say Hello <ArrowRight size={18} className="ml-2" />
            </a>
          </div>
          
          <div className="contact-socials">
            <h3 className="socials-title">Connect with me</h3>
            <div className="social-links-grid">
              <a href="mailto:hello@example.com" className="social-pill">
                <MailIcon size={20} /> Email
              </a>
              <a href="https://www.linkedin.com/in/varunsuryavemula" target="_blank" rel="noreferrer" className="social-pill">
                <LinkedinIcon size={20} /> LinkedIn
              </a>
              <a href="https://www.behance.net/varunsurya1" target="_blank" rel="noreferrer" className="social-pill">
                <BehanceIcon size={20} /> Behance
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Varun Surya Vemula. All rights reserved.</p>
          <p>Designed with passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
