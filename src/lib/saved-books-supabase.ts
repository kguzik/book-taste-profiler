import { createClient } from '@/lib/supabase/client';
import type { SavedBook } from '@/types/book';

type SavedBookRow = {
  id: string;
  source_id: string | null;
  title: string;
  author: string | null;
  year: number | null;
  cover_url: string | null;
  notes: string | null;
  tags: string[];
  created_at: string;
};

const mapRowToSavedBook = (row: SavedBookRow): SavedBook => {
  return {
    id: row.id,
    sourceId: row.source_id ?? undefined,
    title: row.title,
    author: row.author ?? undefined,
    year: row.year ?? undefined,
    coverUrl: row.cover_url ?? undefined,
    notes: row.notes ?? undefined,
    tags: row.tags,
    createdAt: row.created_at,
  };
};

export const fetchSavedBooks = async (userId: string): Promise<SavedBook[]> => {
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient
    .from('saved_books')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as SavedBookRow[]).map(mapRowToSavedBook);
};

export const insertSavedBook = async (
  userId: string,
  book: SavedBook,
): Promise<void> => {
  const supabaseClient = createClient();
  const { error } = await supabaseClient.from('saved_books').upsert(
    {
      id: book.id,
      user_id: userId,
      source_id: book.sourceId ?? null,
      title: book.title,
      author: book.author ?? null,
      year: book.year ?? null,
      cover_url: book.coverUrl ?? null,
      notes: book.notes ?? null,
      tags: book.tags,
      created_at: book.createdAt,
    },
    { onConflict: 'id' },
  );
  if (error) throw error;
};

export const deleteSavedBook = async (
  id: string,
  userId: string,
): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase
    .from('saved_books')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) throw error;
};
