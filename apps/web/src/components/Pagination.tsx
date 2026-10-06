import React from 'react';

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage = 1, totalPages = 5 }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '3rem',
      }}
    >
      <button type="button" className="btn btn-secondary btn-sm" disabled={currentPage <= 1}>
        ← Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          className={`btn btn-sm ${page === currentPage ? 'btn-primary' : 'btn-secondary'}`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        disabled={currentPage >= totalPages}
      >
        Next →
      </button>
    </div>
  );
};
