import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Calendar,
  MapPin,
  ListPlus,
  ArrowUpDown,
} from 'lucide-react';

export const ExperienceManager: React.FC = () => {
  const { experiences, saveExperience, deleteExperience } = usePortfolio();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormState = {
    id: '',
    company: '',
    role: '',
    employment_type: 'Full-time',
    location: 'Hyderabad, IN',
    period: 'Feb 2025 — Present',
    start_date: '2025-02-01',
    end_date: '',
    is_current: true,
    description: '',
    responsibilities: '', // Newline separated for easy editing
    skills_used: '', // Comma separated
    display_order: 1,
  };

  const [formData, setFormData] = useState(initialFormState);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setFormData({
      ...initialFormState,
      display_order: experiences.length + 1,
    });
    setFormMode('add');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setFormData({
      id: item.id,
      company: item.company || '',
      role: item.role || '',
      employment_type: item.employment_type || 'Full-time',
      location: item.location || '',
      period: item.period || '',
      start_date: item.start_date || '',
      end_date: item.end_date || '',
      is_current: item.is_current ?? true,
      description: item.description || '',
      responsibilities: Array.isArray(item.bullets) ? item.bullets.join('\n') : '',
      skills_used: Array.isArray(item.skills_used) ? item.skills_used.join(', ') : '',
      display_order: item.display_order ?? 1,
    });
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.role.trim()) {
      showToast('Company name and job role are required.', 'error');
      return;
    }

    const payload = {
      ...formData,
      responsibilities: formData.responsibilities
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      skills_used: formData.skills_used
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const res = await saveExperience(payload);
    if (res.success) {
      showToast(`Experience at "${formData.company}" ${formMode === 'add' ? 'added' : 'updated'} successfully!`);
      setIsFormOpen(false);
    } else {
      showToast(res.error || 'Failed to save experience.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteExperience(id);
    setIsDeletingId(null);
    if (res.success) {
      showToast('Work experience entry removed successfully.');
    } else {
      showToast(res.error || 'Failed to remove experience.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
            Career Timeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
            Work Experience
          </h1>
          <p className="text-xs text-muted font-light mt-0.5">
            Manage your employment history, clinical projects, and responsibilities.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-full bg-text-primary text-bg hover:bg-white transition-colors shadow-sm"
        >
          <Plus size={15} />
          <span>Add Position</span>
        </button>
      </div>

      {/* Experience List Cards */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-surface border border-stroke text-muted">
            <Briefcase size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-xs">No experience entries recorded. Click above to add your first role.</p>
          </div>
        ) : (
          experiences.map((item: any) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-surface border border-stroke hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-medium text-text-primary">
                      {item.role}
                    </h3>
                    <span className="text-xs text-[#89AACC] font-medium">
                      &bull; {item.company}
                    </span>
                    {item.employment_type && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-stroke font-mono text-muted">
                        {item.employment_type}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted font-light mt-1">
                    <MapPin size={12} className="text-[#89AACC]" />
                    <span>{item.location}</span>
                    <span className="text-muted/40">&bull;</span>
                    <span className="font-mono text-text-primary/80">{item.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-xl border border-stroke text-muted hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => setIsDeletingId(item.id)}
                    className="p-2 rounded-xl border border-stroke text-muted hover:text-red-400 hover:border-red-500/30 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Responsibilities */}
              {item.bullets && item.bullets.length > 0 && (
                <ul className="text-xs text-muted font-light space-y-1.5 list-disc list-inside border-t border-stroke/50 pt-3.5 leading-relaxed">
                  {item.bullets.map((bullet: string, idx: number) => (
                    <li key={idx}>
                      <span className="text-text-primary/90">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Experience Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-surface border border-stroke rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stroke pb-4 mb-5">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
                  {formMode === 'add' ? 'New Experience' : 'Edit Position'}
                </span>
                <h3 className="text-lg sm:text-xl font-display italic text-text-primary mt-0.5">
                  {formMode === 'add' ? 'Add Career Role' : formData.role}
                </h3>
              </div>

              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center text-muted hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">COMPANY NAME *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Achala IT Solutions"
                    required
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">JOB TITLE / ROLE *</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. UI/UX Designer"
                    required
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">PERIOD / DURATION *</label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="Feb 2025 — Present"
                    required
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">LOCATION</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Hyderabad, IN"
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">EMPLOYMENT TYPE</label>
                  <select
                    value={formData.employment_type}
                    onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none cursor-pointer"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">DISPLAY ORDER</label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                  />
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-muted font-mono text-[11px]">RESPONSIBILITIES &amp; ACHIEVEMENTS</label>
                  <span className="text-[10px] text-muted/60 font-mono">One bullet per line</span>
                </div>
                <textarea
                  rows={5}
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                  placeholder="Designed user-centric web and mobile interfaces aligned with business goals.&#10;Delivered end-to-end UI/UX solutions for NephroPlus Guest App and Radiologist Mobile App."
                  className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none focus:border-[#89AACC] font-light leading-relaxed"
                />
              </div>

              {/* Skills Used */}
              <div>
                <label className="block text-muted mb-1 font-mono text-[11px]">SKILLS USED (COMMA SEPARATED)</label>
                <input
                  type="text"
                  value={formData.skills_used}
                  onChange={(e) => setFormData({ ...formData, skills_used: e.target.value })}
                  placeholder="Figma, Design Systems, UX Research, WCAG AAA"
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-stroke">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-muted hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-text-primary text-bg font-medium hover:bg-white transition-colors"
                >
                  {formMode === 'add' ? 'Add Position' : 'Save Position'}
                </button>
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
              <h3 className="text-base font-medium text-text-primary">Delete Experience?</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-5">
              Are you sure you want to remove this role from your portfolio timeline?
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

