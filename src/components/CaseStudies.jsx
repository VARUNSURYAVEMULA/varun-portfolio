import React from 'react';

import { ArrowRight } from 'lucide-react';
import demoVideo from '../assets/demo.mp4';
import Radflow from '../assets/Radflow.mp4';
import './CaseStudies.css';

export const caseStudies = [
  {
    id: 1,
    title: 'Blood Donation App - Life Line',
    category: 'Healthcare UI',
    externalLink: 'https://www.behance.net/gallery/209200287/Blood-Donation-Mobile-App-%28LIFE-LINE%29',
    video: demoVideo,
    description: 'A life-saving mobile platform connecting blood donors with recipients in real-time during emergencies.',
    tags: ['UX Research', 'Mobile App', 'Visual Design'],

  },
  {
    id: 2,
    title: 'RadFlow Mobile App',
    category: 'Healthcare UI',
    externalLink: 'https://www.behance.net/gallery/255953035/RadFlow',
    video: Radflow,
    description: 'A comprehensive application streamlining radiologist workflows, improving diagnosis speed, and enhancing patient data visualization.',
    tags: ['Healthcare', 'Mobile App', 'Wireframes'],

  },

  {
    id: 3,
    title: 'PropertyWorld',
    category: 'Real Estate Platform',
    description: 'An elegant property browsing and listing platform with advanced filtering and virtual tour capabilities.',
    tags: ['UX Strategy', 'Web App', 'Prototyping'],

  },
  {
    id: 4,
    title: 'Claim & Fraud Analysis Dashboard',
    category: 'Enterprise SaaS',
    description: 'A complex data visualization dashboard for identifying patterns in insurance claims and detecting fraudulent activities.',
    tags: ['Dashboard', 'Data Viz', 'Enterprise'],

  }
];

import { motion } from 'framer-motion';
import { video } from 'framer-motion/client';

const CaseStudies = () => {
  return (
    <section id="work" className="case-studies-section">
      <div className="container">
        <motion.div
          className="case-studies-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-left">
            <span className="featured-label">FEATURED WORK</span>
            <h2 className="section-title-large">Selected case studies.</h2>
          </div>
          <div className="header-right">
            <p className="section-desc">
              A peek inside the process — from problem framing and research to the final UI and the outcome.
            </p>
          </div>
        </motion.div>

        <div className="case-studies-grid">
          {caseStudies.map((project, idx) => (
            <motion.div
              key={project.id}
              className="case-study-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.15 }}
              whileHover={{ y: -8 }}
            >
              {project.externalLink ? (
                <a href={project.externalLink} target="_blank" rel="noopener noreferrer" className="case-study-link-wrapper">
                  <div className="case-study-image-container">
                    <div className="case-study-badge">
                      {project.category.toUpperCase()}
                    </div>
                    {project.video ? (
                      <video
                        src={project.video}
                        className="case-study-image"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="case-study-image"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="case-study-content">
                    <div className="case-study-title-row">
                      <h3 className="case-study-title">{project.title}</h3>
                      <div className="case-study-arrow">
                        <ArrowRight size={18} style={{ transform: 'rotate(-45deg)' }} />
                      </div>
                    </div>
                    <p className="case-study-desc">{project.description}</p>
                  </div>
                </a>
              ) : (
                <div className="case-study-link-wrapper">
                  <div className="case-study-image-container">
                    <div className="case-study-badge">
                      {project.category.toUpperCase()}
                    </div>
                    {project.video ? (
                      <video
                        src={project.video}
                        className="case-study-image"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="case-study-image"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="case-study-content">
                    <div className="case-study-title-row">
                      <h3 className="case-study-title">{project.title}</h3>
                      <div className="case-study-arrow">
                        <ArrowRight size={18} style={{ transform: 'rotate(-45deg)' }} />
                      </div>
                    </div>
                    <p className="case-study-desc">{project.description}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
