import React from 'react';
import { motion } from 'framer-motion';
import { STATS } from '../data/portfolioData';

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke/60 relative z-30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="p-8 sm:p-10 rounded-3xl bg-surface/40 border border-stroke flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
            >
              <div>
                {/* Big number */}
                <div className="text-6xl sm:text-7xl md:text-8xl font-display italic text-text-primary tracking-tight leading-none group-hover:text-white transition-colors">
                  {stat.value}
                </div>

                {/* Accent Gradient Line */}
                <div className="w-12 h-[2px] accent-gradient my-5 rounded-full" />

                {/* Label */}
                <h3 className="text-xl sm:text-2xl font-medium text-text-primary tracking-tight mb-2">
                  {stat.label}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-muted leading-relaxed font-light mt-4">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
