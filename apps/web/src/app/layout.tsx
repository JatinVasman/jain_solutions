import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Rental Marketplace',
    default: 'Rental Marketplace — You Need It. We Can Get It.',
  },
  description:
    'One-stop multi-category rental marketplace for power equipment, electronics, cameras, vehicles, machinery, and tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
