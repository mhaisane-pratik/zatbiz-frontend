'use client';
import React from 'react';
import BaseCustomerDashboard from '../BaseCustomerDashboard';

export default function CustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="restaurant"
      defaultPrimaryColor="#dc2626"
      defaultLogoIcon="🍔"
    />
  );
}
