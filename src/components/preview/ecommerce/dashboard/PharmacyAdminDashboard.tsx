'use client';
import React from 'react';
import BaseAdminDashboard from './BaseAdminDashboard';

export default function PharmacyAdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="pharmacy"
      defaultPrimaryColor="#0284c7"
      defaultLogoIcon="⚕️"
    />
  );
}
