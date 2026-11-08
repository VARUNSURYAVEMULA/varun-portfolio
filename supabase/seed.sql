-- ============================================================
-- PORTFOLIO CMS INITIAL SEED DATA
-- Populates the database with Varun Surya's current portfolio content
-- ============================================================

-- 1. PROFILE
INSERT INTO public.profile (
  id,
  full_name,
  short_name,
  initials,
  designation,
  eyebrow,
  short_intro,
  about_description,
  professional_summary,
  objective,
  location,
  email,
  phone,
  years_of_experience,
  tagline,
  roles
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Vemula Varun Surya',
  'Varun Surya',
  'VS',
  'UI/UX Designer | Product Designer',
  'COLLECTION ''26 • PRODUCT DESIGN',
  'I design calm, human-first products across healthcare and enterprise software.',
  'I''m Varun — a product designer focused on healthcare and enterprise software. I believe interfaces should reduce the cognitive load of complex work, not add to it. I work closely with engineers, clinicians, and operators to ship things that actually get used.',
  'Lead product designer with 1.8+ years shipping production digital tools across clinical healthcare, radiology imaging, and high-density SaaS dashboards.',
  'With 1.8+ year of experience designing interfaces for healthcare and enterprise platforms, I aim to create meaningful and user-centered digital solutions. I focus on delivering intuitive and efficient user experiences through thoughtful design and continuous learning. My goal is to grow as a UI/UX designer while contributing effectively to impactful digital products.',
  'Hyderabad, India',
  'ux.varunsurya@gmail.com',
  '+91 9573434978',
  '1.8+',
  'Designing intuitive digital experiences for healthcare and enterprise platforms.',
  ARRAY['Product Designer', 'UI/UX Specialist', 'Design Engineer', 'Healthcare UI Expert']
) ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

