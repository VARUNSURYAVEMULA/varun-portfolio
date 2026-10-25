import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { MailIcon, LinkedinIcon, BehanceIcon } from './Icons';
import { CONTACT_INFO } from '../data/portfolioData';

const MARQUEE_TEXT = 'DESIGNING CALM, HUMAN-FIRST EXPERIENCES • '.repeat(8);

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/varunsuryavemula' },
  { name: 'Behance', url: 'https://www.behance.net/varunsurya1' },
  { name: 'Email', url: 'mailto:ux.varunsurya@gmail.com' },
];

export const Footer: React.FC = () => {
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

  // GSAP Infinite Marquee: xPercent: -50, duration 40, ease "none", repeat -1
  useEffect(() => {
    const marqueeTrack = marqueeTrackRef.current;
    if (!marqueeTrack) return;

    const anim = gsap.to(marqueeTrack, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <footer
      id="contact"
      className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden border-t border-stroke/40"
    >
      {/* Subtle ambient depth glow adhering to theme palette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#4E85BF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* GSAP Infinite Marquee Banner */}
      <div className="relative z-10 w-full overflow-hidden py-4 sm:py-6 border-y border-white/5 backdrop-blur-[2px]">
        <div ref={marqueeTrackRef} className="flex whitespace-nowrap w-max will-change-transform">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic tracking-widest text-white/[0.07] uppercase select-none px-4">
            {MARQUEE_TEXT}
          </span>
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic tracking-widest text-white/[0.07] uppercase select-none px-4">
            {MARQUEE_TEXT}
          </span>
        </div>
      </div>

      {/* Main CTA Center flowing seamlessly with portfolio theme */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-10 lg:px-16 pt-16 md:pt-24 pb-20 text-center flex flex-col items-center"
      >
        {/* Standardized Portfolio Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
            Get in Touch
          </span>
          <span className="w-8 h-px bg-stroke" />
        </div>

        {/* Heading: Editorial sans + Instrument Serif italic accent gradient */}
        <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-text-primary tracking-tight font-light max-w-4xl mb-6 leading-[1.08]">
          Let&apos;s build{' '}
          <span className="font-display italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">
            meaningful
          </span>
          <br className="hidden sm:inline" /> digital experiences together.
        </h2>

        {/* Subtitle Description */}
        <p className="text-xs sm:text-sm md:text-base text-muted font-light leading-relaxed max-w-lg mx-auto mb-10 sm:mb-12">
          I&apos;m currently open to product design roles and select freelance collaborations in healthcare
          <br className="hidden sm:inline" /> and enterprise. Drop a note &mdash; I read every email.
        </p>

        {/* Action Buttons Row using site's pill + glow ring system */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-full">
          {/* Primary Email Button (Solid Pill with Accent Glow Ring) */}
          <a
            href="mailto:ux.varunsurya@gmail.com"
            className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-base font-medium p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
            <span className="relative z-10 inline-flex items-center gap-2 sm:gap-2.5 rounded-full px-5 sm:px-7 py-3 sm:py-3.5 bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary transition-colors duration-300 font-medium">
              <MailIcon size={16} className="currentColor shrink-0" />
              <span className="break-all sm:break-normal">ux.varunsurya@gmail.com</span>
              <span className="text-xs sm:text-base transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          </a>

          {/* Secondary LinkedIn Button (Surface Pill with Accent Glow Ring) */}
          <a
            href="https://www.linkedin.com/in/varunsuryavemula"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-base font-medium p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
            <span className="relative z-10 inline-flex items-center gap-2 sm:gap-2.5 rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 bg-surface border border-stroke text-text-primary group-hover:border-transparent transition-colors duration-300 font-medium">
              <LinkedinIcon size={16} className="text-text-primary shrink-0" />
              <span>LinkedIn</span>
            </span>
          </a>

          {/* Secondary Behance Button (Surface Pill with Accent Glow Ring) */}
          <a
            href="https://www.behance.net/varunsurya1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-base font-medium p-[1.5px] transition-transform duration-300 hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
            <span className="relative z-10 inline-flex items-center gap-2 sm:gap-2.5 rounded-full px-4 sm:px-6 py-2.5 sm:py-3.5 bg-surface border border-stroke text-text-primary group-hover:border-transparent transition-colors duration-300 font-medium">
              <BehanceIcon size={16} className="text-text-primary shrink-0" />
              <span>Behance</span>
            </span>
          </a>
        </div>
      </motion.div>

      {/* Footer Bar */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-10 lg:px-16 pt-12 border-t border-stroke/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Status: Green pulsing dot */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs sm:text-sm text-text-primary/90 font-medium">
            Available for product design roles &amp; collaborations
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted hover:text-text-primary transition-colors font-medium hover:underline underline-offset-4"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Right Info */}
        <div className="text-xs text-muted/60 font-mono">
          &copy; {new Date().getFullYear()} Varun Surya Vemula &bull; Hyderabad, IN
        </div>
      </div>
    </footer>
  );
};

