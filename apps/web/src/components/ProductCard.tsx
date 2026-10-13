import React from 'react';
import Link from 'next/link';
import type { ProductItem } from '../lib/mock-data';

export interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const href = `/products/${product.slug || product.id}`;

  return (
    <Link href={href} className="product-card" title={product.name}>
      {/* Top section: Product image */}
      <div className="product-card-img-wrap">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="product-card-img"
            loading="lazy"
            width={240}
            height={240}
          />
        ) : (
          <div className="product-card-no-img" aria-hidden="true">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="product-card-info">
        {/* Middle section: Product name */}
        <h3 className="product-card-name">{product.name}</h3>

        {/* Bottom section: Pricing */}
        <div className="product-card-pricing">
          <span className="product-card-price">
            ₹{product.dailyRate.toLocaleString()}
          </span>
          <span className="product-card-unit">/day</span>

          {product.originalDailyRate && (
            <span className="product-card-original-price">
              ₹{product.originalDailyRate.toLocaleString()}
            </span>
          )}

          {product.discountBadge && (
            <span className="product-card-discount">
              {product.discountBadge}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
