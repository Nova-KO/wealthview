import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database type definitions (you can update these based on your actual database schema)
export type Profile = {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export type Transaction = {
  id: string
  user_id: string
  amount: number
  description: string
  category: string
  type: 'income' | 'expense'
  date: string
  created_at: string
}

export type Budget = {
  id: string
  user_id: string
  category: string
  amount: number
  spent: number
  period: 'monthly' | 'weekly' | 'yearly'
  created_at: string
  updated_at: string
}

export type Goal = {
  id: string
  user_id: string
  title: string
  target_amount: number
  current_amount: number
  target_date: string
  category: string
  created_at: string
  updated_at: string
} 