import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { Transaction, Budget, Goal, Profile } from '../lib/supabase'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user?.id)

      if (error) throw error
      await fetchProfile()
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  return { profile, loading, updateProfile, refetch: fetchProfile }
}

export function useTransactions() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchTransactions()
    }
  }, [user])

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('date', { ascending: false })

      if (error) throw error
      setTransactions(data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (transaction: Omit<Transaction, 'id' | 'user_id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .insert([{ ...transaction, user_id: user?.id }])

      if (error) throw error
      await fetchTransactions()
    } catch (error) {
      console.error('Error adding transaction:', error)
      throw error
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error
      await fetchTransactions()
    } catch (error) {
      console.error('Error deleting transaction:', error)
      throw error
    }
  }

  return { transactions, loading, addTransaction, deleteTransaction, refetch: fetchTransactions }
}

export function useBudgets() {
  const { user } = useAuth()
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchBudgets()
    }
  }, [user])

  const fetchBudgets = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setBudgets(data || [])
    } catch (error) {
      console.error('Error fetching budgets:', error)
    } finally {
      setLoading(false)
    }
  }

  const addBudget = async (budget: Omit<Budget, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('budgets')
        .insert([{ ...budget, user_id: user?.id }])

      if (error) throw error
      await fetchBudgets()
    } catch (error) {
      console.error('Error adding budget:', error)
      throw error
    }
  }

  const updateBudget = async (id: string, updates: Partial<Budget>) => {
    try {
      const { error } = await supabase
        .from('budgets')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error
      await fetchBudgets()
    } catch (error) {
      console.error('Error updating budget:', error)
      throw error
    }
  }

  return { budgets, loading, addBudget, updateBudget, refetch: fetchBudgets }
}

export function useGoals() {
  const { user } = useAuth()
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchGoals()
    }
  }, [user])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user?.id)
        .order('target_date', { ascending: true })

      if (error) throw error
      setGoals(data || [])
    } catch (error) {
      console.error('Error fetching goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const addGoal = async (goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('goals')
        .insert([{ ...goal, user_id: user?.id }])

      if (error) throw error
      await fetchGoals()
    } catch (error) {
      console.error('Error adding goal:', error)
      throw error
    }
  }

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)

      if (error) throw error
      await fetchGoals()
    } catch (error) {
      console.error('Error updating goal:', error)
      throw error
    }
  }

  return { goals, loading, addGoal, updateGoal, refetch: fetchGoals }
} 