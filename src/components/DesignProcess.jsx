import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Layers, FlaskConical, Sparkles, ArrowRight } from 'lucide-react';
import './DesignProcess.css';

const steps = [
  { num: '01', title: 'Research', desc: 'Interviews, shadowing, surveys, synthesis.', icon: Search },
  { num: '02', title: 'Wireframe', desc: 'Low-fi flows, IA, journey mapping.', icon: PenTool },
  { num: '03', title: 'Prototype', desc: 'Interactive mockups in Figma / XD.', icon: Layers },
  { num: '04', title: 'Testing', desc: 'Usability, heuristic & A/B studies.', icon: FlaskConical },
  { num: '05', title: 'Final UI', desc: 'Visual design, motion & dev handoff.', icon: Sparkles }
];

const DesignProcess = () => {
  return (
    <section id="process" className="process-section">
      <div className="container">
        <motion.div 
          className="process-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="process-label">DESIGN PROCESS</span>
          <h2 className="process-title">
            From a hunch to a shipped product.
          </h2>
        </motion.div>
        
        <div className="process-wrapper">
          <div className="process-steps">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={idx}>
                  <motion.div 
                    className="process-step" 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                  >
                    <div className="step-card">
                      <Icon size={32} className="step-icon" />
                    </div>
                    <div className="step-content">
                      <span className="step-num">STEP {step.num}</span>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.desc}</p>
                    </div>
                  </motion.div>
                  {idx < steps.length - 1 && (
                    <motion.div 
                      className="step-arrow-container"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 + 0.1 }}
                    >
                      <ArrowRight size={20} className="step-arrow" />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
