'use client';

import React from 'react';
import EcommerceDashboard from '../../dashboard/templates/EcommerceDashboard';
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

export default function StorefrontUserDashboard(props: UserDashboardProps) {
  return <EcommerceDashboard {...props} />;
}
