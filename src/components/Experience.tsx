import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative bg-bg py-20 md:py-32 overflow-hidden border-t border-stroke/40"
    >
      {/* Subtle ambient depth glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#4E85BF]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-5 flex flex-col justify-start lg:sticky lg:top-28"
          >
            {/* Standardized Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Experience
              </span>
            </div>

            {/* Editorial Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight leading-[1.08] mb-6">
              Where I&apos;ve <br />
              <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">
                designed.
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-muted font-light leading-relaxed max-w-sm">
              A focused chapter, deep in healthcare and enterprise product design.
            </p>
          </motion.div>

          {/* Right Column: Timeline */}
          <div className="lg:col-span-7 relative">
            {EXPERIENCES.map((item) => (
              <div key={item.id} className="relative pl-7 sm:pl-10">
                {/* Vertical Timeline Track Line */}
                <div className="absolute left-2.5 top-3 bottom-0 w-[2px] bg-stroke/60 overflow-hidden">
                  <motion.div
                    style={{ height: lineHeight }}
                    className="w-full bg-gradient-to-b from-[#89AACC] via-[#4E85BF] to-transparent origin-top"
                  />
                </div>

                {/* Bullseye Indicator Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
                  className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-bg border-2 border-[#89AACC] flex items-center justify-center shadow-[0_0_14px_rgba(137,170,204,0.35)] z-10"
                >
                  <div className="w-2 h-2 rounded-full bg-[#89AACC]" />
                </motion.div>

                {/* Experience Card Container matching site's surface cards */}
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative bg-surface border border-stroke hover:border-white/20 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-9 transition-all duration-300"
                >
                  {/* Subtle hover gradient ring inside card */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#89AACC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Header: Company Name & Period */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 mb-2">
                    <h3 className="text-2xl sm:text-3xl font-medium text-text-primary tracking-tight group-hover:text-white transition-colors">
                      {item.company}
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-muted uppercase tracking-wider">
                      {item.period}
                    </span>
                  </div>

                  {/* Role & Location Subtitle */}
                  <div className="relative z-10 text-sm sm:text-base font-medium text-[#89AACC] tracking-tight mb-6">
                    {item.role}
                  </div>

                  {/* Responsibilities Bullets */}
                  <ul className="relative z-10 space-y-3.5">
                    {item.bullets.map((bullet, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 + idx * 0.1, duration: 0.5 }}
                        className="flex items-start gap-3 text-xs sm:text-sm md:text-base text-muted font-light leading-relaxed group/item"
                      >
                        <span className="text-[#89AACC] font-bold text-base leading-none select-none mt-1 group-hover/item:text-white transition-colors">
                          &mdash;
                        </span>
                        <span className="group-hover/item:text-text-primary transition-colors duration-200">
                          {bullet}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
