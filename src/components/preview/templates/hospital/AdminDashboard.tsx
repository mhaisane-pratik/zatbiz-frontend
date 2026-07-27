'use client';

import React from 'react';
import HospitalDashboard from '../../dashboard/templates/HospitalDashboard';
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

export default function HospitalAdminDashboard(props: AdminDashboardProps) {
  return <HospitalDashboard {...props} />;
}
