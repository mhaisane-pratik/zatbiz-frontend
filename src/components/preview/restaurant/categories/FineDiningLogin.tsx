'use client';

import React from 'react';
import { CategoryLoginProps } from './types';
import { CategoryLoginTemplate } from './CategoryLoginTemplate';

export function FineDiningLogin(props: CategoryLoginProps) {
  return (
    <CategoryLoginTemplate 
      {...props} 
      niche="Fine Dining" 
      themeColor="#c5a880" 
      img="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80" 
      desc="confirm your dining reservations, review sommelier recommendations, or preview tonight's chef menu." 
      emoji="⚜️" 
    />
  );
}
