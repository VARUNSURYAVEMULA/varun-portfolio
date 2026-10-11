import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartPulse, Compass, Layers } from 'lucide-react';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: <Sparkles className="w-5 h-5 text-[#89AACC]" />,
    title: '1.5+ year shipping product',
    description: 'End-to-end UI/UX across healthcare, enterprise dashboards and mobile apps.',
  },
  {
    icon: <HeartPulse className="w-5 h-5 text-[#89AACC]" />,
    title: 'Healthcare specialist',
    description: 'Radiology, kidney health, claims and hospital operations — designed with clinicians, not for them.',
  },
  {
    icon: <Compass className="w-5 h-5 text-[#89AACC]" />,
    title: 'Strategy → Visuals',
    description: 'UX strategy, IA, wireframes, prototypes and pixel-precise visual design.',
  },
  {
    icon: <Layers className="w-5 h-5 text-[#89AACC]" />,
    title: 'Design systems',
    description: 'Reusable, themeable component libraries that scale with engineering teams.',
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative bg-bg py-20 md:py-32 overflow-hidden border-t border-stroke/40">
      {/* Subtle radial ambient glow behind the grid */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#4E85BF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                About
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-[1.08] mb-6">
              I design calm, <br />
              <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">
                human-first
              </span> <br />
              products.
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-md">
              I&apos;m Varun &mdash; a product designer focused on healthcare and enterprise software. I believe interfaces should reduce the cognitive load of complex work, not add to it. I work closely with engineers, clinicians and operators to ship things that actually get used.
            </p>
          </motion.div>

          {/* Right Column: 2x2 Feature Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {FEATURES.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{ y: -5 }}
                  className="group relative bg-surface border border-stroke hover:border-white/20 rounded-3xl p-6 md:p-7 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
                >
                  {/* Subtle hover gradient ring inside card */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#89AACC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Icon Circle */}
                  <div className="relative z-10 w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 group-hover:border-[#89AACC]/40 group-hover:bg-[#89AACC]/10 transition-colors duration-300">
                    {item.icon}
                  </div>

                  {/* Text Content */}
                  <div className="relative z-10">
                    <h3 className="text-base sm:text-lg font-medium text-text-primary tracking-tight mb-2 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
