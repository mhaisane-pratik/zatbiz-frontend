'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function BeautyLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="💄"
      defaultPrimaryColor="#ec4899"
      defaultCoverText="Glow Cosmetics & Wellness"
      defaultCoverDescription="Track your premium skincare orders, view custom ingredient manifests, and save cosmetic wishlist configurations."
    />
  );
}
