'use client';
import React from 'react';
import BaseCustomerDashboard from './BaseCustomerDashboard';

export default function PetCustomerDashboard(props: any) {
  return (
    <BaseCustomerDashboard
      {...props}
      defaultCategory="pet"
      defaultPrimaryColor="#d97706"
      defaultLogoIcon="🐕"
    />
  );
}
