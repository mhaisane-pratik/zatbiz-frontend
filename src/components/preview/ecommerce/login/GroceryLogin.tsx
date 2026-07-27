'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function GroceryLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="🍎"
      defaultPrimaryColor="#10b981"
      defaultCoverText="Fresh Organic Market"
      defaultCoverDescription="Access your daily essentials baskets, schedule delivery slots, and track farm-fresh organic produce orders."
    />
  );
}
