'use client';
import React from 'react';
import BaseAdminDashboard from '../BaseAdminDashboard';

export default function AdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="jewelry"
      defaultPrimaryColor="#d97706"
      defaultLogoIcon="💎"
    />
  );
}
