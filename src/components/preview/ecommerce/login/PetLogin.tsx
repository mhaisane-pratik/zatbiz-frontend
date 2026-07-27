'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function PetLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="🐕"
      defaultPrimaryColor="#d97706"
      defaultCoverText="Happy Pets Guarantee"
      defaultCoverDescription="Access premium pet dry foods, veterinary supplies catalogues, and manage order tracking schedules."
    />
  );
}
