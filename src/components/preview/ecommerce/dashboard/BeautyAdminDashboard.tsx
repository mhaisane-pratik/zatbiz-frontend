'use client';
import React from 'react';
import BaseAdminDashboard from './BaseAdminDashboard';

export default function BeautyAdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="beauty"
      defaultPrimaryColor="#ec4899"
      defaultLogoIcon="💄"
    />
  );
}
