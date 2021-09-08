import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string = process.env.REACT_APP_PUBLIC_SUPABASE_URL || '';
const supabaseServerKey: string =
  process.env.REACT_APP_PUBLIC_SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServerKey);

// Export for usage by the rest of the app
export default supabase;
