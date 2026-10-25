import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToolItem {
  id: string;
  name: string;
  category: 'Design' | 'Creative' | 'AI & Code';
  tag: string;
  desc: string;
  icon: React.ReactNode;
}

const TOOLS: ToolItem[] = [
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    tag: 'UI / UX',
    desc: 'Systemic interface design & cross-functional handoff',
    icon: (
      <svg viewBox="0 0 38 57" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
      </svg>
    ),
  },
  {
    id: 'framer',
    name: 'Framer',
    category: 'Design',
    tag: 'Web & Code',
    desc: 'High-fidelity responsive layouts & interaction design',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
      </svg>
    ),
  },
  {
    id: 'protopie',
    name: 'Protopie',
    category: 'Design',
    tag: 'Prototype',
    desc: 'Sensor-driven micro-interactions & conditional logic',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <path d="M12 3L3 8.5L12 14L21 8.5L12 3Z" fill="#FF6154" />
        <path d="M3 13.5L12 19L21 13.5" stroke="#FF6154" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'mobbin',
    name: 'Mobbin',
    category: 'Creative',
    tag: 'Research',
    desc: 'Empirical UX benchmarking across top iOS & web products',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <rect width="24" height="24" rx="6" fill="#18181B" stroke="#27272A" strokeWidth="1" />
        <path d="M6.5 15V9H9l3 4.2L15 9h2.5v6H15.5v-3.5L12.5 15h-1L8.5 11.5V15H6.5z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'freepik',
    name: 'Freepik',
    category: 'Creative',
    tag: 'Assets',
    desc: 'High-res curated vectors, 3D assets & visual mockups',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <rect width="24" height="24" rx="6" fill="#1273EB" />
        <path d="M7 6h10v3H10.5v2.5H16v3h-5.5V18H7V6z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    category: 'Creative',
    tag: 'Inspiration',
    desc: 'Emerging visual aesthetics, trends & design experiments',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <path fill="#EA4C89" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.72 8.9c-.83-.24-2.82-.76-5.46-.35-.11-.25-.22-.51-.35-.77-.28-.56-.59-1.12-.93-1.68 3.51-1.39 4.95-3.08 5.09-3.26 1.05 1.57 1.65 3.73 1.65 6.06zm-7.72-6.9c.02 0 .04 0 .06 0-.25.33-1.64 2.05-5.06 3.42C8.36 4.7 10.08 4 12 4zm-6.2 4.41c3.15-1.25 4.54-2.8 4.79-3.11-2.91.89-5.11 3.26-5.83 6.22 0-.01.3-.87 1.04-3.11zm-.79 4.78c.03.01.07.03.11.04 2.92.83 5.48.51 6.32.37.07.18.14.36.21.54.19.49.36.98.51 1.48-3.79 1.15-7.09 1.08-7.23 1.07.01-.89.04-1.8.08-3.5zm7.9 7.8c-.89.01-1.78-.1-2.63-.35.34-.34 2.87-3.07 3.51-5.69.75.21 1.58.4 2.47.57-.46 3.03-1.87 5.09-3.35 5.47zm4.33-1.69c-.86-.17-1.65-.35-2.37-.55.57-2.45-.19-4.73-.24-4.88 2.42-.4 4.31.06 5.08.28-.43 2.06-1.32 3.86-2.47 5.15z" />
      </svg>
    ),
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'Creative',
    tag: 'Graphics',
    desc: 'Rapid stakeholder presentations & editorial decks',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <rect width="24" height="24" rx="6" fill="url(#canva-grad)" />
        <defs>
          <linearGradient id="canva-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C4CC" />
            <stop offset="1" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <path d="M13.2 8.5c-.8-.4-1.7-.5-2.6-.5-3 0-5 2-5 5s2 4.6 4.8 4.6c1.5 0 2.7-.6 3.4-1.5l-1.5-1.2c-.5.6-1.2.9-1.9.9-1.5 0-2.5-1-2.5-2.7 0-1.8 1.1-2.8 2.6-2.8.7 0 1.3.2 1.7.6l1-2.4z" fill="#FFF" />
      </svg>
    ),
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'AI & Code',
    tag: 'LLM & IA',
    desc: 'Information architecture critique & design reasoning',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93M2 7l20 10M2 17l20-10" stroke="#CC785C" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ai',
    name: 'AI',
    category: 'AI & Code',
    tag: 'Gen AI',
    desc: 'Generative ideation, design research & content synthesis',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <path d="M21.5 10.4c-.2-1.4-1.2-2.5-2.5-2.9-.3-.8-.9-1.5-1.7-1.9-1.2-.7-2.7-.6-3.8.1-.5-.5-1.3-.9-2.1-.9-1.4 0-2.6.9-3 2.2-.8.1-1.6.5-2.1 1.2-.8 1-1 2.4-.5 3.6-.4.5-.7 1.2-.7 1.9 0 1.5.9 2.8 2.2 3.3.1.8.6 1.6 1.3 2.1 1.1.8 2.6.8 3.7.1.5.6 1.3 1 2.2 1 1.4 0 2.7-.9 3.1-2.2.8-.1 1.5-.5 2-1.1.9-1.1 1-2.5.5-3.8.4-.5.7-1.2.7-1.8 0-.4 0-.7-.1-1z" stroke="#10A37F" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" stroke="#10A37F" strokeWidth="1.6" />
      </svg>
    ),
  },
];

