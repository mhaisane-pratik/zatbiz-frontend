import { useEffect, useState, useRef } from 'react';
import { api } from '@/services/api';
import { Project, Block } from '@/types';

interface UseBuilderProjectOptions {
  projectId: number;
  showToast: (text: string, isError?: boolean) => void;
  onLoadSuccess: (
    pages: Record<string, Block[]>,
    activePages: string[],
    currentPage: string,
    config: any
  ) => void;
}

export function useBuilderProject({ projectId, showToast, onLoadSuccess }: UseBuilderProjectOptions) {
  const [project, setProject] = useState<Project | null>(null);
  const [projectName, setProjectName] = useState('');
  const [status, setStatus] = useState('Draft');
  const [projectConfig, setProjectConfig] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isNaN(projectId)) return;
    setLoading(true);

    api.projects
      .get(projectId)
      .then((data: Project) => {
        setProject(data);
        setProjectName(data.name);
        setStatus(data.status);
        try {
          const parsed = JSON.parse(data.blocksJson);
          let newPagesStructure: Record<string, Block[]> = { home: [] };
          let activePagesList: string[] = ['home'];
          let currentEditingPage: string = 'home';
          let config: any = {};

          if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            if (parsed.pages) {
              newPagesStructure = parsed.pages;
              activePagesList = parsed.activePages || Object.keys(parsed.pages);
              currentEditingPage = parsed.currentPage || activePagesList[0] || 'home';
              config = parsed.businessConfig || {};
            } else {
              newPagesStructure = { home: [] };
            }
          } else if (Array.isArray(parsed)) {
            newPagesStructure = { home: parsed };
            activePagesList = ['home'];
            currentEditingPage = 'home';
            const bizBlock = parsed.find((b: any) => b.type === 'business_config');
            config = {
              ...(bizBlock?.content || {}),
              themePreset: bizBlock?.theme || 'slate'
            };
          }

          if (!newPagesStructure.home || newPagesStructure.home.length === 0) {
            newPagesStructure.home = [
              {
                id: 'header-default',
                type: 'header',
                theme: config.themePreset || 'slate',
                content: {
                  companyName: data.name,
                  logoIcon: '⚡',
                  layout: 'left-logo',
                  links: [{ label: 'Home', url: '?page=home' }]
                }
              },
              {
                id: 'hero-default',
                type: 'hero',
                theme: config.themePreset || 'slate',
                content: {
                  title: `Welcome to ${data.name}`,
                  subtitle: 'Custom visual website canvas.',
                }
              },
              {
                id: 'footer-default',
                type: 'footer',
                theme: config.themePreset || 'slate',
                content: {
                  text: `© 2026 ${data.name}. All rights reserved.`,
                  layout: 'simple'
                }
              }
            ];
          }

          // Self-heal: filter out duplicate header/footer blocks or duplicate block IDs
          if (newPagesStructure) {
            for (const pageName of Object.keys(newPagesStructure)) {
              const seenTypes = new Set<string>();
              const seenIds = new Set<string>();
              newPagesStructure[pageName] = (newPagesStructure[pageName] || []).filter((block) => {
                if (!block || !block.id) return false;
                if (block.type === 'header' || block.type === 'footer') {
                  if (seenTypes.has(block.type)) return false;
                  seenTypes.add(block.type);
                }
                if (seenIds.has(block.id)) return false;
                seenIds.add(block.id);
                return true;
              });
            }
          }

          setProjectConfig(config);
          onLoadSuccess(newPagesStructure, activePagesList, currentEditingPage, config);
        } catch {
          onLoadSuccess({ home: [] }, ['home'], 'home', {});
        }
      })
      .catch((err) => {
        console.error('Builder API Error:', err);
        showToast('Error loading project layouts from backend API.', true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  // Debounced Autosave
  const triggerAutosave = (
    updatedPages: Record<string, Block[]>,
    activePgs: string[],
    currPg: string,
    config: any,
    updatedName?: string
  ) => {
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(() => {
      saveLayout(updatedPages, activePgs, currPg, config, updatedName || projectName, 'Draft', true);
    }, 1500);
  };

function extractTravelInfo(updatedPages: Record<string, Block[]>, config: any) {
  let logoUrl = '';
  let businessName = '';
  let description = '';
  let bannerUrl = '';
  let phoneNo = '';
  let email = '';
  let address = '';
  const subcategory = config.shopNiche || 'Domestic Travel';

  const blocks = Object.values(updatedPages).flat();

  // Find logo from login_config or other blocks
  const loginConfigBlock = blocks.find(b => b.type === 'login_config');
  if (loginConfigBlock?.content) {
    if (loginConfigBlock.content.logoUrl) logoUrl = loginConfigBlock.content.logoUrl;
  }

  // Find hero details
  const heroBlock = blocks.find(b => b.type === 'hero');
  if (heroBlock?.content) {
    if (heroBlock.content.title) {
      businessName = heroBlock.content.title.replace(/^Embark on Grand Journeys with /i, "");
    }
    if (heroBlock.content.subtitle) description = heroBlock.content.subtitle;
    if (heroBlock.content.imageUrl) bannerUrl = heroBlock.content.imageUrl;
  }

  // Find footer details (phone, email)
  const footerBlock = blocks.find(b => b.type === 'footer');
  if (footerBlock?.content?.text) {
    const text = footerBlock.content.text;
    const phoneMatch = text.match(/Phone:\s*([^\s|]+)/i);
    if (phoneMatch) phoneNo = phoneMatch[1].trim();

    const emailMatch = text.match(/Email:\s*([^\s|]+)/i);
    if (emailMatch) email = emailMatch[1].trim();
  }

  // Find contact block if exists
  const contactBlock = blocks.find(b => b.type === 'contact' || b.type === 'contact_info');
  if (contactBlock?.content) {
    if (contactBlock.content.address) address = contactBlock.content.address;
    if (contactBlock.content.phone) phoneNo = contactBlock.content.phone;
    if (contactBlock.content.email) email = contactBlock.content.email;
  }

  return {
    logoUrl,
    businessName,
    description,
    bannerUrl,
    phoneNo,
    email,
    address,
    subcategory
  };
}

// Sync API PUT request
const saveLayout = async (
  updatedPages: Record<string, Block[]>,
  activePgs: string[],
  currPg: string,
  config: any,
  name: string,
  saveStatus: string,
  isAutoSave = false
) => {
  if (isNaN(projectId)) return;
  const payload = {
    id: projectId,
    name: name,
    description: project?.description || '',
    blocksJson: JSON.stringify({
      pages: updatedPages,
      activePages: activePgs,
      currentPage: currPg,
      businessConfig: config
    }),
    status: saveStatus,
  };

  try {
    await api.projects.update(projectId, payload);
    setStatus(saveStatus);
    if (!isAutoSave) {
      showToast(saveStatus === 'Published' ? 'Website Published Live!' : 'Changes Saved Successfully!');
    }

    // Sync travel agency database tables if it is a travel project
    if (config.businessType === 'travel' || project?.description === 'travel') {
      const travelData = extractTravelInfo(updatedPages, config);
      const currentTravelInfo = await api.travel.get(projectId).catch(() => null);
      const travelPayload = {
        ...(currentTravelInfo || {}),
        ...travelData,
        projectId
      };
      await api.travel.update(projectId, travelPayload).catch(err => console.error('Failed to sync travel_agency_info:', err));

      // Sync theme settings as well
      const currentThemeSettings = await api.travel.themeSettings.get(projectId).catch(() => null);
      const themePayload = {
        ...(currentThemeSettings || {}),
        projectId,
        logoUrl: travelData.logoUrl || currentThemeSettings?.logoUrl || '',
        bannerUrl: travelData.bannerUrl || currentThemeSettings?.bannerUrl || '',
        themeColor: config.themePreset || currentThemeSettings?.themeColor || 'Blue',
        customColorHex: config.customColorHex || currentThemeSettings?.customColorHex || ''
      };
      await api.travel.themeSettings.update(projectId, themePayload).catch(err => console.error('Failed to sync travel_theme_settings:', err));
    }
  } catch (err) {
    console.error('Save failed:', err);
    if (!isAutoSave) {
      showToast('Failed to save layout content.', true);
    }
  }
};

  return {
    project,
    setProject,
    projectName,
    setProjectName,
    status,
    setStatus,
    projectConfig,
    setProjectConfig,
    loading,
    setLoading,
    triggerAutosave,
    saveLayout,
  };
}
