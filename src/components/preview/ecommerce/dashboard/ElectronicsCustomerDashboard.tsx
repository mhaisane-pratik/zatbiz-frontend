'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function ElectronicsCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="electronics"
      defaultPrimaryColor="#6366f1"
      defaultLogoIcon="💻"
    />
  );
}
