'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import { api } from '@/services/api';

import GymAdminPanel from './GymAdminPanel';
import GymUserPanel from './GymUserPanel';

interface GymDashboardProps {
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

export default function GymDashboard({
  projectId,
  project,
  clientEmail,
  theme,
  onLogout,
  companyName,
  setCompanyName,
  logoIcon,
  logoUrl,
  shopNiche,
}: GymDashboardProps) {
  const [gymInfo, setGymInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.gym.get(projectId)
      .then((data) => {
        if (data && data.projectId) {
          setGymInfo(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-950 items-center justify-center text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Gym Details...</p>
        </div>
      </div>
    );
  }

  const activeThemeColor = gymInfo?.themeColor || theme?.color || '#ea580c';
  const activeCompanyName = gymInfo?.clubName || companyName;
  const activeNiche = gymInfo?.subcategory || shopNiche || 'Traditional Gym';
  const activeLogoUrl = gymInfo?.logoUrl || logoUrl;

  const activeTheme = {
    ...theme,
    color: activeThemeColor
  };

  const dashboardProps = {
    projectId,
    project,
    clientEmail,
    theme: activeTheme,
    onLogout,
    companyName: activeCompanyName,
    setCompanyName,
    logoIcon,
    logoUrl: activeLogoUrl,
    shopNiche: activeNiche
  };

  if (clientEmail === 'admin@gmail.com') {
    return <GymAdminPanel {...dashboardProps} />;
  }

  return <GymUserPanel {...dashboardProps} />;
}
