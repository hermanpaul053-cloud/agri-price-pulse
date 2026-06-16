import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  TrendingUp, 
  MapPin, 
  MessageCircle 
} from 'lucide-react';
import { DashboardLayout } from './DashboardLayout';

const farmerNavItems = [
  { label: 'Market Prices', href: '/farmer', icon: LayoutDashboard },
  { label: 'Markets & Prices', href: '/farmer/markets', icon: Store },
  { label: 'Price Trends', href: '/farmer/trends', icon: TrendingUp },
  { label: 'Market Locations', href: '/farmer/locations', icon: MapPin },
  { label: 'Suggestions', href: '/farmer/suggestions', icon: MessageCircle },
];

export const FarmerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <DashboardLayout 
      navItems={farmerNavItems} 
      title="Farmer Dashboard" 
      userRole="farmer"
    >
      {children}
    </DashboardLayout>
  );
};
