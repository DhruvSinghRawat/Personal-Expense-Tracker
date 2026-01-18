/**
 * data.js
 * Contains static configuration data used across the application.
 * This file defines sidebar menu items in a clean, scalable way.
 */

import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
} from 'react-icons/lu';
import { HiLogout } from 'react-icons/hi';

/**
 * SideMenuData
 * Defines sidebar navigation items.
 * Each object represents one menu entry.
 */
export const SideMenuData = [
  {
    id: '01', // Unique identifier
    label: 'Dashboard', // Text shown in sidebar
    icon: LuLayoutDashboard, // Icon component
    path: '/dashboard', // Route path
  },
  {
    id: '02',
    label: 'Income',
    icon: LuWalletMinimal,
    path: '/income',
  },
  {
    id: '03',
    label: 'Expense',
    icon: LuHandCoins,
    path: '/expense',
  },
  {
    id: '06',
    label: 'Logout',
    icon: HiLogout,
    path: '/logout',
  },
];
