import axios from 'axios';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  stock: number;
  rating: number;
  reviews_count: number;
}

export const getProducts = async (category?: string) => {
  let query = supabase.from('products').select(`
    *,
    categories (
      name,
      slug
    )
  `);

  if (category) {
    query = query.eq('categories.slug', category.toLowerCase());
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getRecommendedProducts = async (categoryId: string, currentProductId: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .neq('id', currentProductId)
    .limit(4);

  if (error) throw error;
  return data;
};