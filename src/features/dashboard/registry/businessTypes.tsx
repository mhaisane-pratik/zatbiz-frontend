'use client';

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

/**
 * Business-type registry.
 *
 * WHY THIS EXISTS (decoupling):
 * app/dashboard/page.tsx used to statically import ~10 selector modals + setup
 * forms and branch on a giant switch. Adding one business type meant editing the
 * dashboard page AND api.ts AND the offline handler AND adding a modal — four
 * files changing together (shotgun surgery).
 *
 * With this registry, a business type is ONE entry. The dashboard renders
 * generically from BUSINESS_TYPES; adding "salon" is a single object, no edits
 * to the dashboard page. Modals load lazily (next/dynamic) so the dashboard
 * bundle no longer pulls in every business type up front.
 *
 * The import paths below use the CURRENT locations so this file compiles today.
 * scripts/restructure.mjs rewrites them to '@/features/dashboard/components/...'
 * during the migration, along with every other import.
 *
 * HOW TO ADOPT (see ARCHITECTURE.md → "Killing the dashboard god-page"):
 *   const entry = getBusinessType(activeType);
 *   {entry?.SelectorModal && <entry.SelectorModal {...props} />}
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = ComponentType<any>;

export interface BusinessTypeConfig {
  /** Stable id used in URLs, storage and the backend. */
  id: string;
  /** Human label shown in the dashboard. */
  label: string;
  /** Optional grouping for the category filter. */
  category?: 'commerce' | 'services' | 'hospitality' | 'events' | 'other';
  /** Template selector modal (lazy-loaded). */
  SelectorModal?: AnyComponent;
  /** Optional setup/config form (lazy-loaded). */
  SetupForm?: AnyComponent;
}

export const BUSINESS_TYPES: BusinessTypeConfig[] = [
  {
    id: 'ecommerce',
    label: 'E-commerce Store',
    category: 'commerce',
    SelectorModal: dynamic(() => import('@/components/dashboard/EcommerceSelectorModal')),
    SetupForm: dynamic(() => import('@/components/dashboard/EcommerceSetupForm')),
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    category: 'hospitality',
    SelectorModal: dynamic(() => import('@/components/dashboard/RestaurantSelectorModal')),
  },
  {
    id: 'gym',
    label: 'Gym / Fitness',
    category: 'services',
    SelectorModal: dynamic(() => import('@/components/dashboard/GymSelectorModal')),
    SetupForm: dynamic(() => import('@/components/dashboard/GymSetupForm')),
  },
  {
    id: 'hospital',
    label: 'Hospital / Clinic',
    category: 'services',
    SelectorModal: dynamic(() => import('@/components/dashboard/HospitalSelectorModal')),
  },
  {
    id: 'travel',
    label: 'Travel Agency',
    category: 'services',
    SelectorModal: dynamic(() => import('@/components/dashboard/TravelSelectorModal')),
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    category: 'services',
    SelectorModal: dynamic(() => import('@/components/dashboard/RealEstateSelectorModal')),
  },
  {
    id: 'wedding',
    label: 'Wedding',
    category: 'events',
    SelectorModal: dynamic(() => import('@/components/dashboard/WeddingSelectorModal')),
  },
  {
    id: 'medical-shop',
    label: 'Medical Shop / Pharmacy',
    category: 'commerce',
    SelectorModal: dynamic(() => import('@/components/dashboard/MedicalShopSelectorModal')),
  },
  {
    id: 'scratch',
    label: 'Start from Scratch',
    category: 'other',
    SelectorModal: dynamic(() => import('@/components/dashboard/ScratchSelectorModal')),
  },
];

const BY_ID: Record<string, BusinessTypeConfig> = Object.fromEntries(
  BUSINESS_TYPES.map((b) => [b.id, b]),
);

export function getBusinessType(id: string): BusinessTypeConfig | undefined {
  return BY_ID[id];
}
