import React from 'react';
import './HealthcareSpecialization.css';

const specializations = [
  { title: 'Radiology UI', desc: 'High-contrast imaging interfaces and rapid diagnostic reporting tools.' },
  { title: 'Kidney Health UI', desc: 'Patient monitoring dashboards with clear tracking of vital parameters.' },
  { title: 'Claim Analysis', desc: 'Complex data workflows simplified for insurance and billing teams.' },
  { title: 'Fraud Detection', desc: 'Alert-driven dashboards that highlight anomalies in massive datasets.' },
];

const HealthcareSpecialization = () => {
  return (
    <section className="healthcare-section">
      <div className="container">
        <div className="healthcare-content">
          <div className="healthcare-text animate-fade-up">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Healthcare <br />
              <span className="text-gradient">Specialization</span>
            </h2>
            <p className="healthcare-desc">
              Designing for healthcare requires a unique balance of extreme clarity,
              accessibility, and data density. I specialize in translating complex medical
              workflows into intuitive interfaces that reduce cognitive load for medical professionals
              and improve patient outcomes.
            </p>
          </div>

          <div className="healthcare-grid">
            {specializations.map((item, idx) => (
              <div key={idx} className="health-card glass animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="health-icon-placeholder">
                  <div className="pulse-circle"></div>
                </div>
                <div>
                  <h3 className="health-title">{item.title}</h3>
                  <p className="health-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareSpecialization;
