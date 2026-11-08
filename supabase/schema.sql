-- ============================================================
-- PORTFOLIO CMS DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN PROFILES
-- Links directly with Supabase auth.users
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILE (About Me)
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  short_name TEXT,
  initials TEXT,
  designation TEXT NOT NULL,
  eyebrow TEXT,
  short_intro TEXT,
  about_description TEXT,
  professional_summary TEXT,
  objective TEXT,
  profile_image_url TEXT,
  location TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  years_of_experience TEXT,
  tagline TEXT,
  roles TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT NOT NULL,
  short_description TEXT,
  full_description TEXT,
  year TEXT,
  role TEXT,
  team_size TEXT,
  duration TEXT,
  problem_statement TEXT,
  goals TEXT,
  target_audience TEXT,
  challenges TEXT,
  design_approach TEXT,
  research_insights TEXT,
  design_decisions TEXT,
  solution TEXT,
  learnings TEXT,
  outcome TEXT,
  tools TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  screenshots TEXT[] DEFAULT '{}',
  video_url TEXT,
  prototype_url TEXT,
  live_url TEXT,
  case_study_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  span INT DEFAULT 7,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. RESUMES
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. EXPERIENCES
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  employment_type TEXT DEFAULT 'Full-time',
  location TEXT,
  period TEXT NOT NULL,
  start_date TEXT,
  end_date TEXT,
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  skills_used TEXT[] DEFAULT '{}',
  company_logo_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SKILLS & TOOLS
CREATE TABLE IF NOT EXISTS public.skills (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  tag TEXT,
  description TEXT,
  icon_svg TEXT,
  icon_name TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CERTIFICATIONS
CREATE TABLE IF NOT EXISTS public.certifications (
  id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::TEXT,
  title TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  credential_id TEXT,
  credential_url TEXT,
  certificate_image_url TEXT,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CONTACT INFORMATION
CREATE TABLE IF NOT EXISTS public.contact_information (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  behance_url TEXT,
  dribbble_url TEXT,
  other_links JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. WEBSITE SETTINGS
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_title TEXT NOT NULL DEFAULT 'Varun Surya — UI/UX & Product Designer',
  site_description TEXT DEFAULT 'Product designer specializing in healthcare platforms and enterprise design systems.',
  seo_title TEXT DEFAULT 'Varun Surya — UI/UX Designer Portfolio',
  seo_description TEXT DEFAULT 'Designing calm, human-first products across healthcare, radiology, and enterprise platforms.',
  social_share_image_url TEXT,
  is_public_visible BOOLEAN DEFAULT TRUE,
  is_resume_visible BOOLEAN DEFAULT TRUE,
  project_display_order TEXT DEFAULT 'custom',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUTOMATIC updated_at TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
DROP TRIGGER IF EXISTS set_updated_at_projects ON public.projects;
CREATE TRIGGER set_updated_at_projects
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_profile ON public.profile;
CREATE TRIGGER set_updated_at_profile
  BEFORE UPDATE ON public.profile
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_resumes ON public.resumes;
CREATE TRIGGER set_updated_at_resumes
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_experiences ON public.experiences;
CREATE TRIGGER set_updated_at_experiences
  BEFORE UPDATE ON public.experiences
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_skills ON public.skills;
CREATE TRIGGER set_updated_at_skills
  BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_certifications ON public.certifications;
CREATE TRIGGER set_updated_at_certifications
  BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_contact ON public.contact_information;
CREATE TRIGGER set_updated_at_contact
  BEFORE UPDATE ON public.contact_information
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_updated_at_settings ON public.website_settings;
CREATE TRIGGER set_updated_at_settings
  BEFORE UPDATE ON public.website_settings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- 1. admin_profiles policies
CREATE POLICY "Admins can view their own profile"
  ON public.admin_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can update their own profile"
  ON public.admin_profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. profile policies
CREATE POLICY "Public can view profile"
  ON public.profile FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify profile"
  ON public.profile FOR ALL
  USING (auth.role() = 'authenticated');

-- 3. projects policies
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins can modify projects"
  ON public.projects FOR ALL
  USING (auth.role() = 'authenticated');

-- 4. resumes policies
CREATE POLICY "Public can view active resume"
  ON public.resumes FOR SELECT
  USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins can modify resumes"
  ON public.resumes FOR ALL
  USING (auth.role() = 'authenticated');

-- 5. experiences policies
CREATE POLICY "Public can view experiences"
  ON public.experiences FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify experiences"
  ON public.experiences FOR ALL
  USING (auth.role() = 'authenticated');

-- 6. skills policies
CREATE POLICY "Public can view visible skills"
  ON public.skills FOR SELECT
  USING (is_visible = true OR auth.role() = 'authenticated');

CREATE POLICY "Admins can modify skills"
  ON public.skills FOR ALL
  USING (auth.role() = 'authenticated');

-- 7. certifications policies
CREATE POLICY "Public can view certifications"
  ON public.certifications FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify certifications"
  ON public.certifications FOR ALL
  USING (auth.role() = 'authenticated');

-- 8. contact_information policies
CREATE POLICY "Public can view contact information"
  ON public.contact_information FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify contact information"
  ON public.contact_information FOR ALL
  USING (auth.role() = 'authenticated');

-- 9. website_settings policies
CREATE POLICY "Public can view website settings"
  ON public.website_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify website settings"
  ON public.website_settings FOR ALL
  USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS (Execute in Supabase SQL editor)
-- ============================================================
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('portfolio-assets', 'portfolio-assets', true),
  ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can view assets
CREATE POLICY "Public can view portfolio assets"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('portfolio-assets', 'resumes'));

-- Storage RLS: Authenticated admin can upload/update/delete
CREATE POLICY "Admin can upload portfolio assets"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id IN ('portfolio-assets', 'resumes') AND auth.role() = 'authenticated');

CREATE POLICY "Admin can update portfolio assets"
  ON storage.objects FOR UPDATE
  USING (bucket_id IN ('portfolio-assets', 'resumes') AND auth.role() = 'authenticated');

CREATE POLICY "Admin can delete portfolio assets"
  ON storage.objects FOR DELETE
  USING (bucket_id IN ('portfolio-assets', 'resumes') AND auth.role() = 'authenticated');

