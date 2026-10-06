import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { PortalBanner } from '../../components/PortalBanner';

const ADMIN_NAV_GROUPS = [
  {
    title: 'Platform Control',
    items: [{ label: 'Admin Dashboard', href: '/admin', icon: '⚡' }],
  },
  {
    title: 'User Management',
    items: [
      { label: 'All Users', href: '/admin/users', icon: '👥' },
      { label: 'Customers', href: '/admin/customers', icon: '🛒' },
      { label: 'Product Owners', href: '/admin/owners', icon: '📦' },
      { label: 'Commercial Partners', href: '/admin/partners', icon: '🤝' },
      { label: 'Field Freelancers', href: '/admin/freelancers', icon: '🔧' },
    ],
  },
  {
    title: 'Catalogue Management',
    items: [
      { label: 'Categories', href: '/admin/categories', icon: '📑' },
      { label: 'Products Master', href: '/admin/products', icon: '🏷️' },
      { label: 'Physical Inventory', href: '/admin/inventory', icon: '🏭' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Active Rentals', href: '/admin/rentals', icon: '⏱️' },
      { label: 'Booking Orders', href: '/admin/orders', icon: '📋' },
      { label: 'Customer Enquiries', href: '/admin/enquiries', icon: '💬' },
    ],
  },
  {
    title: 'Locations & Logistics',
    items: [
      { label: 'Fulfillment Locations', href: '/admin/locations', icon: '📍' },
      { label: 'Regional Offices', href: '/admin/offices', icon: '🏢' },
    ],
  },
  {
    title: 'Recruitment',
    items: [
      { label: 'Job Postings', href: '/admin/jobs', icon: '💼' },
      { label: 'Applications', href: '/admin/applications', icon: '📄' },
    ],
  },
  {
    title: 'Business & Analytics',
    items: [
      { label: 'Referrals & Affiliates', href: '/admin/referrals', icon: '🔗' },
      { label: 'Financial Reports', href: '/admin/reports', icon: '📈' },
    ],
  },
  {
    title: 'System',
    items: [{ label: 'Platform Settings', href: '/admin/settings', icon: '⚙️' }],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="portal-layout">
      <Sidebar
        portalType="Super Administrator"
        portalTitle="Central Control Console"
        groups={ADMIN_NAV_GROUPS}
      />
      <div className="portal-content">
        <PortalBanner moduleName="Super Admin Operating Console" />
        {children}
      </div>
    </div>
  );
}
