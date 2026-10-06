import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { PortalBanner } from '../../components/PortalBanner';

const PARTNER_NAV_GROUPS = [
  {
    title: 'Referral Operations',
    items: [
      { label: 'Partner Dashboard', href: '/partner', icon: '📊' },
      { label: 'Referred Clients', href: '/partner/referrals', icon: '🤝', badge: '18 Total' },
      { label: 'Commission Earnings', href: '/partner/earnings', icon: '💰' },
    ],
  },
  {
    title: 'Settings',
    items: [{ label: 'Partner Profile', href: '/partner/profile', icon: '👤' }],
  },
];

export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-layout">
      <Sidebar
        portalType="Commercial Partner"
        portalTitle="Nexus B2B Agency"
        groups={PARTNER_NAV_GROUPS}
      />
      <div className="portal-content">
        <PortalBanner moduleName="Business Partner Portal" />
        {children}
      </div>
    </div>
  );
}
