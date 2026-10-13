'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '../../components/Breadcrumb';
import { FilterPanel } from '../../components/FilterPanel';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { HERO_CATEGORIES, FEATURED_PRODUCTS } from '../../lib/mock-data';

function CategoriesFilterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial category and search query from URL parameters
  const initialCategory = searchParams.get('category') || searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  // Sync state when URL params change (e.g. from navbar search)
  React.useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search') || '';
    setSearchQuery(q);
  }, [searchParams]);

  React.useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('cat') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  const currentCategoryObj = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return HERO_CATEGORIES.find((c) => c.slug === selectedCategory) || null;
  }, [selectedCategory]);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
      params.delete('category');
      params.delete('cat');
    } else {
      params.set('category', slug);
      params.delete('cat');
    }
    const newUrl = params.toString() ? `/categories?${params.toString()}` : '/categories';
    router.push(newUrl, { scroll: false });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.delete('search');
    const newUrl = params.toString() ? `/categories?${params.toString()}` : '/categories';
    router.push(newUrl, { scroll: false });
  };

  const handleReset = () => {
    setSelectedCategory('all');
    setSelectedStatus('all');
    setMinPrice(0);
    setMaxPrice(25000);
    setSortBy('popular');
    setSearchQuery('');
    router.push('/categories', { scroll: false });
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let list = [...FEATURED_PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q),
      );
    }

    // Filter by Status
    if (selectedStatus !== 'all') {
      list = list.filter((p) => p.availability === selectedStatus);
    }

    // Filter by Price Range
    if (minPrice > 0) {
      list = list.filter((p) => p.dailyRate >= minPrice);
    }
    if (maxPrice < 25000) {
      list = list.filter((p) => p.dailyRate <= maxPrice);
    }

    // Sort
    if (sortBy === 'price_asc') {
      list.sort((a, b) => a.dailyRate - b.dailyRate);
    } else if (sortBy === 'price_desc') {
      list.sort((a, b) => b.dailyRate - a.dailyRate);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, searchQuery, selectedStatus, minPrice, maxPrice, sortBy]);

  return (
    <div className="page-container catalog-page-container" style={{ paddingBottom: '4rem' }}>
      {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: 'Categories', href: '/categories' },
          ...(currentCategoryObj ? [{ label: currentCategoryObj.name }] : []),
        ]}
      />

      {/* ── SECTION HEADER ─────────────────────────────────────────────── */}
      <div className="section-header" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
          {currentCategoryObj && (
            <span style={{ fontSize: '2rem', lineHeight: 1 }} aria-hidden="true">
              {currentCategoryObj.icon}
            </span>
          )}
          <h1 className="section-title" style={{ marginBottom: 0 }}>
            {currentCategoryObj ? `${currentCategoryObj.name} Rentals` : 'All Equipment Rentals'}
          </h1>
        </div>
        <p className="section-desc" style={{ maxWidth: '800px' }}>
          {currentCategoryObj
            ? currentCategoryObj.description
            : 'Browse and filter our verified fleet of enterprise telecom, networking, 4K surveillance optics, storage arrays, and precision cabling ready for rental.'}
        </p>
      </div>

      {/* ── CATEGORY QUICK PILLS FILTER ─────────────────────────────────── */}
      <div className="category-quick-pills-bar" role="tablist" aria-label="Category filter tabs">
        <button
          type="button"
          className={`cat-pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('all')}
          role="tab"
          aria-selected={selectedCategory === 'all'}
        >
          <span>🏷️</span>
          <span>All Equipment</span>
        </button>

        {HERO_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              type="button"
              className={`cat-pill-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat.slug)}
              role="tab"
              aria-selected={isActive}
            >
              <span>{cat.icon}</span>
              <span>{cat.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* ── MAIN CATALOG FILTER LAYOUT ──────────────────────────────────── */}
      <div className="catalog-layout">
        {/* Left Column: Filter Sidebar */}
        <FilterPanel
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategorySelect}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={handleReset}
        />

        {/* Right Column: Search Toolbar & Equipment Grid */}
        <div>
          {/* Results Toolbar */}
          <div className="catalog-results-toolbar">
            <div className="catalog-count-info">
              <span style={{ fontWeight: 600, color: 'var(--text-title)', fontSize: '0.95rem' }}>
                Equipment Catalog
              </span>
              {selectedCategory !== 'all' && currentCategoryObj && (
                <span className="catalog-active-filter-badge">
                  Filtered: {currentCategoryObj.name}
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('all')}
                    aria-label="Remove category filter"
                  >
                    ✕
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="catalog-active-filter-badge">
                  Search: &ldquo;{searchQuery}&rdquo;
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Remove search filter"
                  >
                    ✕
                  </button>
                </span>
              )}
            </div>

            {/* In-Grid Search */}
            <div className="catalog-toolbar-search">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="catalog-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                  aria-label="Clear search input"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <Pagination />
              </div>
            </>
          ) : (
            <div className="catalog-no-results">
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-title)', marginBottom: '0.5rem' }}>
                No equipment matching your criteria
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                Try adjusting your price range, clearing keywords, or selecting a different equipment category.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleReset}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="page-container" style={{ padding: '3rem 1rem' }}><p>Loading filter catalog...</p></div>}>
      <CategoriesFilterContent />
    </Suspense>
  );
}
