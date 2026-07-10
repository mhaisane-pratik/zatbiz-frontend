'use client';

import React from 'react';
import EventDashboard from '../../dashboard/templates/EventDashboard';
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
  selectedDashboardOption?: number;
}

export default function WeddingUserDashboard({ setCompanyName, ...props }: UserDashboardProps) {
  return <EventDashboard {...props} />;
}
