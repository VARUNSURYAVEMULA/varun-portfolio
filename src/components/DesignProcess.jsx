import React from 'react';
import './DesignProcess.css';

const steps = [
  { num: '01', title: 'Research', desc: 'Understanding user needs, analyzing competitors, and defining the core problem.' },
  { num: '02', title: 'Wireframe', desc: 'Drafting low-fidelity layouts to establish structure and information architecture.' },
  { num: '03', title: 'Prototype', desc: 'Creating interactive flows to test usability and navigation.' },
  { num: '04', title: 'Testing', desc: 'Validating concepts with real users and iterating based on feedback.' },
  { num: '05', title: 'Final UI', desc: 'Applying visual design, accessibility standards, and handing off to developers.' }
];

const DesignProcess = () => {
  return (
    <section id="process" className="process-section">
      <div className="container">
        <h2 className="section-title">
          My Design <span className="text-gradient">Process</span>
        </h2>
        
        <div className="process-wrapper">
          <div className="process-line"></div>
          <div className="process-steps">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step animate-fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="step-number">{step.num}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
