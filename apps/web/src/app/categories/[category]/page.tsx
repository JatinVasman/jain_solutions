import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '../../../components/Breadcrumb';
import { FilterPanel } from '../../../components/FilterPanel';
import { ProductCard } from '../../../components/ProductCard';
import { Pagination } from '../../../components/Pagination';
import { CATEGORIES, FEATURED_PRODUCTS } from '../../../lib/mock-data';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = CATEGORIES.find((c) => c.slug === params.category);
  return {
    title: category ? `${category.name} Rentals` : 'Category Rentals',
    description: category ? category.description : 'Browse category equipment rentals',
  };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = CATEGORIES.find((c) => c.slug === params.category);

  if (!category) {
    // If not found in mock list, render generic category view with parameter name
    const genericName = params.category
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    return (
      <div className="page-container">
        <Breadcrumb
          items={[{ label: 'Categories', href: '/categories' }, { label: genericName }]}
        />
        <div className="section-header">
          <h1 className="section-title">{genericName} Rentals</h1>
          <p className="section-desc">Showing available inventory for {genericName}.</p>
        </div>
        <div className="catalog-layout">
          <FilterPanel selectedCategory={params.category} />
          <div>
            <div className="product-grid">
              {FEATURED_PRODUCTS.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    );
  }

  const categoryProducts = FEATURED_PRODUCTS.filter((p) => p.categorySlug === category.slug);
  const displayProducts =
    categoryProducts.length > 0 ? categoryProducts : FEATURED_PRODUCTS.slice(0, 3);

  return (
    <div className="page-container">
      <Breadcrumb
        items={[{ label: 'Categories', href: '/categories' }, { label: category.name }]}
      />

      <div className="section-header">
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}
        >
          <span style={{ fontSize: '2rem' }}>{category.icon}</span>
          <h1 className="section-title" style={{ marginBottom: 0 }}>
            {category.name} Rentals
          </h1>
        </div>
        <p className="section-desc">{category.description}</p>
      </div>

      <div className="catalog-layout">
        <FilterPanel selectedCategory={category.slug} />

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
            }}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Showing {displayProducts.length} of {category.itemCount} Units
            </span>
          </div>

          <div className="product-grid">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
}
