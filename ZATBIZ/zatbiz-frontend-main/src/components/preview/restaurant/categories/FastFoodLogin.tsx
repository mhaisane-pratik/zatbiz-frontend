'use client';

import React from 'react';
import { CategoryLoginProps } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';

export function FastFoodLogin(props: CategoryLoginProps) {
  return (
    <CategoryLoginTemplate 
      {...props} 
      niche="Fast Food" 
      themeColor="#f97316" 
      img="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80" 
      desc="customize your double beef patties, track hot deliveries in real-time, and grab exclusive midnight coupon deals." 
      emoji="🍔" 
    />
  );
}
