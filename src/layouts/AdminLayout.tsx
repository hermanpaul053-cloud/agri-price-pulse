import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Leaf, 
  BarChart3, 
  History, 
  MessageSquare 
} from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';

const adminNavItems = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Manage Users', href: '/admin/users', icon: Users },
  { label: 'Manage Markets', href: '/admin/markets', icon: Store },
  { label: 'Manage Crops', href: '/admin/crops', icon: Leaf },
  { label: 'Crop Prices', href: '/admin/prices', icon: BarChart3 },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Audit Logs', href: '/admin/logs', icon: History },
  { label: 'User Feedback', href: '/admin/feedback', icon: MessageSquare },
];

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DashboardLayout 
      navItems={adminNavItems} 
      title="Admin Dashboard" 
      userRole="admin"
    >
      {children}
    </DashboardLayout>
  );
};
