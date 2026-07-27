'use client';
import React from 'react';
import BaseAdminDashboard from '../BaseAdminDashboard';

export default function AdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="scratch"
      defaultPrimaryColor="#4f46e5"
      defaultLogoIcon="🛒"
    />
  );
}
