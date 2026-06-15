import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Timeline.css';

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="timeline-section" ref={containerRef}>
      <div className="container">
        <div className="timeline-wrapper">
          <motion.div 
            className="timeline-content-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="timeline-label">EXPERIENCE</span>
            <h2 className="timeline-title">
              Where I've<br/>
              <span className="text-gradient">designed.</span>
            </h2>
            <p className="timeline-desc">
              A focused chapter, deep in healthcare and enterprise product design.
            </p>
          </motion.div>

          <div className="timeline-content-right">
            <div className="timeline-line-bg"></div>
            <motion.div className="timeline-line-fill" style={{ height: lineHeight }}></motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="timeline-item"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="timeline-dot" 
              />
              <div className="timeline-item-content">
                <div className="timeline-item-header">
                  <h3 className="company-name">Achala IT Solutions</h3>
                  <span className="company-date">2024 — Present</span>
                </div>
                <h4 className="company-role">Associate Software Engineer · UI/UX · Hyderabad, IN</h4>
                
                <ul className="company-details">
                  {[
                    'Lead designer for a suite of healthcare platforms spanning radiology, kidney health, and hospital operations.',
                    'Designed responsive web and native mobile applications, owning the journey from low-fi wireframes to production-ready UI.',
                    'Built reusable design systems with developers — shipped 40+ shared components, cutting design-to-dev handoff time by ~35%.',
                    'Ran weekly usability sessions with clinicians and operations staff; iterated on flows that reduced task completion time by 22%.'
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
