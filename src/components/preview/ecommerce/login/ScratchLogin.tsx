'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function ScratchLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="📦"
      defaultPrimaryColor="#6366f1"
      defaultCoverText="Bespoke Custom Storefront"
      defaultCoverDescription="Configure high-performance design schemas, manage personalized collections, and track purchase nodes."
    />
  );
}
