import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { uploadAsset } from '../../lib/supabase';
import {
  FileText,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Calendar,
  HardDrive,
  Eye,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export const ResumeManager: React.FC = () => {
  const { resume, saveResume, deleteResume } = usePortfolio();

  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return '0 KB';
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate PDF
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      showToast('Only PDF documents are supported.', 'error');
      return;
    }

    // Validate size (15 MB max)
    if (file.size > 15 * 1024 * 1024) {
      showToast('File exceeds 15 MB limit.', 'error');
      return;
    }

    setIsUploading(true);
    const result = await uploadAsset(file, 'resumes');
    setIsUploading(false);

    if (result.url) {
      const res = await saveResume({
        filename: file.name,
        file_url: result.url,
        file_size: file.size,
        is_active: true,
      });

      if (res.success) {
        showToast(`Resume "${file.name}" uploaded and published successfully!`);
      } else {
        showToast(res.error || 'Failed to update resume record.', 'error');
      }
    } else {
      showToast(result.error || 'Failed to upload PDF.', 'error');
    }
  };

  const handleDeleteResume = async () => {
    const res = await deleteResume();
    setIsConfirmDeleteOpen(false);
    if (res.success) {
      showToast('Active resume removed successfully.');
    } else {
      showToast(res.error || 'Failed to remove resume.', 'error');
    }
  };

  const uploadDate = resume.updated_at
    ? new Date(resume.updated_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Default Asset';

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
          Curriculum Vitae
        </span>
        <h1 className="text-2xl sm:text-3xl font-display italic text-text-primary mt-1">
          Resume Management
        </h1>
        <p className="text-xs text-muted font-light mt-0.5">
          Upload, replace, and verify the PDF resume downloaded by recruiters and visitors on your portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Current Status & Upload Box */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active File Card */}
          <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#89AACC]">
                  <FileCheck2 size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary">Current Active Resume</h3>
                  <span className="text-[10px] font-mono text-emerald-400">Available to public</span>
                </div>
              </div>

              {resume.file_url && (
                <a
                  href={resume.file_url}
                  download={resume.filename || 'Vemula_Varun_Surya_Resume.pdf'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-stroke text-muted hover:text-white transition-colors"
                  title="Download File"
                >
                  <Download size={15} />
                </a>
              )}
            </div>

            {/* Metadata pills */}
            <div className="space-y-2.5 pt-3 border-t border-stroke/60 text-xs">
              <div className="flex items-center justify-between text-muted">
                <span className="flex items-center gap-1.5">
                  <FileText size={13} className="text-[#89AACC]" />
                  <span>Filename</span>
                </span>
                <span className="font-mono text-text-primary text-[11px] truncate max-w-[180px]">
                  {resume.filename || 'resume.pdf'}
                </span>
              </div>

              <div className="flex items-center justify-between text-muted">
                <span className="flex items-center gap-1.5">
                  <HardDrive size={13} className="text-[#89AACC]" />
                  <span>File Size</span>
                </span>
                <span className="font-mono text-text-primary text-[11px]">
                  {formatFileSize(resume.file_size)}
                </span>
              </div>

              <div className="flex items-center justify-between text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-[#89AACC]" />
                  <span>Last Updated</span>
                </span>
                <span className="font-mono text-text-primary text-[11px]">
                  {uploadDate}
                </span>
              </div>
            </div>

            {/* Actions button group */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={resume.file_url || '/resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-stroke text-xs text-text-primary hover:bg-white/[0.08] transition-colors"
              >
                <Eye size={13} />
                <span>Open in New Tab</span>
              </a>

              {resume.file_url && (
                <button
                  onClick={() => setIsConfirmDeleteOpen(true)}
                  className="p-2.5 rounded-xl border border-stroke text-muted hover:text-red-400 hover:border-red-500/30 transition-colors"
                  title="Remove Current Resume"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Upload / Replace Area */}
          <div className="p-6 rounded-3xl bg-surface border border-stroke space-y-4">
            <h3 className="text-sm font-medium text-text-primary">
              {resume.file_url ? 'Replace Resume PDF' : 'Upload Resume PDF'}
            </h3>
            <p className="text-xs text-muted font-light leading-relaxed">
              Upload an updated PDF to automatically replace the download link across the public Navbar, Hero, and Curriculum Vitae modal.
            </p>

            <label className="block border-2 border-dashed border-stroke hover:border-[#89AACC]/60 rounded-2xl p-7 text-center cursor-pointer transition-colors bg-white/[0.01] hover:bg-white/[0.03]">
              <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-3 text-[#89AACC]">
                <Upload size={20} />
              </div>
              <div className="text-xs font-medium text-text-primary">
                {isUploading ? 'Uploading & Processing...' : 'Click or drag PDF to upload'}
              </div>
              <div className="text-[11px] text-muted font-mono mt-1">
                Accepted: .pdf &bull; Max 15 MB
              </div>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Right Column: Live PDF Document Viewer */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-surface border border-stroke overflow-hidden shadow-2xl h-[620px] flex flex-col">
            <div className="px-5 py-3 border-b border-stroke flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs font-medium text-text-primary">
                <FileText size={14} className="text-[#89AACC]" />
                <span>Document Preview</span>
              </div>
              <span className="text-[10px] font-mono text-muted">
                {resume.filename || 'resume.pdf'}
              </span>
            </div>

            <div className="flex-1 bg-black/60 relative">
              {resume.file_url ? (
                <iframe
                  src={`${resume.file_url}#toolbar=0&navpanes=0`}
                  title="Resume Preview"
                  className="w-full h-full border-none"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-muted">
                  <FileText size={36} className="mb-3 opacity-30" />
                  <p className="text-xs">No active resume PDF currently attached.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-surface border border-stroke rounded-3xl p-6 sm:p-7 w-full max-w-sm shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-3">
              <AlertCircle size={22} />
              <h3 className="text-base font-medium text-text-primary">Remove Active Resume?</h3>
            </div>
            <p className="text-xs text-muted leading-relaxed mb-5">
              This will unbind the current resume file from the public download buttons until you upload a replacement.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsConfirmDeleteOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-muted hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteResume}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 transition-colors"
              >
                Remove Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

