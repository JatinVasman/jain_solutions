import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Enquiries | Admin Console',
};

const ENQUIRIES = [
  {
    id: 'ENQ-6021',
    name: 'Manish Chawla',
    company: 'Zenith Productions',
    category: 'Cameras & Audio',
    message:
      'Looking for 4 units of FX6 cameras for a 20-day outdoor shoot in Manali starting next month.',
    date: 'Today, 11:20',
    status: 'Unassigned',
  },
  {
    id: 'ENQ-6019',
    name: 'Alok Gupta',
    company: 'Buildcon Engineers',
    category: 'Heavy Machinery',
    message:
      'Need 125 kVA diesel generator on long-term monthly rental for construction site in Greater Noida.',
    date: 'Yesterday',
    status: 'In Discussion',
  },
  {
    id: 'ENQ-6014',
    name: 'Radhika Sen',
    company: 'Grand Events Delhi',
    category: 'Event Equipment',
    message: 'Requesting staging truss and LED wall package for corporate annual summit on Oct 25.',
    date: '04 Oct 2026',
    status: 'Quote Sent',
  },
];

export default function AdminEnquiriesPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Custom Rental Enquiries & B2B Leads ({ENQUIRIES.length})</h1>
          <p className="portal-subtitle">
            Handle enterprise bulk requests, custom multi-category quotes, and client procurement
            tickets.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Lead Ref</th>
              <th>Contact / Organization</th>
              <th>Category Focus</th>
              <th>Requirement Summary</th>
              <th>Received</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {ENQUIRIES.map((enq) => (
              <tr key={enq.id}>
                <td style={{ fontWeight: 600 }}>#{enq.id}</td>
                <td>
                  <strong>{enq.name}</strong>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {enq.company}
                  </div>
                </td>
                <td>{enq.category}</td>
                <td style={{ maxWidth: '320px', fontSize: '0.85rem' }}>{enq.message}</td>
                <td>{enq.date}</td>
                <td>
                  <span
                    className={`status-badge ${enq.status === 'Unassigned' ? 'booked' : 'available'}`}
                  >
                    {enq.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Reply & Quote
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
