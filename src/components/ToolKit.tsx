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
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="#EA4C89">
        <path d="m12 24c6.617 0 12-5.384 12-12s-5.384-12-12-12-12 5.383-12 12 5.383 12 12 12zm0-22.5c5.788 0 10.5 4.71 10.5 10.5 0 5.788-4.712 10.5-10.5 10.5-5.79 0-10.5-4.712-10.5-10.5 0-5.79 4.71-10.5 10.5-10.5z" />
        <path d="m17.742 5.071c-1.558-1.294-3.559-2.071-5.742-2.071-.63 0-1.245.066-1.839.189 1.092 1.548 2.084 3.159 2.957 4.829 1.651-.77 3.205-1.763 4.624-2.947z" />
        <path d="m14.866 11.852c1.992-.41 4.065-.448 6.12-.107-.06-2.145-.867-4.101-2.175-5.616-1.544 1.301-3.242 2.379-5.045 3.222.394.822.76 1.655 1.1 2.501z" />
        <path d="m11.718 8.585c-.902-1.711-1.923-3.361-3.063-4.936-2.702 1.083-4.75 3.435-5.417 6.322 2.913.124 5.796-.361 8.48-1.386z" />
        <path d="m13.404 12.225c-.313-.771-.652-1.53-1.014-2.281-2.598 1.012-5.373 1.564-8.195 1.564-.388 0-.778-.024-1.168-.045-.01.178-.027.356-.027.537 0 2.21.8 4.232 2.121 5.798 2.161-2.684 5.067-4.607 8.283-5.573z" />
        <path d="m15.417 13.271c.715 1.996 1.276 4.047 1.688 6.137 2.028-1.399 3.444-3.609 3.799-6.162-1.839-.325-3.698-.311-5.487.025z" />
        <path d="m6.185 18.864c1.57 1.331 3.596 2.136 5.815 2.136 1.332 0 2.593-.297 3.73-.817-.412-2.241-1.012-4.434-1.787-6.563-3.024.883-5.755 2.698-7.758 5.244z" />
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
      <svg viewBox="0 0 80 80" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
        <defs>
          <linearGradient id="canva-grad" x1="12" y1="12" x2="68" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C4CC" />
            <stop offset="50%" stopColor="#248DDA" />
            <stop offset="100%" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r="40" fill="url(#canva-grad)" />
        <path
          d="M57.2691 48.2052C56.939 48.2052 56.6485 48.484 56.3462 49.0928C52.9323 56.0153 47.0358 60.9134 40.2125 60.9134C32.3228 60.9134 27.437 53.7913 27.437 43.9522C27.437 27.2855 36.7232 17.6491 44.8796 17.6491C48.691 17.6491 51.0186 20.0443 51.0186 23.8559C51.0186 28.3796 48.4485 30.7748 48.4485 32.3702C48.4485 33.0864 48.8939 33.5201 49.7773 33.5201C53.3264 33.5201 57.4918 29.4419 57.4918 23.6808C57.4918 18.0947 52.63 13.9888 44.4737 13.9888C30.994 13.9888 19.0142 26.4858 19.0142 43.777C19.0142 57.1614 26.6572 66.0061 38.45 66.0061C50.9668 66.0061 58.2043 53.5526 58.2043 49.5105C58.2043 48.6153 57.7466 48.2052 57.2691 48.2052Z"
          fill="white"
        />
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
