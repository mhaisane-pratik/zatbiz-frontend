'use client';
import React from 'react';
import BaseCustomerDashboard from '../BaseCustomerDashboard';

export default function CustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="scratch"
      defaultPrimaryColor="#4f46e5"
      defaultLogoIcon="🛒"
    />
  );
}
