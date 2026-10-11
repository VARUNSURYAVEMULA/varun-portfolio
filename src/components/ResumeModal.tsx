import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { USER_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-surface border border-stroke rounded-3xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Resume"
              className="absolute top-6 right-6 w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-colors"
            >
              &times;
            </button>

            {/* Header */}
            <div className="border-b border-stroke pb-6 mb-6">
              <span className="text-xs text-muted uppercase tracking-[0.25em] font-mono">
                Curriculum Vitae
              </span>
              <h2 className="text-3xl sm:text-4xl font-display italic text-text-primary mt-1">
                Varun Surya Vemula
              </h2>
              <p className="text-sm text-muted mt-2">
                UI/UX Designer &amp; Product Designer &bull; Hyderabad, India
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-6 mb-8">
              <h3 className="text-xs text-muted uppercase tracking-widest font-mono">
                Work Experience
              </h3>

              <div className="border-l border-stroke pl-4 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-medium text-text-primary">
                      Software Engineer &bull; UI/UX
                    </h4>
                    <span className="text-xs text-muted font-mono">FEB 2025 &mdash; PRESENT</span>
                  </div>
                  <p className="text-xs text-muted/80 mt-0.5">Achala IT Solutions &bull; Hyderabad, IN</p>
                  <ul className="text-xs sm:text-sm text-muted mt-2 font-light space-y-1.5 list-disc list-inside">
                    <li>Lead designer for clinical healthcare platforms spanning radiology, kidney health, and hospital operations.</li>
                    <li>Owned end-to-end journeys from initial UX research and wireframes to pixel-perfect responsive web and mobile UI.</li>
                    <li>Engineered and documented 40+ reusable design system components, reducing design-to-engineering handoff time by ~35%.</li>
                    <li>Conducted usability testing with doctors and clinical operators, iterating on workflows to reduce task completion time by 22%.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Healthcare Specializations */}
            <div className="mb-8">
              <h3 className="text-xs text-muted uppercase tracking-widest font-mono mb-3">
                Healthcare Specializations
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { title: 'Radiology UI', desc: 'High-contrast imaging controls & diagnostic evaluation' },
                  { title: 'Kidney Health UI', desc: 'Patient telemetry & vital parameter tracking' },
                  { title: 'Claim Analysis', desc: 'Simplified medical billing & adjudication flows' },
                  { title: 'Fraud Detection', desc: 'Anomaly detection across massive claim datasets' },
                ].map((spec) => (
                  <div
                    key={spec.title}
                    className="p-3 rounded-2xl bg-stroke/20 border border-stroke/60"
                  >
                    <div className="text-xs font-medium text-text-primary">{spec.title}</div>
                    <div className="text-[11px] text-muted font-light mt-0.5">{spec.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Capabilities */}
            <div className="mb-8">
              <h3 className="text-xs text-muted uppercase tracking-widest font-mono mb-3">
                Design &amp; Engineering Toolkit
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'UX Research & Flows',
                  'Wireframing & Prototyping',
                  'Design Systems (Figma)',
                  'Information Architecture',
                  'Usability Testing',
                  'React & TypeScript',
                  'Tailwind CSS',
                  'Framer Motion & GSAP',
                  'WCAG AAA Accessibility',
                ].map((cap) => (
                  <span
                    key={cap}
                    className="text-xs px-3 py-1.5 rounded-full bg-stroke/30 border border-stroke text-text-primary/90"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Profiles & Links */}
            <div className="mb-8 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/varunsuryavemula"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-4 py-2 rounded-full border border-stroke text-muted hover:text-white hover:border-white/30 transition-colors"
              >
                LinkedIn Profile &rarr;
              </a>
              <a
                href="https://www.behance.net/varunsurya1"
                target="_blank"
                rel="noreferrer"
                className="text-xs px-4 py-2 rounded-full border border-stroke text-muted hover:text-white hover:border-white/30 transition-colors"
              >
                Behance Portfolio &rarr;
              </a>
            </div>

            {/* Footer Buttons */}
            <div className="pt-6 border-t border-stroke flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <a
                  href={USER_INFO.resumeUrl || 'https://drive.google.com/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center text-xs sm:text-sm rounded-full p-[1.5px] transition-transform duration-200 hover:scale-105"
                >
                  <span className="absolute inset-0 rounded-full accent-gradient" />
                  <span className="relative z-10 px-5 py-2.5 rounded-full bg-surface text-text-primary font-medium flex items-center gap-1.5 hover:bg-bg transition-colors">
                    <span>Open in Google Drive</span>
                    <span className="text-xs">↗</span>
                  </span>
                </a>

                <a
                  href="mailto:ux.varunsurya@gmail.com?subject=Product%20Design%20Opportunity"
                  className="px-4 py-2 rounded-full border border-stroke text-xs text-muted hover:text-white hover:bg-stroke/40 transition-colors hidden sm:inline-flex"
                >
                  Get in Touch &rarr;
                </a>
              </div>

              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-stroke text-xs text-muted hover:text-white hover:bg-stroke/40 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
