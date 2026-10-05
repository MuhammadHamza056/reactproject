import { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface DashboardMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ComponentProps<typeof Ionicons>['name'];
  variant: 'primary' | 'success' | 'warning' | 'accent';
}

export interface RecentSale {
  id: string;
  sneakerName: string;
  sneakerSku: string;
  buyerName: string;
  buyerLocation: string;
  size: string;
  price: number;
  status: 'Completed' | 'Processing' | 'Shipped';
  timestamp: string;
  imageUrl: string;
}

export type TimeRange = '24h' | '7d' | '30d' | '90d' | 'YTD';
