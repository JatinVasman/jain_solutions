import React from 'react';
import Link from 'next/link';
import type { CategoryItem } from '../lib/mock-data';

export interface CategoryCardProps {
  category: CategoryItem;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <a href="#featured-equipment" className="category-card">
      <div className="category-icon-box">{category.icon}</div>
      <h3 className="category-card-title">{category.name}</h3>
      <p className="category-card-desc">{category.description}</p>
      <div className="category-card-meta">
        <span>{category.itemCount}+ Units Listed</span>
        <span>Explore →</span>
      </div>
    </a>
  );
};
