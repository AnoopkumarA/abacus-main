import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vvchpudawmlkqvrqabad.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2Y2hwdWRhd21sa3F2cnFhYmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk5NDEyNDcsImV4cCI6MjA1NTUxNzI0N30.KMTksV6HA_shzS_42OEJy4t_nijDFTGt5rArQQhRL0g';
// GitHub OAuth Configuration
const githubConfig = {
    GITHUB_CLIENT_ID: 'Ov23lirB41DFieDNoOVH',
    GITHUB_CLIENT_SECRET: 'b96502f01b5e49a11517f7901b1acee686161dfa',
  };
  
  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  

