'use client';

import React from 'react';
import { RestaurantDashboardProps } from './types';
import { CategoryDashboardTemplate } from './CategoryDashboardTemplate';

export function FastFoodDashboard(props: RestaurantDashboardProps) {
  return (
    <CategoryDashboardTemplate
      {...props}
      niche="fast food"
      primaryColor="#f97316"
      accentBg="bg-orange-50 text-orange-700 border-orange-100"
      emoji="🍔"
      metrics={[
        { title: 'Active Grills', value: '4 flat-tops active', desc: 'Avg cook temp 375F' },
        { title: 'Drive-Thru Lane', value: '9 min avg wait time', desc: '14 cars serviced last hour' },
        { title: 'Daily Specials Sold', value: '84 Smash Burgers', desc: 'Most popular dish today' }
      ]}
    />
  );
}
