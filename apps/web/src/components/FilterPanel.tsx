import React from 'react';
import { CATEGORIES, LOCATIONS } from '../lib/mock-data';

export interface FilterPanelProps {
  selectedCategory?: string;
  selectedLocation?: string;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategory = '',
  selectedLocation = '',
}) => {
  return (
    <aside className="filter-panel" aria-label="Catalogue Filters">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}
      >
        <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-title)' }}>
          Filters
        </h4>
        <button
          type="button"
          className="btn btn-outline btn-sm"
          style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <label htmlFor="filter-category" className="filter-label">
          Category
        </label>
        <select id="filter-category" className="filter-select" defaultValue={selectedCategory}>
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name} ({cat.itemCount})
            </option>
          ))}
        </select>
      </div>

      {/* Location Filter */}
      <div className="filter-group">
        <label htmlFor="filter-location" className="filter-label">
          Pickup / Delivery City
        </label>
        <select id="filter-location" className="filter-select" defaultValue={selectedLocation}>
          <option value="">All Regions & Hubs</option>
          {LOCATIONS.map((loc) => (
            <option key={loc.city} value={loc.city}>
              {loc.city} ({loc.hubCount} Hubs)
            </option>
          ))}
        </select>
      </div>

      {/* Rental Duration Filter */}
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
          <label className="filter-checkbox-item">
            <input type="checkbox" />
            <span>Custom Project Contract</span>
          </label>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-group">
        <span className="filter-label">Daily Price Range</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="number"
            placeholder="Min (₹)"
            className="form-input"
            defaultValue="500"
            style={{ fontSize: '0.85rem' }}
          />
          <span style={{ color: 'var(--text-dim)' }}>—</span>
          <input
            type="number"
            placeholder="Max (₹)"
            className="form-input"
            defaultValue="15000"
            style={{ fontSize: '0.85rem' }}
          />
        </div>
      </div>

      {/* Availability Status */}
      <div className="filter-group">
        <span className="filter-label">Availability</span>
        <div className="filter-checkbox-list">
          <label className="filter-checkbox-item">
            <input type="checkbox" defaultChecked />
            <span>Available for Instant Booking</span>
          </label>
          <label className="filter-checkbox-item">
            <input type="checkbox" />
            <span>Available from Next Week</span>
          </label>
        </div>
      </div>

      {/* Sort Direction */}
      <div className="filter-group">
        <label htmlFor="filter-sort" className="filter-label">
          Sort By
        </label>
        <select id="filter-sort" className="filter-select" defaultValue="popular">
          <option value="popular">Most Popular</option>
          <option value="price_asc">Rental Rate: Low to High</option>
          <option value="price_desc">Rental Rate: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Recently Listed</option>
        </select>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '1rem' }}
      >
        Apply Filters
      </button>
    </aside>
  );
};
