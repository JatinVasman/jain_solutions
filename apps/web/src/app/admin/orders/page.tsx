import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Orders & Bookings | Admin Console',
};

const ORDERS = [
  {
    id: 'ORD-9012',
    customer: 'Rohit Verma',
    item: 'Honda EU70is Silent Inverter Generator',
    rentalDays: 3,
    total: '₹7,200',
    date: '06 Oct 2026',
    status: 'Payment Authorized',
  },
  {
    id: 'ORD-9011',
    customer: 'Sunil Studio',
    item: 'Sony FX3 Full-Frame Cinema Camera Kit',
    rentalDays: 3,
    total: '₹10,500',
    date: '05 Oct 2026',
    status: 'Dispatched',
  },
  {
    id: 'ORD-9010',
    customer: 'L&T Infra',
    item: 'JCB Mini Excavator (1.5 Tonne)',
    rentalDays: 14,
    total: '₹34,000',
    date: '04 Oct 2026',
    status: 'Dispatched',
  },
  {
    id: 'ORD-9008',
    customer: 'Priya Mehra',
    item: 'Bosch Rotary Hammer Drill (1100W)',
    rentalDays: 2,
    total: '₹900',
    date: '02 Oct 2026',
    status: 'Completed',
  },
];

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Platform Booking Orders ({ORDERS.length})</h1>
          <p className="portal-subtitle">
            Full transaction receipts, delivery staging orders, and invoice reconciliation.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Item Booked</th>
              <th>Period</th>
              <th>Gross Billed</th>
              <th>Booking Date</th>
              <th>Logistics Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((ord) => (
              <tr key={ord.id}>
                <td style={{ fontWeight: 600 }}>#{ord.id}</td>
                <td>{ord.customer}</td>
                <td>{ord.item}</td>
                <td>{ord.rentalDays} Days</td>
                <td style={{ fontWeight: 600 }}>{ord.total}</td>
                <td>{ord.date}</td>
                <td>
                  <span className="status-badge available">{ord.status}</span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Order Invoice
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
