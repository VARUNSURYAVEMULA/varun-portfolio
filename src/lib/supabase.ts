import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project-id.supabase.co' &&
    !supabaseUrl.includes('placeholder')
  );
};

// Initialize Supabase client safely
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

/**
 * Storage Helpers
 */
export interface UploadResult {
  url: string;
  path: string;
  error?: string;
}

export const uploadAsset = async (
  file: File,
  bucket: 'portfolio-assets' | 'resumes' = 'portfolio-assets',
  customPath?: string
): Promise<UploadResult> => {
  if (!isSupabaseConfigured()) {
    return {
      url: URL.createObjectURL(file),
      path: file.name,
      error: 'Supabase is not configured yet. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    };
  }

  try {
    // Validate file sizes
    const maxSizeBytes = bucket === 'resumes' ? 15 * 1024 * 1024 : 8 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const maxMb = maxSizeBytes / (1024 * 1024);
      return {
        url: '',
        path: '',
        error: `File is too large. Maximum allowed size is ${maxMb}MB.`,
      };
    }

    // Validate type for resumes
    if (bucket === 'resumes' && file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      return {
        url: '',
        path: '',
        error: 'Only PDF files are accepted for resumes.',
      };
    }

    const fileExt = file.name.split('.').pop() || '';
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const timestamp = Date.now();
    const filePath = customPath || `${timestamp}_${cleanName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Storage upload error:', error);
      return { url: '', path: '', error: error.message };
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (err: any) {
    console.error('Unexpected upload exception:', err);
    return {
      url: '',
      path: '',
      error: err.message || 'Failed to upload asset',
    };
  }
};

export const deleteAsset = async (
  path: string,
  bucket: 'portfolio-assets' | 'resumes' = 'portfolio-assets'
): Promise<{ success: boolean; error?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: true };
  }

  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
};

