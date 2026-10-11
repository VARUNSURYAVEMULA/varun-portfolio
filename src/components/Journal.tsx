import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { JOURNAL_ENTRIES } from '../data/portfolioData';
import { JournalEntry } from '../types';

export const Journal: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalEntry | null>(null);

  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
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
                Journal
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight font-light">
              Recent <span className="font-display italic font-normal">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted mt-3 max-w-lg">
              Writings on interaction design, creative technology, and interface engineering.
            </p>
          </div>

          {/* "View all" desktop button */}
          <div className="hidden md:inline-flex">
            <a
              href="#journal"
              className="group relative inline-flex items-center text-xs sm:text-sm rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-surface border border-stroke px-5 py-2.5 text-text-primary text-xs sm:text-sm font-medium transition-colors">
                <span>View all</span>
                <span className="text-xs transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </span>
            </a>
          </div>
        </motion.div>

        {/* 4 Journal Entries displayed as horizontal pills */}
        <div className="space-y-4">
          {JOURNAL_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() => setSelectedArticle(entry)}
              className="flex items-center justify-between gap-4 md:gap-6 p-3 sm:p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300 group cursor-pointer hover:border-white/20"
            >
              {/* Left: Thumbnail & Title */}
              <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shrink-0 border border-stroke/60 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-[11px] text-muted uppercase tracking-widest font-mono">
                      {entry.category}
                    </span>
                    <span className="text-muted/40 text-[10px]">&bull;</span>
                    <span className="text-[10px] sm:text-[11px] text-muted font-mono">
                      {entry.date}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base md:text-lg font-medium text-text-primary group-hover:text-white transition-colors truncate sm:whitespace-normal">
                    {entry.title}
                  </h3>
                </div>
              </div>

              {/* Right: Read time & Arrow */}
              <div className="flex items-center gap-4 sm:gap-6 shrink-0 pr-2">
                <span className="text-xs sm:text-sm text-muted font-mono hidden md:inline-block">
                  {entry.readTime}
                </span>

                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stroke flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-white/30 group-hover:bg-stroke/40 transition-all duration-300">
                  <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-surface border border-stroke rounded-3xl p-6 sm:p-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Close"
                className="absolute top-6 right-6 w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-white hover:border-white/40 transition-colors"
              >
                &times;
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-muted uppercase font-mono tracking-widest">
                  {selectedArticle.category}
                </span>
                <span className="text-muted/50">&bull;</span>
                <span className="text-xs text-muted font-mono">{selectedArticle.date}</span>
                <span className="text-muted/50">&bull;</span>
                <span className="text-xs text-muted font-mono">{selectedArticle.readTime}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display text-text-primary mb-6">
                {selectedArticle.title}
              </h3>

              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-64 sm:h-72 object-cover rounded-2xl mb-6 border border-stroke/50"
              />

              <div className="space-y-4 text-sm sm:text-base text-muted/90 leading-relaxed font-light">
                <p>
                  {selectedArticle.summary || 'Designing for healthcare and enterprise systems requires extreme clarity, high data density, and calm, predictable interactions.'}
                </p>
                <p>
                  Through careful tuning of visual hierarchy and ergonomic workflows, we transform complex medical and software pipelines into intuitive instruments that reduce cognitive friction for professionals.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stroke flex items-center justify-between">
                <span className="text-xs text-muted font-mono">Published by Varun Surya Vemula</span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-full border border-stroke text-xs text-text-primary hover:bg-stroke/40 transition-colors"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
