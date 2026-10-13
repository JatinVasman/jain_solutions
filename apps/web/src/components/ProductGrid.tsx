import React from 'react';
import Link from 'next/link';

interface GridProduct {
  id: string;
  name: string;
  image: string;
  href: string;
}

/*
  13 Compact Category & Equipment Cards:
  Row 1 (7 tiles): Top row cards
  Row 2 (6 tiles): Bottom row cards, centered in between the top row cards
*/
const GRID_PRODUCTS: GridProduct[] = [
  /* ── Row 1 (7 Items) ── */
  {
    id: 'gp-dome',
    name: 'Dome Camera',
    image: '/products/cctv-dome-camera.jpg',
    href: '/categories?category=cctv-surveillance',
  },
  {
    id: 'gp-bullet',
    name: 'Bullet Camera',
    image: '/products/cctv-bullet-camera.jpg',
    href: '/categories?category=cctv-surveillance',
  },
  {
    id: 'gp-router',
    name: 'Wi-Fi 6 Router',
    image: '/products/enterprise-wifi-router.jpg',
    href: '/categories?category=routers-switches',
  },
  {
    id: 'gp-switch',
    name: 'Gigabit Switch',
    image: '/products/gigabit-network-switch.jpg',
    href: '/categories?category=networking-equipment',
  },
  {
    id: 'gp-cable',
    name: 'Patch Cable',
    image: '/products/cat6a-ethernet-cable.jpg',
    href: '/categories?category=cables-connectors',
  },
  {
    id: 'gp-storage',
    name: 'NAS Storage',
    image: '/products/nas-storage.jpg',
    href: '/categories?category=storage-devices',
  },
  {
    id: 'gp-accessories',
    name: 'Computer Accessories',
    image: '/products/computer-accessories.jpg',
    href: '/categories?category=computer-accessories',
  },

  /* ── Row 2 (6 Items) ── */
  {
    id: 'gp-cctv-kit',
    name: 'CCTV System Kit',
    image: '/products/cctv-system-kit.jpg',
    href: '/categories?category=cctv-surveillance',
  },
  {
    id: 'gp-ups',
    name: 'UPS System',
    image: '/products/ups-system.jpg',
    href: '/categories?category=power-supplies',
  },
  {
    id: 'gp-networking',
    name: 'Networking Equipment',
    image: '/hero/networking-equipment.jpg',
    href: '/categories?category=networking-equipment',
  },
  {
    id: 'gp-routers',
    name: 'Router & Switch',
    image: '/hero/routers-switches.jpg',
    href: '/categories?category=routers-switches',
  },
  {
    id: 'gp-cables',
    name: 'Cables & Connectors',
    image: '/hero/cables-connectors.jpg',
    href: '/categories?category=cables-connectors',
  },
  {
    id: 'gp-power',
    name: 'Power Supplies',
    image: '/hero/power-supplies.jpg',
    href: '/categories?category=power-supplies',
  },
];

const ROW_1_PRODUCTS = GRID_PRODUCTS.slice(0, 7);
const ROW_2_PRODUCTS = GRID_PRODUCTS.slice(7);

export const ProductGrid: React.FC = () => {
  return (
    <section id="categories" className="pg-section" aria-label="Equipment Catalogue Categories">
      <div className="pg-container">
        <div className="pg-staggered-wrap">
          {/* Top Row — 7 Cards */}
          <div className="pg-row pg-row-top">
            {ROW_1_PRODUCTS.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="pg-tile"
                title={`Browse ${p.name}`}
              >
                <div className="pg-tile-img-wrap">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="pg-tile-img"
                    loading="lazy"
                    width={220}
                    height={220}
                  />
                </div>
                <p className="pg-tile-name">{p.name}</p>
              </Link>
            ))}
          </div>

          {/* Bottom Row — 6 Cards, Centered Between Top Row Cards */}
          <div className="pg-row pg-row-bottom">
            {ROW_2_PRODUCTS.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="pg-tile"
                title={`Browse ${p.name}`}
              >
                <div className="pg-tile-img-wrap">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="pg-tile-img"
                    loading="lazy"
                    width={220}
                    height={220}
                  />
                </div>
                <p className="pg-tile-name">{p.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
