'use client';

import React from 'react';
import MedicalShopUserPanel from '../../dashboard/templates/MedicalShopUserPanel';
import { Project } from '@/types';

interface UserDashboardProps {
  projectId: number;
  project: Project;
  clientEmail: string;
  theme: any;
  onLogout: () => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  logoIcon: string;
  logoUrl: string;
  shopNiche: string | null;
}

export default function MedicalShopUserDashboard(props: UserDashboardProps) {
  return <MedicalShopUserPanel {...props} />;
}
