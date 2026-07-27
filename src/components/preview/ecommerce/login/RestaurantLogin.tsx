'use client';
import React from 'react';
import BaseLogin from './BaseLogin';

export default function RestaurantLogin(props: any) {
  return (
    <BaseLogin
      {...props}
      defaultLogoIcon="🍔"
      defaultPrimaryColor="#ea580c"
      defaultCoverText="Culinary Masterpieces"
      defaultCoverDescription="Order hot gourmet pizzas, view chef recommendation menus, and track food delivery riders."
    />
  );
}
