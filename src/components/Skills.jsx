import React from 'react';
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
      skills: ['HTML', 'CSS / SCSS', 'JavaScript', 'React (Basic)']
    },
    {
      title: 'Tools',
      skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator']
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">
          My <span className="text-gradient">Skills</span>
        </h2>

        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skill-category-card glass animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <h3 className="skill-title">{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
