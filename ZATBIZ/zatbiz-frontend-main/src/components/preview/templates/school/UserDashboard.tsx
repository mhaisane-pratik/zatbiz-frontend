'use client';

import React from 'react';
import SchoolDashboard from '../../dashboard/templates/SchoolDashboard';
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

export default function SchoolUserDashboard(props: UserDashboardProps) {
  return <SchoolDashboard {...props} />;
}
