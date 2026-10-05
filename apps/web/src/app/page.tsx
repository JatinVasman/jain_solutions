import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Rent power equipment, electronics, vehicles and more — all from one platform.',
};

/**
 * Public home page.
 * Full implementation in Phase 5 (Catalogue UI).
 */
export default function HomePage() {
  return (
    <main>
      <p>
        {/* Home page content will be implemented in Phase 5 */}
        Platform scaffold is operational.
      </p>
    </main>
  );
}
