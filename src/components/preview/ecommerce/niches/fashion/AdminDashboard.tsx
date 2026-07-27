'use client';
import React from 'react';
import BaseAdminDashboard from '../BaseAdminDashboard';

export default function AdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="fashion"
      defaultPrimaryColor="#6366f1"
      defaultLogoIcon="👗"
    />
  );
}
