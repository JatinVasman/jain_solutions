import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/Breadcrumb';
import { SearchBar } from '../../components/SearchBar';
import { FilterPanel } from '../../components/FilterPanel';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { FEATURED_PRODUCTS } from '../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Search Rental Equipment',
  description: 'Search across power equipment, cameras, vehicles, tools, and machinery.',
};

interface SearchPageProps {
  searchParams?: {
    q?: string;
    category?: string;
    location?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams?.q || '';

  // Structural results: filter mock items if query is provided, or return all
  const filtered = query
    ? FEATURED_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()),
      )
    : FEATURED_PRODUCTS;

  return (
    <div className="page-container">
      <Breadcrumb
        items={[{ label: 'Search Results' }, ...(query ? [{ label: `Query: "${query}"` }] : [])]}
      />

      <div className="section-header">
        <h1 className="section-title">
          {query ? `Search Results for "${query}"` : 'Equipment Search'}
        </h1>
        <p className="section-desc">
          Displaying structural search query results across all multi-category rental hubs.
        </p>
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <SearchBar defaultValue={query} />
      </div>

      <div className="catalog-layout">
        <FilterPanel
          selectedCategory={searchParams?.category}
          selectedLocation={searchParams?.location}
        />

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
              Found {filtered.length} matching units
            </span>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Sorted by: <strong>Relevance & Distance</strong>
            </div>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="product-grid">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <Pagination />
            </>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 1.5rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-lg)',
                border: '1px dashed var(--border-light)',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <h3
                style={{ fontSize: '1.25rem', color: 'var(--text-title)', marginBottom: '0.5rem' }}
              >
                No equipment found for &ldquo;{query}&rdquo;
              </h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  maxWidth: '420px',
                  margin: '0 auto 1.5rem',
                }}
              >
                Try searching for broader terms such as &ldquo;Inverter&rdquo;,
                &ldquo;Camera&rdquo;, &ldquo;Projector&rdquo;, &ldquo;Drill&rdquo;, or
                &ldquo;Van&rdquo;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
