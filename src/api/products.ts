import type { Product } from '@/types/product';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error('Error fetching products');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/products/categories`);
    if (!response.ok) throw new Error('Error fetching categories');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};
