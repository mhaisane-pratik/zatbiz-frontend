'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function PharmacyLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="⚕️"
      defaultPrimaryColor="#0284c7"
      defaultCoverText="Clinically Verified Health"
      defaultCoverDescription="Upload medical prescriptions safely, track Rx verification updates, and order pharmacy wellness nodes."
    />
  );
}
