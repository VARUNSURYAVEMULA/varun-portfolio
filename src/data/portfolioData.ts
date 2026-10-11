import { Project, JournalEntry, ExplorationItem, StatItem, ExperienceItem } from '../types';
import demoVideo from '../assets/demo.mp4';
import radflowVideo from '../assets/Radflow.mp4';

export const USER_INFO = {
  name: 'Varun Surya Vemula',
  shortName: 'Varun Surya',
  initials: 'VS',
  role: 'UI/UX Designer | Product Designer',
  eyebrow: "COLLECTION '26 • PRODUCT DESIGN",
  location: 'Hyderabad, India',
  email: 'ux.varunsurya@gmail.com',
  tagline: 'Designing intuitive digital experiences for healthcare and enterprise platforms.',
  bio: "I'm Varun — a product designer focused on healthcare and enterprise software. I believe interfaces should reduce the cognitive load of complex work, not add to it. I work closely with engineers, clinicians, and operators to ship things that actually get used.",
  socials: {
    linkedin: 'https://www.linkedin.com/in/varunsuryavemula',
    behance: 'https://www.behance.net/varunsurya1',
    github: 'https://github.com/varunsurya',
    email: 'mailto:ux.varunsurya@gmail.com',
  },
  resumeUrl: 'https://drive.google.com/file/d/1_YOUR_GOOGLE_DRIVE_RESUME_LINK/view?usp=sharing',
  roles: [
    'Product Designer',
    'UI/UX Specialist',
    'Design Engineer',
    'Healthcare UI Expert',
  ],
};

