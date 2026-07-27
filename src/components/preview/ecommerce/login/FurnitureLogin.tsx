'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function FurnitureLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="🛋️"
      defaultPrimaryColor="#b45309"
      defaultCoverText="Scandinavian Modular Design"
      defaultCoverDescription="Configure your studio layouts, manage home furniture delivery, and save design catalogs to your profile."
    />
  );
}
