import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ['Research', 'Design', 'Prototype', 'Engineer'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Counter animation via requestAnimationFrame with safeguard
  useEffect(() => {
    let animId: number;
    let timerId: ReturnType<typeof setTimeout>;
    let startTime: number | null = null;
    const duration = 2600; // 2600ms

    const finish = () => {
      setCount(100);
      onCompleteRef.current();
    };

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Eased progress for smooth numerical progression
      const current = Math.floor(progress * 100);
      setCount(current);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setCount(100);
        timerId = setTimeout(finish, 350);
      }
    };

    animId = requestAnimationFrame(animate);

    // Safeguard: guaranteed completion even if requestAnimationFrame throttles
    const safetyTimer = setTimeout(finish, 3200);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timerId);
      clearTimeout(safetyTimer);
    };
  }, []);

  // Word cycling every 700ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }}
      onClick={() => onCompleteRef.current()}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-14 select-none overflow-hidden cursor-pointer"
      title="Click to skip"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between w-full">
        <motion.span
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-medium"
        >
          Varun Surya
        </motion.span>
        <span className="text-xs text-muted/60 uppercase tracking-[0.2em]">
          v2.6 &bull; 2026
        </span>
      </div>

      {/* Center Rotating Words */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="h-20 sm:h-24 md:h-28 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[wordIndex]}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 text-center"
            >
              {words[wordIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar: Counter on Bottom-Right */}
      <div className="flex items-end justify-between w-full pb-4">
        <div className="text-xs text-muted/60 max-w-[260px] hidden sm:block">
          Product &amp; UI/UX Portfolio &mdash; Varun Surya Vemula
        </div>
        <div className="ml-auto text-right">
          <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums tracking-tight leading-none">
            {String(count).padStart(3, '0')}
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div
          className="h-full w-full accent-gradient origin-left transition-transform duration-75 ease-out"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
        />
      </div>
    </motion.div>
  );
};
