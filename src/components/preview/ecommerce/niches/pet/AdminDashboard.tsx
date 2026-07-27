'use client';
import React from 'react';
import BaseAdminDashboard from '../BaseAdminDashboard';

export default function AdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="pet"
      defaultPrimaryColor="#f97316"
      defaultLogoIcon="🐶"
    />
  );
}
