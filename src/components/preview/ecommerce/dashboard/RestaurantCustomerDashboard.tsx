'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function RestaurantCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="restaurant"
      defaultPrimaryColor="#ea580c"
      defaultLogoIcon="🍔"
    />
  );
}
