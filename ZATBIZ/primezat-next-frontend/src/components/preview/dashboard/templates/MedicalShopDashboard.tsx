'use client';

import React from 'react';
import { Project } from '@/types';
import MedicalShopAdminPanel from './MedicalShopAdminPanel';
import MedicalShopUserPanel from './MedicalShopUserPanel';

interface MedicalShopDashboardProps {
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

export default function MedicalShopDashboard({
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
}: MedicalShopDashboardProps) {
  if (clientEmail === 'admin@gmail.com') {
    return (
      <MedicalShopAdminPanel
        projectId={projectId}
        project={project}
        clientEmail={clientEmail}
        theme={theme}
        onLogout={onLogout}
        companyName={companyName}
        logoIcon={logoIcon}
        logoUrl={logoUrl}
      />
    );
  }

  return (
    <MedicalShopUserPanel
      projectId={projectId}
      project={project}
      clientEmail={clientEmail}
      theme={theme}
      onLogout={onLogout}
      companyName={companyName}
      setCompanyName={setCompanyName}
      logoIcon={logoIcon}
      logoUrl={logoUrl}
      shopNiche={shopNiche}
    />
  );
}