-- 2. PROJECTS
INSERT INTO public.projects (
  id,
  title,
  subtitle,
  category,
  short_description,
  full_description,
  year,
  role,
  problem_statement,
  goals,
  target_audience,
  solution,
  tags,
  tools,
  thumbnail_url,
  video_url,
  live_url,
  case_study_url,
  is_featured,
  is_published,
  display_order,
  span
) VALUES 
(
  'blood-donation-lifeline',
  'Blood Donation App — Life Line',
  'Real-time emergency donor routing and life-saving recipient matching platform.',
  'Healthcare UI & Mobile',
  'A life-saving mobile platform connecting voluntary blood donors with hospitals and recipients in real-time during critical emergencies.',
  'Designed a user-friendly mobile application that connects users with nearby blood donors in real time. The app addresses the critical shortage of blood by enabling timely access during emergencies, accidents, and medical conditions. Focused on clean UI, smooth navigation, and accessibility.',
  '2025',
  'Lead Product Designer',
  'Critical shortages and delayed blood matching during acute emergencies lead to preventable mortality.',
  'Cut donor response latency from hours to minutes through proximity push alerts and real-time transit routing.',
  'Emergency room coordinators, voluntary blood donors, patients and their families.',
  'A zero-friction consent and matching interface with high visual clarity under distress.',
  ARRAY['UX Research', 'Mobile App', 'Visual Design', 'Emergency Care'],
  ARRAY['Figma', 'Protopie', 'Illustrator'],
  'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1600&auto=format&fit=crop',
  '/src/assets/demo.mp4',
  'https://www.behance.net/gallery/209200287/Blood-Donation-Mobile-App-%28LIFE-LINE%29',
  'https://www.behance.net/gallery/209200287/Blood-Donation-Mobile-App-%28LIFE-LINE%29',
  true,
  true,
  1,
  7
),
(
  'radflow-mobile',
  'RadFlow Mobile App',
  'Streamlining radiologist diagnostic workflows, high-res scans, and patient data visualization.',
  'Radiology UI',
  'A comprehensive medical application streamlining radiologist workflows, improving diagnosis turnaround times, and providing high-fidelity patient telemetry.',
  'Engineered dedicated dark-room UI ergonomics for radiologist reading stations, with DICOM viewport interactions, fast hanging protocol switching, and instant audio annotations.',
  '2025',
  'UI/UX Specialist',
  'Radiologists suffer from extreme fatigue and cognitive load due to antiquated, cluttered PACS software.',
  'Reduce turnaround times for urgent trauma scans while minimizing eye fatigue in low-light environments.',
  'Radiologists, imaging technicians, and hospital specialists.',
  'High-contrast, distraction-free viewports with gesture-based windowing and leveling.',
  ARRAY['Healthcare', 'Mobile App', 'Diagnostic Workflows', 'Wireframes'],
  ARRAY['Figma', 'Framer', 'Photoshop'],
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1600&auto=format&fit=crop',
  '/src/assets/Radflow.mp4',
  'https://www.behance.net/gallery/255953035/RadFlow',
  'https://www.behance.net/gallery/255953035/RadFlow',
  true,
  true,
  2,
  5
),
(
  'claim-fraud-dashboard',
  'Claim & Fraud Analysis Dashboard',
  'High-density analytics interface detecting anomalies and fraud patterns across insurance claims.',
  'Enterprise SaaS',
  'A mission-critical data visualization system that aggregates hundreds of thousands of medical claims and highlights suspicious billing patterns.',
  'Designed an enterprise fraud analytics suite that maps suspicious clinician and hospital billing clusters through interactive graph visualizations and multi-tiered decision trees.',
  '2025',
  'Product Designer',
  'Health insurers lose billions annually to fraudulent billing clusters that slip past manual audits.',
  'Empower auditors to inspect anomalous billing patterns in under 3 minutes with clear confidence scores.',
  'Insurance adjudicators, fraud investigation units, and compliance officers.',
  'Density-balanced layouts with automated risk flags and explainable AI insights.',
  ARRAY['Dashboard', 'Data Viz', 'Enterprise', 'Fraud Detection'],
  ARRAY['Figma', 'Tailwind CSS', 'React'],
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
  NULL,
  'https://varunsurya-design.vercel.app/',
  NULL,
  false,
  true,
  3,
  5
),
(
  'propertyworld-platform',
  'PropertyWorld Platform',
  'Full-featured real estate platform with multi-parameter filtering and virtual property exploration.',
  'Real Estate Platform',
  'An elegant property browsing and listing portal engineered for seamless discovery, featuring interactive neighborhood analytics and dynamic floor plans.',
  'Redesigned the end-to-end buyer journey from search exploration to virtual tour booking, streamlining navigation and boosting lead conversion rates by 28%.',
  '2024',
  'UI/UX Designer',
  'Property buyers encounter fragmented data, misleading listings, and high-friction scheduling.',
  'Deliver a trustworthy, immersive spatial exploration platform with verified neighborhood intelligence.',
  'Prospective homeowners, real estate investors, and property agents.',
  'Unified card architecture with immersive gallery overlays and mortgage scenario calculators.',
  ARRAY['UX Strategy', 'Web App', 'Prototyping', 'Design System'],
  ARRAY['Figma', 'Protopie', 'Illustrator'],
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop',
  NULL,
  'https://varunsurya-design.vercel.app/',
  NULL,
  false,
  true,
  4,
  7
),
(
  'nephroplus-guest-app',
  'NephroPlus Guest App',
  'Comprehensive dialysis patient management and lifestyle tracking app across India & Philippines.',
  'Healthcare UI & Mobile',
  'Designed a live patient healthcare app for nephrology and dialysis patients, covering appointment booking, health trends, CKD education, and community.',
  'Created calm, accessible experiences for long-term patient care and collaborated closely with clinicians and developers to deliver production-ready designs that reduce patient anxiety.',
  '2025',
  'UI/UX Designer',
  'Chronic Kidney Disease patients undergo grueling weekly treatments and lack an integrated telemetry and care platform.',
  'Give patients control over their dialysis appointments, access lab trends, and offer curated dietary advice.',
  'Dialysis patients, caretakers, nephrologists, and clinic managers.',
  'Calm palette with high accessibility, large tap targets, and stress-free appointment rebooking.',
  ARRAY['Healthcare', 'Mobile App', 'Patient Care', 'Design System'],
  ARRAY['Figma', 'Photoshop', 'Illustrator'],
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1600&auto=format&fit=crop',
  NULL,
  'https://play.google.com/store/apps/details?id=com.nephroplus.guest',
  'https://play.google.com/store/apps/details?id=com.nephroplus.guest',
  true,
  true,
  5,
  7
)
ON CONFLICT (id) DO NOTHING;

-- 3. RESUME
INSERT INTO public.resumes (
  id,
  filename,
  file_url,
  file_size,
  is_active
) VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'Vemula_Varun_Surya_Design_Resume.pdf',
  '/resume.pdf',
  22744,
  true
) ON CONFLICT (id) DO NOTHING;

-- 4. EXPERIENCES
INSERT INTO public.experiences (
  id,
  company,
  role,
  employment_type,
  location,
  period,
  start_date,
  is_current,
  description,
  responsibilities,
  skills_used,
  display_order
) VALUES (
  'achala-it-solutions',
  'Achala IT Solutions Private Limited',
  'UI/UX Designer',
  'Full-time',
  'Hyderabad, IN',
  'Feb 2025 — Present',
  '2025-02-01',
  true,
  'Lead designer for a suite of healthcare platforms and mobile applications.',
  ARRAY[
    'Designed user-centric web and mobile interfaces aligned with business and user needs.',
    'Delivered end-to-end UI/UX solutions for NephroPlus Guest App, Claim Assure, PEP Call Centre CRM, Claims Admin, and Radiologist Mobile App.',
    'Collaborated with product managers, developers, and stakeholders to translate requirements into wireframes, mockups, and interactive prototypes.',
    'Contributed to healthcare platforms and mobile applications, ensuring usability and design consistency.',
    'Utilized tools such as Figma, Photoshop, and Illustrator for design execution and developer handoff.',
    'Collaborated on requirement analysis, estimation, and iterative design enhancements.'
  ],
  ARRAY['Figma', 'Design Systems', 'UX Research', 'Healthcare UI', 'Photoshop', 'Illustrator', 'WCAG AAA'],
  1
) ON CONFLICT (id) DO NOTHING;

