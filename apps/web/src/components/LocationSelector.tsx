import React from 'react';
import { LOCATIONS } from '../lib/mock-data';

export interface LocationSelectorProps {
  onSelect?: (city: string) => void;
  selectedCity?: string;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ selectedCity = '' }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
      }}
    >
      {LOCATIONS.map((loc) => {
        const isSelected = selectedCity === loc.city;
        return (
          <div
            key={loc.city}
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-light)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'border-color 0.15s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.35rem',
              }}
            >
              <span aria-hidden="true">📍</span>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-title)' }}>
                {loc.city}
              </h4>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              {loc.state}
            </p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
              }}
            >
              <span>{loc.hubCount} Logistics Hubs</span>
              <span>{loc.activeRentals}+ In Circulation</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
