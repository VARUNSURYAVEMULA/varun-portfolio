import React from 'react';
import './Timeline.css';

const Timeline = () => {
  return (
    <section id="experience" className="timeline-section">
      <div className="container">
        <h2 className="section-title">
          Experience & <span className="text-gradient">Journey</span>
        </h2>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          <div className="timeline-item animate-fade-up">
            <div className="timeline-dot"></div>
            <div className="timeline-content glass">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">Associate Software Engineer (UI/UX Focus)</h3>
                  <h4 className="timeline-company">Achala IT Solutions</h4>
                </div>
                <span className="timeline-date">Present</span>
              </div>
              <ul className="timeline-details">
                <li>Designed intuitive interfaces for a robust Healthcare platform.</li>
                <li>Created seamless Web and Mobile application designs.</li>
                <li>Developed comprehensive wireframes and high-fidelity prototypes.</li>
                <li>Collaborated closely with developers to ensure pixel-perfect implementation.</li>
                <li>Led user-centered design improvements based on feedback and research.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;
