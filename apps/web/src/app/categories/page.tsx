'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Breadcrumb } from '../../components/Breadcrumb';
import { FilterPanel } from '../../components/FilterPanel';
import { ProductCard } from '../../components/ProductCard';
import { Pagination } from '../../components/Pagination';
import { HERO_CATEGORIES, FEATURED_PRODUCTS } from '../../lib/mock-data';
import {
  getBrandsForCategory,
  getBrandById,
  getBrandDisplayName,
  normalizeBrandId,
  getAllBrands,
} from '../../lib/brand-data';

function CategoriesFilterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial category, search query, and brand filter from URL parameters
  const initialCategory = searchParams.get('category') || searchParams.get('cat') || 'all';
  const initialQuery = searchParams.get('q') || searchParams.get('search') || '';

  const initialBrands = useMemo(() => {
    const raw = searchParams.get('brand') || searchParams.get('brands') || '';
    if (!raw) return [];
    return raw
      .split(',')
      .map((b) => normalizeBrandId(b.trim()))
      .filter(Boolean);
  }, [searchParams]);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrands);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync state when URL params change (e.g. from navbar search or browser back/forward)
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('search') || '';
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const cat = searchParams.get('category') || searchParams.get('cat') || 'all';
    setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const raw = searchParams.get('brand') || searchParams.get('brands') || '';
    if (!raw) {
      setSelectedBrands([]);
    } else {
      const parsed = raw
        .split(',')
        .map((b) => normalizeBrandId(b.trim()))
        .filter(Boolean);
      setSelectedBrands(parsed);
    }
  }, [searchParams]);

  const currentCategoryObj = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return HERO_CATEGORIES.find((c) => c.slug === selectedCategory) || null;
  }, [selectedCategory]);

  // Available brands configured for the currently selected category
  const availableBrands = useMemo(() => {
    return getBrandsForCategory(selectedCategory);
  }, [selectedCategory]);

  // Dynamic result count for each brand in the active category under active non-brand filters
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    availableBrands.forEach((b) => {
      counts[b.id] = 0;
    });

    FEATURED_PRODUCTS.forEach((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q);
        if (!matchesQuery) return;
      }
      // Status match
      if (selectedStatus !== 'all' && p.availability !== selectedStatus) {
        return;
      }
      // Price range match
      if (p.dailyRate < minPrice || p.dailyRate > maxPrice) {
        return;
      }

      const pBrandId = normalizeBrandId(p.brandId || p.brand);
      if (pBrandId) {
        counts[pBrandId] = (counts[pBrandId] || 0) + 1;
      }
    });

    return counts;
  }, [availableBrands, selectedCategory, searchQuery, selectedStatus, minPrice, maxPrice]);

  // Handle Category Selection
  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);

    // Prune selected brands if they don't exist in the newly selected category
    const validBrands =
      slug === 'all'
        ? getAllBrands().map((b) => b.id)
        : getBrandsForCategory(slug).map((b) => b.id);
    const prunedBrands = selectedBrands.filter((b) => validBrands.includes(b));
    setSelectedBrands(prunedBrands);

    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') {
      params.delete('category');
      params.delete('cat');
    } else {
      params.set('category', slug);
      params.delete('cat');
    }

    if (prunedBrands.length > 0) {
      params.set('brand', prunedBrands.join(','));
      params.delete('brands');
    } else {
      params.delete('brand');
      params.delete('brands');
    }

    const newUrl = params.toString() ? `/categories?${params.toString()}` : '/categories';
    router.push(newUrl, { scroll: false });
  };

  // Handle Brand Toggle (Multi-brand Selection)
  const handleBrandToggle = (brandId: string) => {
    const nextBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((b) => b !== brandId)
      : [...selectedBrands, brandId];

    setSelectedBrands(nextBrands);

    const params = new URLSearchParams(searchParams.toString());
    if (nextBrands.length > 0) {
      params.set('brand', nextBrands.join(','));
      params.delete('brands');
    } else {
      params.delete('brand');
      params.delete('brands');
    }

    const newUrl = params.toString() ? `/categories?${params.toString()}` : '/categories';
    router.push(newUrl, { scroll: false });
  };

  // Clear Brand Filters
  const handleClearBrands = () => {
    setSelectedBrands([]);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('brand');
    params.delete('brands');
    const newUrl = params.toString() ? `/categories?${params.toString()}` : '/categories';
    router.push(newUrl, { scroll: false });
  };

  // Clear Search Query
  const handleClearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    params.delete('search');
    const newUrl = params.toString() ? `/categories?${params.toString()}` : '/categories';
    router.push(newUrl, { scroll: false });
  };

  // Reset All Filters
  const handleReset = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setSelectedStatus('all');
    setMinPrice(0);
    setMaxPrice(25000);
    setSortBy('popular');
    setSearchQuery('');
    setMobileFilterOpen(false);
    router.push('/categories', { scroll: false });
  };

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    let list = [...FEATURED_PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.categorySlug === selectedCategory);
    }

    // Filter by Brand (Multi-brand selection: matches any selected brand)
    if (selectedBrands.length > 0) {
      list = list.filter((p) => {
        const pBrandId = normalizeBrandId(p.brandId || p.brand);
        return selectedBrands.includes(pBrandId);
      });
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
  }, [selectedCategory, selectedBrands, searchQuery, selectedStatus, minPrice, maxPrice, sortBy]);

  // Details if a single brand is currently selected
  const singleBrandInfo = useMemo(() => {
    if (selectedBrands.length === 1) {
      return getBrandById(selectedBrands[0]);
    }
    return null;
  }, [selectedBrands]);

  // Active filter count for mobile badge
  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (selectedStatus !== 'all' ? 1 : 0) +
    (searchQuery ? 1 : 0);

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

      {/* ── MOBILE FILTER TRIGGER BAR ──────────────────────────────────── */}
      <div className="mobile-filter-bar">
        <button
          type="button"
          className="mobile-filter-trigger-btn"
          onClick={() => setMobileFilterOpen(true)}
          aria-label="Open filter menu"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <span>Filter &amp; Brands</span>
          {activeFilterCount > 0 && (
            <span
              style={{
                background: 'var(--accent-primary)',
                color: '#ffffff',
                fontSize: '0.75rem',
                padding: '0.1rem 0.5rem',
                borderRadius: '10px',
                fontWeight: 700,
              }}
            >
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ── MAIN CATALOG FILTER LAYOUT ──────────────────────────────────── */}
      <div className="catalog-layout">
        {/* Left Column: Filter Sidebar (Desktop) */}
        <div className="desktop-only-filter-panel">
          <FilterPanel
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategorySelect}
            selectedBrands={selectedBrands}
            onBrandToggle={handleBrandToggle}
            onClearBrands={handleClearBrands}
            availableBrands={availableBrands}
            brandCounts={brandCounts}
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
        </div>

        {/* Right Column: Search Toolbar & Equipment Grid */}
        <div>
          {/* Active Brand Information Banner (when 1 brand is filtered) */}
          {singleBrandInfo && (
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(24, 119, 242, 0.05) 0%, rgba(14, 165, 233, 0.08) 100%)',
                border: '1px solid rgba(24, 119, 242, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
                marginBottom: '1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-title)', fontSize: '0.95rem' }}>
                    🏷️ {singleBrandInfo.name} Equipment Filter
                  </span>
                  <span
                    className="status-badge available"
                    style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}
                  >
                    {filteredProducts.length} Product{filteredProducts.length === 1 ? '' : 's'} Available
                  </span>
                </div>
                {singleBrandInfo.description && (
                  <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    {singleBrandInfo.description}
                  </p>
                )}
              </div>
              {singleBrandInfo.websiteUrl && (
                <a
                  href={singleBrandInfo.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.35rem 0.75rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: '#ffffff',
                  }}
                  title={`Open official ${singleBrandInfo.name} manufacturer page`}
                >
                  <span>Official {singleBrandInfo.name} Site</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}

          {/* Results Toolbar */}
          <div className="catalog-results-toolbar">
            <div className="catalog-count-info" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-title)', fontSize: '0.95rem', marginRight: '0.35rem' }}>
                Equipment ({filteredProducts.length})
              </span>

              {/* Category Filter Badge */}
              {selectedCategory !== 'all' && currentCategoryObj && (
                <span className="catalog-active-filter-badge">
                  Category: {currentCategoryObj.name}
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('all')}
                    aria-label="Remove category filter"
                  >
                    ✕
                  </button>
                </span>
              )}

              {/* Brand Filter Badges */}
              {selectedBrands.map((bId) => (
                <span key={bId} className="catalog-active-filter-badge">
                  Brand: {getBrandDisplayName(bId)}
                  <button
                    type="button"
                    onClick={() => handleBrandToggle(bId)}
                    aria-label={`Remove ${getBrandDisplayName(bId)} brand filter`}
                  >
                    ✕
                  </button>
                </span>
              ))}

              {selectedBrands.length > 1 && (
                <button
                  type="button"
                  onClick={handleClearBrands}
                  className="btn-filter-clear-inline"
                  style={{ marginLeft: '0.25rem' }}
                >
                  Clear Brands
                </button>
              )}

              {/* Search Filter Badge */}
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
                placeholder="Search equipment or brand..."
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
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.9rem',
                  marginBottom: '1.5rem',
                  maxWidth: '460px',
                  margin: '0 auto 1.5rem',
                  lineHeight: 1.6,
                }}
              >
                {selectedBrands.length > 0
                  ? `No verified equipment found from ${selectedBrands
                      .map((b) => getBrandDisplayName(b))
                      .join(', ')} in ${
                      currentCategoryObj ? currentCategoryObj.name : 'this category'
                    }. Try clearing your brand selection or browsing all equipment.`
                  : 'Try adjusting your price range, clearing keywords, or selecting a different equipment category.'}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                {selectedBrands.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={handleClearBrands}
                  >
                    Clear Brand Filters
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleReset}
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE FILTER DRAWER OVERLAY ───────────────────────────────── */}
      {mobileFilterOpen && (
        <div
          className="mobile-filter-drawer-backdrop"
          onClick={() => setMobileFilterOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Equipment Filters"
        >
          <div
            className="mobile-filter-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-filter-drawer-header">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-title)', margin: 0 }}>
                Filter Equipment
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                }}
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>
            <div className="mobile-filter-drawer-body">
              <FilterPanel
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategorySelect}
                selectedBrands={selectedBrands}
                onBrandToggle={handleBrandToggle}
                onClearBrands={handleClearBrands}
                availableBrands={availableBrands}
                brandCounts={brandCounts}
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
            </div>
            <div className="mobile-filter-drawer-footer">
              <button
                type="button"
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '0.85rem' }}
                onClick={handleReset}
              >
                Reset All
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ flex: 2, fontSize: '0.85rem' }}
                onClick={() => setMobileFilterOpen(false)}
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
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
