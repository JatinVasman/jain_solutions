'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // If no images provided, supply a safe fallback
  const validImages = images && images.length > 0 ? images : ['/hero/hero-bg.jpg'];
  const activeImage = validImages[selectedIndex] || validImages[0] || '/hero/hero-bg.jpg';

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : validImages.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < validImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="product-detail-gallery">
      {/* ── MAIN HERO IMAGE STAGE ───────────────────────── */}
      <div className="gallery-stage">
        <img
          src={activeImage}
          alt={`${productName} — View ${selectedIndex + 1}`}
          className="gallery-stage-img"
          loading="eager"
        />

        {/* Image Counter Badge */}
        {validImages.length > 1 && (
          <span className="gallery-counter">
            {selectedIndex + 1} / {validImages.length}
          </span>
        )}

        {/* Navigation Arrows (if > 1 image) */}
        {validImages.length > 1 && (
          <>
            <button
              type="button"
              className="gallery-nav-btn gallery-prev"
              onClick={handlePrev}
              aria-label="Previous product image"
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery-nav-btn gallery-next"
              onClick={handleNext}
              aria-label="Next product image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* ── THUMBNAIL SELECTOR STRIP ─────────────────────── */}
      {validImages.length > 1 && (
        <div className="gallery-thumbs-row" role="tablist" aria-label="Product image thumbnails">
          {validImages.map((imgUrl, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <button
                key={idx}
                type="button"
                className={`gallery-thumb-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedIndex(idx)}
                aria-label={`View image ${idx + 1} of ${validImages.length}`}
                aria-pressed={isActive}
              >
                <img
                  src={imgUrl}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  className="gallery-thumb-img"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
