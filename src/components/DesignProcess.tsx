import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Layers, FlaskConical, Sparkles, ArrowRight } from 'lucide-react';

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
}

export const DESIGN_PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Research',
    desc: 'Interviews, shadowing, surveys, synthesis.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Wireframe',
    desc: 'Low-fi flows, IA, journey mapping.',
    icon: PenTool,
  },
  {
    num: '03',
    title: 'Prototype',
    desc: 'Interactive mockups in Figma / XD.',
    icon: Layers,
  },
  {
    num: '04',
    title: 'Testing',
    desc: 'Usability, heuristic & A/B studies.',
    icon: FlaskConical,
  },
  {
    num: '05',
    title: 'Final UI',
    desc: 'Visual design, motion & dev handoff.',
    icon: Sparkles,
  },
];

export const DesignProcess: React.FC = () => {
  return (
    <section
      id="process"
      className="relative bg-bg py-20 md:py-32 overflow-hidden border-t border-stroke/40"
    >
      {/* Subtle ambient radial glow adhering to portfolio theme */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#4E85BF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 sm:mb-16 md:mb-20 text-left"
        >
          {/* Standardized Portfolio Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Design Process
            </span>
          </div>

          {/* Heading with Instrument Serif italic accent gradient */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-[1.08] mb-4">
            From a hunch to a{' '}
            <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">
              shipped product.
            </span>
          </h2>

          <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-xl">
            A structured yet adaptive framework turning complex ambiguities into clear, measurable user outcomes.
          </p>
        </motion.div>

        {/* Desktop Layout (≥1024px): 5-step horizontal progression with connecting arrows */}
        <div className="hidden lg:flex items-start justify-between gap-2">
          {DESIGN_PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.num}>
                {/* Step Item */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="group flex flex-col items-center text-center flex-1 max-w-[200px]"
                >
                  {/* Icon Squircle Card */}
                  <div className="relative w-24 h-24 rounded-2xl bg-surface border border-stroke group-hover:border-[#89AACC]/50 flex items-center justify-center mb-6 transition-all duration-300 group-hover:-translate-y-1.5 shadow-lg group-hover:shadow-[0_0_24px_rgba(137,170,204,0.18)]">
                    {/* Subtle hover gradient wash */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#89AACC]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <Icon
                      size={32}
                      strokeWidth={1.75}
                      className="relative z-10 text-[#89AACC] group-hover:text-white transition-colors duration-300"
                    />
                  </div>

                  {/* Step Metadata & Description */}
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted group-hover:text-[#89AACC] transition-colors mb-2">
                      STEP {step.num}
                    </span>
                    <h3 className="text-lg font-medium text-text-primary tracking-tight mb-2 group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>

                {/* Connecting Arrow between steps */}
                {idx < DESIGN_PROCESS_STEPS.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 + 0.15, duration: 0.5 }}
                    className="flex items-center justify-center pt-9 -mx-1 text-stroke group-hover:text-[#89AACC]/60 select-none"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      size={20}
                      className="text-[#4E85BF]/40"
                    />
                  </motion.div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile & Tablet Layout (<1024px): Responsive card grid with seamless theme tokens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {DESIGN_PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`group relative bg-surface border border-stroke hover:border-[#89AACC]/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 flex items-start gap-4 ${
                  idx === DESIGN_PROCESS_STEPS.length - 1 && DESIGN_PROCESS_STEPS.length % 2 !== 0
                    ? 'sm:col-span-2'
                    : ''
                }`}
              >
                {/* Subtle hover gradient ring inside card */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#89AACC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon Squircle */}
                <div className="relative z-10 w-14 h-14 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#89AACC]/40 group-hover:bg-[#89AACC]/10 transition-colors duration-300">
                  <Icon
                    size={24}
                    strokeWidth={1.75}
                    className="text-[#89AACC] group-hover:text-white transition-colors duration-300"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#89AACC]">
                      STEP {step.num}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-text-primary tracking-tight mb-1 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DesignProcess;
