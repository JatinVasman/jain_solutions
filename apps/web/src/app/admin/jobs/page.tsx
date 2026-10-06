import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { JOB_LISTINGS } from '../../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Job Postings Management | Admin Console',
};

export default function AdminJobsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Career Postings Management ({JOB_LISTINGS.length})</h1>
          <p className="portal-subtitle">
            Publish career vacancies, manage hiring criteria, and assign department hiring managers.
          </p>
        </div>
        <button className="btn btn-primary" type="button">
          + Post New Job Opening
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Position Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Contract</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {JOB_LISTINGS.map((j) => (
              <tr key={j.id}>
                <td style={{ fontWeight: 600 }}>#{j.id}</td>
                <td>
                  <Link
                    href={`/jobs/${j.id}`}
                    style={{ fontWeight: 600, color: 'var(--color-text)' }}
                  >
                    {j.title}
                  </Link>
                </td>
                <td>{j.department}</td>
                <td>{j.location}</td>
                <td>{j.type}</td>
                <td>{j.experience}</td>
                <td>
                  <span className="status-badge available">Active Hiring</span>
                </td>
                <td>
                  <Link href={`/jobs/${j.id}`} className="btn btn-outline btn-sm">
                    View
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
