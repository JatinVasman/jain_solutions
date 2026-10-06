'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import type { JobItem } from '../lib/mock-data';

interface JobCatalogClientProps {
  initialJobs: JobItem[];
}

export function JobCatalogClient({ initialJobs }: JobCatalogClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('All');

  // Extract unique departments and locations
  const departments = useMemo(() => {
    const depts = Array.from(new Set(initialJobs.map((j) => j.department)));
    return ['All', ...depts];
  }, [initialJobs]);

  const locations = useMemo(() => {
    const locs = Array.from(
      new Set(
        initialJobs.map((j) => {
          const firstPart = j.location.split(/[,/]/)[0];
          return firstPart ? firstPart.trim() : j.location;
        }),
      ),
    );
    return ['All', ...locs];
  }, [initialJobs]);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const matchesSearch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.tags && job.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesDept = selectedDept === 'All' || job.department === selectedDept;

      const matchesLocation =
        selectedLocation === 'All' ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesDept && matchesLocation;
    });
  }, [initialJobs, searchTerm, selectedDept, selectedLocation]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDept('All');
    setSelectedLocation('All');
  };

  return (
    <div>
      {/* Search & Filter Toolbar */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          {/* Search Input */}
          <div style={{ flex: '1 1 320px', position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none',
              }}
            >
              🔍
            </span>
            <input
              type="text"
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search positions by title, keyword, or skill..."
              style={{
                width: '100%',
                paddingLeft: '2.5rem',
                height: '46px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-light)',
                background: '#f8fafc',
              }}
            />
          </div>

          {/* Location Selector */}
          <div style={{ flex: '0 0 auto', minWidth: '180px' }}>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="portal-selector"
              style={{
                width: '100%',
                height: '46px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--border-light)',
                background: '#f8fafc',
                padding: '0 1rem',
              }}
            >
              <option value="All">All Locations ▾</option>
              {locations
                .filter((l) => l !== 'All')
                .map((loc) => (
                  <option key={loc} value={loc}>
                    📍 {loc}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Department Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-title)',
              marginRight: '0.25rem',
            }}
          >
            Departments:
          </span>
          {departments.map((dept) => {
            const count =
              dept === 'All'
                ? initialJobs.length
                : initialJobs.filter((j) => j.department === dept).length;
            const isActive = selectedDept === dept;
            return (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDept(dept)}
                className={`filter-pill ${isActive ? 'active' : ''}`}
              >
                {dept} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Status Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: 'var(--text-title)' }}>{filteredJobs.length}</strong> open{' '}
          {filteredJobs.length === 1 ? 'position' : 'positions'}
          {selectedDept !== 'All' ? ` in ${selectedDept}` : ''}
        </span>

        {(searchTerm || selectedDept !== 'All' || selectedLocation !== 'All') && (
          <button
            type="button"
            onClick={resetFilters}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Job Grid */}
      {filteredJobs.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              {/* Card Header: Badges & Date */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="job-badge-dept">{job.department}</span>
                  {job.featured && <span className="job-badge-featured">⭐ Priority Role</span>}
                </div>
                {job.postedDate && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {job.postedDate}
                  </span>
                )}
              </div>

              {/* Job Title */}
              <h2
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--text-title)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.35,
                }}
              >
                <Link href={`/jobs/${job.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {job.title}
                </Link>
              </h2>

              {/* Metadata Badges */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.825rem',
                  marginBottom: '1rem',
                }}
              >
                <span>📍 {job.location}</span>
                <span>💼 {job.type}</span>
                <span>⏱ {job.experience}</span>
              </div>

              {/* Salary Bracket */}
              {job.salaryRange && (
                <div
                  style={{
                    background: 'var(--teal-50)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--teal-800)',
                    marginBottom: '1rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    width: 'fit-content',
                  }}
                >
                  💵 {job.salaryRange}
                </div>
              )}

              {/* Role Excerpt */}
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  flex: 1,
                  marginBottom: '1.25rem',
                }}
              >
                {job.description}
              </p>

              {/* Tags */}
              {job.tags && job.tags.length > 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {job.tags.map((tag) => (
                    <span key={tag} className="job-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                <Link
                  href={`/jobs/${job.id}`}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  View Role
                </Link>
                <Link
                  href={`/jobs/${job.id}/apply`}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  Apply Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
            textAlign: 'center',
            marginBottom: '3rem',
          }}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔎</div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Matching Positions Found
          </h3>
          <p
            style={{
              color: 'var(--text-muted)',
              maxWidth: '460px',
              margin: '0 auto 1.5rem',
              fontSize: '0.95rem',
            }}
          >
            We couldn&apos;t find any roles matching your current search criteria. Try modifying
            your keywords or resetting filters.
          </p>
          <button type="button" onClick={resetFilters} className="btn btn-secondary">
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
