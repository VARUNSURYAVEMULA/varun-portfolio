# Supabase CMS Setup Guide for Varun Surya's Portfolio

This guide walks you through setting up Supabase as the backend for the Portfolio CMS.

---

## 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **New Project**.
3. Set your project name (e.g., `varun-portfolio`) and database password.
4. Select the region closest to your audience (e.g., `ap-south-1` Mumbai or `ap-southeast-1` Singapore).

---

## 2. Execute Database Schema and Seed Data
1. In your Supabase Dashboard, click on **SQL Editor** from the left navigation.
2. Click **New Query**.
3. Copy the entire contents of [`supabase/schema.sql`](./schema.sql) and paste it into the editor.
4. Click **Run** (or `Cmd + Enter`).
5. Open another query, copy [`supabase/seed.sql`](./seed.sql), paste it, and click **Run**.

This sets up:
- All 9 core tables (`profile`, `projects`, `resumes`, `experiences`, `skills`, `certifications`, `contact_information`, `website_settings`, `admin_profiles`).
- Storage buckets (`portfolio-assets`, `resumes`) with public read and authenticated write access.
- Row Level Security (RLS) guaranteeing that public visitors can only read published content, and only authenticated admins can create, update, or delete.
- Initial seed data matching all your existing portfolio projects, bio, experience, skills, and resume.

---

## 3. Create your Administrator User
1. In Supabase Dashboard, navigate to **Authentication** > **Users**.
2. Click **Add user** > **Create user**.
3. Enter your admin email (e.g., `ux.varunsurya@gmail.com`) and a strong, secure password.
4. Ensure **Auto Confirm User?** is checked so you can log in immediately.
5. In SQL Editor, register your user ID in `admin_profiles`:
```sql
INSERT INTO public.admin_profiles (id, email, full_name, role)
SELECT id, email, 'Varun Surya', 'admin'
FROM auth.users
WHERE email = 'ux.varunsurya@gmail.com'
ON CONFLICT (id) DO NOTHING;
```

---

## 4. Environment Variables Configuration

### For Local Development
In the project root, edit `.env`:
```env
VITE_SUPABASE_URL=https://<your-project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-public-key>
```
You can find these in Supabase under **Project Settings** > **API**.

### For Vercel Production Deployment
1. Go to your [Vercel Dashboard](https://vercel.com).
2. Select your `varun-portfolio` project.
3. Go to **Settings** > **Environment Variables**.
4. Add:
   - `VITE_SUPABASE_URL`: Your Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Project Anon/Public Key
5. Trigger a redeploy (or push a commit to master).

---

## 5. Accessing the Admin Dashboard
Once deployed or running locally:
- Navigate to `/admin` in your browser.
- Log in with your Supabase admin email and password.
- You can now manage your projects, resume, about me, experience, skills, certifications, and settings from any device without editing source code!

