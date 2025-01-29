import { createClient } from '@supabase/supabase-js'


const supabase = createClient(import.meta.env.VITE_SB_PURL, import.meta.env.VITE_SB_API_KEY)

export default supabase
