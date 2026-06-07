import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ArrowRight, Layout, Target, Users, LayoutDashboard, 
  Search, Smartphone, Settings, ShieldCheck, CheckCircle, 
  Clock, Zap, ThumbsUp, ChevronRight, Mail, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import { caseStudies } from './CaseStudies';
import './CaseStudyDetail.css';

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
            <Link to="/" className="back-link animate-fade-down">
              <ArrowLeft size={20} /> Back to Portfolio
            </Link>
            <div className="hero-content animate-fade-up">
              <span className="case-study-category-badge">{project.category}</span>
              <h1 className="hero-title">{project.title}</h1>
              <p className="hero-subtitle">{project.description}</p>
            </div>
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

  return (
    <div className="case-study-detail-page dark-mode-support">
      
      {/* 1. Hero Section */}
      <section className="cs-hero">
        <div className="container cs-hero-container">
          <Link to="/" className="back-link animate-fade-down">
            <ArrowLeft size={20} /> Back
          </Link>
          
          <div className="cs-hero-grid">
            <div className="cs-hero-content animate-fade-up">
              <span className="cs-category">{details.projectType}</span>
              <h1 className="cs-title">{project.title}</h1>
              <p className="cs-subtitle">{project.description}</p>
              
              <div className="cs-metrics">
                {details.metrics.map((metric, idx) => (
                  <div key={idx} className="cs-metric-pill">
                    <CheckCircle size={16} className="text-primary" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="cs-hero-meta animate-fade-up" style={{ animationDelay: '0.1s' }}>
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
            </div>
          </div>
        </div>

        <div className="cs-banner-wrapper animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <img src={project.bannerImage} alt="Project Banner" className="cs-banner-image" />
          <div className="cs-device-mockup glass">
            <img src={project.image} alt="App Mockup" />
          </div>
        </div>
      </section>

      {/* 2. Project Overview */}
      <section className="cs-section bg-secondary">
        <div className="container cs-overview-grid">
          <div className="cs-overview-card animate-fade-up">
            <div className="icon-wrapper glass-icon"><Target size={28} /></div>
            <h2>The Problem</h2>
            <p>{details.overview.problem}</p>
          </div>
          <div className="cs-overview-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="icon-wrapper glass-icon"><Layout size={28} /></div>
            <h2>The Goal</h2>
            <p>{details.overview.goal}</p>
          </div>
        </div>
      </section>

      {/* 3. Research Section */}
      <section className="cs-section">
        <div className="container">
          <h2 className="section-title">User Research</h2>
          <div className="cs-research-grid">
            <div className="cs-research-card glass animate-fade-up">
              <Users size={24} className="text-primary mb-4" />
              <h3>Interviews</h3>
              <p>{details.research.interviews}</p>
            </div>
            <div className="cs-research-card glass animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <Search size={24} className="text-primary mb-4" />
              <h3>Observations</h3>
              <p>{details.research.observations}</p>
            </div>
            <div className="cs-research-card glass animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <ShieldCheck size={24} className="text-primary mb-4" />
              <h3>Stakeholders</h3>
              <p>{details.research.stakeholders}</p>
            </div>
          </div>

          <div className="cs-findings-container glass animate-fade-up">
            <h3>Key Findings</h3>
            <div className="cs-findings-list">
              {details.research.keyFindings.map((finding, idx) => (
                <div key={idx} className="finding-item">
                  <div className="finding-number">0{idx + 1}</div>
                  <p>{finding}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. User Flow Section */}
      <section className="cs-section bg-secondary">
        <div className="container">
          <h2 className="section-title">User Flow</h2>
          <div className="cs-flow-container overflow-x-auto pb-4">
            <div className="cs-flowchart">
              {['Login', 'Dashboard', 'Patient List', 'Patient Details', 'Report Review', 'Submit Report'].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="flow-step glass">
                    <span>{step}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="flow-arrow">
                      <ChevronRight size={24} className="text-primary" />
                    </div>
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
          <h2 className="section-title">Wireframes</h2>
          <div className="cs-wireframes-grid">
            <div className="wireframe-card animate-fade-up">
              <div className="wireframe-img-wrapper">
                <img src={details.wireframes.lofi} alt="Low Fidelity Wireframes" loading="lazy" />
              </div>
              <div className="wireframe-caption">Low-fidelity wireframes</div>
            </div>
            <div className="wireframe-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="wireframe-img-wrapper">
                <img src={details.wireframes.midfi} alt="Mid Fidelity Wireframes" loading="lazy" />
              </div>
              <div className="wireframe-caption">Mid-fidelity wireframes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Design Exploration */}
      <section className="cs-section bg-secondary cs-design-system">
        <div className="container">
          <h2 className="section-title">Design Exploration</h2>
          <div className="cs-ds-grid">
            
            <div className="ds-card glass animate-fade-up">
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
            </div>

            <div className="ds-card glass animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <h3>Color Palette</h3>
              <div className="color-palette">
                {details.designExploration.colors.map((color, idx) => (
                  <div key={idx} className="color-swatch-wrapper">
                    <div className="color-swatch" style={{ backgroundColor: color }}></div>
                    <span className="color-hex">{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ds-card glass animate-fade-up cs-components-demo" style={{ animationDelay: '0.2s' }}>
              <h3>Components</h3>
              <div className="components-preview">
                <button className="btn btn-primary mb-4 w-full">Primary Button</button>
                <div className="demo-input glass">Patient Name</div>
                <div className="demo-toggle">
                  <span>Push Notifications</span>
                  <div className="toggle-switch active"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Final UI Screens */}
      <section className="cs-section cs-final-ui">
        <div className="container">
          <h2 className="section-title">Final UI Screens</h2>
          <div className="ui-gallery-grid">
            {details.finalScreens.map((screen, idx) => (
              <div key={idx} className="ui-screen-card animate-fade-up" style={{ animationDelay: `${(idx % 3) * 0.1}s` }}>
                <div className="ui-image-wrapper">
                  <img src={screen.image} alt={screen.name} loading="lazy" />
                  <div className="ui-hover-overlay">
                    <ImageIcon size={32} />
                  </div>
                </div>
                <h4>{screen.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Key Design Decisions */}
      <section className="cs-section bg-secondary">
        <div className="container">
          <h2 className="section-title">Key Design Decisions</h2>
          <div className="cs-decisions-grid">
            {details.keyDecisions.map((decision, idx) => (
              <div key={idx} className="decision-card glass animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="decision-icon">
                  {idx === 0 && <LayoutDashboard size={24} />}
                  {idx === 1 && <Settings size={24} />}
                  {idx === 2 && <Zap size={24} />}
                  {idx === 3 && <Smartphone size={24} />}
                </div>
                <h3>{decision.title}</h3>
                <p>{decision.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Challenges & Solutions */}
      <section className="cs-section">
        <div className="container">
          <h2 className="section-title">Challenges & Solutions</h2>
          <div className="cs-challenges-list">
            {details.challengesSolutions.map((item, idx) => (
              <div key={idx} className="challenge-solution-row glass animate-fade-up">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Outcome & Impact */}
      <section className="cs-section bg-secondary">
        <div className="container">
          <h2 className="section-title">Outcome & Impact</h2>
          <div className="cs-metrics-grid">
            {details.outcomes.map((outcome, idx) => (
              <div key={idx} className="impact-card glass animate-fade-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="impact-icon">
                  {idx === 0 && <Clock size={28} className="text-primary" />}
                  {idx === 1 && <ThumbsUp size={28} className="text-primary" />}
                  {idx === 2 && <Zap size={28} className="text-primary" />}
                  {idx === 3 && <Users size={28} className="text-primary" />}
                </div>
                <h3 className="impact-metric">{outcome.metric}</h3>
                <p className="impact-label">{outcome.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Lessons Learned */}
      <section className="cs-section">
        <div className="container cs-lessons-container">
          <div className="cs-lessons-card glass animate-fade-up">
            <h2>Lessons Learned</h2>
            <ul className="lessons-list">
              {details.lessonsLearned.map((lesson, idx) => (
                <li key={idx}>
                  <CheckCircle size={20} className="text-primary flex-shrink-0" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </div>
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
          <h2 className="animate-fade-up">Interested in working together?</h2>
          <div className="contact-buttons animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <a href="mailto:hello@example.com" className="btn btn-primary btn-large">
              <Mail size={20} className="mr-2" /> Contact Me
            </a>
            <Link to="/" className="btn btn-secondary btn-large">
              View More Projects <ExternalLink size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CaseStudyDetail;
