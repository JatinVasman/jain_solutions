import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Physical Inventory & Serialization | Admin Console',
};

const INVENTORY_ITEMS = [
  {
    serial: 'SN-PWR-2024-001',
    asset: '5 kVA Pure Sine Wave Inverter System',
    hub: 'South Delhi Hub',
    condition: 'Excellent',
    status: 'In Warehouse',
    lastTest: '28 Sep 2026',
  },
  {
    serial: 'SN-PWR-2024-002',
    asset: '5 kVA Pure Sine Wave Inverter System',
    hub: 'Okhla Central Bay',
    condition: 'Good',
    status: 'Rented Out',
    lastTest: '15 Sep 2026',
  },
  {
    serial: 'SN-CAM-2025-014',
    asset: 'Sony FX3 Full-Frame Cinema Camera Kit',
    hub: 'Bandra West Logistics',
    condition: 'Calibrated',
    status: 'In Warehouse',
    lastTest: '01 Oct 2026',
  },
  {
    serial: 'SN-TL-2023-089',
    asset: 'Bosch Professional Rotary Hammer Drill',
    hub: 'Koramangala Depot',
    condition: 'Good',
    status: 'Rented Out',
    lastTest: '20 Sep 2026',
  },
  {
    serial: 'SN-MCH-2024-005',
    asset: 'JCB Mini Excavator (1.5 Tonne)',
    hub: 'Cyber Hub Yard',
    condition: 'Service Due',
    status: 'Maintenance',
    lastTest: '10 Aug 2026',
  },
];

export default function AdminInventoryPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            Serialized Physical Inventory Tracking ({INVENTORY_ITEMS.length})
          </h1>
          <p className="portal-subtitle">
            Barcodes, asset serialization, hub localization, condition scoring, and maintenance
            schedules.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Serial Number / Barcode</th>
              <th>Catalog Asset Name</th>
              <th>Current Hub Yard</th>
              <th>Hardware Condition</th>
              <th>Deployment Status</th>
              <th>Last QA Test</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {INVENTORY_ITEMS.map((item) => (
              <tr key={item.serial}>
                <td style={{ fontWeight: 600 }}>
                  <code>{item.serial}</code>
                </td>
                <td>{item.asset}</td>
                <td>{item.hub}</td>
                <td>{item.condition}</td>
                <td>
                  <span
                    className={`status-badge ${item.status === 'In Warehouse' ? 'available' : item.status === 'Rented Out' ? 'booked' : 'booked'}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>{item.lastTest}</td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Audit Tag
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
