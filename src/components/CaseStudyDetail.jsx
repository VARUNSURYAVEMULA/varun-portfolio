import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Layout, Target, Users, LayoutDashboard, 
  Search, Smartphone, Settings, ShieldCheck, CheckCircle, 
  Clock, Zap, ThumbsUp, ChevronRight, Mail, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import { caseStudies } from './CaseStudies';
import './CaseStudyDetail.css';

const StatCounter = ({ value, label, icon }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="impact-card glass"
    >
      <div className="impact-icon">{icon}</div>
      <h3 className="impact-metric">{value}</h3>
      <p className="impact-label">{label}</p>
    </motion.div>
  );
};

const CaseStudyDetail = () => {
  const { id } = useParams();
  const project = caseStudies.find(p => p.id === parseInt(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="case-study-not-found container section">
        <h2>Project not found</h2>
        <Link to="/" className="btn btn-primary mt-4 inline-flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  // Fallback to basic layout if details aren't present (for other case studies)
  if (!project.details) {
    return (
      <div className="case-study-detail-page">
        <section className="case-study-hero" style={{ backgroundImage: `url(${project.image})` }}>
          <div className="hero-overlay"></div>
          <div className="container relative z-10">
            <Link to="/" className="back-link">
              <ArrowLeft size={20} /> Back to Portfolio
            </Link>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-content"
            >
              <span className="case-study-category-badge">{project.category}</span>
              <h1 className="hero-title">{project.title}</h1>
              <p className="hero-subtitle">{project.description}</p>
            </motion.div>
          </div>
        </section>
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Detailed case study coming soon.</h2>
            <Link to="/" className="btn btn-primary mt-4 inline-flex items-center gap-2">
              <ArrowLeft size={20} /> Back to Portfolio
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const { details } = project;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="case-study-detail-page dark-mode-support">
      
      {/* 1. Hero Section */}
      <section className="cs-hero">
        <div className="container cs-hero-container">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/" className="back-link">
              <ArrowLeft size={20} /> Back
            </Link>
          </motion.div>
          
          <div className="cs-hero-grid">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="cs-hero-content"
            >
              <span className="cs-category">{details.projectType}</span>
              <h1 className="cs-title">{project.title}</h1>
              <p className="cs-subtitle">{project.description}</p>
              
              <div className="cs-metrics">
                {details.metrics.map((metric, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    key={idx} 
                    className="cs-metric-pill"
                  >
                    <CheckCircle size={16} className="text-primary" />
                    <span>{metric}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6 } } }}
              className="cs-hero-meta"
            >
              <div className="meta-item">
                <span className="meta-label">Role</span>
                <span className="meta-value">{details.role}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Duration</span>
                <span className="meta-value">{details.duration}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Tools</span>
                <span className="meta-value">{details.tools}</span>
              </div>
              {details.team && (
                <div className="meta-item">
                  <span className="meta-label">Team</span>
                  <span className="meta-value" style={{ whiteSpace: 'pre-line' }}>{details.team}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="cs-banner-wrapper"
        >
          <img src={project.bannerImage} alt="Project Banner" className="cs-banner-image" />
          <motion.div 
            whileHover={{ y: -5 }}
            className="cs-device-mockup glass"
          >
            <img src={project.image} alt="App Mockup" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Project Overview */}
      <section className="cs-section bg-secondary">
        <div className="container cs-overview-grid">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="cs-overview-card"
          >
            <div className="icon-wrapper glass-icon"><Target size={28} /></div>
            <h2>The Problem</h2>
            <p>{details.overview.problem}</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6 } } }}
            className="cs-overview-card"
          >
            <div className="icon-wrapper glass-icon"><Layout size={28} /></div>
            <h2>The Goal</h2>
            <p>{details.overview.goal}</p>
          </motion.div>
        </div>
      </section>

      {/* 3. Research Section */}
      <section className="cs-section">
        <div className="container">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="section-title"
          >User Research</motion.h2>
          <div className="cs-research-grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="cs-research-card glass">
              <Users size={24} className="text-primary mb-4" />
              <h3>Interviews</h3>
              <p>{details.research.interviews}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="cs-research-card glass">
              <Search size={24} className="text-primary mb-4" />
              <h3>Observations</h3>
              <p>{details.research.observations}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="cs-research-card glass">
              <ShieldCheck size={24} className="text-primary mb-4" />
              <h3>Stakeholders</h3>
              <p>{details.research.stakeholders}</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cs-findings-container glass"
          >
            <h3>Key Findings</h3>
            <div className="cs-findings-list">
              {details.research.keyFindings.map((finding, idx) => (
                <div key={idx} className="finding-item">
                  <div className="finding-number">0{idx + 1}</div>
                  <p>{finding}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. User Flow Section */}
      <section className="cs-section bg-secondary">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="section-title">User Flow</motion.h2>
          <div className="cs-flow-container overflow-x-auto pb-4">
            <div className="cs-flowchart">
              {['Login', 'Dashboard', 'Patient List', 'Patient Details', 'Report Review', 'Submit Report'].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flow-step glass"
                  >
                    <span>{step}</span>
                  </motion.div>
                  {idx < arr.length - 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.05 }}
                      className="flow-arrow"
                    >
                      <ChevronRight size={24} className="text-primary" />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Wireframe Section */}
      <section className="cs-section">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="section-title">Wireframes</motion.h2>
          <div className="cs-wireframes-grid">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="wireframe-card"
            >
              <div className="wireframe-img-wrapper">
                <motion.img whileHover={{ scale: 1.05 }} src={details.wireframes.lofi} alt="Low Fidelity Wireframes" loading="lazy" />
              </div>
              <div className="wireframe-caption">Low-fidelity wireframes</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="wireframe-card"
            >
              <div className="wireframe-img-wrapper">
                <motion.img whileHover={{ scale: 1.05 }} src={details.wireframes.midfi} alt="Mid Fidelity Wireframes" loading="lazy" />
              </div>
              <div className="wireframe-caption">Mid-fidelity wireframes</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. Design Exploration */}
      <section className="cs-section bg-secondary cs-design-system">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="section-title">Design Exploration</motion.h2>
          <div className="cs-ds-grid">
            
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="ds-card glass">
              <h3>Typography</h3>
              <div className="typography-showcase">
                <div className="type-row">
                  <span className="type-label">Aa</span>
                  <div className="type-details">
                    <span className="type-name">{details.designExploration.typography.primary}</span>
                    <span className="type-weights">Regular, Medium, Bold</span>
                  </div>
                </div>
                <h1 className="demo-h1">Heading 1</h1>
                <p className="demo-p">Body text representing the patient information and reporting details.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="ds-card glass">
              <h3>Color Palette</h3>
              <div className="color-palette">
                {details.designExploration.colors.map((color, idx) => (
                  <motion.div whileHover={{ scale: 1.05 }} key={idx} className="color-swatch-wrapper">
                    <div className="color-swatch" style={{ backgroundColor: color }}></div>
                    <span className="color-hex">{color}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="ds-card glass cs-components-demo">
              <h3>Components</h3>
              <div className="components-preview">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn btn-primary mb-4 w-full">Primary Button</motion.button>
                <div className="demo-input glass">Patient Name</div>
                <div className="demo-toggle">
                  <span>Push Notifications</span>
                  <motion.div layout className="toggle-switch active"></motion.div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. Final UI Screens */}
      <section className="cs-section cs-final-ui">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="section-title">Final UI Screens</motion.h2>
          <div className="ui-gallery-grid">
            {details.finalScreens.map((screen, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (idx % 3) * 0.1 }}
                key={idx} 
                className="ui-screen-card"
              >
                <div className="ui-image-wrapper">
                  <motion.img whileHover={{ scale: 1.03 }} src={screen.image} alt={screen.name} loading="lazy" />
                  <div className="ui-hover-overlay">
                    <ImageIcon size={32} />
                  </div>
                </div>
                <h4>{screen.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Key Design Decisions */}
      <section className="cs-section bg-secondary">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="section-title">Key Design Decisions</motion.h2>
          <div className="cs-decisions-grid">
            {details.keyDecisions.map((decision, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                key={idx} 
                className="decision-card glass"
              >
                <div className="decision-icon">
                  {idx === 0 && <LayoutDashboard size={24} />}
                  {idx === 1 && <Settings size={24} />}
                  {idx === 2 && <Zap size={24} />}
                  {idx === 3 && <Smartphone size={24} />}
                </div>
                <h3>{decision.title}</h3>
                <p>{decision.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Challenges & Solutions */}
      <section className="cs-section">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="section-title">Challenges & Solutions</motion.h2>
          <div className="cs-challenges-list">
            {details.challengesSolutions.map((item, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                key={idx} 
                className="challenge-solution-row glass"
              >
                <div className="challenge-col">
                  <span className="cs-label text-error">Challenge</span>
                  <p>{item.challenge}</p>
                </div>
                <div className="arrow-col">
                  <ArrowRight className="text-primary hidden-mobile" size={24} />
                  <ArrowRight className="text-primary hidden-desktop rotate-90" size={24} />
                </div>
                <div className="solution-col">
                  <span className="cs-label text-success">Solution</span>
                  <p>{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Outcome & Impact */}
      <section className="cs-section bg-secondary">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="section-title">Outcome & Impact</motion.h2>
          <div className="cs-metrics-grid">
            {details.outcomes.map((outcome, idx) => {
              const icons = [
                <Clock size={28} className="text-primary" />,
                <ThumbsUp size={28} className="text-primary" />,
                <Zap size={28} className="text-primary" />,
                <Users size={28} className="text-primary" />
              ];
              return (
                <StatCounter 
                  key={idx} 
                  value={outcome.metric} 
                  label={outcome.label} 
                  icon={icons[idx % icons.length]} 
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Lessons Learned */}
      <section className="cs-section">
        <div className="container cs-lessons-container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="cs-lessons-card glass"
          >
            <h2>Lessons Learned</h2>
            <ul className="lessons-list">
              {details.lessonsLearned.map((lesson, idx) => (
                <motion.li 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx}
                >
                  <CheckCircle size={20} className="text-primary flex-shrink-0" />
                  <span>{lesson}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* 12. Next Project Navigation */}
      <section className="cs-project-nav border-top">
        <div className="container nav-grid">
          <Link to={`/case-study/${project.id > 1 ? project.id - 1 : caseStudies.length}`} className="nav-card prev-card glass">
            <span className="nav-label"><ArrowLeft size={16} /> Previous Project</span>
            <h3>{caseStudies[project.id > 1 ? project.id - 2 : caseStudies.length - 1]?.title || 'Previous Work'}</h3>
          </Link>
          <Link to={`/case-study/${project.id < caseStudies.length ? project.id + 1 : 1}`} className="nav-card next-card glass">
            <span className="nav-label">Next Project <ArrowRight size={16} /></span>
            <h3>{caseStudies[project.id < caseStudies.length ? project.id : 0]?.title || 'Next Work'}</h3>
          </Link>
        </div>
      </section>

      {/* 13. Contact Section */}
      <section className="cs-contact bg-secondary text-center">
        <div className="container">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>Interested in working together?</motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="contact-buttons"
          >
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:hello@example.com" className="btn btn-primary btn-large">
              <Mail size={20} className="mr-2" /> Contact Me
            </motion.a>
            <motion.Link whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} to="/" className="btn btn-secondary btn-large">
              View More Projects <ExternalLink size={20} className="ml-2" />
            </motion.Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default CaseStudyDetail;
