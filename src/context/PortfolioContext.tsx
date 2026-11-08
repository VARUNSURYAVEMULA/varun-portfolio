import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  USER_INFO,
  PROJECTS,
  EXPERIENCES,
  RESUME_SKILLS,
  RESUME_CERTIFICATIONS,
  RESUME_EDUCATION,
  RESUME_PROJECTS,
} from '../data/portfolioData';
import { Project, ExperienceItem, StatItem, ExplorationItem, EducationItem, ResumeProjectItem } from '../types';

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  tag?: string;
  description?: string;
  icon_svg?: string;
  icon_name?: string;
  is_visible: boolean;
  display_order: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuing_organization: string;
  issue_date: string;
  credential_id?: string;
  credential_url?: string;
  certificate_image_url?: string;
  description?: string;
  display_order?: number;
}

export interface ResumeInfo {
  id?: string;
  filename: string;
  file_url: string;
  file_size: number;
  is_active: boolean;
  updated_at?: string;
}

export interface ProfileInfo {
  full_name: string;
  short_name: string;
  initials: string;
  designation: string;
  eyebrow: string;
  short_intro: string;
  about_description: string;
  professional_summary: string;
  objective: string;
  profile_image_url?: string;
  location: string;
  email: string;
  phone: string;
  years_of_experience: string;
  tagline: string;
  roles: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  github_url: string;
  behance_url: string;
  dribbble_url: string;
  other_links?: { name: string; url: string }[];
}

export interface WebsiteSettings {
  site_title: string;
  site_description: string;
  seo_title: string;
  seo_description: string;
  social_share_image_url?: string;
  is_public_visible: boolean;
  is_resume_visible: boolean;
  project_display_order: 'custom' | 'year_desc' | 'alphabetical';
}

interface PortfolioContextType {
  // Data
  profile: ProfileInfo;
  projects: Project[];
  allProjects: Project[]; // Includes drafts for admin
  experiences: ExperienceItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  resume: ResumeInfo;
  contact: ContactInfo;
  settings: WebsiteSettings;
  isLoading: boolean;
  isSupabaseLive: boolean;

  // Refresh
  refreshData: () => Promise<void>;

  // Project Mutations
  saveProject: (project: Partial<Project> & { id?: string }) => Promise<{ success: boolean; error?: string; data?: any }>;
  deleteProject: (id: string) => Promise<{ success: boolean; error?: string }>;
  toggleProjectPublish: (id: string, isPublished: boolean) => Promise<{ success: boolean; error?: string }>;
  toggleProjectFeatured: (id: string, isFeatured: boolean) => Promise<{ success: boolean; error?: string }>;

  // Resume Mutations
  saveResume: (resume: Partial<ResumeInfo>) => Promise<{ success: boolean; error?: string }>;
  deleteResume: () => Promise<{ success: boolean; error?: string }>;

  // Profile Mutations
  saveProfile: (profile: Partial<ProfileInfo>) => Promise<{ success: boolean; error?: string }>;

  // Experience Mutations
  saveExperience: (exp: Partial<ExperienceItem> & { id?: string }) => Promise<{ success: boolean; error?: string }>;
  deleteExperience: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Skill Mutations
  saveSkill: (skill: Partial<SkillItem> & { id?: string }) => Promise<{ success: boolean; error?: string }>;
  deleteSkill: (id: string) => Promise<{ success: boolean; error?: string }>;
  toggleSkillVisibility: (id: string, isVisible: boolean) => Promise<{ success: boolean; error?: string }>;

  // Certification Mutations
  saveCertification: (cert: Partial<CertificationItem> & { id?: string }) => Promise<{ success: boolean; error?: string }>;
  deleteCertification: (id: string) => Promise<{ success: boolean; error?: string }>;

  // Contact Mutations
  saveContact: (contact: Partial<ContactInfo>) => Promise<{ success: boolean; error?: string }>;

  // Settings Mutations
  saveSettings: (settings: Partial<WebsiteSettings>) => Promise<{ success: boolean; error?: string }>;
}

