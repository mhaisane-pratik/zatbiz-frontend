'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Project } from '@/types';

import RestaurantDashboard from '@/components/preview/dashboard/templates/RestaurantDashboard';
import HospitalDashboard from '@/components/preview/dashboard/templates/HospitalDashboard';
import SchoolDashboard from '@/components/preview/dashboard/templates/SchoolDashboard';
import RealEstateDashboard from '@/components/preview/dashboard/templates/RealEstateDashboard';
import EcommerceDashboard from '@/components/preview/dashboard/templates/EcommerceDashboard';
import EventDashboard from '@/components/preview/dashboard/templates/EventDashboard';
import MedicalShopDashboard from '@/components/preview/dashboard/templates/MedicalShopDashboard';
import GymDashboard from '@/components/preview/dashboard/templates/GymDashboard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UserWebsiteDashboardPage({ params }: PageProps) {
  const { id: projectIdStr } = use(params);
  const projectId = parseInt(projectIdStr, 10);
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [clientEmail, setClientEmail] = useState<string | null>(null);
  const [logoIcon, setLogoIcon] = useState('📦');
  const [logoUrl, setLogoUrl] = useState('');
  const [companyName, setCompanyName] = useState('My Brand');
  const [shopNiche, setShopNiche] = useState<string | null>(null);
  const [templateId, setTemplateId] = useState<string>('storefront');
  const [themeName, setThemeName] = useState('slate');
  const [selectedDashboardOption, setSelectedDashboardOption] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // Dynamic theme colors
  const themeStyles: Record<string, any> = {
    emerald: {
      accentText: 'text-emerald-600',
      accentBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      primaryBtn: 'bg-emerald-600 hover:bg-emerald-750 text-white',
      gradientBanner: 'from-emerald-800 via-teal-900 to-slate-900',
      activeTabBg: 'bg-emerald-50 text-emerald-700',
      activeTabBorder: 'border-l-4 border-emerald-500',
    },
    deepblue: {
      accentText: 'text-indigo-600',
      accentBg: 'bg-indigo-50 text-indigo-705 border-indigo-100',
      primaryBtn: 'bg-indigo-600 hover:bg-indigo-750 text-white',
      gradientBanner: 'from-indigo-900 via-blue-900 to-slate-900',
      activeTabBg: 'bg-indigo-50 text-indigo-700',
      activeTabBorder: 'border-l-4 border-indigo-500',
    },
    purple: {
      accentText: 'text-amber-600',
      accentBg: 'bg-amber-50 text-amber-707 border-amber-100',
      primaryBtn: 'bg-amber-600 hover:bg-amber-750 text-white',
      gradientBanner: 'from-amber-800 via-amber-900 to-slate-900',
      activeTabBg: 'bg-amber-50 text-amber-707',
      activeTabBorder: 'border-l-4 border-amber-500',
    },
    sunset: {
      accentText: 'text-orange-600',
      accentBg: 'bg-orange-50 text-orange-707 border-orange-100',
      primaryBtn: 'bg-orange-600 hover:bg-orange-750 text-white',
      gradientBanner: 'from-orange-800 via-red-900 to-slate-900',
      activeTabBg: 'bg-orange-50 text-orange-707',
      activeTabBorder: 'border-l-4 border-orange-500',
    },
    slate: {
      accentText: 'text-slate-605',
      accentBg: 'bg-slate-50 text-slate-700 border-slate-100',
      primaryBtn: 'bg-slate-700 hover:bg-slate-850 text-white',
      gradientBanner: 'from-slate-800 via-zinc-900 to-slate-900',
      activeTabBg: 'bg-slate-50 text-slate-700',
      activeTabBorder: 'border-l-4 border-slate-500',
    },
  };

  useEffect(() => {
    if (isNaN(projectId)) return;

    const email = localStorage.getItem('clientEmail');
    if (!email) {
      router.push(`/preview/${projectId}/login`);
      return;
    }
    setClientEmail(email);

    // Fetch project and configurations
    api.projects.get(projectId)
      .then(async (projectData) => {
        setProject(projectData);
        setCompanyName(projectData.name);

        try {
          const parsed = JSON.parse(projectData.blocksJson || '[]');
          const blocks = Array.isArray(parsed) ? parsed : (Object.values(parsed.pages || {}).flat() as any[]);

          // Retrieve logo & brand details
          const headerBlock = blocks.find((b: any) => b.type === 'header');
          if (headerBlock?.content) {
            if (headerBlock.content.logoIcon) setLogoIcon(headerBlock.content.logoIcon);
            if (headerBlock.content.logoUrl) setLogoUrl(headerBlock.content.logoUrl);
            if (headerBlock.content.companyName) setCompanyName(headerBlock.content.companyName);
          }

          // Retrieve config (self-healing for all templates structure layouts)
          let config: any = {};
          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            config = parsed.businessConfig || {};
          } else if (Array.isArray(parsed)) {
            const bizBlock = parsed.find((b: any) => b.type === 'business_config');
            config = bizBlock?.content || {};
          }

          if ((!config.shopNiche || !config.businessType) && parsed && typeof parsed === 'object' && !Array.isArray(parsed) && parsed.pages) {
            for (const pageName of Object.keys(parsed.pages)) {
              const bizBlock = parsed.pages[pageName]?.find((b: any) => b.type === 'business_config');
              if (bizBlock?.content) {
                config = { ...config, ...bizBlock.content };
                break;
              }
            }
          }

          const activeNiche = config.shopNiche || null;
          setShopNiche(activeNiche);

          const loginBlock = blocks.find((b: any) => b.type === 'login_config');
          if (loginBlock?.theme) {
            setThemeName(loginBlock.theme);
          }

          const dashboardBlock = blocks.find((b: any) => b.type === 'dashboard_config');
          if (dashboardBlock?.content?.selectedDashboardOption) {
            setSelectedDashboardOption(Number(dashboardBlock.content.selectedDashboardOption));
          } else if (config.weddingDashboardOption) {
            setSelectedDashboardOption(Number(config.weddingDashboardOption));
          }

          // Detect template type
          let detectedTemplate = 'storefront';

          // Check real estate database state
          const isRealEstate = blocks.some((b: any) =>
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('agent')) ||
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('broker')) ||
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('realty')) ||
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
            (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('realty')) ||
            (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('real estate')) ||
            (b.type === 'hero' && b.content?.title?.toLowerCase().includes('properties')) ||
            (b.type === 'hero' && b.content?.btn1Text?.toLowerCase().includes('property'))
          ) ||
          projectData.name?.toLowerCase().includes('real estate') ||
          projectData.name?.toLowerCase().includes('properties') ||
          projectData.name?.toLowerCase().includes('realty') ||
          projectData.description?.toLowerCase().includes('real estate') ||
          projectData.description?.toLowerCase().includes('properties');


          const isRest = config.businessType === 'restaurant' ||
                         projectData.name?.toLowerCase().includes('restaurant') ||
                         projectData.description?.toLowerCase().includes('restaurant') ||
                         blocks.some((b: any) => b.type === 'pricing' && b.content?.title?.toLowerCase().includes('chef')) ||
                         blocks.some((b: any) => b.type === 'login_config' && b.content?.title?.toLowerCase().includes('restaurant'));

          const isClinic = blocks.some((b: any) =>
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('medical')) ||
            (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('clinic')) ||
            (b.type === 'features' && b.content?.title?.toLowerCase().includes('department'))
          );

          const isSchool = blocks.some((b: any) =>
            (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('academic')) ||
            (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('school')) ||
            (b.type === 'pricing' && b.content?.title?.toLowerCase().includes('tuition'))
          );

          const isWedding = config.businessType === 'wedding' ||
                            config.businessType === 'event' ||
                            projectData.name?.toLowerCase().includes('wedding') ||
                            projectData.name?.toLowerCase().includes('event') ||
                            projectData.name?.toLowerCase().includes('planner') ||
                            projectData.name?.toLowerCase().includes('birthday') ||
                            projectData.name?.toLowerCase().includes('marriage') ||
                            projectData.name?.toLowerCase().includes('party') ||
                            projectData.name?.toLowerCase().includes('celebration') ||
                            projectData.name?.toLowerCase().includes('ceremony') ||
                            projectData.name?.toLowerCase().includes('banquet') ||
                            projectData.name?.toLowerCase().includes('anniversary') ||
                            projectData.description?.toLowerCase().includes('wedding') ||
                            projectData.description?.toLowerCase().includes('event') ||
                            projectData.description?.toLowerCase().includes('planner') ||
                            projectData.description?.toLowerCase().includes('birthday') ||
                            projectData.description?.toLowerCase().includes('party') ||
                            projectData.description?.toLowerCase().includes('celebration') ||
                            blocks.some((b: any) =>
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('event')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                              (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('birthday')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('wedding')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('event')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('planner')) ||
                              (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('birthday'))
                            );

           const isMedicalShop = blocks.some((b: any) =>
             (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('medical shop')) ||
             (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('pharmacy')) ||
             (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('apothecary')) ||
             (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('pharmacy')) ||
             (b.type === 'business_config' && (b.content?.businessType === 'medical-shop' || b.content?.shopNiche === 'medical-shop'))
           ) ||
           projectData.name?.toLowerCase().includes('medical shop') ||
           projectData.name?.toLowerCase().includes('pharmacy') ||
           projectData.description?.toLowerCase().includes('medical shop') ||
           projectData.description?.toLowerCase().includes('pharmacy');

           const isGym = blocks.some((b: any) =>
             (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('gym')) ||
             (b.type === 'login_config' && b.content?.title?.toLowerCase().includes('fitness')) ||
             (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('gym')) ||
             (b.type === 'dashboard_config' && b.content?.title?.toLowerCase().includes('fitness')) ||
             (b.type === 'business_config' && (b.content?.businessType === 'gym' || b.content?.shopNiche === 'gym'))
           ) ||
           projectData.name?.toLowerCase().includes('gym') ||
           projectData.name?.toLowerCase().includes('fitness') ||
           projectData.description?.toLowerCase().includes('gym') ||
           projectData.description?.toLowerCase().includes('fitness');

           if (isMedicalShop) {
             detectedTemplate = 'medical-shop';
           } else if (isRealEstate) {
            detectedTemplate = 'realestate';
          } else if (isRest) {
            detectedTemplate = 'restaurant';
          } else if (isClinic) {
            detectedTemplate = 'clinic';
          } else if (isSchool) {
            detectedTemplate = 'school';
          } else if (isWedding) {
            detectedTemplate = 'wedding';
          } else if (isGym) {
            detectedTemplate = 'gym';
          }

          setTemplateId(detectedTemplate);
        } catch (err) {
          console.error('Error parsing blocks for template detection:', err);
        } finally {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error loading project details for dashboard:', err);
        setLoading(false);
      });
  }, [projectId]);

  const handleLogout = () => {
    localStorage.removeItem('clientEmail');
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientName');
    localStorage.removeItem('clientPhone');
    localStorage.removeItem('clientAddress');
    router.push(`/preview/${projectId}/login`);
  };

  if (loading || !project || !clientEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-650 border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading Portal...</p>
        </div>
      </div>
    );
  }

  const activeTheme = themeStyles[themeName] || themeStyles.slate;

  switch (templateId) {
    case 'restaurant':
      return (
        <RestaurantDashboard
          projectId={projectId}
          project={project}
          clientEmail={clientEmail}
          theme={activeTheme}
          onLogout={handleLogout}
          companyName={companyName}
          setCompanyName={setCompanyName}
          logoIcon={logoIcon}
          logoUrl={logoUrl}
          shopNiche={shopNiche}
        />
      );
    case 'medical-shop':
      return (
        <MedicalShopDashboard
          projectId={projectId}
          project={project}
          clientEmail={clientEmail}
          theme={activeTheme}
          onLogout={handleLogout}
          companyName={companyName}
          setCompanyName={setCompanyName}
          logoIcon={logoIcon}
          logoUrl={logoUrl}
          shopNiche={shopNiche}
        />
      );
    case 'clinic':
      return (
        <HospitalDashboard
          projectId={projectId}
          project={project}
          clientEmail={clientEmail}
          theme={activeTheme}
          onLogout={handleLogout}
          companyName={companyName}
          setCompanyName={setCompanyName}
          logoIcon={logoIcon}
          logoUrl={logoUrl}
          shopNiche={shopNiche}
        />
      );
    case 'school':
      return (
        <SchoolDashboard
          projectId={projectId}
          project={project}
          clientEmail={clientEmail}
          theme={activeTheme}
          onLogout={handleLogout}
          companyName={companyName}
          setCompanyName={setCompanyName}
          logoIcon={logoIcon}
          logoUrl={logoUrl}
          shopNiche={shopNiche}
        />
      );
    case 'realestate':
      return (
        <RealEstateDashboard
          projectId={projectId}
          project={project}
          clientEmail={clientEmail}
          theme={activeTheme}
          onLogout={handleLogout}
          companyName={companyName}
          logoIcon={logoIcon}
          logoUrl={logoUrl}
          shopNiche={shopNiche}
        />
      );
    case 'wedding':
      return (
        <EventDashboard
          projectId={projectId}
          project={project}
          clientEmail={clientEmail}
          theme={activeTheme}
          onLogout={handleLogout}
          companyName={companyName}
          logoIcon={logoIcon}
          logoUrl={logoUrl}
          shopNiche={shopNiche || undefined}
          selectedDashboardOption={selectedDashboardOption}
        />
      );
    case 'gym':
      return (
        <GymDashboard
          projectId={projectId}
          project={project}
          clientEmail={clientEmail}
          theme={activeTheme}
          onLogout={handleLogout}
          companyName={companyName}
          setCompanyName={setCompanyName}
          logoIcon={logoIcon}
          logoUrl={logoUrl}
          shopNiche={shopNiche}
        />
      );
    default:
      return (
        <EcommerceDashboard
          projectId={projectId}
          project={project}
          clientEmail={clientEmail}
          theme={activeTheme}
          onLogout={handleLogout}
          companyName={companyName}
          setCompanyName={setCompanyName}
          logoIcon={logoIcon}
          logoUrl={logoUrl}
          shopNiche={shopNiche}
        />
      );
  }
}
