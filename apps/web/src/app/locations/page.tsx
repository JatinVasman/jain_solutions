import React from 'react';
import type { Metadata } from 'next';
import { Breadcrumb } from '../../components/Breadcrumb';
import { LocationSelector } from '../../components/LocationSelector';
import { LOCATIONS } from '../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Fulfillment Locations & Hubs',
  description: 'Explore regional offices, logistics hubs, and self-pickup points.',
};

export default function LocationsPage() {
  return (
    <div className="page-container">
      <Breadcrumb items={[{ label: 'Locations' }]} />

      <div className="section-header">
        <span className="section-tag">Logistics Infrastructure</span>
        <h1 className="section-title">Regional Hubs & Pickup Points</h1>
        <p className="section-desc">
          Equipment is stationed across strategically located regional warehouses, partner
          fulfillment centers, and verified supplier yards.
        </p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-title)', marginBottom: '1.25rem' }}>
          Select Operational Territory
        </h2>
        <LocationSelector />
      </div>

      {/* Structural Breakdown: States, Cities, Offices, Pickup Points */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>State / Region</th>
              <th>Primary City</th>
              <th>Regional Logistics Office</th>
              <th>Fulfillment Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {LOCATIONS.map((loc, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{loc.state}</td>
                <td>{loc.city}</td>
                <td>Central Hub #{i + 1} - Regional Dispatch</td>
                <td>Doorstep Delivery + Self-Pickup Point</td>
                <td>
                  <span className="status-badge available">Active Hub</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
