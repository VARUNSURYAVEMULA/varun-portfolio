import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadAsset } from '../../lib/supabase';
import { User, Upload, CheckCircle2, AlertCircle, Save, Sparkles, MapPin, Mail, Phone, Clock } from 'lucide-react';

export const AboutManager: React.FC = () => {
  const { profile, saveProfile } = usePortfolio();

  const [formData, setFormData] = useState({
    full_name: profile.full_name || '',
    short_name: profile.short_name || '',
    designation: profile.designation || '',
    eyebrow: profile.eyebrow || '',
    short_intro: profile.short_intro || '',
    about_description: profile.about_description || '',
    professional_summary: profile.professional_summary || '',
    objective: profile.objective || '',
    location: profile.location || '',
    email: profile.email || '',
    phone: profile.phone || '',
    years_of_experience: profile.years_of_experience || '',
    profile_image_url: profile.profile_image_url || '',
    roles: profile.roles.join(', ') || '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const result = await uploadAsset(file, 'portfolio-assets');
    setIsUploading(false);

    if (result.url) {
      setFormData((prev) => ({ ...prev, profile_image_url: result.url }));
      showToast('Profile image uploaded successfully!');
    } else {
      showToast(result.error || 'Failed to upload photo.', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      roles: formData.roles.split(',').map((r) => r.trim()).filter(Boolean),
    };

    const res = await saveProfile(payload);
    setIsSaving(false);

    if (res.success) {
      showToast('Profile details updated successfully!');
    } else {
      showToast(res.error || 'Failed to update profile.', 'error');
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
      <div>
        <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-mono">
          Identity &amp; Bio
        </span>
        <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
          About Me Management
        </h1>
        <p className="text-xs text-muted font-light mt-0.5">
          Edit your name, designation, biography, objective, and years of experience displayed across the public website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Profile Card & Avatar */}
        <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-bg border border-stroke overflow-hidden flex items-center justify-center text-muted shrink-0">
                {formData.profile_image_url ? (
                  <img
                    src={formData.profile_image_url}
                    alt="Profile Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={36} className="text-muted/40" />
                )}
              </div>

              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 rounded-2xl flex flex-col items-center justify-center text-[10px] text-white cursor-pointer transition-opacity">
                <Upload size={16} className="mb-1" />
                <span>Change</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="text-base font-medium text-text-primary">
                {formData.full_name || 'Vemula Varun Surya'}
              </h3>
              <p className="text-xs text-[#89AACC]">
                {formData.designation || 'UI/UX Designer | Product Designer'}
              </p>
              <p className="text-xs text-muted font-light">
                {formData.location || 'Hyderabad, India'} &bull; {formData.years_of_experience || '1.8+'} shipping experience
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Names & Designations */}
        <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-4">
          <h3 className="text-xs text-[#89AACC] uppercase tracking-wider font-mono">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">FULL NAME *</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                required
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">SHORT / DISPLAY NAME</label>
              <input
                type="text"
                value={formData.short_name}
                onChange={(e) => setFormData({ ...formData, short_name: e.target.value })}
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">PROFESSIONAL DESIGNATION *</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                required
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">YEARS OF EXPERIENCE</label>
              <input
                type="text"
                value={formData.years_of_experience}
                onChange={(e) => setFormData({ ...formData, years_of_experience: e.target.value })}
                placeholder="1.8+"
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">LOCATION</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Hyderabad, India"
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">EMAIL ADDRESS</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Editorial & Biography */}
        <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-4">
          <h3 className="text-xs text-[#89AACC] uppercase tracking-wider font-mono">
            Biography &amp; Objectives
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">
                HERO SHORT INTRO (EYEBROW STATEMENT)
              </label>
              <input
                type="text"
                value={formData.short_intro}
                onChange={(e) => setFormData({ ...formData, short_intro: e.target.value })}
                placeholder="I design calm, human-first products."
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">
                ABOUT ME DESCRIPTION (PUBLIC SECTION)
              </label>
              <textarea
                rows={4}
                value={formData.about_description}
                onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
                placeholder="Detailed narrative about your design philosophy and healthcare focus"
                className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">
                CAREER OBJECTIVE (CURRICULUM VITAE)
              </label>
              <textarea
                rows={3}
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                placeholder="Career objective statement as featured on your resume"
                className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">
                ROLES &amp; SPECIALIZATIONS (COMMA SEPARATED)
              </label>
              <input
                type="text"
                value={formData.roles}
                onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
                placeholder="Product Designer, UI/UX Specialist, Design Engineer"
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text-primary text-bg font-medium text-xs hover:bg-white transition-colors shadow-sm disabled:opacity-50"
          >
            <Save size={14} />
            <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

