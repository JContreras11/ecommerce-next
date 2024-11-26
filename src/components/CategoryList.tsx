import  React from 'react';
import { LuFilter } from 'react-icons/lu';

interface CategoryListProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: any;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex h-12 items-center gap-2 rounded-full border border-neutral-300 bg-white px-4">
      <LuFilter />
      <select
        className="h-12 border-none bg-transparent"
        value={selectedCategory || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
      >
        <option value="all">Todas las categorías</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryList;
