import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      title: 'UX Design',
      skills: ['User Flows', 'Wireframing', 'Prototyping', 'Information Architecture']
    },
    {
      title: 'UI Design',
      skills: ['Visual Design', 'Design Systems', 'Typography', 'Interactive Prototypes']
    },
    {
      title: 'Research',
      skills: ['User Testing', 'Competitor Analysis', 'User Personas', 'A/B Testing']
    },
    {
      title: 'Frontend',
      skills: ['HTML / CSS', 'JavaScript', 'React', 'Framer Motion']
    },
    {
      title: 'Tools',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          My <span className="text-gradient">Skills</span>
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="skills-grid"
        >
          {skillCategories.map((category, idx) => (
            <motion.div key={idx} variants={itemVariants} className="skill-category-card glass">
              <h3 className="skill-title">{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, sIdx) => (
                  <motion.span 
                    key={sIdx} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + sIdx * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="skill-tag"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
