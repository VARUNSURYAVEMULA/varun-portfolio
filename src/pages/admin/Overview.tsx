import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  FolderKanban,
  FileCheck2,
  FileText,
  Star,
  Eye,
  Plus,
  ArrowUpRight,
  Briefcase,
  Wrench,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react';

export const Overview: React.FC = () => {
  const { allProjects, resume, experiences, skills, certifications, isSupabaseLive } = usePortfolio();

  const totalProjects = allProjects.length;
  const publishedProjects = allProjects.filter((p: any) => p.is_published !== false).length;
  const draftProjects = totalProjects - publishedProjects;
  const featuredProjects = allProjects.filter((p: any) => p.is_featured === true).length;

  return (
    <div className="space-y-8">
      {/* Title & Quick Add Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
            Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-display italic text-text-primary mt-1">
            Portfolio Overview
          </h1>
          <p className="text-xs sm:text-sm text-muted font-light mt-1">
            Real-time management summary across your projects, experience, resume, and credentials.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/dashboard/projects"
            className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-full bg-text-primary text-bg hover:bg-white transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Total Projects */}
        <div className="p-4 rounded-2xl bg-surface border border-stroke flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-mono">Total Projects</span>
            <FolderKanban size={16} className="text-[#89AACC]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-medium text-text-primary">{totalProjects}</div>
            <div className="text-[11px] text-muted mt-1">All catalog items</div>
          </div>
        </div>

        {/* Published Projects */}
        <div className="p-4 rounded-2xl bg-surface border border-stroke flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-mono">Published</span>
            <Eye size={16} className="text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-medium text-emerald-300">{publishedProjects}</div>
            <div className="text-[11px] text-muted mt-1">Live on public site</div>
          </div>
        </div>

        {/* Draft Projects */}
        <div className="p-4 rounded-2xl bg-surface border border-stroke flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-mono">Drafts</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-medium text-amber-300">{draftProjects}</div>
            <div className="text-[11px] text-muted mt-1">Hidden from public</div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="p-4 rounded-2xl bg-surface border border-stroke flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-mono">Featured</span>
            <Star size={16} className="text-yellow-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-medium text-yellow-300">{featuredProjects}</div>
            <div className="text-[11px] text-muted mt-1">Hero highlights</div>
          </div>
        </div>

        {/* Resume Status */}
        <div className="p-4 rounded-2xl bg-surface border border-stroke flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-muted mb-2">
            <span className="text-xs font-mono">Resume</span>
            <FileCheck2 size={16} className="text-[#89AACC]" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-medium text-text-primary truncate">
              {resume.is_active ? 'Active (PDF)' : 'Inactive'}
            </div>
            <div className="text-[11px] text-muted mt-1 truncate">
              {resume.filename || 'resume.pdf'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/dashboard/projects"
          className="group p-5 rounded-2xl bg-white/[0.02] border border-stroke hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#89AACC]">
              <FolderKanban size={18} />
            </div>
            <ArrowUpRight size={14} className="text-muted group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
              Manage Projects
            </h3>
            <p className="text-xs text-muted font-light mt-1">
              Add case studies, upload high-res screenshots &amp; toggle featured status.
            </p>
          </div>
        </Link>

        <Link
          to="/admin/dashboard/resume"
          className="group p-5 rounded-2xl bg-white/[0.02] border border-stroke hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#89AACC]">
              <FileText size={18} />
            </div>
            <ArrowUpRight size={14} className="text-muted group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
              Update Resume
            </h3>
            <p className="text-xs text-muted font-light mt-1">
              Upload and preview your latest PDF curriculum vitae.
            </p>
          </div>
        </Link>

        <Link
          to="/admin/dashboard/experience"
          className="group p-5 rounded-2xl bg-white/[0.02] border border-stroke hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#89AACC]">
              <Briefcase size={18} />
            </div>
            <ArrowUpRight size={14} className="text-muted group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
              Work Experience
            </h3>
            <p className="text-xs text-muted font-light mt-1">
              {experiences.length} positions recorded. Update roles and clinical responsibilities.
            </p>
          </div>
        </Link>

        <Link
          to="/admin/dashboard/skills"
          className="group p-5 rounded-2xl bg-white/[0.02] border border-stroke hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#89AACC]">
              <Wrench size={18} />
            </div>
            <ArrowUpRight size={14} className="text-muted group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-text-primary group-hover:text-white transition-colors">
              Skills &amp; Tools
            </h3>
            <p className="text-xs text-muted font-light mt-1">
              {skills.length} dynamic skills. Manage design, research &amp; AI tools.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Projects Table Preview */}
      <div className="p-6 rounded-3xl bg-surface border border-stroke">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-medium text-text-primary">Recent Projects</h3>
            <p className="text-xs text-muted font-light mt-0.5">
              Live status and visibility of your featured portfolio works.
            </p>
          </div>

          <Link
            to="/admin/dashboard/projects"
            className="text-xs text-[#89AACC] hover:underline flex items-center gap-1"
          >
            <span>View All ({allProjects.length})</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stroke text-muted font-mono uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-normal">Project</th>
                <th className="pb-3 font-normal">Category</th>
                <th className="pb-3 font-normal">Year</th>
                <th className="pb-3 font-normal">Status</th>
                <th className="pb-3 font-normal">Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke/50">
              {allProjects.slice(0, 5).map((proj: any) => (
                <tr key={proj.id} className="group hover:bg-white/[0.02]">
                  <td className="py-3.5 pr-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.image || proj.thumbnail_url}
                        alt={proj.title}
                        className="w-10 h-10 rounded-xl object-cover border border-stroke/60 shrink-0"
                      />
                      <div>
                        <div className="font-medium text-text-primary group-hover:text-white transition-colors">
                          {proj.title}
                        </div>
                        <div className="text-[11px] text-muted truncate max-w-xs font-light">
                          {proj.subtitle || proj.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-muted">{proj.category}</td>
                  <td className="py-3.5 px-3 text-muted font-mono">{proj.year || '2025'}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        proj.is_published !== false
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {proj.is_published !== false ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    {proj.is_featured ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-yellow-300">
                        <Star size={12} fill="currentColor" />
                        <span>Yes</span>
                      </span>
                    ) : (
                      <span className="text-muted/60 text-[11px]">&mdash;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

