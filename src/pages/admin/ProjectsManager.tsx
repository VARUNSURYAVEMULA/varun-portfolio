import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadAsset } from '../../lib/supabase';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  ExternalLink,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';

export const ProjectsManager: React.FC = () => {
  const { allProjects, saveProject, deleteProject, toggleProjectPublish, toggleProjectFeatured } = usePortfolio();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const initialFormState = {
    id: '',
    title: '',
    subtitle: '',
    category: 'Healthcare UI & Mobile',
    short_description: '',
    full_description: '',
    year: '2025',
    role: 'Lead Product Designer',
    team_size: '',
    duration: '',
    problem_statement: '',
    goals: '',
    target_audience: '',
    challenges: '',
    design_approach: '',
    research_insights: '',
    design_decisions: '',
    solution: '',
    learnings: '',
    outcome: '',
    tools: '', // comma-separated
    skills: '', // comma-separated
    tags: '', // comma-separated
    thumbnail_url: '',
    screenshots: [] as string[],
    video_url: '',
    prototype_url: '',
    live_url: '',
    case_study_url: '',
    is_featured: false,
    is_published: true,
    display_order: 0,
    span: 7 as 5 | 7,
  };

  const [formData, setFormData] = useState(initialFormState);

  // Extract unique categories for filter
  const categories = useMemo(() => {
    const set = new Set<string>();
    allProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [allProjects]);

  // Filtered project list
  const filteredProjects = useMemo(() => {
    return allProjects.filter((p: any) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

      const isPub = p.is_published !== false;
      const matchesStatus =
        statusFilter === 'All' ||
        (statusFilter === 'Published' && isPub) ||
        (statusFilter === 'Draft' && !isPub);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [allProjects, searchTerm, selectedCategory, statusFilter]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setFormData({
      ...initialFormState,
      display_order: allProjects.length + 1,
    });
    setFormMode('add');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setFormData({
      id: project.id,
      title: project.title || '',
      subtitle: project.subtitle || '',
      category: project.category || 'Healthcare UI & Mobile',
      short_description: project.short_description || project.description || '',
      full_description: project.full_description || project.description || '',
      year: project.year || '2025',
      role: project.role || '',
      team_size: project.team_size || '',
      duration: project.duration || '',
      problem_statement: project.problem_statement || '',
      goals: project.goals || '',
      target_audience: project.target_audience || '',
      challenges: project.challenges || '',
      design_approach: project.design_approach || '',
      research_insights: project.research_insights || '',
      design_decisions: project.design_decisions || '',
      solution: project.solution || '',
      learnings: project.learnings || '',
      outcome: project.outcome || '',
      tools: Array.isArray(project.tools) ? project.tools.join(', ') : '',
      skills: Array.isArray(project.skills) ? project.skills.join(', ') : '',
      tags: Array.isArray(project.tags) ? project.tags.join(', ') : '',
      thumbnail_url: project.image || project.thumbnail_url || '',
      screenshots: Array.isArray(project.screenshots) ? project.screenshots : [],
      video_url: project.video_url || project.video || '',
      prototype_url: project.prototype_url || '',
      live_url: project.live_url || project.link || project.externalLink || '',
      case_study_url: project.case_study_url || project.externalLink || '',
      is_featured: Boolean(project.is_featured),
      is_published: project.is_published !== false,
      display_order: project.display_order ?? 0,
      span: (project.span as 5 | 7) || 7,
    });
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.category.trim()) {
      showToast('Project title and category are required.', 'error');
      return;
    }

    const payload = {
      ...formData,
      tools: formData.tools.split(',').map((s) => s.trim()).filter(Boolean),
      skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      tags: formData.tags.split(',').map((s) => s.trim()).filter(Boolean),
    };

    const res = await saveProject(payload);
    if (res.success) {
      showToast(`Project "${formData.title}" ${formMode === 'add' ? 'created' : 'updated'} successfully!`);
      setIsFormOpen(false);
    } else {
      showToast(res.error || 'Failed to save project.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const target = allProjects.find((p) => p.id === id);
    const res = await deleteProject(id);
    setIsDeletingId(null);
    if (res.success) {
      showToast(`Project "${target?.title || id}" deleted successfully.`);
    } else {
      showToast(res.error || 'Failed to delete project.', 'error');
    }
  };

  // Thumbnail upload handler
  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const result = await uploadAsset(file, 'portfolio-assets');
    setIsUploadingImage(false);

    if (result.url) {
      setFormData((prev) => ({ ...prev, thumbnail_url: result.url }));
      showToast('Thumbnail uploaded successfully!');
    } else {
      showToast(result.error || 'Failed to upload thumbnail.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl text-xs font-medium border ${
            toastMessage.type === 'success'
              ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40 backdrop-blur-md'
              : 'bg-red-500/20 text-red-200 border-red-500/40 backdrop-blur-md'
          }`}
        >
          {toastMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
            Portfolio Works
          </span>
          <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
            Project Management
          </h1>
          <p className="text-xs text-muted font-light mt-0.5">
            Create, edit, organize, and publish case studies on your portfolio.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-full bg-text-primary text-bg hover:bg-white transition-colors shadow-sm"
        >
          <Plus size={15} />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="p-4 rounded-3xl bg-surface border border-stroke flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by title, category, keywords..."
            className="w-full bg-bg border border-stroke focus:border-[#89AACC] rounded-2xl px-4 py-2.5 text-xs text-text-primary placeholder:text-muted/40 outline-none pl-9 transition-colors"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Category Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-bg border border-stroke rounded-2xl px-3 py-2 text-xs text-text-primary outline-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Status Selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-bg border border-stroke rounded-2xl px-3 py-2 text-xs text-text-primary outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published Only</option>
            <option value="Draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-3xl bg-surface border border-stroke overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stroke text-muted font-mono uppercase tracking-wider text-[10px] bg-white/[0.01]">
                <th className="py-3 px-4 font-normal">Thumbnail</th>
                <th className="py-3 px-4 font-normal">Project Details</th>
                <th className="py-3 px-4 font-normal">Category</th>
                <th className="py-3 px-4 font-normal">Status</th>
                <th className="py-3 px-4 font-normal text-center">Featured</th>
                <th className="py-3 px-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stroke/50">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted">
                    No projects found matching your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project: any) => (
                  <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors">
                    {/* Thumbnail */}
                    <td className="py-3.5 px-4 w-20">
                      <img
                        src={project.image || project.thumbnail_url}
                        alt={project.title}
                        className="w-14 h-11 rounded-xl object-cover border border-stroke/60 bg-bg shrink-0"
                      />
                    </td>

                    {/* Details */}
                    <td className="py-3.5 px-4 max-w-xs sm:max-w-md">
                      <div className="font-medium text-text-primary text-sm group-hover:text-white transition-colors">
                        {project.title}
                      </div>
                      <div className="text-xs text-muted font-light line-clamp-1 mt-0.5">
                        {project.subtitle || project.description}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-muted/60">
                          Year: {project.year || '2025'}
                        </span>
                        {project.role && (
                          <>
                            <span className="text-muted/40">&bull;</span>
                            <span className="text-[10px] font-mono text-[#89AACC]">
                              {project.role}
                            </span>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-muted whitespace-nowrap">
                      {project.category}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleProjectPublish(project.id, !(project.is_published !== false))}
                        title="Click to toggle published / draft"
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono transition-colors ${
                          project.is_published !== false
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        {project.is_published !== false ? <Eye size={11} /> : <EyeOff size={11} />}
                        <span>{project.is_published !== false ? 'Published' : 'Draft'}</span>
                      </button>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => toggleProjectFeatured(project.id, !project.is_featured)}
                        title="Toggle Featured"
                        className={`p-1.5 rounded-lg transition-colors ${
                          project.is_featured
                            ? 'text-yellow-400 hover:bg-yellow-400/10'
                            : 'text-muted/40 hover:text-muted hover:bg-white/5'
                        }`}
                      >
                        <Star size={15} fill={project.is_featured ? 'currentColor' : 'none'} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Live URL"
                            className="p-1.5 rounded-xl border border-stroke text-muted hover:text-white hover:border-white/20 transition-colors"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}

                        <button
                          onClick={() => handleOpenEdit(project)}
                          title="Edit Project"
                          className="p-1.5 rounded-xl border border-stroke text-muted hover:text-text-primary hover:border-white/20 transition-colors"
                        >
                          <Edit2 size={13} />
                        </button>

                        <button
                          onClick={() => setIsDeletingId(project.id)}
                          title="Delete Project"
                          className="p-1.5 rounded-xl border border-stroke text-muted hover:text-red-400 hover:border-red-500/30 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Drawer / Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-surface border border-stroke rounded-3xl p-6 sm:p-9 w-full max-w-3xl my-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stroke pb-4 mb-6">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
                  {formMode === 'add' ? 'New Case Study' : 'Edit Case Study'}
                </span>
                <h2 className="text-xl sm:text-2xl font-display italic text-text-primary mt-0.5">
                  {formMode === 'add' ? 'Create Project' : formData.title}
                </h2>
              </div>

              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6 text-xs">
              {/* Section 1: Basic Information */}
              <div>
                <h3 className="text-xs text-[#89AACC] uppercase tracking-wider font-mono mb-3">
                  1. Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-muted mb-1 font-mono text-[11px]">PROJECT TITLE *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. RadFlow Radiology Mobile App"
                      required
                      className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-muted mb-1 font-mono text-[11px]">PROJECT SUBTITLE</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="One line value proposition or summary"
                      className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                    />
                  </div>

                  <div>
                    <label className="block text-muted mb-1 font-mono text-[11px]">CATEGORY *</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Healthcare UI & Mobile"
                      required
                      className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                    />
                  </div>

                  <div>
                    <label className="block text-muted mb-1 font-mono text-[11px]">YEAR</label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      placeholder="2025"
                      className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                    />
                  </div>

                  <div>
                    <label className="block text-muted mb-1 font-mono text-[11px]">MY ROLE</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="e.g. Lead Product Designer"
                      className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                    />
                  </div>

                  <div>
                    <label className="block text-muted mb-1 font-mono text-[11px]">GRID SPAN (COLUMNS)</label>
                    <select
                      value={formData.span}
                      onChange={(e) => setFormData({ ...formData, span: Number(e.target.value) as 5 | 7 })}
                      className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                    >
                      <option value={7}>Wide (7 Columns)</option>
                      <option value={5}>Compact (5 Columns)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Descriptions */}
              <div>
                <h3 className="text-xs text-[#89AACC] uppercase tracking-wider font-mono mb-3">
                  2. Descriptions &amp; Case Study Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-muted mb-1 font-mono text-[11px]">SHORT DESCRIPTION (CARD PREVIEW)</label>
                    <textarea
                      rows={2}
                      value={formData.short_description}
                      onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                      placeholder="Brief excerpt displayed on portfolio grid cards"
                      className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none focus:border-[#89AACC]"
                    />
                  </div>

                  <div>
                    <label className="block text-muted mb-1 font-mono text-[11px]">FULL CASE STUDY / OVERVIEW</label>
                    <textarea
                      rows={4}
                      value={formData.full_description}
                      onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                      placeholder="Complete project overview and narrative"
                      className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none focus:border-[#89AACC]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">PROBLEM STATEMENT</label>
                      <textarea
                        rows={2}
                        value={formData.problem_statement}
                        onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
                        placeholder="Core pain point or market friction"
                        className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">PROJECT GOALS</label>
                      <textarea
                        rows={2}
                        value={formData.goals}
                        onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                        placeholder="Measurable objectives and target metrics"
                        className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">TARGET AUDIENCE</label>
                      <textarea
                        rows={2}
                        value={formData.target_audience}
                        onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                        placeholder="Clinicians, patients, enterprise operators"
                        className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">SOLUTION &amp; OUTCOME</label>
                      <textarea
                        rows={2}
                        value={formData.solution}
                        onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                        placeholder="Delivered UI architecture and usability wins"
                        className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Design Information & Media */}
              <div>
                <h3 className="text-xs text-[#89AACC] uppercase tracking-wider font-mono mb-3">
                  3. Media, Assets &amp; Links
                </h3>
                <div className="space-y-4">
                  {/* Thumbnail */}
                  <div>
                    <label className="block text-muted mb-1 font-mono text-[11px]">PROJECT THUMBNAIL (IMAGE URL OR UPLOAD)</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={formData.thumbnail_url}
                        onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                        placeholder="https://..."
                        className="flex-1 bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                      />
                      <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stroke bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors shrink-0">
                        <Upload size={14} />
                        <span>{isUploadingImage ? 'Uploading...' : 'Upload'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailUpload}
                          disabled={isUploadingImage}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {formData.thumbnail_url && (
                      <div className="mt-2.5 flex items-center gap-3">
                        <img
                          src={formData.thumbnail_url}
                          alt="Thumbnail preview"
                          className="w-20 h-14 rounded-lg object-cover border border-stroke/60 bg-black/40"
                        />
                        <span className="text-[11px] text-muted font-light">Preview ready</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">LIVE PROJECT URL</label>
                      <input
                        type="url"
                        value={formData.live_url}
                        onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-bg border border-stroke rounded-xl px-3 py-2 text-text-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">BEHANCE / CASE STUDY URL</label>
                      <input
                        type="url"
                        value={formData.case_study_url}
                        onChange={(e) => setFormData({ ...formData, case_study_url: e.target.value })}
                        placeholder="https://behance.net/..."
                        className="w-full bg-bg border border-stroke rounded-xl px-3 py-2 text-text-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">PROTOTYPE URL (FIGMA)</label>
                      <input
                        type="url"
                        value={formData.prototype_url}
                        onChange={(e) => setFormData({ ...formData, prototype_url: e.target.value })}
                        placeholder="https://figma.com/proto/..."
                        className="w-full bg-bg border border-stroke rounded-xl px-3 py-2 text-text-primary outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">TAGS (COMMA SEPARATED)</label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="Healthcare, Mobile App, Wireframes"
                        className="w-full bg-bg border border-stroke rounded-xl px-3 py-2 text-text-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-muted mb-1 font-mono text-[11px]">TOOLS USED (COMMA SEPARATED)</label>
                      <input
                        type="text"
                        value={formData.tools}
                        onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                        placeholder="Figma, Protopie, Illustrator"
                        className="w-full bg-bg border border-stroke rounded-xl px-3 py-2 text-text-primary outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Publishing Toggles */}
              <div className="pt-2 border-t border-stroke flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="w-4 h-4 rounded border-stroke text-[#4E85BF] bg-bg cursor-pointer accent-[#4E85BF]"
                    />
                    <span className="text-xs text-text-primary font-medium">Publish to public website</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded border-stroke text-yellow-500 bg-bg cursor-pointer accent-yellow-500"
                    />
                    <span className="text-xs text-text-primary font-medium">Mark as Featured</span>
                  </label>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stroke text-muted hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-text-primary text-bg font-medium hover:bg-white transition-colors"
                  >
                    {formMode === 'add' ? 'Create Project' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeletingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-stroke rounded-3xl p-6 sm:p-7 w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <AlertCircle size={22} />
              <h3 className="text-base font-medium text-text-primary">Confirm Deletion</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-5">
              Are you sure you want to delete{' '}
              <strong className="text-text-primary">
                "{allProjects.find((p) => p.id === isDeletingId)?.title || isDeletingId}"
              </strong>
              ? This action cannot be undone and will remove it from the public portfolio.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsDeletingId(null)}
                className="px-4 py-2 rounded-xl text-xs text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(isDeletingId)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

