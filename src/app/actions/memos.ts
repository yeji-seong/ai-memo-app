'use server'

import { supabase } from '@/lib/supabase/client'
import { Memo, MemoFormData } from '@/types/memo'
import { v4 as uuidv4 } from 'uuid'

function convertDbRowToMemo(row: {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  created_at: string
  updated_at: string
}): Memo {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    tags: row.tags,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getMemos(): Promise<Memo[]> {
  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching memos:', error)
    throw new Error('Failed to fetch memos')
  }

  return (data || []).map(convertDbRowToMemo)
}

export async function createMemo(formData: MemoFormData): Promise<Memo> {
  const newMemo = {
    id: uuidv4(),
    title: formData.title,
    content: formData.content,
    category: formData.category,
    tags: formData.tags,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('memos')
    .insert([newMemo])
    .select()
    .single()

  if (error) {
    console.error('Error creating memo:', error)
    throw new Error('Failed to create memo')
  }

  return convertDbRowToMemo(data)
}

export async function updateMemo(
  id: string,
  formData: MemoFormData
): Promise<Memo> {
  const { data, error } = await supabase
    .from('memos')
    .update({
      title: formData.title,
      content: formData.content,
      category: formData.category,
      tags: formData.tags,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating memo:', error)
    throw new Error('Failed to update memo')
  }

  return convertDbRowToMemo(data)
}

export async function deleteMemo(id: string): Promise<void> {
  const { error } = await supabase.from('memos').delete().eq('id', id)

  if (error) {
    console.error('Error deleting memo:', error)
    throw new Error('Failed to delete memo')
  }
}

export async function clearAllMemos(): Promise<void> {
  const { error } = await supabase.from('memos').delete().neq('id', '')

  if (error) {
    console.error('Error clearing memos:', error)
    throw new Error('Failed to clear memos')
  }
}

export async function getMemoById(id: string): Promise<Memo | null> {
  const { data, error } = await supabase
    .from('memos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching memo:', error)
    return null
  }

  return data ? convertDbRowToMemo(data) : null
}
