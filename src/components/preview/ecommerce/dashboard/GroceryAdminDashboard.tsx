'use client';
import React from 'react';
import BaseAdminDashboard from './BaseAdminDashboard';

export default function GroceryAdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="grocery"
      defaultPrimaryColor="#10b981"
      defaultLogoIcon="🍎"
    />
  );
}
