'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function ScratchCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="scratch"
      defaultPrimaryColor="#6366f1"
      defaultLogoIcon="📦"
    />
  );
}
