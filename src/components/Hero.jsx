import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { LinkedinIcon, BehanceIcon, MailIcon } from './Icons';
import { useTranslation } from '../context/LanguageContext';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
      </div>

      <div className="container hero-container animate-fade-up">
        <div className="hero-content">
          <span className="hero-greeting text-gradient">{t('hero.greeting')}</span>
          <h1 className="hero-name">{t('hero.name')}</h1>
          <h2 className="hero-role">{t('hero.role')}</h2>

          <p className="hero-tagline">
            {t('hero.tagline')}
          </p>

          <div className="hero-ctas">
            <a href="#work" className="btn btn-primary">
              {t('hero.viewProjects')} <ArrowRight size={18} className="ml-2" />
            </a>
            <a href="/resume.pdf" className="btn btn-secondary">
              {t('hero.downloadResume')} <Download size={18} className="ml-2" />
            </a>
          </div>

          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/varunsuryavemula" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link">
              <LinkedinIcon size={20} /> LinkedIn
            </a>
            <a href="https://www.behance.net/varunsurya1" target="_blank" rel="noreferrer" aria-label="Behance" className="social-link">
              <BehanceIcon size={20} /> Behance
            </a>
            <a href="mailto:hello@example.com" aria-label="Email" className="social-link">
              <MailIcon size={20} /> Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
