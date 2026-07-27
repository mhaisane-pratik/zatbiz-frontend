'use client';
import React from 'react';
import BaseAdminDashboard from './BaseAdminDashboard';

export default function FurnitureAdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="furniture"
      defaultPrimaryColor="#b45309"
      defaultLogoIcon="🛋️"
    />
  );
}
