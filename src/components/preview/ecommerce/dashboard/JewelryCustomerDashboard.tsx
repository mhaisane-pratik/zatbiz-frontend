'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function JewelryCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="jewelry"
      defaultPrimaryColor="#d97706"
      defaultLogoIcon="💍"
    />
  );
}