-- 5. SKILLS & TOOLS
INSERT INTO public.skills (id, name, category, tag, description, display_order, is_visible)
VALUES
  ('figma', 'Figma', 'Tools', 'UI / UX', 'Systemic interface design & cross-functional handoff', 1, true),
  ('framer', 'Framer', 'Tools', 'Web & Code', 'High-fidelity responsive layouts & interaction design', 2, true),
  ('protopie', 'Protopie', 'Tools', 'Prototype', 'Sensor-driven micro-interactions & conditional logic', 3, true),
  ('mobbin', 'Mobbin', 'UX Research', 'Research', 'Empirical UX benchmarking across top iOS & web products', 4, true),
  ('freepik', 'Freepik', 'Design', 'Assets', 'High-res curated vectors, 3D assets & visual mockups', 5, true),
  ('dribbble', 'Dribbble', 'Design', 'Inspiration', 'Emerging visual aesthetics, trends & design experiments', 6, true),
  ('canva', 'Canva', 'Design', 'Graphics', 'Rapid stakeholder presentations & editorial decks', 7, true),
  ('claude', 'Claude', 'AI Tools', 'LLM & IA', 'Information architecture critique & design reasoning', 8, true),
  ('gemini', 'Gemini', 'AI Tools', 'AI Engine', 'Multimodal workflow ideation & design synthesis', 9, true),
  ('chatgpt', 'ChatGPT', 'AI Tools', 'Reasoning', 'Iterative user journey mapping & prompt engineering', 10, true),
  ('v0', 'v0', 'AI Tools', 'Generative UI', 'Component layout ideation & atomic UI generation', 11, true),
  ('ai', 'AI', 'AI Tools', 'Workflows', 'Modern AI design workflows & accelerated prototyping', 12, true),
  ('ux-strategy', 'UX Strategy', 'UX Design', 'Strategy', 'User journeys, mental models & strategic IA alignment', 13, true),
  ('wireframing', 'Wireframing & Flows', 'UX Design', 'Flows', 'Low to mid-fidelity interactive logic diagrams', 14, true),
  ('design-systems', 'Design Systems', 'Design Systems', 'Systems', 'Themeable component architectures & scalable tokens', 15, true),
  ('usability-testing', 'Usability Testing', 'UX Research', 'Testing', 'Clinician usability sessions & task velocity audits', 16, true)
ON CONFLICT (id) DO NOTHING;

-- 6. CERTIFICATIONS
INSERT INTO public.certifications (
  id,
  title,
  issuing_organization,
  issue_date,
  credential_id,
  description,
  display_order
) VALUES (
  'master-visual-ui-ux',
  'Master Visual & UI/UX Design',
  'Professional Design Academy',
  '2024',
  'VSD-2024-UX',
  'Comprehensive mastery in end-to-end UX research, wireframing, high-fidelity visual design, and developer handoffs.',
  1
) ON CONFLICT (id) DO NOTHING;

-- 7. CONTACT INFORMATION
INSERT INTO public.contact_information (
  id,
  email,
  phone,
  location,
  linkedin_url,
  github_url,
  behance_url,
  dribbble_url
) VALUES (
  'c0000000-0000-0000-0000-000000000001',
  'ux.varunsurya@gmail.com',
  '+91 9573434978',
  'Hyderabad, India',
  'https://www.linkedin.com/in/varunsuryavemula',
  'https://github.com/varunsurya',
  'https://www.behance.net/varunsurya1',
  'https://dribbble.com'
) ON CONFLICT (id) DO NOTHING;

-- 8. WEBSITE SETTINGS
INSERT INTO public.website_settings (
  id,
  site_title,
  site_description,
  seo_title,
  seo_description,
  is_public_visible,
  is_resume_visible,
  project_display_order
) VALUES (
  'd0000000-0000-0000-0000-000000000001',
  'Varun Surya — UI/UX & Product Designer',
  'Product designer focused on healthcare and enterprise software. Reducing cognitive load in complex workflows.',
  'Varun Surya — UI/UX Designer & Product Designer Portfolio',
  'Designing calm, human-first products across healthcare, radiology, and enterprise platforms.',
  true,
  true,
  'custom'
) ON CONFLICT (id) DO NOTHING;

