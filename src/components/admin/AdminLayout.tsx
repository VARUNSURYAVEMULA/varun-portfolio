import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  User,
  Briefcase,
  Wrench,
  Award,
  Share2,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const { isSupabaseLive, refreshData, profile } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin', { replace: true });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'Projects', path: '/admin/dashboard/projects', icon: FolderKanban },
    { name: 'Resume', path: '/admin/dashboard/resume', icon: FileText },
    { name: 'About Me', path: '/admin/dashboard/about', icon: User },
    { name: 'Experience', path: '/admin/dashboard/experience', icon: Briefcase },
    { name: 'Skills & Tools', path: '/admin/dashboard/skills', icon: Wrench },
    { name: 'Certifications', path: '/admin/dashboard/certifications', icon: Award },
    { name: 'Contact Info', path: '/admin/dashboard/contact', icon: Share2 },
    { name: 'Settings', path: '/admin/dashboard/settings', icon: Settings },
  ];

  // Current formatted date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="min-h-screen bg-bg text-text-primary flex flex-col lg:flex-row font-body selection:bg-white/20 selection:text-white">
      {/* Mobile Header Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3.5 bg-surface border-b border-stroke sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#89AACC] font-display italic font-semibold text-sm">
            VS
          </div>
          <div>
            <div className="text-xs font-medium text-text-primary">Portfolio Admin</div>
            <div className="text-[10px] text-muted font-mono">Varun Surya</div>
          </div>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-9 h-9 rounded-xl border border-stroke flex items-center justify-center text-muted hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surface/95 backdrop-blur-xl border-r border-stroke flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:w-64 xl:w-72 shrink-0`}
      >
        {/* Brand Header */}
        <div>
          <div className="p-6 border-b border-stroke flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#89AACC]/20 to-[#4E85BF]/10 border border-white/10 flex items-center justify-center text-[#89AACC] font-display italic font-bold text-base shadow-sm">
                VS
              </div>
              <div>
                <h2 className="text-sm font-medium text-text-primary tracking-tight">
                  {profile.short_name || 'Varun Surya'}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSupabaseLive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className="text-[10px] text-muted font-mono">
                    {isSupabaseLive ? 'Supabase Connected' : 'Local Fallback'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-muted hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-text-primary shadow-sm border border-white/10'
                      : 'text-muted hover:text-text-primary hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#89AACC]' : 'text-muted'} />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-stroke space-y-3">
          {/* Quick link to live public site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-muted hover:text-text-primary hover:bg-white/[0.04] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={13} className="text-[#89AACC]" />
              <span>Public Portfolio</span>
            </span>
            <span className="text-[10px] font-mono text-muted/60">↗</span>
          </a>

          {/* User profile & Logout */}
          <div className="pt-2 border-t border-stroke/50 flex items-center justify-between">
            <div className="overflow-hidden pr-2">
              <div className="text-xs font-medium text-text-primary truncate">
                {user?.email || 'admin@varunsurya.com'}
              </div>
              <div className="text-[10px] text-muted font-mono uppercase">
                Administrator
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4.5 bg-surface/50 backdrop-blur-md border-b border-stroke sticky top-0 z-30">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#89AACC]" />
              <span className="text-xs text-text-primary font-medium">
                Welcome back, {profile.short_name || 'Varun'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted font-light mt-0.5">
              <Calendar size={12} className="text-muted/60" />
              <span>{todayFormatted}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Database indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-stroke text-xs text-muted">
              {isSupabaseLive ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span className="text-emerald-300 font-mono text-[11px]">Database Active</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={13} className="text-amber-400" />
                  <span className="text-amber-300 font-mono text-[11px]">Fallback Mode</span>
                </>
              )}
            </div>

            {/* Refresh Data Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title="Sync latest content"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-stroke text-xs text-muted hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-[#89AACC]' : ''} />
              <span>Sync</span>
            </button>

            {/* View Live Portfolio */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-full bg-white text-bg hover:bg-white/90 transition-colors"
            >
              <span>View Site</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Backdrop overlay for mobile drawer */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}
    </div>
  );
};