export const CONTACT_INFO = {
  badge: 'GET IN TOUCH',
  titlePrefix: "Let's build ",
  titleHighlight: 'meaningful',
  titleSuffix: 'digital experiences together.',
  description: "I'm currently open to product design roles and select freelance collaborations in healthcare and enterprise. Drop a note — I read every email.",
  email: 'ux.varunsurya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/varunsuryavemula',
  behance: 'https://www.behance.net/varunsurya1',
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'achala-it-solutions',
    company: 'Achala IT Solutions',
    role: 'Software Engineer · UI/UX · Hyderabad, IN',
    period: 'Feb 2025 — Present',
    location: 'Hyderabad, IN',
    bullets: [
      'Lead designer for a suite of healthcare platforms spanning radiology, kidney health, and hospital operations.',
      'Designed responsive web and native mobile applications, owning the journey from low-fi wireframes to production-ready UI.',
      'Built reusable design systems with developers — shipped 40+ shared components, cutting design-to-dev handoff time by ~35%.',
      'Ran weekly usability sessions with clinicians and operations staff; iterated on flows that reduced task completion time by 22%.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'blood-donation-lifeline',
    title: 'Blood Donation App — Life Line',
    subtitle: 'Real-time emergency donor routing and life-saving recipient matching platform.',
    year: '2025',
    category: 'Healthcare UI & Mobile',
    tags: ['UX Research', 'Mobile App', 'Visual Design', 'Emergency Care'],
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1600&auto=format&fit=crop',
    video: demoVideo,
    externalLink: 'https://www.behance.net/gallery/209200287/Blood-Donation-Mobile-App-%28LIFE-LINE%29',
    description: 'A life-saving mobile platform connecting voluntary blood donors with hospitals and recipients in real-time during critical emergencies. Designed with rapid response heuristics and minimal cognitive overhead.',
    span: 7,
  },
  {
    id: 'radflow-mobile',
    title: 'RadFlow Mobile App',
    subtitle: 'Streamlining radiologist diagnostic workflows, high-res scans, and patient data visualization.',
    year: '2025',
    category: 'Radiology UI',
    tags: ['Healthcare', 'Mobile App', 'Diagnostic Workflows', 'Wireframes'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop',
    video: radflowVideo,
    externalLink: 'https://www.behance.net/gallery/255953035/RadFlow',
    description: 'A comprehensive medical application streamlining radiologist workflows, improving diagnosis turnaround times, and providing high-fidelity patient telemetry and image review on mobile viewports.',
    span: 5,
  },
  {
    id: 'claim-fraud-dashboard',
    title: 'Claim & Fraud Analysis Dashboard',
    subtitle: 'High-density analytics interface detecting anomalies and fraud patterns across insurance claims.',
    year: '2025',
    category: 'Enterprise SaaS',
    tags: ['Dashboard', 'Data Viz', 'Enterprise', 'Fraud Detection'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    description: 'A mission-critical data visualization system that aggregates hundreds of thousands of medical claims, highlights suspicious billing patterns through graph analysis, and simplifies adjudicator decision-making.',
    span: 5,
  },
  {
    id: 'propertyworld-platform',
    title: 'PropertyWorld Platform',
    subtitle: 'Full-featured real estate platform with multi-parameter filtering and virtual property exploration.',
    year: '2024',
    category: 'Real Estate Platform',
    tags: ['UX Strategy', 'Web App', 'Prototyping', 'Design System'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop',
    description: 'An elegant property browsing and listing portal engineered for seamless discovery, featuring interactive neighborhood analytics, dynamic floor plans, and rapid virtual scheduling.',
    span: 7,
  },
];

export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'cognitive-load-radiology',
    title: 'Designing for Cognitive Load in Radiology Diagnostic Workflows',
    category: 'HEALTHCARE UI',
    date: 'FEB 18, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop',
    summary: 'How subtle improvements in dark-room ergonomics, information hierarchy, and DICOM viewport controls shave minutes off urgent clinical evaluations.',
  },
  {
    id: 'emergency-matching-lifeline',
    title: 'Emergency Matching Systems: The Life Line Blood Donation Architecture',
    category: 'MOBILE UX',
    date: 'JAN 24, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=600&auto=format&fit=crop',
    summary: 'Structuring immediate friction-free consent and proximity dispatch loops when every single second directly impacts patient survival.',
  },
  {
    id: 'scaling-clinical-design-systems',
    title: 'Building Scalable Clinical Design Systems Across Engineering & Doctors',
    category: 'DESIGN SYSTEMS',
    date: 'DEC 14, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop',
    summary: 'Lessons learned developing 40+ production components that maintain WCAG AAA accessibility standards while supporting extreme data density.',
  },
  {
    id: 'anomaly-detection-dashboards',
    title: 'Simplifying High-Dimensional Data in Enterprise Fraud Detection',
    category: 'DATA VISUALIZATION',
    date: 'NOV 08, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    summary: 'Transforming dense multi-variable insurance risk models into actionable visual alerts that auditors can review with confidence.',
  },
];

export const EXPLORATIONS: ExplorationItem[] = [
  {
    id: 'radiology-ui',
    title: 'Radiology UI',
    category: 'Medical Imaging',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop',
    rotation: -4,
    description: 'High-contrast imaging controls and rapid diagnostic reporting tools designed for specialized low-light clinical reading environments.',
  },
  {
    id: 'kidney-health',
    title: 'Kidney Health UI',
    category: 'Patient Monitoring',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
    rotation: 5,
    description: 'Longitudinal dialysis telemetry tracking vital parameters, filtration velocity, and patient symptom trajectories.',
  },
  {
    id: 'claim-analysis',
    title: 'Claim Analysis',
    category: 'Healthcare Finance',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
    rotation: -2,
    description: 'Complex billing workflows simplified for insurance adjudicators, reducing claim cycle friction by 30%.',
  },
  {
    id: 'fraud-detection',
    title: 'Fraud Detection',
    category: 'Enterprise SaaS',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    rotation: 3,
    description: 'Alert-driven dashboards that highlight statistical outliers and suspicious billing clusters across millions of records.',
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    category: 'Component Architecture',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    rotation: -5,
    description: 'Reusable, themeable component libraries with strict accessibility standards and automated developer handoffs.',
  },
  {
    id: 'emergency-response',
    title: 'Emergency Response',
    category: 'Mobile UX',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop',
    rotation: 4,
    description: 'High-urgency mobile interactions engineered for zero cognitive hesitation during real-time donor dispatches.',
  },
];

export const STATS: StatItem[] = [
  {
    value: '1.5+',
    label: 'Years Shipping Product',
    description: 'End-to-end UI/UX across healthcare platforms, enterprise SaaS dashboards, and consumer mobile apps.',
  },
  {
    value: '40+',
    label: 'Design System Components',
    description: 'Engineered production-ready shared component libraries, cutting design-to-dev handoff time by ~35%.',
  },
  {
    value: '22%',
    label: 'Workflow Velocity Boost',
    description: 'Streamlined clinical user journeys through rigorous usability testing with doctors and enterprise operators.',
  },
];
