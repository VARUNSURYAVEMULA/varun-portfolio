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
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Experience & <span className="text-gradient">Journey</span>
        </motion.h2>

        <div className="timeline-container">
          <div className="timeline-line-bg" style={{ position: 'absolute', left: '15px', top: 0, bottom: 0, width: '2px', background: 'var(--border-color)' }}></div>
          <motion.div className="timeline-line" style={{ height: lineHeight, position: 'absolute', left: '15px', top: 0, width: '2px', background: 'var(--gradient-accent)' }}></motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="timeline-item"
            style={{ position: 'relative', zIndex: 1, paddingLeft: '40px', paddingBottom: '3rem' }}
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="timeline-dot" 
              style={{ position: 'absolute', left: '11px', top: '8px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-color)', boxShadow: '0 0 0 4px var(--bg-primary), 0 0 0 6px var(--primary-color)' }}
            />
            <div className="timeline-content glass" style={{ padding: '2rem', borderRadius: '16px' }}>
              <div className="timeline-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 className="timeline-role" style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Associate Software Engineer (UI/UX Focus)</h3>
                  <h4 className="timeline-company" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Achala IT Solutions</h4>
                </div>
                <span className="timeline-date" style={{ padding: '0.25rem 0.75rem', background: 'var(--border-color)', borderRadius: '99px', fontSize: '0.875rem', fontWeight: 500 }}>Present</span>
              </div>
              <ul className="timeline-details" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'Designed intuitive interfaces for a robust Healthcare platform.',
                  'Created seamless Web and Mobile application designs.',
                  'Developed comprehensive wireframes and high-fidelity prototypes.',
                  'Collaborated closely with developers to ensure pixel-perfect implementation.',
                  'Led user-centered design improvements based on feedback and research.'
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    style={{ position: 'relative', paddingLeft: '1.5rem' }}
                  >
                    <span style={{ position: 'absolute', left: 0, top: '8px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)' }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;
