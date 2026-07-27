'use client';
import React from 'react';
import BaseCustomerDashboard from '../BaseCustomerDashboard';

export default function CustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="pet"
      defaultPrimaryColor="#f97316"
      defaultLogoIcon="🐶"
    />
  );
}
