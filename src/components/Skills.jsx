import React, { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { Palette, MousePointerClick, Search, Code, CheckCircle2 } from 'lucide-react';
import './Skills.css';

const skillCategories = [
  {
    title: 'UX Design',
    desc: 'Creating intuitive user journeys and architecture.',
    icon: <MousePointerClick size={24} />,
    skills: ['User Flows', 'Wireframing', 'Information Architecture', 'Prototyping']
  },
  {
    title: 'UI Design',
    desc: 'Crafting beautiful, accessible, and systemic visuals.',
    icon: <Palette size={24} />,
    skills: ['Visual Design', 'Typography', 'Design Systems', 'Interactive Prototypes']
  },
  {
    title: 'Research',
    desc: 'Understanding user needs and validating solutions.',
    icon: <Search size={24} />,
    skills: ['User Interviews', 'Personas', 'Competitor Analysis', 'Usability Testing', 'A/B Testing']
  },
  {
    title: 'Frontend',
    desc: 'Bridging design and engineering with code.',
    icon: <Code size={24} />,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Framer Motion']
  }
];

const SkillChip = ({ skill, index, isHoveringCard }) => {
  const [isPulsing, setIsPulsing] = useState(false);

  // Infinite floating animation properties (Memoized to prevent jitter on hover re-renders)
  const { floatY, floatDuration, floatDelay } = React.useMemo(() => ({
    floatY: Math.random() * 6 - 3,
    floatDuration: 3 + Math.random() * 2,
    floatDelay: Math.random() * 2
  }), []);

  // Random pulse effect
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      // 5% chance to pulse every 6 seconds per chip
      if (Math.random() < 0.05) {
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 1000);
      }
    }, 6000);
    return () => clearInterval(pulseInterval);
  }, []);

  return (
    <motion.div
      layout
      className="skill-chip-wrapper"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.1 + index * 0.05,
        duration: 0.4
      }}
    >
      <motion.button
        className="skill-chip"
        animate={{
          y: [0, floatY, 0],
          scale: isPulsing ? [1, 1.05, 1] : [1, 1.03, 1],
          boxShadow: isPulsing ? "0 0 15px rgba(59, 130, 246, 0.4)" : "none"
        }}
        transition={{
          y: {
            duration: isHoveringCard ? floatDuration * 0.5 : floatDuration,
            repeat: Infinity,
            repeatType: "mirror",
            // ease: "easeInOut",
            delay: floatDelay
          },
          scale: {
            duration: isPulsing ? 1 : (isHoveringCard ? floatDuration * 0.5 : floatDuration),
            repeat: isPulsing ? 0 : Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: floatDelay
          },
          boxShadow: {
            duration: 1
          }
        }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Skill: ${skill}`}
      >
        <span className="chip-icon">
          <CheckCircle2 size={14} />
        </span>
        <span className="chip-text">{skill}</span>
      </motion.button>
    </motion.div>
  );
};

const BentoCard = ({ category, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="skill-bento-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      tabIndex={0}
      aria-label={`${category.title} skills`}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s ease',
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.08),
              transparent 80%
            )
          `,
          zIndex: 0,
          borderRadius: '20px'
        }}
      />
      <div className="card-content-wrapper">
        <div className="skill-icon-header">
          {category.icon}
        </div>
        <h3 className="skill-bento-title">{category.title}</h3>
        <p className="skill-bento-desc">{category.desc}</p>

        <div className="skill-chips-container">
          <AnimatePresence>
            {category.skills.map((skill, idx) => (
              <SkillChip
                key={skill}
                skill={skill}
                index={idx}
                isHoveringCard={isHovering}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="skills-header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-title"
            style={{ marginBottom: '1rem' }}
          >
            My <span className="text-gradient">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="skills-subtitle"
          >
            A combination of design thinking, visual craftsmanship, research, and frontend development.
          </motion.p>
        </div>

        <div className="skills-bento-grid">
          {skillCategories.map((category, idx) => (
            <BentoCard key={category.title} category={category} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
