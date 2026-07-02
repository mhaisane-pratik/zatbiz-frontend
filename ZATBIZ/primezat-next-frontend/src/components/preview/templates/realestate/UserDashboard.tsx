'use client';

import React from 'react';
import RealEstateDashboard from '../../dashboard/templates/RealEstateDashboard';
import { Project } from '@/types';

interface UserDashboardProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  setCompanyName?: (name: string) => void;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

export default function RealEstateUserDashboard({ setCompanyName, ...props }: UserDashboardProps) {
  return <RealEstateDashboard {...props} />;
}
