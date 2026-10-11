import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPLORATIONS } from '../data/portfolioData';
import { ExplorationItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);

  const [activeLightboxItem, setActiveLightboxItem] = useState<ExplorationItem | null>(null);

  const col1Items = EXPLORATIONS.slice(0, 3);
  const col2Items = EXPLORATIONS.slice(3, 6);

  useEffect(() => {
    const section = sectionRef.current;
    const pinnedContent = pinnedContentRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!section || !pinnedContent || !col1 || !col2) return;

    const ctx = gsap.context(() => {
      // Pin Layer 1
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedContent,
        pinSpacing: false,
      });

      // Smooth fade-out near the end of section
      gsap.to(pinnedContent, {
        opacity: 0,
        ease: 'power1.in',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 120%',
          end: 'bottom 100%',
          scrub: true,
        },
      });

      // Parallax Column 1 moves upward faster
      gsap.fromTo(
        col1,
        { y: 150 },
        {
          y: -350,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        }
      );

      // Parallax Column 2 has differential offset
      gsap.fromTo(
        col2,
        { y: -100 },
        {
          y: -500,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.9,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg overflow-hidden"
    >
      {/* Layer 1: Pinned Center (z-10) */}
      <div
        ref={pinnedContentRef}
        className="h-screen w-full flex flex-col items-center justify-center text-center px-6 relative z-10 pointer-events-auto"
      >
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
              Explorations
            </span>
            <span className="w-8 h-px bg-stroke" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl text-text-primary tracking-tight font-light mb-4">
            Visual <span className="font-display italic font-normal">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm md:text-base text-muted max-w-md mb-8 leading-relaxed">
            Curated artifacts, experimental shaders, and creative coding vignettes exploring the boundaries of the medium.
          </p>

          {/* Dribbble Button */}
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center text-xs sm:text-sm rounded-full p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-surface border border-stroke px-6 py-3 text-text-primary font-medium transition-colors">
              <span>View on Dribbble</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute) */}
      <div className="absolute inset-x-0 top-0 h-full max-w-[1400px] mx-auto px-6 md:px-12 pointer-events-none z-20">
        <div className="grid grid-cols-2 gap-8 md:gap-40 pt-40 pb-40 min-h-full">
          {/* Column 1 */}
          <div ref={col1Ref} className="flex flex-col gap-28 md:gap-40 items-start">
            {col1Items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                style={{
                  transform: `rotate(${item.rotation}deg)`,
                }}
                className="pointer-events-auto aspect-square max-w-[320px] w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:border-white/30 cursor-pointer group relative"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] text-muted font-mono uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <span className="text-base sm:text-lg font-display text-text-primary">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div ref={col2Ref} className="flex flex-col gap-28 md:gap-40 items-end pt-36">
            {col2Items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                style={{
                  transform: `rotate(${item.rotation}deg)`,
                }}
                className="pointer-events-auto aspect-square max-w-[320px] w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-0 hover:border-white/30 cursor-pointer group relative"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-right">
                  <span className="text-[10px] text-muted font-mono uppercase tracking-wider block">
                    {item.category}
                  </span>
                  <span className="text-base sm:text-lg font-display text-text-primary">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxItem(null)}
            className="fixed inset-0 z-[1000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setActiveLightboxItem(null)}
                aria-label="Close Lightbox"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                &times;
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <img
                  src={activeLightboxItem.image}
                  alt={activeLightboxItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted font-mono uppercase tracking-widest">
                    {activeLightboxItem.category}
                  </span>
                  <span className="text-xs text-muted font-mono">Archive #2026</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display text-text-primary mb-3">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-light">
                  {activeLightboxItem.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
