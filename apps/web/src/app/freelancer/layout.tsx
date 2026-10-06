import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { PortalBanner } from '../../components/PortalBanner';

const FREELANCER_NAV_GROUPS = [
  {
    title: 'Field Operations',
    items: [
      { label: 'Work Dashboard', href: '/freelancer', icon: '📊' },
      { label: 'Assigned Field Tasks', href: '/freelancer/tasks', icon: '🔧', badge: '3 Pending' },
    ],
  },
  {
    title: 'Account & Credentials',
    items: [{ label: 'Technician Profile', href: '/freelancer/profile', icon: '👤' }],
  },
];

export default function FreelancerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-layout">
      <Sidebar
        portalType="Field Specialist"
        portalTitle="Ramesh Kumar (Tech #402)"
        groups={FREELANCER_NAV_GROUPS}
      />
      <div className="portal-content">
        <PortalBanner moduleName="Freelancer & Field Tech Portal" />
        {children}
      </div>
    </div>
  );
}
