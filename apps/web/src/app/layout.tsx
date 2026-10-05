import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Rental Platform — Rent Anything, Anytime',
    template: '%s | Rental Platform',
  },
  description:
    'One-stop rental marketplace. Rent power equipment, electronics, vehicles, tools, event equipment and more.',
  keywords: ['rental', 'rent', 'equipment rental', 'power rental', 'electronics rental'],
  authors: [{ name: 'Rental Platform' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Rental Platform',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans antialiased">
        {/* Providers (QueryClient, Auth, Theme) will be added in Phase 3 & 5 */}
        {children}
      </body>
    </html>
  );
}