const defaultProfile: ProfileInfo = {
  full_name: USER_INFO.name,
  short_name: USER_INFO.shortName,
  initials: USER_INFO.initials,
  designation: USER_INFO.role,
  eyebrow: USER_INFO.eyebrow,
  short_intro: 'I design calm, human-first products.',
  about_description: USER_INFO.bio,
  professional_summary: 'Product designer focused on healthcare and enterprise software.',
  objective: USER_INFO.objective || '',
  location: USER_INFO.location,
  email: USER_INFO.email,
  phone: USER_INFO.phone || '+91 9573434978',
  years_of_experience: '1.8+',
  tagline: USER_INFO.tagline,
  roles: USER_INFO.roles,
};

const defaultResume: ResumeInfo = {
  filename: 'Vemula_Varun_Surya_Design_Resume.pdf',
  file_url: USER_INFO.resumeUrl || '/resume.pdf',
  file_size: 22744,
  is_active: true,
};

const defaultContact: ContactInfo = {
  email: USER_INFO.email,
  phone: USER_INFO.phone || '+91 9573434978',
  location: USER_INFO.location,
  linkedin_url: USER_INFO.socials.linkedin,
  github_url: USER_INFO.socials.github,
  behance_url: USER_INFO.socials.behance,
  dribbble_url: 'https://dribbble.com',
};

const defaultSettings: WebsiteSettings = {
  site_title: 'Varun Surya — UI/UX & Product Designer',
  site_description: 'Product designer focused on healthcare and enterprise software. Reducing cognitive load in complex workflows.',
  seo_title: 'Varun Surya — UI/UX Designer & Product Designer Portfolio',
  seo_description: 'Designing calm, human-first products across healthcare, radiology, and enterprise platforms.',
  is_public_visible: true,
  is_resume_visible: true,
  project_display_order: 'custom',
};

// Map default skills from portfolioData
const defaultSkills: SkillItem[] = [
  { id: 'figma', name: 'Figma', category: 'Tools', tag: 'UI / UX', description: 'Systemic interface design & cross-functional handoff', is_visible: true, display_order: 1 },
  { id: 'framer', name: 'Framer', category: 'Tools', tag: 'Web & Code', description: 'High-fidelity responsive layouts & interaction design', is_visible: true, display_order: 2 },
  { id: 'protopie', name: 'Protopie', category: 'Tools', tag: 'Prototype', description: 'Sensor-driven micro-interactions & conditional logic', is_visible: true, display_order: 3 },
  { id: 'mobbin', name: 'Mobbin', category: 'UX Research', tag: 'Research', description: 'Empirical UX benchmarking across top iOS & web products', is_visible: true, display_order: 4 },
  { id: 'freepik', name: 'Freepik', category: 'Design', tag: 'Assets', description: 'High-res curated vectors, 3D assets & visual mockups', is_visible: true, display_order: 5 },
  { id: 'dribbble', name: 'Dribbble', category: 'Design', tag: 'Inspiration', description: 'Emerging visual aesthetics, trends & design experiments', is_visible: true, display_order: 6 },
  { id: 'canva', name: 'Canva', category: 'Design', tag: 'Graphics', description: 'Rapid stakeholder presentations & editorial decks', is_visible: true, display_order: 7 },
  { id: 'claude', name: 'Claude', category: 'AI Tools', tag: 'LLM & IA', description: 'Information architecture critique & design reasoning', is_visible: true, display_order: 8 },
  { id: 'gemini', name: 'Gemini', category: 'AI Tools', tag: 'AI Engine', description: 'Multimodal workflow ideation & design synthesis', is_visible: true, display_order: 9 },
  { id: 'chatgpt', name: 'ChatGPT', category: 'AI Tools', tag: 'Reasoning', description: 'Iterative user journey mapping & prompt engineering', is_visible: true, display_order: 10 },
  { id: 'v0', name: 'v0', category: 'AI Tools', tag: 'Generative UI', description: 'Component layout ideation & atomic UI generation', is_visible: true, display_order: 11 },
  { id: 'ai', name: 'AI', category: 'AI Tools', tag: 'Workflows', description: 'Modern AI design workflows & accelerated prototyping', is_visible: true, display_order: 12 },
  { id: 'ux-strategy', name: 'UX Strategy', category: 'UX Design', tag: 'Strategy', description: 'User journeys, mental models & strategic IA alignment', is_visible: true, display_order: 13 },
  { id: 'wireframing', name: 'Wireframing & Flows', category: 'UX Design', tag: 'Flows', description: 'Low to mid-fidelity interactive logic diagrams', is_visible: true, display_order: 14 },
  { id: 'design-systems', name: 'Design Systems', category: 'Design Systems', tag: 'Systems', description: 'Themeable component architectures & scalable tokens', is_visible: true, display_order: 15 },
  { id: 'usability-testing', name: 'Usability Testing', category: 'UX Research', tag: 'Testing', description: 'Clinician usability sessions & task velocity audits', is_visible: true, display_order: 16 },
];

