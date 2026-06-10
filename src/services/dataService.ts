import { supabase } from '../lib/supabase';
import { VARITIES_DATA, ARTICLES_DATA, STATS_DATA, VILLAGES_DATA, MAP_PINS_DATA } from '../data/mockData';
import { Variety, Article, Stat, Village, MapPin } from '../types';

// Check if Supabase client is properly initialized
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key);
};

export async function getVarieties(): Promise<Variety[]> {
  if (!isSupabaseConfigured()) {
    console.log("Supabase not configured. Using local mock data for varieties.");
    return VARITIES_DATA;
  }
  try {
    const { data, error } = await supabase
      .from('varieties')
      .select('*');
    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching varieties from Supabase:", error);
      return VARITIES_DATA;
    }
    return data as Variety[];
  } catch (err) {
    console.error("Failed to query varieties, falling back to mock:", err);
    return VARITIES_DATA;
  }
}

export async function getVarietyById(id: string): Promise<Variety | null> {
  if (!isSupabaseConfigured()) {
    return VARITIES_DATA.find(v => v.id === id) || null;
  }
  try {
    const { data, error } = await supabase
      .from('varieties')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) {
      if (error) console.error(`Error fetching variety ${id} from Supabase:`, error);
      return VARITIES_DATA.find(v => v.id === id) || null;
    }
    return data as Variety;
  } catch (err) {
    console.error(`Failed to query variety ${id}, falling back to mock:`, err);
    return VARITIES_DATA.find(v => v.id === id) || null;
  }
}

export async function getArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    console.log("Supabase not configured. Using local mock data for articles.");
    return ARTICLES_DATA;
  }
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*');
    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching articles from Supabase:", error);
      return ARTICLES_DATA;
    }
    return data as Article[];
  } catch (err) {
    console.error("Failed to query articles, falling back to mock:", err);
    return ARTICLES_DATA;
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    return ARTICLES_DATA.find(a => a.id === id) || null;
  }
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
    if (error || !data) {
      if (error) console.error(`Error fetching article ${id} from Supabase:`, error);
      return ARTICLES_DATA.find(a => a.id === id) || null;
    }
    return data as Article;
  } catch (err) {
    console.error(`Failed to query article ${id}, falling back to mock:`, err);
    return ARTICLES_DATA.find(a => a.id === id) || null;
  }
}

export async function getVillages(): Promise<Village[]> {
  if (!isSupabaseConfigured()) {
    console.log("Supabase not configured. Using local mock data for villages.");
    return VILLAGES_DATA;
  }
  try {
    const { data, error } = await supabase
      .from('villages')
      .select('*');
    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching villages from Supabase:", error);
      return VILLAGES_DATA;
    }
    return data as Village[];
  } catch (err) {
    console.error("Failed to query villages, falling back to mock:", err);
    return VILLAGES_DATA;
  }
}

export async function getVillageById(id: string): Promise<Village | null> {
  const cleanId = id.toLowerCase();
  if (!isSupabaseConfigured()) {
    return VILLAGES_DATA.find(v => v.id === cleanId) || null;
  }
  try {
    const { data, error } = await supabase
      .from('villages')
      .select('*')
      .eq('id', cleanId)
      .single();
    if (error || !data) {
      if (error) console.error(`Error fetching village ${cleanId} from Supabase:`, error);
      return VILLAGES_DATA.find(v => v.id === cleanId) || null;
    }
    return data as Village;
  } catch (err) {
    console.error(`Failed to query village ${cleanId}, falling back to mock:`, err);
    return VILLAGES_DATA.find(v => v.id === cleanId) || null;
  }
}

export async function getStats(): Promise<Stat[]> {
  if (!isSupabaseConfigured()) {
    return STATS_DATA;
  }
  try {
    const { data, error } = await supabase
      .from('stats')
      .select('*');
    if (error || !data || data.length === 0) {
      return STATS_DATA;
    }
    return data as Stat[];
  } catch (err) {
    return STATS_DATA;
  }
}

export async function getMapPins(): Promise<MapPin[]> {
  if (!isSupabaseConfigured()) {
    return MAP_PINS_DATA;
  }
  try {
    const { data, error } = await supabase
      .from('mappins')
      .select('*');
    if (error || !data || data.length === 0) {
      return MAP_PINS_DATA;
    }
    return data as MapPin[];
  } catch (err) {
    return MAP_PINS_DATA;
  }
}
