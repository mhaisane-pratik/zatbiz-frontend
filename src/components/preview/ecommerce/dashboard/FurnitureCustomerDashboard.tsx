'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function FurnitureCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="furniture"
      defaultPrimaryColor="#b45309"
      defaultLogoIcon="🛋️"
    />
  );
}
