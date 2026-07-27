'use client';

import React from 'react';
import MedicalShopAdminPanel from '../../dashboard/templates/MedicalShopAdminPanel';
import { Project } from '@/types';

interface AdminDashboardProps {
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

export default function MedicalShopAdminDashboard(props: AdminDashboardProps) {
  return <MedicalShopAdminPanel {...props} />;
}
