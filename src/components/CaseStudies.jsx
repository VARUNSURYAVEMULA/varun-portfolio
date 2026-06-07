import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CaseStudies.css';

export const caseStudies = [
  {
    id: 1,
    title: 'Radiologist Mobile App',
    category: 'Healthcare UI',
    description: 'A comprehensive application streamlining radiologist workflows, improving diagnosis speed, and enhancing patient data visualization.',
    tags: ['Healthcare', 'Mobile App', 'Wireframes'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1600',
    details: {
      projectType: 'Healthcare Mobile Application',
      role: 'UI/UX Designer',
      duration: '3 Months',
      tools: 'Figma, Photoshop, Illustrator',
      metrics: [
        'Healthcare Platform',
        'Mobile Application',
        'User-Centered Design',
        'End-to-End UX Process'
      ],
      overview: {
        problem: 'Radiologists spend significant time navigating complex systems, leading to inefficiencies and increased cognitive load.',
        goal: 'Design an intuitive mobile experience that enables radiologists to review reports, manage tasks, and access patient information efficiently.'
      },
      research: {
        interviews: 'Conducted in-depth interviews with radiologists to understand their daily workflows and pain points.',
        observations: 'Shadowed radiologists during their shifts to observe their interactions with existing systems in real-time.',
        stakeholders: 'Regular discussions with hospital administrators and IT staff to align on technical constraints and security requirements.',
        keyFindings: [
          'Too many clicks',
          'Poor navigation',
          'Difficult report access',
          'Information overload'
        ]
      },
      wireframes: {
        lofi: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
        midfi: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
      },
      designExploration: {
        typography: { primary: 'Inter', secondary: 'Inter' },
        colors: ['#0ea5e9', '#0f172a', '#f8fafc', '#10b981'],
      },
      finalScreens: [
        { name: 'Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
        { name: 'Patient List', image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?auto=format&fit=crop&q=80&w=600' },
        { name: 'Patient Details', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600' },
        { name: 'Report Review', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600' },
        { name: 'Notifications', image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600' },
        { name: 'Profile', image: 'https://images.unsplash.com/photo-1544256718-3b61023b49e3?auto=format&fit=crop&q=80&w=600' }
      ],
      keyDecisions: [
        { title: 'Simplified Navigation', desc: 'Reduced navigation complexity.' },
        { title: 'Improved Readability', desc: 'Enhanced typography and hierarchy.' },
        { title: 'Faster Workflows', desc: 'Reduced steps required to complete tasks.' },
        { title: 'Better Accessibility', desc: 'Improved touch targets and contrast.' }
      ],
      challengesSolutions: [
        { challenge: 'Managing large amounts of medical information', solution: 'Introduced progressive disclosure and collapsible sections.' }
      ],
      outcomes: [
        { metric: 'Reduced', label: 'Task completion time' },
        { metric: 'Improved', label: 'Usability' },
        { metric: 'Increased', label: 'Efficiency' },
        { metric: 'Better', label: 'User satisfaction' }
      ],
      lessonsLearned: [
        'User research importance',
        'Healthcare UX considerations',
        'Accessibility improvements',
        'Design system consistency'
      ]
    }
  },
  {
    id: 2,
    title: 'Employee Tracker',
    category: 'Enterprise SaaS',
    description: 'An intuitive dashboard for tracking employee performance, attendance, and project allocation in hospital environments.',
    tags: ['Dashboard', 'Web App', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    details: {
      projectType: 'Enterprise Dashboard Design',
      role: 'Lead UX Designer',
      duration: '4 Months',
      tools: 'Figma, Miro, React',
      team: '1 UX Designer\n3 Engineers',
      metrics: [
        'B2B SaaS',
        'Data Visualization',
        'User Management',
        'Productivity'
      ],
      overview: {
        problem: 'Hospital HR and administration were relying on fragmented spreadsheets to track shift allocations and performance, leading to staffing shortages and burnout.',
        goal: 'Consolidate employee tracking into a centralized, easy-to-read dashboard that provides actionable insights to management.'
      },
      research: {
        interviews: 'Interviewed HR managers and department heads to map their current workflows and pain points.',
        observations: 'Analyzed existing spreadsheet structures to identify critical data points and redundancies.',
        stakeholders: 'Collaborated with compliance officers to ensure HIPAA compliance for employee health records.',
        keyFindings: [
          'Fragmented data sources',
          'Lack of real-time visibility',
          'Cumbersome reporting',
          'High learning curve'
        ]
      },
      wireframes: {
        lofi: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
        midfi: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
      },
      designExploration: {
        typography: { primary: 'Roboto', secondary: 'Inter' },
        colors: ['#3b82f6', '#1e293b', '#f1f5f9', '#f59e0b'],
      },
      finalScreens: [
        { name: 'Main Dashboard', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Employee Roster', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
        { name: 'Shift Scheduling', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600' },
        { name: 'Performance Metrics', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600' },
        { name: 'Leave Management', image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600' },
        { name: 'Reports Generation', image: 'https://images.unsplash.com/photo-1544256718-3b61023b49e3?auto=format&fit=crop&q=80&w=600' }
      ],
      keyDecisions: [
        { title: 'Data Visualization', desc: 'Used clear charts to present complex shift data.' },
        { title: 'Bulk Actions', desc: 'Implemented multi-select for faster shift assignments.' },
        { title: 'Predictive Alerts', desc: 'Added warnings for potential staffing shortages.' },
        { title: 'Customizable Views', desc: 'Allowed users to save custom dashboard layouts.' }
      ],
      challengesSolutions: [
        { challenge: 'Visualizing overlapping shift schedules clearly', solution: 'Designed a Gantt-style timeline view with color-coded shift types.' }
      ],
      outcomes: [
        { metric: '50%', label: 'Reduction in scheduling conflicts' },
        { metric: '20hrs', label: 'Saved per week on reporting' },
        { metric: '90%', label: 'Adoption rate' },
        { metric: '3x', label: 'Faster shift allocation' }
      ],
      lessonsLearned: [
        'Data density requires careful typographical hierarchy',
        'Enterprise users value efficiency over flashy aesthetics',
        'Bulk actions are essential for power users',
        'Continuous feedback loops improve data viz'
      ]
    }
  },
  {
    id: 3,
    title: 'Blood Donation App - Life Line',
    category: 'Healthcare UI',
    description: 'A life-saving mobile platform connecting blood donors with recipients in real-time during emergencies.',
    tags: ['UX Research', 'Mobile App', 'Visual Design'],
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1600',
    details: {
      projectType: 'Social Impact Application',
      role: 'Product Designer',
      duration: '6 Weeks',
      tools: 'Figma, Principle',
      metrics: [
        'Social Impact',
        'Real-time Matching',
        'Mobile First',
        'Accessibility'
      ],
      overview: {
        problem: 'During medical emergencies, finding matched blood donors quickly is incredibly difficult and relies on chaotic social media blasts.',
        goal: 'Create an app that seamlessly connects verified donors with patients in their vicinity through real-time notifications.'
      },
      research: {
        interviews: 'Conducted interviews with frequent donors and families of patients who faced blood shortages.',
        observations: 'Analyzed the response times and effectiveness of WhatsApp and Facebook donor requests.',
        stakeholders: 'Consulted with blood bank managers to understand supply chain logistics.',
        keyFindings: [
          'High anxiety during emergencies',
          'Lack of verified donor lists',
          'Geographical distance issues',
          'Donor eligibility confusion'
        ]
      },
      wireframes: {
        lofi: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
        midfi: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
      },
      designExploration: {
        typography: { primary: 'Outfit', secondary: 'Inter' },
        colors: ['#ef4444', '#1f2937', '#ffffff', '#10b981'],
      },
      finalScreens: [
        { name: 'Emergency Request', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
        { name: 'Donor Map', image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?auto=format&fit=crop&q=80&w=600' },
        { name: 'Eligibility Quiz', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600' },
        { name: 'Donation History', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600' },
        { name: 'Community Leaderboard', image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600' },
        { name: 'Profile Settings', image: 'https://images.unsplash.com/photo-1544256718-3b61023b49e3?auto=format&fit=crop&q=80&w=600' }
      ],
      keyDecisions: [
        { title: 'Urgency Indicators', desc: 'Used color psychology (red) to signify emergency requests.' },
        { title: 'Gamification', desc: 'Introduced badges to encourage repeat donations.' },
        { title: 'Privacy Controls', desc: 'Allowed donors to hide exact locations until matched.' },
        { title: 'Quick Onboarding', desc: 'Reduced signup steps for faster emergency response.' }
      ],
      challengesSolutions: [
        { challenge: 'Preventing donor fatigue from too many notifications', solution: 'Implemented radius-based and blood-type matching filters for alerts.' }
      ],
      outcomes: [
        { metric: '60%', label: 'Faster match rate' },
        { metric: '10k+', label: 'Registered donors' },
        { metric: '4.9', label: 'App store rating' },
        { metric: '100+', label: 'Lives impacted' }
      ],
      lessonsLearned: [
        'Designing for high-stress situations requires extreme simplicity.',
        'Privacy is paramount when dealing with health and location data.',
        'Gamification can significantly boost retention in social impact apps.',
        'Clear feedback loops reduce user anxiety.'
      ]
    }
  },
  {
    id: 5,
    title: 'PropertyWorld',
    category: 'Real Estate Platform',
    description: 'An elegant property browsing and listing platform with advanced filtering and virtual tour capabilities.',
    tags: ['UX Strategy', 'Web App', 'Prototyping'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1600',
    details: {
      projectType: 'Real Estate Marketplace',
      role: 'Senior Product Designer',
      duration: '5 Months',
      tools: 'Figma, Framer',
      team: '2 Designers\n5 Engineers',
      metrics: [
        'Marketplace',
        'Complex Filtering',
        'Map Integration',
        'High-Res Imagery'
      ],
      overview: {
        problem: 'Homebuyers were overwhelmed by cluttered property listings and poor map integrations, making it hard to find homes that met specific criteria.',
        goal: 'Design an immersive, visually stunning property search experience that simplifies discovery through smart filters and map views.'
      },
      research: {
        interviews: 'Spoke with first-time homebuyers and real estate agents to understand their search criteria.',
        observations: 'Watched users attempt to filter properties on competitor sites like Zillow.',
        stakeholders: 'Aligned with brokerages on how to highlight premium listings.',
        keyFindings: [
          'Visuals drive decisions',
          'Map search is preferred',
          'Filters are often hidden',
          'Neighborhood data is missing'
        ]
      },
      wireframes: {
        lofi: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
        midfi: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
      },
      designExploration: {
        typography: { primary: 'Manrope', secondary: 'Inter' },
        colors: ['#0f172a', '#3b82f6', '#f8fafc', '#94a3b8'],
      },
      finalScreens: [
        { name: 'Home Map Search', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=600' },
        { name: 'Property Details', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
        { name: 'Filter Drawer', image: 'https://images.unsplash.com/photo-1576091160550-2173ff9e5eb3?auto=format&fit=crop&q=80&w=600' },
        { name: 'Saved Homes', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600' },
        { name: 'Virtual Tour', image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600' },
        { name: 'Agent Contact', image: 'https://images.unsplash.com/photo-1544256718-3b61023b49e3?auto=format&fit=crop&q=80&w=600' }
      ],
      keyDecisions: [
        { title: 'Split View Search', desc: 'Implemented a side-by-side map and list view for desktop.' },
        { title: 'Immersive Galleries', desc: 'Used edge-to-edge image carousels for property detail pages.' },
        { title: 'Smart Filters', desc: 'Surfaced the most popular filters (price, beds, baths) directly on the search bar.' },
        { title: 'Neighborhood Insights', desc: 'Integrated WalkScore and school ratings directly into listings.' }
      ],
      challengesSolutions: [
        { challenge: 'Loading hundreds of map pins without degrading performance', solution: 'Designed map clustering behavior that groups pins at high zoom levels.' }
      ],
      outcomes: [
        { metric: '3.5x', label: 'More saved properties' },
        { metric: '45%', label: 'Increase in agent leads' },
        { metric: '12m', label: 'Avg session duration' },
        { metric: '#1', label: 'App store in category' }
      ],
      lessonsLearned: [
        'High-quality imagery covers a multitude of sins.',
        'Map interfaces require extensive prototyping to feel natural.',
        'Users want context (schools, transit) as much as property details.',
        'Micro-interactions on hover increase perceived quality.'
      ]
    }
  },
  {
    id: 6,
    title: 'Claim & Fraud Analysis Dashboard',
    category: 'Enterprise SaaS',
    description: 'A complex data visualization dashboard for identifying patterns in insurance claims and detecting fraudulent activities.',
    tags: ['Dashboard', 'Data Viz', 'Enterprise'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    bannerImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    details: {
      projectType: 'FinTech Analytics Dashboard',
      role: 'UX Architect',
      duration: '4 Months',
      tools: 'Figma, d3.js, React',
      metrics: [
        'FinTech',
        'Data Heavy',
        'Complex Workflows',
        'Machine Learning UI'
      ],
      overview: {
        problem: 'Fraud analysts were manually reviewing thousands of claims using outdated legacy software, missing sophisticated fraud rings due to lack of pattern visibility.',
        goal: 'Design a dashboard that leverages AI to flag suspicious claims and provides intuitive network graphs to investigate fraud rings visually.'
      },
      research: {
        interviews: 'Conducted context-inquiry sessions with senior fraud analysts.',
        observations: 'Recorded screen sessions to see how analysts cross-reference multiple databases.',
        stakeholders: 'Worked with data scientists to understand what the ML models were actually outputting.',
        keyFindings: [
          'Tab overload (too many open windows)',
          'Difficulty explaining ML decisions',
          'Lack of visual relationship mapping',
          'High cognitive fatigue'
        ]
      },
      wireframes: {
        lofi: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800',
        midfi: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800',
      },
      designExploration: {
        typography: { primary: 'Inter', secondary: 'Roboto Mono' },
        colors: ['#0f172a', '#334155', '#ef4444', '#eab308'],
      },
      finalScreens: [
        { name: 'Risk Overview', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600' },
        { name: 'Claim Detail', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600' },
        { name: 'Network Graph', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600' },
        { name: 'ML Explainability', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=600' },
        { name: 'Batch Actions', image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=600' },
        { name: 'Audit Logs', image: 'https://images.unsplash.com/photo-1544256718-3b61023b49e3?auto=format&fit=crop&q=80&w=600' }
      ],
      keyDecisions: [
        { title: 'Explainable AI UI', desc: 'Designed panels that explain exactly why a claim was flagged (e.g., "Mismatched IP address").' },
        { title: 'Network Visualization', desc: 'Implemented interactive node graphs to show links between perpetrators.' },
        { title: 'Dark Mode First', desc: 'Defaulted to dark mode to reduce eye strain for analysts looking at screens 8 hours a day.' },
        { title: 'Monospace Data', desc: 'Used monospace fonts for monetary values and IDs to ensure perfect alignment.' }
      ],
      challengesSolutions: [
        { challenge: 'Displaying complex ML confidence scores intuitively', solution: 'Used a simple "Risk Score" (1-100) with color-coded severity tiers.' }
      ],
      outcomes: [
        { metric: '$12M', label: 'Fraud prevented in Q1' },
        { metric: '60%', label: 'Reduction in false positives' },
        { metric: '80%', label: 'Faster investigation time' },
        { metric: '100%', label: 'Compliance achieved' }
      ],
      lessonsLearned: [
        'AI needs to explain itself to be trusted by human experts.',
        'Dark mode is not just an aesthetic; it is an ergonomic necessity for some tools.',
        'Complex node graphs require excellent filtering to be useful.',
        'Data tables still reign supreme in enterprise software.'
      ]
    }
  }
];

import { motion } from 'framer-motion';

const CaseStudies = () => {
  return (
    <section id="work" className="case-studies-section">
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Featured <span className="text-gradient">Case Studies</span>
        </motion.h2>

        <div className="case-studies-grid">
          {caseStudies.map((project, idx) => (
            <motion.div 
              key={project.id} 
              className="case-study-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.15 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <div className="case-study-image-wrapper" style={{ overflow: 'hidden' }}>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={project.image} 
                  alt={project.title} 
                  className="case-study-image" 
                  loading="lazy" 
                />
                <div className="case-study-overlay">
                  <button className="btn btn-primary">View Project</button>
                </div>
              </div>
              <div className="case-study-content">
                <span className="case-study-category">{project.category}</span>
                <h3 className="case-study-title">{project.title}</h3>
                <p className="case-study-desc">{project.description}</p>
                <div className="case-study-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/case-study/${project.id}`} className="view-case-study-link">
                  Read Case Study <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
