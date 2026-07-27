'use client';
import React from 'react';
import BaseAdminDashboard from './BaseAdminDashboard';

export default function ScratchAdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="scratch"
      defaultPrimaryColor="#6366f1"
      defaultLogoIcon="📦"
    />
  );
}
