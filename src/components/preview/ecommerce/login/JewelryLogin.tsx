'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function JewelryLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="💍"
      defaultPrimaryColor="#d97706"
      defaultCoverText="Exquisite Carat Index"
      defaultCoverDescription="Verify your GIA diamond certificates, track custom gold atelier orders, and view luxury chronographs."
    />
  );
}
