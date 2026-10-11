import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface SelectedWorksProps {
  onProjectClick?: (project: Project) => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onProjectClick }) => {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header with Framer Motion whileInView */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-light">
              Featured <span className="font-display italic font-normal">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              A selection of projects I&apos;ve worked on, from concept to launch.
            </p>
          </div>

          {/* "View all work" desktop button */}
          <div className="hidden md:inline-flex">
            <a
              href="#works"
              className="group relative inline-flex items-center text-xs sm:text-sm rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-surface border border-stroke px-5 py-2.5 text-text-primary text-xs sm:text-sm font-medium transition-colors">
                <span>View all work</span>
                <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, index) => {
            const colSpanClass = project.span === 7 ? 'md:col-span-7' : 'md:col-span-5';

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onClick={() => onProjectClick?.(project)}
                className={`${colSpanClass} group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer min-h-[360px] md:min-h-[440px] flex flex-col justify-end p-6 md:p-8`}
              >
                {/* Background Image or Video */}
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                )}

                {/* Halftone Overlay */}
                <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none" />

                {/* Subtle base vignette so text is readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

                {/* Default Card Meta Content */}
                <div className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] text-muted uppercase tracking-widest font-mono">
                      {project.category}
                    </span>
                    <span className="text-muted/40">&bull;</span>
                    <span className="text-[11px] text-muted font-mono">{project.year}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display text-text-primary tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted mt-1 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Hover Overlay: bg-bg/70 + backdrop-blur-lg */}
                <div className="absolute inset-0 z-20 bg-bg/70 opacity-0 group-hover:opacity-100 backdrop-blur-lg transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                  {/* Hover label pill with animated gradient border & white bg */}
                  <div className="relative inline-flex items-center p-[2px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105">
                    <span className="absolute inset-0 accent-gradient animate-gradient-shift" />
                    <span className="relative z-10 px-6 py-2.5 bg-white text-black text-sm font-medium rounded-full flex items-center gap-1.5 shadow-sm">
                      <span>View &mdash;</span>
                      <span className="font-display italic text-base">
                        {project.title}
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
