import React from 'react';
import type { Metadata } from 'next';
import { LOCATIONS } from '../../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Fulfillment Locations & Hubs | Admin Console',
};

export default function AdminLocationsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            Fulfillment Hubs & Delivery Zones ({LOCATIONS.length} Regions)
          </h1>
          <p className="portal-subtitle">
            Regional equipment yards, express staging bays, pickup points, and localized inventory
            allocation.
          </p>
        </div>
        <button className="btn btn-primary" type="button">
          + Add Logistics Hub
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>City / Metro Zone</th>
              <th>State Jurisdiction</th>
              <th>Fulfillment Hubs</th>
              <th>Live Deployments</th>
              <th>Coverage Radius</th>
              <th>Dispatch Health</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {LOCATIONS.map((loc) => (
              <tr key={loc.city}>
                <td style={{ fontWeight: 600 }}>{loc.city}</td>
                <td>{loc.state}</td>
                <td>{loc.hubCount} Hubs</td>
                <td style={{ fontWeight: 600 }}>{loc.activeRentals} Rentals</td>
                <td>45 km Radius</td>
                <td>
                  <span className="status-badge available">Active 24/7</span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Manage Hubs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
