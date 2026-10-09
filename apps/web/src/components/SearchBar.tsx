'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HERO_CATEGORIES } from '../lib/mock-data';

export interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

const BRANDS = [
  'All Brands',
  'Hikvision',
  'Cisco',
  'TP-Link',
  'Dahua',
  'Dell',
  'Schneider Electric',
  'CommScope',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search products, brands or categories…',
  defaultValue = '',
  className = '',
}) => {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('All Brands');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (category) {
      const searchParams = new URLSearchParams();
      if (query.trim()) searchParams.set('q', query.trim());
      if (brand && brand !== 'All Brands') searchParams.set('brand', brand);
      const queryString = searchParams.toString();
      router.push(`/categories/${category}${queryString ? `?${queryString}` : ''}`);
    } else {
      const target = document.getElementById('featured-equipment');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`catalog-search-section ${className}`.trim()}>
      <div className="catalog-search-container">
        <form onSubmit={handleSearch} className="catalog-search-bar" role="search">
          {/* Keyword Search */}
          <div className="search-field query-field">
            <svg
              className="search-field-icon"
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
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-field-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              aria-label="Search products, brands or categories"
            />
          </div>

          <div className="search-field-divider" aria-hidden="true" />

          {/* Category Dropdown */}
          <div className="search-field category-field">
            <label htmlFor="search-category-select" className="search-field-label">
              Category
            </label>
            <select
              id="search-category-select"
              className="search-field-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {HERO_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="search-field-divider" aria-hidden="true" />

          {/* Brand Dropdown */}
          <div className="search-field brand-field">
            <label htmlFor="search-brand-select" className="search-field-label">
              Brand
            </label>
            <select
              id="search-brand-select"
              className="search-field-select"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              aria-label="Filter by brand"
            >
              {BRANDS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="search-submit-btn">
            <span>Search Products</span>
          </button>
        </form>

        {/* Streamlined Trust Bar */}
        <div className="catalog-trust-row">
          <div className="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>100% Genuine OEM Hardware</span>
          </div>
          <div className="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            <span>24/7 Certified Technical Support</span>
          </div>
          <div className="trust-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Same-Day Dispatch &amp; Deployment</span>
          </div>
          <div className="trust-item rating">
            <span style={{ color: '#d97706' }}>★</span>
            <strong>4.9/5</strong>
            <span>(1,200+ Enterprise Clients)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
