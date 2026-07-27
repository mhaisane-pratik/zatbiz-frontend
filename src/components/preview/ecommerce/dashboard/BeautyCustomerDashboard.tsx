'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function BeautyCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="beauty"
      defaultPrimaryColor="#ec4899"
      defaultLogoIcon="💄"
    />
  );
}
