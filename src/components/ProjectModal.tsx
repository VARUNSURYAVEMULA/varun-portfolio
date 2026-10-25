import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ArrowUpRight, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl lg:max-w-6xl max-h-[92vh] md:h-[620px] lg:h-[660px] bg-surface/95 border border-stroke rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Project Modal"
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 md:bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all backdrop-blur-md group"
            >
              <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-300" />
            </button>

            {/* Left Column: Project Media Showcase */}
            <div className="relative w-full md:w-[48%] lg:w-[50%] h-64 sm:h-80 md:h-full bg-black shrink-0 overflow-hidden flex items-center justify-center">
              {project.video ? (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Halftone texture overlay */}
              <div className="absolute inset-0 halftone-overlay opacity-15 mix-blend-multiply pointer-events-none" />

              {/* Subtle Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {/* Edge fade to seamlessly meet the content panel on horizontal desktop */}
              <div className="hidden md:block absolute inset-y-0 right-0 w-20 bg-gradient-to-r from-transparent to-surface pointer-events-none" />

              {/* Bottom fade on mobile */}
              <div className="md:hidden absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent pointer-events-none" />

              {/* Floating Live Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{project.video ? 'Live Interaction' : 'Visual Showcase'}</span>
              </div>

              {/* Watermark in bottom left for context */}
              <div className="absolute bottom-4 left-4 z-20 hidden md:block">
                <span className="text-[11px] font-mono tracking-widest uppercase text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                  {project.category} &bull; {project.year}
                </span>
              </div>
            </div>

            {/* Right Column: Project Details & Actions */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden p-6 sm:p-8 md:p-9 lg:p-10 relative">
              {/* Scrollable details */}
              <div className="overflow-y-auto pr-1 sm:pr-2 space-y-5 flex-1 select-text">
                {/* Category & Year */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-muted">
                    {project.category}
                  </span>
                  <span className="text-muted/40 font-mono text-xs">&bull;</span>
                  <span className="text-xs text-muted font-mono">{project.year}</span>
                </div>

                {/* Project Title */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display text-text-primary tracking-tight leading-[1.15]">
                  {project.title}
                </h3>

                {/* Subtitle / Overview */}
                <p className="text-sm sm:text-base text-text-primary/85 font-light leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-stroke/30 border border-stroke text-muted hover:text-white hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project Narrative */}
                <div className="space-y-3 pt-5 border-t border-stroke/70">
                  <h4 className="text-[11px] uppercase font-mono tracking-[0.2em] text-muted/80">
                    Project Overview & Impact
                  </h4>
                  <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* External Case Study Card */}
                {project.externalLink && (
                  <div className="pt-2">
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-stroke hover:border-white/25 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover/link:scale-110 transition-transform">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-text-primary group-hover/link:text-white transition-colors flex items-center gap-1.5">
                            <span>View Full Case Study</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                              Behance
                            </span>
                          </div>
                          <div className="text-[11px] text-muted">
                            Wireframes, research, and high-fidelity prototype
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
                    </a>
                  </div>
                )}
              </div>

              {/* Action Bar Footer */}
              <div className="mt-5 pt-5 border-t border-stroke flex items-center justify-between gap-3 shrink-0">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="group relative inline-flex items-center text-xs sm:text-sm rounded-full p-[1.5px] transition-transform duration-300 hover:scale-[1.02]"
                >
                  <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                  <span className="relative z-10 px-5 py-2.5 rounded-full bg-surface text-text-primary font-medium flex items-center gap-2 hover:bg-bg transition-colors">
                    <span>Discuss Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </a>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-stroke text-xs text-muted hover:text-white hover:bg-stroke/40 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
