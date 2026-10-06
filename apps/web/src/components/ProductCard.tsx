import React from 'react';
import Link from 'next/link';
import type { ProductItem } from '../lib/mock-data';

export interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        <span>[ Image Placeholder ]</span>
        <div className="product-badge-overlay">
          <span className={`status-badge ${product.availability}`}>
            {product.availability === 'available'
              ? 'Available'
              : product.availability === 'booked'
                ? 'Booked'
                : 'Unavailable'}
          </span>
        </div>
      </div>

      <div className="product-card-body">
        <span className="product-category-tag">{product.category}</span>
        <h3 className="product-card-title">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="product-card-location">
          <span>📍</span>
          <span>{product.location}</span>
        </div>

        <div className="product-card-footer">
          <div className="product-price-box">
            <span className="product-price">₹{product.dailyRate.toLocaleString()}</span>
            <span className="product-period">
              / day (₹{product.weeklyRate.toLocaleString()}/wk)
            </span>
          </div>

          <Link href={`/products/${product.slug}`} className="btn btn-primary btn-sm">
            View / Rent
          </Link>
        </div>
      </div>
    </div>
  );
};
