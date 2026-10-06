import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Assigned Field Tasks | Freelancer Portal',
};

const TASKS = [
  {
    id: 'TSK-4091',
    type: 'Pre-Delivery Inspection',
    asset: 'Silent Diesel Generator (62.5 kVA)',
    location: 'Noida Sector 62, B-Block',
    time: 'Today, 14:00 IST',
    fee: '₹1,200',
    status: 'Pending Arrival',
  },
  {
    id: 'TSK-4092',
    type: 'On-Site Rigging / Setup',
    asset: 'Sony FX6 Cinema Camera Rig + Gimbals',
    location: 'Film City, Noida Gate 3',
    time: 'Today, 16:30 IST',
    fee: '₹1,500',
    status: 'Scheduled',
  },
  {
    id: 'TSK-4093',
    type: 'Return Health Audit',
    asset: 'Demolition Jackhammer (Hilti TE 3000)',
    location: 'Okhla Industrial Area Phase 2',
    time: 'Tomorrow, 10:00 IST',
    fee: '₹950',
    status: 'Queued',
  },
  {
    id: 'TSK-4088',
    type: 'Delivery Check-in & Signature',
    asset: 'Line Array Audio System (10kW)',
    location: 'Aerocity Hospitality District',
    time: 'Yesterday',
    fee: '₹1,800',
    status: 'Completed',
  },
  {
    id: 'TSK-4085',
    type: 'Battery Bank Testing',
    asset: 'Lithium LiFePO4 15kWh Backup Unit',
    location: 'Gurugram Cyber Hub',
    time: '02 Oct 2026',
    fee: '₹1,400',
    status: 'Completed',
  },
];

export default function FreelancerTasksPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Field Task Assignments ({TASKS.length})</h1>
          <p className="portal-subtitle">
            Execute technical verification, dispatch staging, and client handovers across your
            assigned hub.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Task Ref</th>
              <th>Operation Type</th>
              <th>Asset Under Service</th>
              <th>Deployment Site</th>
              <th>Schedule</th>
              <th>Task Fee</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {TASKS.map((task) => (
              <tr key={task.id}>
                <td style={{ fontWeight: 600 }}>#{task.id}</td>
                <td>{task.type}</td>
                <td>{task.asset}</td>
                <td>{task.location}</td>
                <td>{task.time}</td>
                <td style={{ fontWeight: 600, color: 'var(--status-green)' }}>{task.fee}</td>
                <td>
                  <span
                    className={`status-badge ${task.status === 'Completed' ? 'available' : 'booked'}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td>
                  <Link href={`/freelancer/tasks/${task.id}`} className="btn btn-outline btn-sm">
                    View Task Sheet →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
