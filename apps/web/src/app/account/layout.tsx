import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { PortalBanner } from '../../components/PortalBanner';

const ACCOUNT_NAV_GROUPS = [
  {
    title: 'Customer Dashboard',
    items: [
      { label: 'Overview', href: '/account', icon: '📊' },
      { label: 'My Rentals', href: '/account/rentals', icon: '📦', badge: '2 Active' },
      { label: 'Saved Equipment', href: '/account/saved', icon: '❤️' },
    ],
  },
  {
    title: 'Account & Logistics',
    items: [
      { label: 'Delivery Addresses', href: '/account/addresses', icon: '📍' },
      { label: 'KYC & Documents', href: '/account/documents', icon: '📄' },
      { label: 'Notifications', href: '/account/notifications', icon: '🔔', badge: '3' },
      { label: 'Profile Settings', href: '/account/profile', icon: '👤' },
    ],
  },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-layout">
      <Sidebar
        portalType="Customer Portal"
        portalTitle="Vikram Verma"
        groups={ACCOUNT_NAV_GROUPS}
      />
      <div className="portal-content">
        <PortalBanner moduleName="Customer Account Portal" />
        {children}
      </div>
    </div>
  );
}
