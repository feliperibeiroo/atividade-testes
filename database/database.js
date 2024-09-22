
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://miltotqvktvvvgjasvzg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pbHRvdHF2a3R2dnZnamFzdnpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYwOTkzMDMsImV4cCI6MjA0MTY3NTMwM30.WQptEOThdkvml58Hlp9yjSr_4oH0qsO6sy1Gj0eFNjc'
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase;