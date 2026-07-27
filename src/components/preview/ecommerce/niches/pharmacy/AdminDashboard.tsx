'use client';
import React from 'react';
import BaseAdminDashboard from '../BaseAdminDashboard';

export default function AdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="pharmacy"
      defaultPrimaryColor="#0d9488"
      defaultLogoIcon="💊"
    />
  );
}
