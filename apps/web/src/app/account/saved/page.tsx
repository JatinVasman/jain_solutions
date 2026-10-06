import React from 'react';
import type { Metadata } from 'next';
import { ProductCard } from '../../../components/ProductCard';
import { FEATURED_PRODUCTS } from '../../../lib/mock-data';

export const metadata: Metadata = {
  title: 'Saved Equipment | Customer Account',
};

export default function AccountSavedPage() {
  const saved = FEATURED_PRODUCTS.slice(0, 3);

  return (
    <div>
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Saved Equipment & Wishlist</h1>
          <p className="portal-subtitle">
            Quickly reference shortlisted items for future project rental bookings.
          </p>
        </div>
      </div>

      <div className="product-grid">
        {saved.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
