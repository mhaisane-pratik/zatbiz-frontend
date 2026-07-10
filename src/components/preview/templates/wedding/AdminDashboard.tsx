'use client';

import React from 'react';
import EventDashboard from '../../dashboard/templates/EventDashboard';
import { Project } from '@/types';

interface AdminDashboardProps {
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

export default function WeddingAdminDashboard({ setCompanyName, ...props }: AdminDashboardProps) {
  return <EventDashboard {...props} />;
}
