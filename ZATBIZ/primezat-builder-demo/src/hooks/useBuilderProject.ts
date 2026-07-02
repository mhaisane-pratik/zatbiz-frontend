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
