import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadAsset } from '../../lib/supabase';
import {
  Settings,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Save,
  KeyRound,
  Eye,
  EyeOff,
  Upload,
} from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const { user, updatePassword, resetPassword, signOut } = useAuth();
  const { settings, saveSettings } = usePortfolio();

  // Website Settings Form
  const [websiteForm, setWebsiteForm] = useState({
    site_title: settings.site_title || 'Varun Surya — UI/UX & Product Designer',
    site_description: settings.site_description || '',
    seo_title: settings.seo_title || '',
    seo_description: settings.seo_description || '',
    social_share_image_url: settings.social_share_image_url || '',
    is_public_visible: settings.is_public_visible ?? true,
    is_resume_visible: settings.is_resume_visible ?? true,
    project_display_order: settings.project_display_order || 'custom',
  });

  // Password Change State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // States
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleWebsiteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await saveSettings(websiteForm as any);
    setIsSaving(false);

    if (res.success) {
      showToast('Website and SEO settings updated successfully!');
    } else {
      showToast(res.error || 'Failed to update website settings.', 'error');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsChangingPassword(true);
    const res = await updatePassword(newPassword);
    setIsChangingPassword(false);

    if (res.success) {
      showToast('Administrator password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      showToast(res.error || 'Failed to update password.', 'error');
    }
  };

  const handleResetPasswordEmail = async () => {
    if (!user?.email) return;
    const res = await resetPassword(user.email);
    if (res.success) {
      showToast(`Password reset link dispatched to ${user.email}`);
    } else {
      showToast(res.error || 'Failed to dispatch reset email.', 'error');
    }
  };

  const handleSocialImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const result = await uploadAsset(file, 'portfolio-assets');
    setIsUploading(false);

    if (result.url) {
      setWebsiteForm((prev) => ({ ...prev, social_share_image_url: result.url }));
      showToast('Social preview image uploaded successfully!');
    } else {
      showToast(result.error || 'Failed to upload preview image.', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
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
          Preferences &amp; SEO
        </span>
        <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
          System Settings
        </h1>
        <p className="text-xs text-muted font-light mt-0.5">
          Manage your administrator account security, SEO meta tags, and global visibility rules.
        </p>
      </div>

      {/* Section 1: Administrator Account Security */}
      <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-5 shadow-xl">
        <div className="flex items-center gap-2.5 text-[#89AACC]">
          <Lock size={18} />
          <h2 className="text-sm font-medium text-text-primary">Admin Account &amp; Security</h2>
        </div>

        <div className="p-4 rounded-2xl bg-bg border border-stroke/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-medium text-text-primary">Signed in as:</div>
            <div className="text-xs text-muted font-mono mt-0.5">{user?.email || 'ux.varunsurya@gmail.com'}</div>
          </div>

          <button
            type="button"
            onClick={handleResetPasswordEmail}
            className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-stroke text-xs text-muted hover:text-white transition-colors"
          >
            Send Reset Link to Email
          </button>
        </div>

        {/* Change password form */}
        <form onSubmit={handlePasswordChange} className="space-y-4 pt-2 border-t border-stroke/50 text-xs">
          <h3 className="font-mono text-[11px] text-[#89AACC] uppercase tracking-wider">
            Update Password
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">NEW PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC] pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">CONFIRM NEW PASSWORD</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isChangingPassword || !newPassword}
              className="px-4 py-2 rounded-xl bg-white/[0.06] border border-stroke text-text-primary hover:bg-white/10 text-xs font-medium disabled:opacity-40 transition-colors"
            >
              {isChangingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: Website SEO & Metadata */}
      <form onSubmit={handleWebsiteSubmit} className="space-y-6">
        <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-5">
          <div className="flex items-center gap-2.5 text-[#89AACC]">
            <Globe size={18} />
            <h2 className="text-sm font-medium text-text-primary">Website Metadata &amp; SEO</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">WEBSITE TITLE</label>
              <input
                type="text"
                value={websiteForm.site_title}
                onChange={(e) => setWebsiteForm({ ...websiteForm, site_title: e.target.value })}
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">SEO META TITLE</label>
              <input
                type="text"
                value={websiteForm.seo_title}
                onChange={(e) => setWebsiteForm({ ...websiteForm, seo_title: e.target.value })}
                className="w-full bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">SEO META DESCRIPTION</label>
              <textarea
                rows={3}
                value={websiteForm.seo_description}
                onChange={(e) => setWebsiteForm({ ...websiteForm, seo_description: e.target.value })}
                className="w-full bg-bg border border-stroke rounded-xl p-3 text-text-primary outline-none focus:border-[#89AACC]"
              />
            </div>

            {/* Social Share Image */}
            <div>
              <label className="block text-muted mb-1 font-mono text-[11px]">
                SOCIAL SHARING IMAGE (OG:IMAGE)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={websiteForm.social_share_image_url}
                  onChange={(e) => setWebsiteForm({ ...websiteForm, social_share_image_url: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 bg-bg border border-stroke rounded-xl px-3.5 py-2.5 text-text-primary outline-none"
                />
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stroke bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors shrink-0">
                  <Upload size={14} />
                  <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSocialImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Content Display & Visibility Settings */}
        <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-4">
          <div className="flex items-center gap-2.5 text-[#89AACC]">
            <Sliders size={18} />
            <h2 className="text-sm font-medium text-text-primary">Content Visibility Controls</h2>
          </div>

          <div className="space-y-3.5 pt-2 text-xs">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-bg border border-stroke cursor-pointer">
              <div>
                <div className="text-xs font-medium text-text-primary">Public Website Visibility</div>
                <div className="text-[11px] text-muted font-light mt-0.5">
                  When enabled, visitors can freely browse your portfolio.
                </div>
              </div>
              <input
                type="checkbox"
                checked={websiteForm.is_public_visible}
                onChange={(e) => setWebsiteForm({ ...websiteForm, is_public_visible: e.target.checked })}
                className="w-4 h-4 rounded border-stroke text-[#4E85BF] bg-bg cursor-pointer accent-[#4E85BF]"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-bg border border-stroke cursor-pointer">
              <div>
                <div className="text-xs font-medium text-text-primary">Public Resume Download Button</div>
                <div className="text-[11px] text-muted font-light mt-0.5">
                  Display or hide the "Resume" download button on the public navigation bar.
                </div>
              </div>
              <input
                type="checkbox"
                checked={websiteForm.is_resume_visible}
                onChange={(e) => setWebsiteForm({ ...websiteForm, is_resume_visible: e.target.checked })}
                className="w-4 h-4 rounded border-stroke text-[#4E85BF] bg-bg cursor-pointer accent-[#4E85BF]"
              />
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text-primary text-bg font-medium text-xs hover:bg-white transition-colors shadow-sm disabled:opacity-50"
          >
            <Save size={14} />
            <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

