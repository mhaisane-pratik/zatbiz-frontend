'use client';
import React from 'react';
import BaseAdminDashboard from '../BaseAdminDashboard';

export default function AdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="electronics"
      defaultPrimaryColor="#2563eb"
      defaultLogoIcon="💻"
    />
  );
}
