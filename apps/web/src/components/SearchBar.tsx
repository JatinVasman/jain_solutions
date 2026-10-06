'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'What are you looking for? (e.g. Camera, Inverter, Projector, Car, Generator, Tools)',
  defaultValue = '',
  className = '',
}) => {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`search-bar ${className}`.trim()}>
      <div className="search-input-group">
        <span aria-hidden="true" style={{ fontSize: '1.1rem', marginRight: '0.5rem' }}>
          🔍
        </span>
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label="Search equipment"
        />
      </div>
      <button type="submit" className="search-btn">
        Search Rentals
      </button>
    </form>
  );
};
