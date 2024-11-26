import { useEffect, useState } from 'react';

import { getCategories, getProducts } from '@/api/products';
import type { Product } from '@/types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return {
    products: filteredProducts,
    categories,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
  };
};
