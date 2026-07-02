'use client';

import React from 'react';
import { FineDiningLogin } from '../../restaurant/categories/FineDiningLogin';
import { FastFoodLogin } from '../../restaurant/categories/FastFoodLogin';
import { PizzaCategoryLogin } from '../../restaurant/categories/PizzaCategory';
import { IndianCategoryLogin } from '../../restaurant/categories/IndianCategory';
import { CafeCategoryLogin } from '../../restaurant/categories/CafeCategory';
import { BakeryCategoryLogin } from '../../restaurant/categories/BakeryCategory';
import { ChineseCategoryLogin } from '../../restaurant/categories/ChineseCategory';
import { VeganCategoryLogin } from '../../restaurant/categories/VeganCategory';
import { GeneralCategoryLogin } from '../../restaurant/categories/GeneralCategory';

interface RestaurantLoginProps {
  projectId: number;
  isSignUp: boolean;
  setIsSignUp: (s: boolean) => void;
  companyName: string;
  logoUrl: string;
  logoIcon: string;
  themePreset: string;
  errorMessage: string;
  successMessage: string;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  shopNiche: string | null;
}

export default function RestaurantLogin(props: RestaurantLoginProps) {
  const catLower = (props.shopNiche || '').toLowerCase();
  const loginProps = {
    projectId: props.projectId,
    isSignUp: props.isSignUp,
    setIsSignUp: props.setIsSignUp,
    companyName: props.companyName,
    logoUrl: props.logoUrl,
    logoIcon: props.logoIcon,
    themePreset: props.themePreset,
    errorMessage: props.errorMessage,
    successMessage: props.successMessage,
    handleLoginSubmit: props.handleLoginSubmit,
  };

  if (catLower.includes('fine dining') || catLower.includes('dining')) {
    return <FineDiningLogin {...loginProps} />;
  }
  if (catLower.includes('fast food') || catLower.includes('burger')) {
    return <FastFoodLogin {...loginProps} />;
  }
  if (catLower.includes('pizza')) {
    return <PizzaCategoryLogin {...loginProps} />;
  }
  if (
    catLower.includes('indian') ||
    catLower.includes('punjabi') ||
    catLower.includes('biryani') ||
    catLower.includes('tandoori') ||
    catLower.includes('south indian')
  ) {
    return <IndianCategoryLogin {...loginProps} />;
  }
  if (
    catLower.includes('cafe') ||
    catLower.includes('coffee') ||
    catLower.includes('tea') ||
    catLower.includes('roastery')
  ) {
    return <CafeCategoryLogin {...loginProps} />;
  }
  if (
    catLower.includes('bakery') ||
    catLower.includes('cake') ||
    catLower.includes('bread') ||
    catLower.includes('pastry')
  ) {
    return <BakeryCategoryLogin {...loginProps} />;
  }
  if (
    catLower.includes('chinese') ||
    catLower.includes('momo') ||
    catLower.includes('asian') ||
    catLower.includes('thai') ||
    catLower.includes('japanese')
  ) {
    return <ChineseCategoryLogin {...loginProps} />;
  }
  if (
    catLower.includes('vegan') ||
    catLower.includes('vegetarian') ||
    catLower.includes('healthy') ||
    catLower.includes('salad') ||
    catLower.includes('organic')
  ) {
    return <VeganCategoryLogin {...loginProps} />;
  }

  return <GeneralCategoryLogin {...loginProps} />;
}
