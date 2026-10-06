import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/Breadcrumb';
import { FilterPanel } from '../../components/FilterPanel';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { SearchBar } from '../../components/SearchBar';
import { FEATURED_PRODUCTS } from '../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Rental Catalogue',
  description: 'Browse all available multi-category rental products and equipment.',
};

export default function ProductsCataloguePage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'Rental Catalogue' }]} />

      <div className="section-header">
        <span className="section-tag">All Categories</span>
        <h1 className="section-title">Equipment Rental Catalogue</h1>
        <p className="section-desc">
          Browse verified machinery, audiovisual gear, power solutions, and fleet available for
          flexible rental.
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <SearchBar placeholder="Filter catalogue by equipment name, brand, or model..." />
      </div>

      <div className="catalog-layout">
        <FilterPanel />

        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Showing {FEATURED_PRODUCTS.length} Equipment Units
            </span>

            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
            >
              <span style={{ color: 'var(--text-dim)' }}>Sort:</span>
              <select
                className="filter-select"
                style={{ padding: '0.35rem 0.65rem', width: 'auto' }}
                defaultValue="popular"
              >
                <option value="popular">Most Popular</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
}
