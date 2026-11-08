import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Share2,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { LinkedinIcon, BehanceIcon, DribbbleIcon } from '../../components/Icons';

export const ContactManager: React.FC = () => {
  const { contact, saveContact } = usePortfolio();

  const [formData, setFormData] = useState({
    email: contact.email || 'ux.varunsurya@gmail.com',
    phone: contact.phone || '+91 9573434978',
    location: contact.location || 'Hyderabad, India',
    linkedin_url: contact.linkedin_url || '',
    github_url: contact.github_url || '',
    behance_url: contact.behance_url || '',
    dribbble_url: contact.dribbble_url || '',
    other_links: contact.other_links || [],
  });

  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddOtherLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkName.trim() || !newLinkUrl.trim()) return;

    setFormData((prev) => ({
      ...prev,
      other_links: [...(prev.other_links || []), { name: newLinkName.trim(), url: newLinkUrl.trim() }],
    }));
    setNewLinkName('');
    setNewLinkUrl('');
  };

  const handleRemoveOtherLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      other_links: (prev.other_links || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const res = await saveContact(formData);
    setIsSaving(false);

    if (res.success) {
      showToast('Contact details and social links updated successfully!');
    } else {
      showToast(res.error || 'Failed to update contact info.', 'error');
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
          Channels &amp; Socials
        </span>
        <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
          Contact Information Management
        </h1>
        <p className="text-xs text-muted font-light mt-0.5">
          Configure your primary contact channels, phone, and professional network profiles across the public portfolio.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        {/* Direct Channels */}
        <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-4 shadow-xl">
          <h3 className="text-xs text-[#89AACC] uppercase tracking-wider font-mono">
            Primary Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">PRIMARY EMAIL ADDRESS *</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC] pl-9"
                />
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">PHONE NUMBER</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9573434978"
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC] pl-9"
                />
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-muted mb-1 font-mono text-[11px]">CITY &amp; COUNTRY LOCATION</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Hyderabad, India"
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC] pl-9"
                />
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>
          </div>
        </div>

        {/* Social Network Profiles */}
        <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-4">
          <h3 className="text-xs text-[#89AACC] uppercase tracking-wider font-mono">
            Social &amp; Design Profiles
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">LINKEDIN PROFILE URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.linkedin_url}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://www.linkedin.com/in/varunsuryavemula"
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none pl-9"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  <LinkedinIcon size={14} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">BEHANCE PROFILE URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.behance_url}
                  onChange={(e) => setFormData({ ...formData, behance_url: e.target.value })}
                  placeholder="https://www.behance.net/varunsurya1"
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none pl-9"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  <BehanceIcon size={14} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">DRIBBBLE PROFILE URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.dribbble_url}
                  onChange={(e) => setFormData({ ...formData, dribbble_url: e.target.value })}
                  placeholder="https://dribbble.com/..."
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none pl-9"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                  <DribbbleIcon size={14} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">GITHUB PROFILE URL</label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/varunsurya"
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none pl-9"
                />
                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-4">
          <h3 className="text-xs text-[#89AACC] uppercase tracking-wider font-mono">
            Custom Portfolio Links
          </h3>

          {/* List of custom links */}
          {formData.other_links && formData.other_links.length > 0 && (
            <div className="space-y-2">
              {formData.other_links.map((link, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-bg border border-stroke flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-medium text-text-primary">{link.name}:</span>
                    <span className="text-muted font-mono text-[11px] truncate">{link.url}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOtherLink(idx)}
                    className="text-muted hover:text-red-400 p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add custom link row */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="text"
              value={newLinkName}
              onChange={(e) => setNewLinkName(e.target.value)}
              placeholder="Label (e.g. Medium)"
              className="w-1/3 bg-bg border border-stroke rounded-xl px-3 py-2 text-xs text-text-primary outline-none"
            />
            <input
              type="url"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-bg border border-stroke rounded-xl px-3 py-2 text-xs text-text-primary outline-none"
            />
            <button
              type="button"
              onClick={handleAddOtherLink}
              className="px-3.5 py-2 rounded-xl bg-white/5 border border-stroke text-muted hover:text-white text-xs font-medium shrink-0"
            >
              Add Link
            </button>
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
            <span>{isSaving ? 'Saving Changes...' : 'Save Contact Channels'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

