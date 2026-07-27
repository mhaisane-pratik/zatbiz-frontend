'use client';
import React from 'react';
import BaseAdminDashboard from '../BaseAdminDashboard';

export default function AdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="restaurant"
      defaultPrimaryColor="#dc2626"
      defaultLogoIcon="🍔"
    />
  );
}
