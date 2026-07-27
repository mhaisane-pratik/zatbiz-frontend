'use client';
import React from 'react';
import BaseAdminDashboard from './BaseAdminDashboard';

export default function PetAdminDashboard(props: any) {
  return (
    <BaseAdminDashboard
      {...props}
      defaultCategory="pet"
      defaultPrimaryColor="#d97706"
      defaultLogoIcon="🐕"
    />
  );
}
