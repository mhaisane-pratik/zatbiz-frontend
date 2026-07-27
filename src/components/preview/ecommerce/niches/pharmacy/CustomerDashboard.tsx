'use client';
import React from 'react';
import BaseCustomerDashboard from '../BaseCustomerDashboard';

export default function CustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="pharmacy"
      defaultPrimaryColor="#0d9488"
      defaultLogoIcon="💊"
    />
  );
}