const defaultCertifications: CertificationItem[] = [
  {
    id: 'master-visual-ui-ux',
    title: 'Master Visual & UI/UX Design',
    issuing_organization: 'Professional Design Academy',
    issue_date: '2024',
    credential_id: 'VSD-2024-UX',
    description: 'Comprehensive mastery in end-to-end UX research, wireframing, high-fidelity visual design, and developer handoffs.',
    display_order: 1,
  },
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileInfo>(defaultProfile);
  const [allProjects, setAllProjects] = useState<Project[]>(PROJECTS);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(EXPERIENCES);
  const [skills, setSkills] = useState<SkillItem[]>(defaultSkills);
  const [certifications, setCertifications] = useState<CertificationItem[]>(defaultCertifications);
  const [resume, setResume] = useState<ResumeInfo>(defaultResume);
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSupabaseLive, setIsSupabaseLive] = useState<boolean>(false);

  // Filter published projects for public display
  const projects = useMemo(() => {
    return allProjects.filter((p) => (p as any).is_published !== false);
  }, [allProjects]);

  // Fetch all data from Supabase
  const refreshData = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      setIsSupabaseLive(false);
      return;
    }

    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileErr } = await supabase
        .from('profile')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (profileData && !profileErr) {
        setProfile({
          full_name: profileData.full_name || defaultProfile.full_name,
          short_name: profileData.short_name || defaultProfile.short_name,
          initials: profileData.initials || defaultProfile.initials,
          designation: profileData.designation || defaultProfile.designation,
          eyebrow: profileData.eyebrow || defaultProfile.eyebrow,
          short_intro: profileData.short_intro || defaultProfile.short_intro,
          about_description: profileData.about_description || defaultProfile.about_description,
          professional_summary: profileData.professional_summary || defaultProfile.professional_summary,
          objective: profileData.objective || defaultProfile.objective,
          profile_image_url: profileData.profile_image_url,
          location: profileData.location || defaultProfile.location,
          email: profileData.email || defaultProfile.email,
          phone: profileData.phone || defaultProfile.phone,
          years_of_experience: profileData.years_of_experience || defaultProfile.years_of_experience,
          tagline: profileData.tagline || defaultProfile.tagline,
          roles: profileData.roles || defaultProfile.roles,
        });
      }

      // 2. Fetch Projects
      const { data: projectsData, error: projErr } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (projectsData && projectsData.length > 0 && !projErr) {
        const mappedProjects: Project[] = projectsData.map((row: any) => ({
          id: row.id,
          title: row.title,
          subtitle: row.subtitle || '',
          category: row.category,
          year: row.year || '2025',
          tags: row.tags || [],
          image: row.thumbnail_url || row.image || 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1600&auto=format&fit=crop',
          video: row.video_url || undefined,
          externalLink: row.live_url || row.case_study_url || undefined,
          description: row.full_description || row.short_description || '',
          span: (row.span as 5 | 7) || 7,
          link: row.live_url || undefined,
          // CMS attributes
          is_published: row.is_published ?? true,
          is_featured: row.is_featured ?? false,
          problem_statement: row.problem_statement,
          goals: row.goals,
          target_audience: row.target_audience,
          challenges: row.challenges,
          design_approach: row.design_approach,
          research_insights: row.research_insights,
          design_decisions: row.design_decisions,
          solution: row.solution,
          learnings: row.learnings,
          outcome: row.outcome,
          tools: row.tools || [],
          skills: row.skills || [],
          screenshots: row.screenshots || [],
          prototype_url: row.prototype_url,
          live_url: row.live_url,
          case_study_url: row.case_study_url,
          display_order: row.display_order ?? 0,
          role: row.role,
          team_size: row.team_size,
          duration: row.duration,
        } as any));

        setAllProjects(mappedProjects);
      }

      // 3. Fetch Experiences
      const { data: expData, error: expErr } = await supabase
        .from('experiences')
        .select('*')
        .order('display_order', { ascending: true });

      if (expData && expData.length > 0 && !expErr) {
        setExperiences(expData.map((row: any) => ({
          id: row.id,
          company: row.company,
          role: row.role,
          period: row.period,
          location: row.location || '',
          bullets: row.responsibilities || row.bullets || [],
          employment_type: row.employment_type || 'Full-time',
          is_current: row.is_current ?? false,
          skills_used: row.skills_used || [],
          display_order: row.display_order ?? 0,
        })));
      }

      // 4. Fetch Skills
      const { data: skillsData, error: skillsErr } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (skillsData && skillsData.length > 0 && !skillsErr) {
        setSkills(skillsData.map((row: any) => ({
          id: row.id,
          name: row.name,
          category: row.category,
          tag: row.tag,
          description: row.description,
          icon_svg: row.icon_svg,
          icon_name: row.icon_name,
          is_visible: row.is_visible ?? true,
          display_order: row.display_order ?? 0,
        })));
      }

      // 5. Fetch Certifications
      const { data: certsData, error: certsErr } = await supabase
        .from('certifications')
        .select('*')
        .order('display_order', { ascending: true });

      if (certsData && certsData.length > 0 && !certsErr) {
        setCertifications(certsData.map((row: any) => ({
          id: row.id,
          title: row.title,
          issuing_organization: row.issuing_organization,
          issue_date: row.issue_date,
          credential_id: row.credential_id,
          credential_url: row.credential_url,
          certificate_image_url: row.certificate_image_url,
          description: row.description,
          display_order: row.display_order ?? 0,
        })));
      }

      // 6. Fetch Active Resume
      const { data: resumeData, error: resumeErr } = await supabase
        .from('resumes')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (resumeData && !resumeErr) {
        setResume({
          id: resumeData.id,
          filename: resumeData.filename,
          file_url: resumeData.file_url,
          file_size: Number(resumeData.file_size) || 0,
          is_active: resumeData.is_active,
          updated_at: resumeData.updated_at,
        });
      }

      // 7. Fetch Contact Info
      const { data: contactData, error: contactErr } = await supabase
        .from('contact_information')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (contactData && !contactErr) {
        setContact({
          email: contactData.email || defaultContact.email,
          phone: contactData.phone || defaultContact.phone,
          location: contactData.location || defaultContact.location,
          linkedin_url: contactData.linkedin_url || defaultContact.linkedin_url,
          github_url: contactData.github_url || defaultContact.github_url,
          behance_url: contactData.behance_url || defaultContact.behance_url,
          dribbble_url: contactData.dribbble_url || defaultContact.dribbble_url,
          other_links: contactData.other_links || [],
        });
      }

      // 8. Fetch Settings
      const { data: settingsData, error: settingsErr } = await supabase
        .from('website_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (settingsData && !settingsErr) {
        setSettings({
          site_title: settingsData.site_title || defaultSettings.site_title,
          site_description: settingsData.site_description || defaultSettings.site_description,
          seo_title: settingsData.seo_title || defaultSettings.seo_title,
          seo_description: settingsData.seo_description || defaultSettings.seo_description,
          social_share_image_url: settingsData.social_share_image_url,
          is_public_visible: settingsData.is_public_visible ?? true,
          is_resume_visible: settingsData.is_resume_visible ?? true,
          project_display_order: settingsData.project_display_order || 'custom',
        });
      }

      setIsSupabaseLive(true);
    } catch (err) {
      console.warn('PortfolioContext: Supabase fetch error, using local fallback:', err);
      setIsSupabaseLive(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Project Mutations
  const saveProject = async (projInput: any) => {
    const id = projInput.id || `proj_${Date.now()}`;
    const row = {
      id,
      title: projInput.title,
      subtitle: projInput.subtitle || '',
      category: projInput.category,
      short_description: projInput.short_description || projInput.description || '',
      full_description: projInput.full_description || projInput.description || '',
      year: projInput.year || new Date().getFullYear().toString(),
      role: projInput.role || '',
      team_size: projInput.team_size || '',
      duration: projInput.duration || '',
      problem_statement: projInput.problem_statement || '',
      goals: projInput.goals || '',
      target_audience: projInput.target_audience || '',
      challenges: projInput.challenges || '',
      design_approach: projInput.design_approach || '',
      research_insights: projInput.research_insights || '',
      design_decisions: projInput.design_decisions || '',
      solution: projInput.solution || '',
      learnings: projInput.learnings || '',
      outcome: projInput.outcome || '',
      tools: projInput.tools || [],
      skills: projInput.skills || [],
      tags: projInput.tags || [],
      thumbnail_url: projInput.thumbnail_url || projInput.image || '',
      screenshots: projInput.screenshots || [],
      video_url: projInput.video_url || projInput.video || null,
      prototype_url: projInput.prototype_url || null,
      live_url: projInput.live_url || projInput.link || null,
      case_study_url: projInput.case_study_url || projInput.externalLink || null,
      is_featured: projInput.is_featured ?? false,
      is_published: projInput.is_published ?? true,
      display_order: projInput.display_order ?? 0,
      span: projInput.span ?? 7,
    };

    // Update local state first (optimistic UI)
    setAllProjects((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      const mapped = {
        ...row,
        image: row.thumbnail_url,
        video: row.video_url || undefined,
        externalLink: row.case_study_url || row.live_url || undefined,
        description: row.full_description || row.short_description,
      } as any;
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = mapped;
        return next;
      }
      return [mapped, ...prev];
    });

    if (!isSupabaseConfigured()) {
      return { success: true, data: row };
    }

    try {
      const { data, error } = await supabase.from('projects').upsert(row).select().single();
      if (error) throw error;
      return { success: true, data };
    } catch (err: any) {
      console.error('saveProject error:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteProject = async (id: string) => {
    setAllProjects((prev) => prev.filter((p) => p.id !== id));

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('deleteProject error:', err);
      return { success: false, error: err.message };
    }
  };

  const toggleProjectPublish = async (id: string, isPublished: boolean) => {
    return saveProject({ id, is_published: isPublished } as any);
  };

  const toggleProjectFeatured = async (id: string, isFeatured: boolean) => {
    return saveProject({ id, is_featured: isFeatured } as any);
  };

  // Resume Mutations
  const saveResume = async (resumeData: Partial<ResumeInfo>) => {
    const updated: ResumeInfo = {
      ...resume,
      ...resumeData,
      is_active: true,
      updated_at: new Date().toISOString(),
    };
    setResume(updated);

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      // Deactivate other resumes
      await supabase.from('resumes').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');
      const { error } = await supabase.from('resumes').insert({
        filename: updated.filename,
        file_url: updated.file_url,
        file_size: updated.file_size,
        is_active: true,
      });
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('saveResume error:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteResume = async () => {
    setResume({
      filename: '',
      file_url: '',
      file_size: 0,
      is_active: false,
    });

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('resumes').update({ is_active: false }).eq('is_active', true);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('deleteResume error:', err);
      return { success: false, error: err.message };
    }
  };

  // Profile Mutations
  const saveProfile = async (profileUpdates: Partial<ProfileInfo>) => {
    const next = { ...profile, ...profileUpdates };
    setProfile(next);

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('profile').upsert({
        id: 'a0000000-0000-0000-0000-000000000001',
        ...next,
      });
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('saveProfile error:', err);
      return { success: false, error: err.message };
    }
  };

  // Experience Mutations
  const saveExperience = async (expInput: any) => {
    const id = expInput.id || `exp_${Date.now()}`;
    const row = {
      id,
      company: expInput.company,
      role: expInput.role,
      employment_type: expInput.employment_type || 'Full-time',
      location: expInput.location || '',
      period: expInput.period || '',
      start_date: expInput.start_date || null,
      end_date: expInput.end_date || null,
      is_current: expInput.is_current ?? false,
      description: expInput.description || '',
      responsibilities: expInput.responsibilities || expInput.bullets || [],
      skills_used: expInput.skills_used || [],
      company_logo_url: expInput.company_logo_url || null,
      display_order: expInput.display_order ?? 0,
    };

    setExperiences((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      const item: ExperienceItem = {
        id,
        company: row.company,
        role: row.role,
        period: row.period,
        location: row.location,
        bullets: row.responsibilities,
      };
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [item, ...prev];
    });

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('experiences').upsert(row);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('saveExperience error:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteExperience = async (id: string) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('experiences').delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('deleteExperience error:', err);
      return { success: false, error: err.message };
    }
  };

  // Skills Mutations
  const saveSkill = async (skillInput: any) => {
    const id = skillInput.id || `skill_${Date.now()}`;
    const row = {
      id,
      name: skillInput.name,
      category: skillInput.category || 'UX Design',
      tag: skillInput.tag || '',
      description: skillInput.description || '',
      icon_svg: skillInput.icon_svg || null,
      icon_name: skillInput.icon_name || null,
      is_visible: skillInput.is_visible ?? true,
      display_order: skillInput.display_order ?? 0,
    };

    setSkills((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = row;
        return next;
      }
      return [...prev, row];
    });

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('skills').upsert(row);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('saveSkill error:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteSkill = async (id: string) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('deleteSkill error:', err);
      return { success: false, error: err.message };
    }
  };

  const toggleSkillVisibility = async (id: string, isVisible: boolean) => {
    return saveSkill({ id, is_visible: isVisible });
  };

  // Certification Mutations
  const saveCertification = async (certInput: any) => {
    const id = certInput.id || `cert_${Date.now()}`;
    const row = {
      id,
      title: certInput.title,
      issuing_organization: certInput.issuing_organization,
      issue_date: certInput.issue_date,
      credential_id: certInput.credential_id || '',
      credential_url: certInput.credential_url || '',
      certificate_image_url: certInput.certificate_image_url || '',
      description: certInput.description || '',
      display_order: certInput.display_order ?? 0,
    };

    setCertifications((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = row;
        return next;
      }
      return [...prev, row];
    });

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('certifications').upsert(row);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('saveCertification error:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteCertification = async (id: string) => {
    setCertifications((prev) => prev.filter((c) => c.id !== id));

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('certifications').delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('deleteCertification error:', err);
      return { success: false, error: err.message };
    }
  };

  // Contact Mutations
  const saveContact = async (contactUpdates: Partial<ContactInfo>) => {
    const next = { ...contact, ...contactUpdates };
    setContact(next);

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('contact_information').upsert({
        id: 'c0000000-0000-0000-0000-000000000001',
        ...next,
      });
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('saveContact error:', err);
      return { success: false, error: err.message };
    }
  };

  // Settings Mutations
  const saveSettings = async (settingsUpdates: Partial<WebsiteSettings>) => {
    const next = { ...settings, ...settingsUpdates };
    setSettings(next);

    if (!isSupabaseConfigured()) {
      return { success: true };
    }

    try {
      const { error } = await supabase.from('website_settings').upsert({
        id: 'd0000000-0000-0000-0000-000000000001',
        ...next,
      });
      if (error) throw error;
      return { success: true };
    } catch (err: any) {
      console.error('saveSettings error:', err);
      return { success: false, error: err.message };
    }
  };

  const contextValue = useMemo(() => ({
    profile,
    projects,
    allProjects,
    experiences,
    skills,
    certifications,
    resume,
    contact,
    settings,
    isLoading,
    isSupabaseLive,
    refreshData,
    saveProject,
    deleteProject,
    toggleProjectPublish,
    toggleProjectFeatured,
    saveResume,
    deleteResume,
    saveProfile,
    saveExperience,
    deleteExperience,
    saveSkill,
    deleteSkill,
    toggleSkillVisibility,
    saveCertification,
    deleteCertification,
    saveContact,
    saveSettings,
  }), [
    profile,
    projects,
    allProjects,
    experiences,
    skills,
    certifications,
    resume,
    contact,
    settings,
    isLoading,
    isSupabaseLive,
    refreshData,
  ]);

  return <PortfolioContext.Provider value={contextValue}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return ctx;
};

