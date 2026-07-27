'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function GroceryCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="grocery"
      defaultPrimaryColor="#10b981"
      defaultLogoIcon="🍎"
    />
  );
}
