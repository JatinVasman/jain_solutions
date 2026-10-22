'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { HERO_CATEGORIES } from '../lib/mock-data';
import type { BrandItem } from '../lib/brand-data';

export interface FilterPanelProps {
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  selectedBrands?: string[];
  onBrandToggle?: (brandId: string) => void;
  onClearBrands?: () => void;
  availableBrands?: BrandItem[];
  brandCounts?: Record<string, number>;
  selectedStatus?: string;
  onStatusChange?: (status: string) => void;
  minPrice?: number;
  maxPrice?: number;
  onPriceChange?: (min: number, max: number) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  onReset?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory = 'all',
  onCategoryChange,
  selectedBrands = [],
  onBrandToggle,
  onClearBrands,
  availableBrands = [],
  brandCounts = {},
  selectedStatus = 'all',
  onStatusChange,
  minPrice = 0,
  maxPrice = 25000,
  onPriceChange,
  sortBy = 'popular',
  onSortChange,
  onReset,
}) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [brandSearch, setBrandSearch] = useState('');

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 0;
    setLocalMin(val);
    if (onPriceChange) onPriceChange(val, localMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) || 25000;
    setLocalMax(val);
    if (onPriceChange) onPriceChange(localMin, val);
  };

  const filteredBrands = useMemo(() => {
    if (!availableBrands || availableBrands.length === 0) return [];
    if (!brandSearch.trim()) return availableBrands;
    const q = brandSearch.toLowerCase();
    return availableBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [availableBrands, brandSearch]);

  return (
    <aside className="filter-panel" aria-label="Equipment Filters">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-title)', margin: 0 }}>
          Filter Equipment
        </h4>
        {onReset && (
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onReset}
            style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
          >
            Reset All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <label htmlFor="filter-category" className="filter-label">
          Category
        </label>
        <select
          id="filter-category"
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        >
          <option value="all">All Categories</option>
          {HERO_CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.icon} {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand / Manufacturer Filter */}
      {availableBrands && availableBrands.length > 0 && (
        <div className="filter-group">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.65rem',
            }}
          >
            <span className="filter-label" style={{ marginBottom: 0 }}>
              Brand / Manufacturer
            </span>
            {selectedBrands.length > 0 && onClearBrands && (
              <button
                type="button"
                onClick={onClearBrands}
                className="btn-filter-clear-inline"
                title="Clear selected brand filters"
                aria-label="Clear brand filter"
              >
                Clear ({selectedBrands.length})
              </button>
            )}
          </div>

          {availableBrands.length > 5 && (
            <div style={{ marginBottom: '0.65rem' }}>
              <input
                type="text"
                placeholder="Search brands..."
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                className="filter-brand-search-input"
                aria-label="Search within brand list"
              />
            </div>
          )}

          <div className="filter-brand-list">
            {filteredBrands.map((brand) => {
              const count = brandCounts[brand.id] ?? 0;
              const isChecked = selectedBrands.includes(brand.id);
              const isDisabled = count === 0 && !isChecked;

              return (
                <label
                  key={brand.id}
                  className={`filter-brand-item ${isDisabled ? 'disabled' : ''} ${
                    isChecked ? 'selected' : ''
                  }`}
                  title={
                    isDisabled
                      ? `No ${brand.name} equipment currently available in this category`
                      : `${count} equipment item(s) available`
                  }
                >
                  <div className="filter-brand-item-left">
                    <input
                      type="checkbox"
                      className="filter-brand-checkbox"
                      checked={isChecked}
                      onChange={() => onBrandToggle && onBrandToggle(brand.id)}
                      disabled={isDisabled}
                      aria-label={`Filter by ${brand.name}`}
                    />
                    <span className="filter-brand-name">{brand.name}</span>
                  </div>
                  <span className={`filter-brand-count ${count === 0 ? 'zero-count' : ''}`}>
                    ({count})
                  </span>
                </label>
              );
            })}
            {filteredBrands.length === 0 && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.5rem 0' }}>
                No matching brands found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Availability Status Filter */}
      <div className="filter-group">
        <label htmlFor="filter-availability" className="filter-label">
          Equipment Availability
        </label>
        <select
          id="filter-availability"
          className="filter-select"
          value={selectedStatus}
          onChange={(e) => onStatusChange && onStatusChange(e.target.value)}
        >
          <option value="all">All Verified Equipment</option>
          <option value="available">Available Now</option>
          <option value="booked">Currently Booked / Waitlist</option>
        </select>
      </div>

      {/* Daily Price Range Filter */}
      <div className="filter-group">
        <span className="filter-label">Daily Rental Rate (₹)</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Min (₹)"
            className="form-input"
            value={localMin || ''}
            onChange={handleMinChange}
            min={0}
            step={100}
            style={{ fontSize: '0.85rem' }}
          />
          <span style={{ color: 'var(--text-dim)' }}>—</span>
          <input
            type="number"
            placeholder="Max (₹)"
            className="form-input"
            value={localMax || ''}
            onChange={handleMaxChange}
            min={0}
            step={500}
            style={{ fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Rental Tenure Filter */}
      <div className="filter-group">
        <span className="filter-label">Rental Duration</span>
        <div className="filter-checkbox-list">
          <label className="filter-checkbox-item">
            <input type="checkbox" defaultChecked />
            <span>Daily (1 - 6 Days)</span>
          </label>
          <label className="filter-checkbox-item">
            <input type="checkbox" defaultChecked />
            <span>Weekly (1 - 3 Weeks)</span>
          </label>
          <label className="filter-checkbox-item">
            <input type="checkbox" />
            <span>Monthly (30+ Days)</span>
          </label>
        </div>
      </div>

      {/* Sort Direction */}
      <div className="filter-group">
        <label htmlFor="filter-sort" className="filter-label">
          Sort By
        </label>
        <select
          id="filter-sort"
          className="filter-select"
          value={sortBy}
          onChange={(e) => onSortChange && onSortChange(e.target.value)}
        >
          <option value="popular">Most Popular</option>
          <option value="price_asc">Rental Rate: Low to High</option>
          <option value="price_desc">Rental Rate: High to Low</option>
          <option value="rating">Highest Customer Rating</option>
        </select>
      </div>

      {onReset && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
          style={{ width: '100%', marginTop: '1rem', fontSize: '0.85rem' }}
        >
          Clear All Filters
        </button>
      )}
    </aside>
  );
};
