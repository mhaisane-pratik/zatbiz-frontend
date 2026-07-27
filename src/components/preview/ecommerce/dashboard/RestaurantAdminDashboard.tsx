'use client';
import React from 'react';
import BaseAdminDashboard from './BaseAdminDashboard';

export default function RestaurantAdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="restaurant"
      defaultPrimaryColor="#ea580c"
      defaultLogoIcon="🍔"
    />
  );
}
