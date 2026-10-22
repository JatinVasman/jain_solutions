import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AuthProvider } from '../context/auth-context';

export const metadata: Metadata = {
  title: {
    template: '%s | Jain Solutions',
    default: 'Jain Solutions — One stop for all your needs',
  },
  description:
    'Jain Solutions: One stop for all your needs. Multi-category rental marketplace for power equipment, electronics, cameras, vehicles, machinery, and tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <div className="main-content">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
