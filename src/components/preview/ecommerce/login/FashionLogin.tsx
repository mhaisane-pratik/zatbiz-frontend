'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function FashionLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="👗"
      defaultPrimaryColor="#6366f1"
      defaultCoverText="The Fashion House"
      defaultCoverDescription="Access your orders, track shipment manifests, save configurations, and discover high-end curated collections."
    />
  );
}
