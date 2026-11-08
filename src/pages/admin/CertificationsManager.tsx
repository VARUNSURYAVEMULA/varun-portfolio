import React, { useState } from 'react';
import { usePortfolio, CertificationItem } from '../../context/PortfolioContext';
import { uploadAsset } from '../../lib/supabase';
import {
  Award,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Calendar,
  Building2,
} from 'lucide-react';

export const CertificationsManager: React.FC = () => {
  const { certifications, saveCertification, deleteCertification } = usePortfolio();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const initialFormState: CertificationItem = {
    id: '',
    title: '',
    issuing_organization: '',
    issue_date: '2024',
    credential_id: '',
    credential_url: '',
    certificate_image_url: '',
    description: '',
    display_order: 1,
  };

  const [formData, setFormData] = useState<CertificationItem>(initialFormState);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setFormData({
      ...initialFormState,
      display_order: certifications.length + 1,
    });
    setFormMode('add');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (cert: CertificationItem) => {
    setFormData({ ...cert });
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const result = await uploadAsset(file, 'portfolio-assets');
    setIsUploading(false);

    if (result.url) {
      setFormData((prev) => ({ ...prev, certificate_image_url: result.url }));
      showToast('Certificate asset uploaded successfully!');
    } else {
      showToast(result.error || 'Failed to upload document.', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.issuing_organization.trim()) {
      showToast('Certification name and issuing organization are required.', 'error');
      return;
    }

    const res = await saveCertification(formData);
    if (res.success) {
      showToast(`Certification "${formData.title}" ${formMode === 'add' ? 'added' : 'updated'} successfully!`);
      setIsFormOpen(false);
    } else {
      showToast(res.error || 'Failed to save certification.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const res = await deleteCertification(id);
    setIsDeletingId(null);
    if (res.success) {
      showToast('Certification removed successfully.');
    } else {
      showToast(res.error || 'Failed to delete certification.', 'error');
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
            Credentials &amp; Awards
          </span>
          <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
            Certifications Management
          </h1>
          <p className="text-xs text-muted font-light mt-0.5">
            Manage your design licenses, industry certifications, and official accreditations.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5 rounded-full bg-text-primary text-bg hover:bg-white transition-colors shadow-sm"
        >
          <Plus size={15} />
          <span>Add Certification</span>
        </button>
      </div>

      {/* Certifications List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certifications.length === 0 ? (
          <div className="sm:col-span-2 p-12 text-center rounded-3xl bg-surface border border-stroke text-muted">
            <Award size={32} className="mx-auto mb-3 opacity-30" />
            <p className="text-xs">No certifications added yet. Click above to add one.</p>
          </div>
        ) : (
          certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-3xl bg-surface border border-stroke hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#89AACC] shrink-0 mt-0.5">
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-text-primary">{cert.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted font-light mt-0.5">
                        <Building2 size={12} className="text-[#89AACC]" />
                        <span>{cert.issuing_organization}</span>
                        <span className="text-muted/40">&bull;</span>
                        <span className="font-mono">{cert.issue_date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {cert.credential_url && (
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-stroke text-muted hover:text-white transition-colors"
                        title="Verify Credential"
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                    <button
                      onClick={() => handleOpenEdit(cert)}
                      className="p-1.5 rounded-lg border border-stroke text-muted hover:text-white transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => setIsDeletingId(cert.id)}
                      className="p-1.5 rounded-lg border border-stroke text-muted hover:text-red-400 hover:border-red-500/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {cert.credential_id && (
                  <div className="text-[11px] font-mono text-muted/70 mt-2">
                    Credential ID: <span className="text-[#89AACC]">{cert.credential_id}</span>
                  </div>
                )}

                {cert.description && (
                  <p className="text-xs text-muted font-light leading-relaxed mt-2.5">
                    {cert.description}
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
          <div className="bg-surface border border-stroke rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stroke pb-4 mb-5">
              <div>
                <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
                  {formMode === 'add' ? 'New Credential' : 'Edit Credential'}
                </span>
                <h3 className="text-lg sm:text-xl font-display italic text-text-primary mt-0.5">
                  {formMode === 'add' ? 'Add Certification' : formData.title}
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
                <label className="block text-muted mb-1 font-mono text-[11px]">CERTIFICATION NAME *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Master Visual & UI/UX Design"
                  required
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">ISSUING ORGANIZATION *</label>
                  <input
                    type="text"
                    value={formData.issuing_organization}
                    onChange={(e) => setFormData({ ...formData, issuing_organization: e.target.value })}
                    placeholder="e.g. Interaction Design Foundation"
                    required
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">ISSUE DATE *</label>
                  <input
                    type="text"
                    value={formData.issue_date}
                    onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                    placeholder="2024"
                    required
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">CREDENTIAL ID</label>
                  <input
                    type="text"
                    value={formData.credential_id || ''}
                    onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
                    placeholder="e.g. UX-98472-A"
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-muted mb-1 font-mono text-[11px]">CREDENTIAL VERIFICATION URL</label>
                  <input
                    type="url"
                    value={formData.credential_url || ''}
                    onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-muted mb-1 font-mono text-[11px]">DESCRIPTION / HIGHLIGHTS</label>
                <textarea
                  rows={2}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Design methodologies and core competencies covered"
                  className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none"
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
                  {formMode === 'add' ? 'Add Certification' : 'Save Certification'}
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
              <h3 className="text-base font-medium text-text-primary">Delete Certification?</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-5">
              Are you sure you want to remove this credential from your portfolio?
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

