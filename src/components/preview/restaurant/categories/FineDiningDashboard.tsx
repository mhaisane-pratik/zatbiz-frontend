'use client';

import React from 'react';
import { RestaurantDashboardProps } from './types';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function FineDiningDashboard(props: RestaurantDashboardProps) {
  return (
    <CategoryDashboardTemplate
      {...props}
      niche="fine dining"
      primaryColor="#c5a880"
      accentBg="bg-stone-900/30 text-[#c5a880] border-stone-800"
      emoji="⚜️"
      metrics={[
        { title: 'Caviar & Truffle Reserves', value: '18 tins white sturgeon', desc: 'Sourced from Caspian Sea' },
        { title: 'Sommelier cellar pairings', value: '142 premium vintages', desc: '98 pts Wine Spectator avg' },
        { title: 'Tasting tables booked', value: '8 VIP reservations', desc: '100% capacity tonight' }
      ]}
    />
  );
}
