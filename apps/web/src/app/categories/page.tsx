import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/Breadcrumb';
import { CategoryCard } from '../../components/CategoryCard';
import { CATEGORIES } from '../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Rental Categories',
  description: 'Explore all equipment categories available for rental.',
};

export default function CategoriesPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'Categories' }]} />

      <div className="section-header">
        <span className="section-tag">Multi-Category Marketplace</span>
        <h1 className="section-title">All Equipment Rental Categories</h1>
        <p className="section-desc">
          Browse our category-agnostic directory. Each category is managed with custom technical
          specifications, flexible rental periods, and verified logistics.
        </p>
      </div>

      <div className="category-grid">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
