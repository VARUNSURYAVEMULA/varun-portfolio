import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  USER_INFO,
  EXPERIENCES,
  RESUME_SKILLS,
  RESUME_PROJECTS,
  RESUME_EDUCATION,
  RESUME_CERTIFICATIONS,
} from '../data/portfolioData';
import { MailIcon, LinkedinIcon, BehanceIcon } from './Icons';
import { Phone, MapPin, GraduationCap, Award, ExternalLink, ArrowDownToLine } from 'lucide-react';

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
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-surface border border-stroke rounded-3xl p-5 sm:p-10 max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Resume"
              className="absolute top-5 right-5 sm:top-6 sm:right-6 w-9 h-9 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-colors z-20"
            >
              &times;
            </button>

            {/* Header */}
            <div className="border-b border-stroke pb-6 mb-7">
              <span className="text-xs text-muted uppercase tracking-[0.25em] font-mono">
                Curriculum Vitae
              </span>
              <h2 className="text-3xl sm:text-4xl font-display italic text-text-primary mt-1">
                {USER_INFO.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#89AACC] font-medium mt-1.5">
                {USER_INFO.role}
              </p>

              {/* Contact & Profiles Meta Bar */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-muted font-light mt-3.5 pt-3 border-t border-stroke/40">
                {USER_INFO.phone && (
                  <a
                    href={`tel:${USER_INFO.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 hover:text-text-primary transition-colors"
                  >
                    <Phone size={13} className="text-[#89AACC]" />
                    <span>{USER_INFO.phone}</span>
                  </a>
                )}
                <span className="text-muted/40 hidden sm:inline">&bull;</span>
                <a
                  href={`mailto:${USER_INFO.email}`}
                  className="flex items-center gap-1.5 hover:text-text-primary transition-colors"
                >
                  <MailIcon size={13} className="text-[#89AACC]" />
                  <span>{USER_INFO.email}</span>
                </a>
                <span className="text-muted/40 hidden sm:inline">&bull;</span>
                <span className="flex items-center gap-1.5 text-muted">
                  <MapPin size={13} className="text-[#89AACC]" />
                  <span>{USER_INFO.location}</span>
                </span>
                <span className="text-muted/40 hidden sm:inline">&bull;</span>
                <div className="flex items-center gap-3">
                  <a
                    href={USER_INFO.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-text-primary transition-colors"
                  >
                    <LinkedinIcon size={12} className="text-[#89AACC]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={USER_INFO.socials.behance}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 hover:text-text-primary transition-colors"
                  >
                    <BehanceIcon size={12} className="text-[#89AACC]" />
                    <span>Behance</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Objective */}
            {USER_INFO.objective && (
              <div className="mb-8">
                <h3 className="text-xs text-muted uppercase tracking-widest font-mono mb-2.5">
                  Objective
                </h3>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-stroke/60 text-xs sm:text-sm text-text-primary/90 font-light leading-relaxed">
                  {USER_INFO.objective}
                </div>
              </div>
            )}

            {/* Experience */}
            <div className="space-y-6 mb-8">
              <h3 className="text-xs text-muted uppercase tracking-widest font-mono">
                Work Experience
              </h3>

              <div className="border-l border-stroke pl-4 sm:pl-5 space-y-6">
                {EXPERIENCES.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-start sm:items-center justify-between gap-2 flex-col sm:flex-row">
                      <h4 className="text-base font-medium text-text-primary">
                        {item.role}
                      </h4>
                      <span className="text-xs text-muted font-mono uppercase tracking-wider">{item.period}</span>
                    </div>
                    <p className="text-xs text-[#89AACC] mt-0.5 font-medium">
                      {item.company} &bull; <span className="text-muted font-normal">{item.location}</span>
                    </p>
                    <ul className="text-xs sm:text-sm text-muted mt-3 font-light space-y-1.5 list-disc list-inside leading-relaxed">
                      {item.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">
                          <span className="text-text-primary/90">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Categorized */}
            <div className="mb-8">
              <h3 className="text-xs text-muted uppercase tracking-widest font-mono mb-3">
                Skills &amp; Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Design */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-stroke/60">
                  <div className="text-xs font-medium text-[#89AACC] uppercase tracking-wider mb-2.5">
                    Design
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_SKILLS.design.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-stroke/30 border border-stroke/60 text-text-primary/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Research */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-stroke/60">
                  <div className="text-xs font-medium text-[#89AACC] uppercase tracking-wider mb-2.5">
                    Research
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_SKILLS.research.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-stroke/30 border border-stroke/60 text-text-primary/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-stroke/60">
                  <div className="text-xs font-medium text-[#89AACC] uppercase tracking-wider mb-2.5">
                    Tools
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {RESUME_SKILLS.tools.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-stroke/30 border border-stroke/60 text-text-primary/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Projects from Resume */}
            <div className="mb-8">
              <h3 className="text-xs text-muted uppercase tracking-widest font-mono mb-3">
                Key Projects
              </h3>
              <div className="space-y-3.5">
                {RESUME_PROJECTS.map((proj) => (
                  <div
                    key={proj.title}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-stroke/60 hover:border-stroke transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h4 className="text-sm font-medium text-text-primary">
                        {proj.title}
                      </h4>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#89AACC] hover:text-white transition-colors"
                        >
                          <span>{proj.linkLabel || 'View Project'}</span>
                          <ExternalLink size={11} />
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-muted font-light leading-relaxed">
                      {proj.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications Row */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Education */}
              <div>
                <h3 className="text-xs text-muted uppercase tracking-widest font-mono mb-3">
                  Education
                </h3>
                <div className="space-y-3">
                  {RESUME_EDUCATION.map((edu) => (
                    <div
                      key={edu.degree}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-stroke/60 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-stroke/30 border border-stroke/60 flex items-center justify-center shrink-0 mt-0.5">
                        <GraduationCap size={16} className="text-[#89AACC]" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-text-primary">
                          {edu.degree}
                        </div>
                        <div className="text-xs text-muted mt-0.5">
                          {edu.institution} &bull; {edu.period}
                        </div>
                        <div className="text-[11px] text-[#89AACC] font-mono mt-1">
                          CGPA: {edu.cgpa}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h3 className="text-xs text-muted uppercase tracking-widest font-mono mb-3">
                  Certifications
                </h3>
                <div className="space-y-3">
                  {RESUME_CERTIFICATIONS.map((cert) => (
                    <div
                      key={cert}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-stroke/60 flex items-start gap-3"
                    >
                      <div className="w-8 h-8 rounded-xl bg-stroke/30 border border-stroke/60 flex items-center justify-center shrink-0 mt-0.5">
                        <Award size={16} className="text-[#89AACC]" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-text-primary">
                          {cert}
                        </div>
                        <div className="text-xs text-muted mt-0.5">
                          Comprehensive UI/UX &amp; Visual Design Mastery
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Healthcare Specializations */}
            <div className="mb-8">
              <h3 className="text-xs text-muted uppercase tracking-widest font-mono mb-3">
                Healthcare Domain Focus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { title: 'Radiology UI', desc: 'High-contrast imaging controls & diagnostic evaluation' },
                  { title: 'Kidney Health UI', desc: 'Patient telemetry, longitudinal dialysis & vital trends' },
                  { title: 'Claim Analysis', desc: 'Simplified medical billing & claim adjudication flows' },
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

            {/* Footer Buttons */}
            <div className="pt-6 border-t border-stroke flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <a
                  href={USER_INFO.resumeUrl || '/resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center text-xs sm:text-sm rounded-full p-[1.5px] transition-transform duration-200 hover:scale-105"
                >
                  <span className="absolute inset-0 rounded-full accent-gradient" />
                  <span className="relative z-10 px-5 py-2.5 rounded-full bg-surface text-text-primary font-medium flex items-center gap-2 hover:bg-bg transition-colors">
                    <ArrowDownToLine size={14} className="text-[#89AACC]" />
                    <span>Open Resume (PDF)</span>
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
