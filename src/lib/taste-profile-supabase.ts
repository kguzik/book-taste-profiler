import { createClient } from '@/lib/supabase/client';
import type { TasteProfile } from '@/types/book';

type TasteProfileRow = {
  summary: string;
  recommendations: TasteProfile['recommendations'] | string;
  fingerprint: string;
};

export async function fetchsupabaseProfile(
  userId: string,
): Promise<(TasteProfile & { fingerprint: string }) | null> {
  const supabaseClient = createClient();
  if (!supabaseClient) throw new Error('Supabase is not configured');
  const { data, error } = await supabaseClient
    .from('taste_profiles')
    .select('summary, recommendations, fingerprint')
    .eq('user_id', userId)
    .single();
  if (error || !data) return null;
  const tasteProfileRow = data as TasteProfileRow;
  const recommendations =
    typeof tasteProfileRow.recommendations === 'string'
      ? (JSON.parse(
          tasteProfileRow.recommendations,
        ) as TasteProfile['recommendations'])
      : tasteProfileRow.recommendations;
  return {
    summary: tasteProfileRow.summary,
    recommendations,
    fingerprint: tasteProfileRow.fingerprint,
  };
}

export async function saveTasteProfile(
  userId: string,
  data: TasteProfile,
  fingerprint: string,
): Promise<void> {
  const supabaseClient = createClient();
  if (!supabaseClient) throw new Error('Supabase is not configured');
  const { error } = await supabaseClient.from('taste_profiles').upsert(
    {
      user_id: userId,
      summary: data.summary,
      recommendations: data.recommendations,
      fingerprint,
    },
    { onConflict: 'user_id' },
  );
  if (error) throw error;
}

export async function clearTasteProfile(userId: string): Promise<void> {
  const supabaseClient = createClient();
  if (!supabaseClient) throw new Error('Supabase is not configured');
  const { error } = await supabaseClient
    .from('taste_profiles')
    .delete()
    .eq('user_id', userId);
  if (error) throw error;
}
