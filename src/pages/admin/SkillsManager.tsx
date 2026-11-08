import React, { useState, useMemo } from 'react';
import { usePortfolio, SkillItem } from '../../context/PortfolioContext';
import {
  Wrench,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  Tag,
  Folder,
} from 'lucide-react';

export const SKILL_CATEGORIES = [
  'UX Design',
  'UI Design',
  'Product Design',
  'UX Research',
  'Prototyping',
  'Design Systems',
  'AI Tools',
  'Tools',
  'Development Tools',
];

export const SkillsManager: React.FC = () => {
  const { skills, saveSkill, deleteSkill, toggleSkillVisibility } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormState: SkillItem = {
    id: '',
    name: '',
    category: 'UX Design',
    tag: '',
    description: '',
    icon_svg: '',
    icon_name: '',
    is_visible: true,
    display_order: 1,
  };

  const [formData, setFormData] = useState<SkillItem>(initialFormState);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return skills;
    return skills.filter((s) => s.category.toLowerCase() === activeCategory.toLowerCase());
  }, [skills, activeCategory]);

  const handleOpenAdd = () => {
    setFormData({
      ...initialFormState,
      display_order: skills.length + 1,
      category: activeCategory !== 'All' ? activeCategory : 'UX Design',
    });
    setFormMode('add');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (skill: SkillItem) => {
    setFormData({ ...skill });
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Skill name is required.', 'error');
      return;
    }

    const res = await saveSkill(formData);
    if (res.success) {
      showToast(`Skill "${formData.name}" ${formMode === 'add' ? 'created' : 'updated'} successfully!`);
      setIsFormOpen(false);
    } else {
      showToast(res.error || 'Failed to save skill.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteSkill(id);
    setIsDeletingId(null);
    if (res.success) {
      showToast('Skill removed successfully.');
    } else {
      showToast(res.error || 'Failed to delete skill.', 'error');
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
            Competencies &amp; Software
          </span>
          <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
            Skills &amp; Tools Management
          </h1>
          <p className="text-xs text-muted font-light mt-0.5">
            Dynamically organize your design disciplines, software toolkit, and AI capabilities.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-full bg-text-primary text-bg hover:bg-white transition-colors shadow-sm"
        >
          <Plus size={15} />
          <span>Add Skill</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
            activeCategory === 'All'
              ? 'bg-text-primary text-bg'
              : 'bg-surface border border-stroke text-muted hover:text-white'
          }`}
        >
          All Skills ({skills.length})
        </button>
        {SKILL_CATEGORIES.map((cat) => {
          const count = skills.filter((s) => s.category.toLowerCase() === cat.toLowerCase()).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeCategory === cat
                  ? 'bg-text-primary text-bg'
                  : 'bg-surface border border-stroke text-muted hover:text-white'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && <span className="opacity-60 text-[10px] font-mono">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 p-12 text-center rounded-3xl bg-surface border border-stroke text-muted">
            <Wrench size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-xs">No skills found in this category. Click "Add Skill" above.</p>
          </div>
        ) : (
          filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className={`p-5 rounded-3xl bg-surface border transition-all duration-200 flex flex-col justify-between ${
                skill.is_visible ? 'border-stroke hover:border-white/20' : 'border-dashed border-stroke/60 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-text-primary flex items-center gap-2">
                      <span>{skill.name}</span>
                      {!skill.is_visible && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-muted">
                          Hidden
                        </span>
                      )}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-[#89AACC] uppercase">
                        {skill.category}
                      </span>
                      {skill.tag && (
                        <>
                          <span className="text-muted/40">&bull;</span>
                          <span className="text-[10px] text-muted font-light">{skill.tag}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleSkillVisibility(skill.id, !skill.is_visible)}
                      title={skill.is_visible ? 'Hide from public site' : 'Show on public site'}
                      className="p-1.5 rounded-lg text-muted hover:text-white transition-colors"
                    >
                      {skill.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => handleOpenEdit(skill)}
                      title="Edit"
                      className="p-1.5 rounded-lg text-muted hover:text-white transition-colors"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setIsDeletingId(skill.id)}
                      title="Delete"
                      className="p-1.5 rounded-lg text-muted hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {skill.description && (
                  <p className="text-xs text-muted font-light leading-relaxed mt-2 line-clamp-2">
                    {skill.description}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="bg-surface border border-stroke rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-stroke pb-4 mb-5">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
                  {formMode === 'add' ? 'New Competency' : 'Edit Skill'}
                </span>
                <h3 className="text-lg sm:text-xl font-display italic text-text-primary mt-0.5">
                  {formMode === 'add' ? 'Add Skill or Tool' : formData.name}
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
              <div>
                <label className="block text-muted mb-1 font-mono text-[11px]">SKILL / TOOL NAME *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Design Systems or Protopie"
                  required
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none cursor-pointer"
                  >
                    {SKILL_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">TAG / SUBTITLE</label>
                  <input
                    type="text"
                    value={formData.tag || ''}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g. UI/UX or Prototyping"
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted mb-1 font-mono text-[11px]">SHORT DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Emerging visual aesthetics, trends & design experiments"
                  className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-muted mb-1 font-mono text-[11px]">CUSTOM SVG ICON (OPTIONAL)</label>
                <textarea
                  rows={2}
                  value={formData.icon_svg || ''}
                  onChange={(e) => setFormData({ ...formData, icon_svg: e.target.value })}
                  placeholder="<svg viewBox='0 0 24 24'>...</svg>"
                  className="w-full bg-bg border border-stroke rounded-xl p-2.5 text-text-primary outline-none font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stroke">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.is_visible}
                    onChange={(e) => setFormData({ ...formData, is_visible: e.target.checked })}
                    className="w-4 h-4 rounded border-stroke text-[#4E85BF] bg-bg cursor-pointer accent-[#4E85BF]"
                  />
                  <span className="text-xs text-text-primary">Visible on public portfolio</span>
                </label>

                <div className="flex items-center gap-2">
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
                    {formMode === 'add' ? 'Add Skill' : 'Save Skill'}
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
              <h3 className="text-base font-medium text-text-primary">Delete Skill?</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-5">
              Are you sure you want to remove this skill from your portfolio toolkit?
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

