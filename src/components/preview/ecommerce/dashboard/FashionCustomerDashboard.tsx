'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function FashionCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="fashion"
      defaultPrimaryColor="#6366f1"
      defaultLogoIcon="👗"
    />
  );
}
