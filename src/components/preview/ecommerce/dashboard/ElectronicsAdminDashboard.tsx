'use client';
import React from 'react';
import BaseAdminDashboard from './BaseAdminDashboard';

export default function ElectronicsAdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="electronics"
      defaultPrimaryColor="#6366f1"
      defaultLogoIcon="💻"
    />
  );
}
