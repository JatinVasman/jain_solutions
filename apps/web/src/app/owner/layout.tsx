import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { PortalBanner } from '../../components/PortalBanner';

const OWNER_NAV_GROUPS = [
  {
    title: 'Asset Operations',
    items: [
      { label: 'Owner Overview', href: '/owner', icon: '📊' },
      { label: 'Listed Products', href: '/owner/products', icon: '📦', badge: '12' },
      { label: '+ Add Equipment', href: '/owner/products/new', icon: '➕' },
      { label: 'Inventory Units', href: '/owner/inventory', icon: '🏷️' },
    ],
  },
  {
    title: 'Business & Finances',
    items: [
      { label: 'Rental Requests', href: '/owner/rentals', icon: '📑', badge: '3 Pending' },
      { label: 'Earnings & Payouts', href: '/owner/earnings', icon: '💰' },
      { label: 'Supplier Profile', href: '/owner/profile', icon: '🏢' },
    ],
  },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-layout">
      <Sidebar
        portalType="Supplier / Owner Portal"
        portalTitle="Apex Power & Fleet"
        groups={OWNER_NAV_GROUPS}
      />
      <div className="portal-content">
        <PortalBanner moduleName="Product Owner Portal" />
        {children}
      </div>
    </div>
  );
}
