import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inventory Units | Owner Portal',
};

const INVENTORY_ITEMS = [
  {
    serial: 'INV-5000-DL-9821',
    product: '5 kVA Inverter System',
    hub: 'South Delhi Hub',
    condition: 'Grade A',
    status: 'On-Site Active',
  },
  {
    serial: 'INV-5000-DL-9822',
    product: '5 kVA Inverter System',
    hub: 'South Delhi Hub',
    condition: 'Grade A',
    status: 'On-Site Active',
  },
  {
    serial: 'GEN-7000-DL-4102',
    product: 'Honda EU70is Silent Generator',
    hub: 'South Delhi Hub',
    condition: 'Grade A+',
    status: 'On-Site Active',
  },
  {
    serial: 'GEN-7000-DL-4103',
    product: 'Honda EU70is Silent Generator',
    hub: 'South Delhi Hub',
    condition: 'Grade A+',
    status: 'In Hub (Available)',
  },
  {
    serial: 'ACE-GOLD-DL-1109',
    product: 'Tata Ace Gold Cargo Pickup',
    hub: 'Okhla Hub',
    condition: 'Grade B+',
    status: 'In Hub (Available)',
  },
];

export default function OwnerInventoryPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Fleet & Inventory Units</h1>
          <p className="portal-subtitle">
            Track physical serialized units, calibration records, and warehouse stationing.
          </p>
        </div>
        <button type="button" className="btn btn-primary btn-sm">
          + Add Serialized Unit
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Serial Tag</th>
              <th>Product Model</th>
              <th>Assigned Hub</th>
              <th>Health Condition</th>
              <th>Current Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {INVENTORY_ITEMS.map((item) => (
              <tr key={item.serial}>
                <td style={{ fontWeight: 600 }}>{item.serial}</td>
                <td>{item.product}</td>
                <td>{item.hub}</td>
                <td>{item.condition}</td>
                <td>
                  <span
                    className={`status-badge ${item.status.includes('Active') ? 'available' : 'neutral'}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <button type="button" className="btn btn-outline btn-sm">
                    Inspection Log
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
