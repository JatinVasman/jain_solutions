import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Candidate Applications | Admin Console',
};

const APPLICATIONS = [
  {
    id: 'APP-901',
    candidate: 'Vikram Malhotra',
    role: 'Hub Operations Manager',
    location: 'Bengaluru',
    experience: '4 Years',
    submitted: '03 Oct 2026',
    stage: 'In Review',
  },
  {
    id: 'APP-842',
    candidate: 'Sandeep Sharma',
    role: 'Senior Electronics / Equipment Technician',
    location: 'Delhi NCR',
    experience: '5.5 Years',
    submitted: '12 Sep 2026',
    stage: 'Shortlisted',
  },
  {
    id: 'APP-839',
    candidate: 'Meera Iyer',
    role: 'Marketplace Partner Development Lead',
    location: 'Mumbai',
    experience: '3 Years',
    submitted: '08 Sep 2026',
    stage: 'Interview Done',
  },
  {
    id: 'APP-812',
    candidate: 'Arjun Das',
    role: 'Customer Experience & Booking Specialist',
    location: 'Remote',
    experience: '2 Years',
    submitted: '29 Aug 2026',
    stage: 'Screened',
  },
];

export default function AdminApplicationsPage() {
  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Candidate Recruitment Dossiers ({APPLICATIONS.length})</h1>
          <p className="portal-subtitle">
            Review incoming resumes, conduct background verification, and transition applicant
            stages.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Dossier ID</th>
              <th>Candidate Name</th>
              <th>Applied Position</th>
              <th>Candidate City</th>
              <th>Experience</th>
              <th>Date Received</th>
              <th>Pipeline Stage</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {APPLICATIONS.map((app) => (
              <tr key={app.id}>
                <td style={{ fontWeight: 600 }}>#{app.id}</td>
                <td>{app.candidate}</td>
                <td>{app.role}</td>
                <td>{app.location}</td>
                <td>{app.experience}</td>
                <td>{app.submitted}</td>
                <td>
                  <span
                    className={`status-badge ${app.stage === 'Shortlisted' ? 'available' : 'booked'}`}
                  >
                    {app.stage}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" type="button">
                    Review CV
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
