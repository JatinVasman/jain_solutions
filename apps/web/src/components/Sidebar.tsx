'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface NavGroup {
  title?: string;
  items: NavItem[];
}

export interface SidebarProps {
  portalType: string;
  portalTitle: string;
  groups: NavGroup[];
}

export const Sidebar: React.FC<SidebarProps> = ({ portalType, portalTitle, groups }) => {
  const pathname = usePathname();

  return (
    <aside className="portal-sidebar" aria-label={`${portalTitle} Sidebar`}>
      <div className="portal-brand">
        <span className="portal-type-title">{portalType}</span>
        <h3 className="portal-user-name">{portalTitle}</h3>
      </div>

      <nav>
        {groups.map((group, groupIdx) => (
          <div key={groupIdx} className="portal-nav-group">
            {group.title && <h4 className="portal-nav-group-title">{group.title}</h4>}
            <ul className="portal-nav-list">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className={`portal-nav-item ${isActive ? 'active' : ''}`}>
                    <Link href={item.href}>
                      {item.icon && <span aria-hidden="true">{item.icon}</span>}
                      <span>{item.label}</span>
                      {item.badge && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontSize: '0.75rem',
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '0.1rem 0.4rem',
                            borderRadius: '4px',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};