type CategoryFilter = 'All' | 'Design' | 'Creative' | 'AI & Code';

export const ToolKit: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');

  const filteredTools =
    activeFilter === 'All'
      ? TOOLS
      : TOOLS.filter((tool) => tool.category === activeFilter);

  return (
    <section
      id="toolkit"
      className="relative bg-bg py-20 md:py-32 overflow-hidden border-t border-stroke/40"
    >
      {/* Ambient background glow adhering to site theme */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#4E85BF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Standardized Portfolio Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Tool Kit
              </span>
            </div>

            {/* Editorial Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-[1.08] mb-4">
              My daily{' '}
              <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">
                arsenal.
              </span>
            </h2>

            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-lg">
              A curated stack across product design, high-fidelity prototyping, research, generative AI, and engineering handoff.
            </p>
          </motion.div>

          {/* Interactive Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-1.5 p-1 rounded-full bg-surface border border-stroke w-fit flex-wrap"
          >
            {(['All', 'Design', 'Creative', 'AI & Code'] as CategoryFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${activeFilter === tab
                    ? 'text-text-primary bg-white/10 shadow-sm'
                    : 'text-muted hover:text-text-primary hover:bg-white/5'
                  }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* 12-Tool Grid: 2 cols on mobile, 3 cols on tablet, 4 cols on desktop */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.03,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative bg-surface border border-stroke hover:border-[#89AACC]/40 rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 flex flex-col justify-between min-h-[160px] sm:min-h-[180px] shadow-sm hover:shadow-[0_0_24px_rgba(137,170,204,0.12)] cursor-default"
              >
                {/* Subtle hover gradient ring inside card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#89AACC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Top Row: Icon squircle + Category Tag */}
                <div className="relative z-10 flex items-start justify-between gap-2 mb-4">
                  {/* Icon squircle */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-[#89AACC]/40 group-hover:bg-[#89AACC]/10 flex items-center justify-center transition-all duration-300 shrink-0">
                    {tool.icon}
                  </div>

                  {/* Micro Category Tag */}
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/10 text-muted group-hover:text-[#89AACC] group-hover:border-[#89AACC]/30 transition-colors">
                    {tool.tag}
                  </span>
                </div>

                {/* Bottom Row: Name + Micro Description */}
                <div className="relative z-10">
                  <h3 className="text-base sm:text-lg font-medium text-text-primary tracking-tight mb-1 group-hover:text-white transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-muted font-light leading-relaxed line-clamp-2">
                    {tool.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolKit;
