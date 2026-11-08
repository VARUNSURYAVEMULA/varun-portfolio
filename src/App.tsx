import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

// Public Portfolio View (eager loaded for instant first paint)
import Index from './Index';

// Admin Views (lazy-loaded so public visitors don't download admin code)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then((m) => ({ default: m.AdminLogin })));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute').then((m) => ({ default: m.ProtectedRoute })));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then((m) => ({ default: m.AdminLayout })));
const Overview = lazy(() => import('./pages/admin/Overview').then((m) => ({ default: m.Overview })));
const ProjectsManager = lazy(() => import('./pages/admin/ProjectsManager').then((m) => ({ default: m.ProjectsManager })));
const ResumeManager = lazy(() => import('./pages/admin/ResumeManager').then((m) => ({ default: m.ResumeManager })));
const AboutManager = lazy(() => import('./pages/admin/AboutManager').then((m) => ({ default: m.AboutManager })));
const ExperienceManager = lazy(() => import('./pages/admin/ExperienceManager').then((m) => ({ default: m.ExperienceManager })));
const SkillsManager = lazy(() => import('./pages/admin/SkillsManager').then((m) => ({ default: m.SkillsManager })));
const CertificationsManager = lazy(() => import('./pages/admin/CertificationsManager').then((m) => ({ default: m.CertificationsManager })));
const ContactManager = lazy(() => import('./pages/admin/ContactManager').then((m) => ({ default: m.ContactManager })));
const SettingsManager = lazy(() => import('./pages/admin/SettingsManager').then((m) => ({ default: m.SettingsManager })));

function AdminLoading() {
  return (
    <div className="min-h-screen bg-[#07090D] flex items-center justify-center text-text-primary">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#89AACC] border-t-transparent animate-spin" />
        <span className="text-xs text-muted font-mono tracking-widest uppercase">Loading Admin Portal...</span>
      </div>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <BrowserRouter>
          <Suspense fallback={<AdminLoading />}>
            <Routes>
              {/* Public Portfolio */}
              <Route path="/" element={<Index />} />

              {/* Admin Authentication */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin CMS Dashboard */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Overview />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="resume" element={<ResumeManager />} />
                <Route path="about" element={<AboutManager />} />
                <Route path="experience" element={<ExperienceManager />} />
                <Route path="skills" element={<SkillsManager />} />
                <Route path="certifications" element={<CertificationsManager />} />
                <Route path="contact" element={<ContactManager />} />
                <Route path="settings" element={<SettingsManager />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </PortfolioProvider>
    </AuthProvider>
  );
}

export default App;
