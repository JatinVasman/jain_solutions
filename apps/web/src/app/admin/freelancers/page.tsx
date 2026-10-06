import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Field Freelancers | Admin Console',
};

const FREELANCERS = [
  {
    id: 'FLC-4022',
    name: 'Ramesh Kumar',
    zone: 'Delhi NCR (South)',
    specialization: 'Power & Generators',
    tasksDone: 142,
    rating: '4.9 ★',
    status: 'Active',
  },
  {
    id: 'FLC-4035',
    name: 'Kunal Deshmukh',
    zone: 'Mumbai (Andheri)',
    specialization: 'Cameras & Audio',
    tasksDone: 98,
    rating: '5.0 ★',
    status: 'Active',
  },
  {
    id: 'FLC-4041',
    name: 'Siddharth Rao',
    zone: 'Bengaluru (Koramangala)',
    specialization: 'Machinery & Tools',
    tasksDone: 114,
    rating: '4.8 ★',
    status: 'Active',
  },
  {
    id: 'FLC-4050',
    name: 'Manoj Patel',
    zone: 'Ahmedabad (Sanand)',
    specialization: 'Vehicles & Fleet',
    tasksDone: 64,
    rating: '4.9 ★',
    status: 'On Leave',
  },
];

export default function AdminFreelancersPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">
            Field Freelancer & Technician Fleet ({FREELANCERS.length})
          </h1>
          <p className="portal-subtitle">
            On-demand technical personnel for pre-dispatch inspection, site setup, and asset
            retrieval.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Technician ID</th>
              <th>Full Name</th>
              <th>Assigned Logistics Zone</th>
              <th>Category Specialization</th>
              <th>Completed Tasks</th>
              <th>Quality Rating</th>
              <th>Shift Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {FREELANCERS.map((f) => (
              <tr key={f.id}>
                <td style={{ fontWeight: 600 }}>#{f.id}</td>
                <td>{f.name}</td>
                <td>{f.zone}</td>
                <td>{f.specialization}</td>
                <td>{f.tasksDone} tasks</td>
                <td style={{ fontWeight: 600 }}>{f.rating}</td>
                <td>
                  <span
                    className={`status-badge ${f.status === 'Active' ? 'available' : 'booked'}`}
                  >
                    {f.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    View Task Log
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
