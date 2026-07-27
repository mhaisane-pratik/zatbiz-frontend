'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function ElectronicsLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="💻"
      defaultPrimaryColor="#6366f1"
      defaultCoverText="Next-Gen Computing & Devices"
      defaultCoverDescription="Connect and manage your hardware workspace nodes, spec listings, and track high-fidelity electronics orders."
    />
  );
}
