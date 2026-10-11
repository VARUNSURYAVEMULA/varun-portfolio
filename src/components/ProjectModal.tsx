import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-surface border border-stroke rounded-3xl overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Project Modal"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
            >
              &times;
            </button>

            {/* Project Media */}
            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden shrink-0">
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
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80 pointer-events-none" />
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted uppercase font-mono tracking-widest">
                  {project.category}
                </span>
                <span className="text-muted/50">&bull;</span>
                <span className="text-xs text-muted font-mono">{project.year}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-display text-text-primary mb-3">
                {project.title}
              </h3>

              <p className="text-base text-text-primary/90 font-light mb-6">
                {project.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-stroke/40 border border-stroke text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-muted font-light leading-relaxed border-t border-stroke pt-6">
                <p>
                  {project.description}
                </p>
              </div>

              {/* External Behance Link if available */}
              {project.externalLink && (
                <div className="mt-6 pt-4 border-t border-stroke/60">
                  <a
                    href={project.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-text-primary hover:text-white px-5 py-2.5 rounded-full bg-stroke/40 hover:bg-stroke transition-colors font-medium"
                  >
                    <span>View Full Case Study on Behance</span>
                    <span>↗</span>
                  </a>
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-stroke flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={onClose}
                  className="group relative inline-flex items-center text-xs sm:text-sm rounded-full p-[1.5px]"
                >
                  <span className="absolute inset-0 rounded-full accent-gradient" />
                  <span className="relative z-10 px-5 py-2.5 rounded-full bg-surface text-text-primary font-medium flex items-center gap-1.5">
                    <span>Discuss Similar Project</span>
                    <span>&rarr;</span>
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
