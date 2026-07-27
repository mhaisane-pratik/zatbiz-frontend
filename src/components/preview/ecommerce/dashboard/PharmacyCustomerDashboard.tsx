'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function PharmacyCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="pharmacy"
      defaultPrimaryColor="#0284c7"
      defaultLogoIcon="⚕️"
    />
  );
}
