'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/services/api';
import { Project } from '@/types';
import { useToast } from '@/hooks/useToast';
import ToastContainer from '@/components/common/ToastContainer';
import CategoriesFilter from '@/components/dashboard/CategoriesFilter';
import TemplatesGrid from '@/components/dashboard/TemplatesGrid';
import ProjectsGrid from '@/components/dashboard/ProjectsGrid';
import BusinessWizard from '@/components/dashboard/BusinessWizard';
import SuperAdminPanel from '@/components/dashboard/SuperAdminPanel';
import { THEMES_30, ThemeDef } from './themesData';
import { generateTemplateBlocks } from '@/services/templates';
import RestaurantSelectorModal from '@/components/dashboard/RestaurantSelectorModal';
import HospitalSelectorModal from '@/components/dashboard/HospitalSelectorModal';
import GymSelectorModal from '@/components/dashboard/GymSelectorModal';
import RealEstateSelectorModal from '@/components/dashboard/RealEstateSelectorModal';
import DashboardHome from '@/components/dashboard/DashboardHome';
import DynamicCategorySelectorModal from '@/components/dashboard/DynamicCategorySelectorModal';
import WeddingSelectorModal from '@/components/dashboard/WeddingSelectorModal';
import MedicalShopSelectorModal from '@/components/dashboard/MedicalShopSelectorModal';
type TabType = 'home' | 'projects' | 'templates' | 'analytics' | 'products' | 'orders' | 'customers' | 'marketing' | 'discounts' | 'integrations' | 'automation' | 'settings' | 'superadmin' | 'themes' | 'browse_products' | 'categories' | 'wishlist' | 'reviews' | 'messages' | 'downloads';

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [wishlistCount, setWishlistCount] = useState(12);

  // Theme state for light/dark mode
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('zatbiz_dashboard_theme') || 'light';
    setThemeMode(savedTheme as 'light' | 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextTheme);
    localStorage.setItem('zatbiz_dashboard_theme', nextTheme);
  };

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // New visual states for redesigned Shopify-style layout
  const [isPromoClosed, setIsPromoClosed] = useState(false);
  const [isEditingStoreName, setIsEditingStoreName] = useState(false);
  const [editedStoreName, setEditedStoreName] = useState('');
  const [chatInput, setChatInput] = useState('');

  // Mobile menu open state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Spring Boot backend settings
  const [apiEndpoint, setApiEndpoint] = useState('http://localhost:8080');
  const [backendStatus, setBackendStatus] = useState<'testing' | 'online' | 'offline'>('testing');

  // Create empty project modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  // Onboarding modal & wizard state
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isRestaurantSelectorOpen, setIsRestaurantSelectorOpen] = useState(false);
  const [selectedRestaurantCategory, setSelectedRestaurantCategory] = useState<string | null>(null);
  const [isHospitalSelectorOpen, setIsHospitalSelectorOpen] = useState(false);
  const [selectedHospitalCategory, setSelectedHospitalCategory] = useState<string | null>(null);
  const [isGymSelectorOpen, setIsGymSelectorOpen] = useState(false);
  const [selectedGymCategory, setSelectedGymCategory] = useState<string | null>(null);
  const [selectedGymThemeId, setSelectedGymThemeId] = useState<string | null>(null);
  const [selectedGymThemeColor, setSelectedGymThemeColor] = useState<string | null>(null);
  const [selectedGymConfig, setSelectedGymConfig] = useState<any>(null);

  const [isRealEstateSelectorOpen, setIsRealEstateSelectorOpen] = useState(false);
  const [selectedRealEstateCategory, setSelectedRealEstateCategory] = useState<string | null>(null);
  const [selectedRealEstateThemeId, setSelectedRealEstateThemeId] = useState<string | null>(null);
  const [selectedRealEstateThemeColor, setSelectedRealEstateThemeColor] = useState<string | null>(null);

  const [isWeddingSelectorOpen, setIsWeddingSelectorOpen] = useState(false);
  const [selectedWeddingCategory, setSelectedWeddingCategory] = useState<string | null>(null);

  const [isNgoSelectorOpen, setIsNgoSelectorOpen] = useState(false);
  const [selectedNgoCategory, setSelectedNgoCategory] = useState<string | null>(null);

  const [isCorporateSelectorOpen, setIsCorporateSelectorOpen] = useState(false);
  const [selectedCorporateCategory, setSelectedCorporateCategory] = useState<string | null>(null);

  const [isMedicalShopSelectorOpen, setIsMedicalShopSelectorOpen] = useState(false);
  const [selectedMedicalShopConfig, setSelectedMedicalShopConfig] = useState<any>(null);
  const [selectedRestaurantConfig, setSelectedRestaurantConfig] = useState<any>(null);

  // Theme selection modal states
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [themeSelectorTemplateId, setThemeSelectorTemplateId] = useState<string | null>(null);
  const [themeSelectorCompanyName, setThemeSelectorCompanyName] = useState('');
  const [themeSelectorSearchQuery, setThemeSelectorSearchQuery] = useState('');
  const [themeSelectorCategory, setThemeSelectorCategory] = useState('All');
  const [selectedThemeIdInSelector, setSelectedThemeIdInSelector] = useState<string | null>(null);
  const [isCreatingThemedWorkspace, setIsCreatingThemedWorkspace] = useState(false);

  // Online Store & Themes states
  const [downloadedThemes, setDownloadedThemes] = useState<string[]>([]);
  const [activeThemeId, setActiveThemeId] = useState<string>('fashion-boutique');
  const [isOnlineStoreExpanded, setIsOnlineStoreExpanded] = useState(true);
  const [searchThemeQuery, setSearchThemeQuery] = useState('');
  const [selectedThemeCategory, setSelectedThemeCategory] = useState('All');
  const [themePreviewModalOpen, setThemePreviewModalOpen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<ThemeDef | null>(null);
  const [previewPage, setPreviewPage] = useState<'home' | 'login' | 'dashboard'>('home');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isDownloadingMap, setIsDownloadingMap] = useState<Record<string, boolean>>({});
  const [isPublishingMap, setIsPublishingMap] = useState<Record<string, boolean>>({});

  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const token = localStorage.getItem('authToken');
    if (!email || !token) {
      router.push('/login');
    } else {
      setUserEmail(email);
      if (email === 'admin@gmail.com') {
        setActiveTab('superadmin');
      } else {
        setActiveTab('home');
      }
      fetchProjects();
    }

    const savedEndpoint = localStorage.getItem('zatbizApiEndpoint');
    if (savedEndpoint) {
      setApiEndpoint(savedEndpoint);
    }

    const promoClosed = localStorage.getItem('zatbiz_promo_closed') === 'true';
    setIsPromoClosed(promoClosed);

    // Initial theme loads
    const storedThemes = localStorage.getItem('downloaded_themes');
    if (storedThemes) {
      setDownloadedThemes(JSON.parse(storedThemes));
    } else {
      const defaultDownloaded = ['fashion-boutique'];
      setDownloadedThemes(defaultDownloaded);
      localStorage.setItem('downloaded_themes', JSON.stringify(defaultDownloaded));
    }

    const storedActiveTheme = localStorage.getItem('active_theme_id');
    if (storedActiveTheme) {
      setActiveThemeId(storedActiveTheme);
    } else {
      setActiveThemeId('fashion-boutique');
      localStorage.setItem('active_theme_id', 'fashion-boutique');
    }
  }, [router]);

  useEffect(() => {
    if (projects.length > 0 && !isEditingStoreName) {
      setEditedStoreName(projects[0].name);
    }
  }, [projects, isEditingStoreName]);

  useEffect(() => {
    checkBackendHealth();
  }, [apiEndpoint]);

  const checkBackendHealth = async () => {
    setBackendStatus('testing');
    try {
      const res = await fetch(`${apiEndpoint}/`, { method: 'GET' });
      if (res.ok) {
        setBackendStatus('online');
      } else {
        setBackendStatus('offline');
      }
    } catch (err) {
      setBackendStatus('offline');
    }
  };


  const fetchProjects = async () => {
    try {
      const data = await api.projects.list();
      setProjects(data);
    } catch (err) {
      console.error('API Error:', err);
      showToast(
        'Could not load projects from the database. Ensure Spring Boot is running on http://localhost:8080 and you are logged in.',
        true
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this website project? This action is permanent!')) return;

    try {
      await api.projects.delete(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      showToast('Website layout deleted successfully.');
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Failed to delete project. Is the backend running?', true);
    }
  };

  const handleCreateEmpty = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newProjectName.trim();
    if (!cleanName) return;

    if (projects.some((p) => p.name.trim().toLowerCase() === cleanName.toLowerCase())) {
      showToast(`A workspace named "${cleanName}" already exists. Please choose a unique name.`, true);
      return;
    }

    const payload = {
      name: cleanName,
      description: newProjectDesc.trim(),
      blocksJson: JSON.stringify([
        {
          id: Date.now() + '-header',
          type: 'header',
          theme: 'slate',
          content: {
            companyName: newProjectName.trim(),
            logoIcon: '⚡',
            layout: 'left-logo',
          },
        },
        {
          id: Date.now() + '-hero',
          type: 'hero',
          theme: 'deepblue',
          content: {
            title: newProjectName.trim(),
            subtitle: newProjectDesc.trim(),
            btn1Text: 'Get Started',
            btn1Url: '#',
            btn2Text: 'Learn More',
            btn2Url: '#',
          },
        },
        {
          id: Date.now() + '-footer',
          type: 'footer',
          theme: 'slate',
          content: {
            text: `© 2026 ${newProjectName.trim()}. All rights reserved.`,
            layout: 'simple',
          },
        },
      ]),
      status: 'Draft',
    };

    try {
      const newProj = await api.projects.create(payload);
      setProjects((prev) => [newProj, ...prev]);
      setIsCreateModalOpen(false);
      setNewProjectName('');
      setNewProjectDesc('');
      showToast('New blank website generated.');
      setActiveTab('downloads');
    } catch (err) {
      console.error('Create error:', err);
      showToast('Failed to create project.', true);
    }
  };

  const handleSelectTemplate = (templateId: string) => {
    if (templateId === 'restaurant') {
      setIsRestaurantSelectorOpen(true);
    } else if (templateId === 'clinic') {
      setIsHospitalSelectorOpen(true);
    } else if (templateId === 'gym') {
      setIsGymSelectorOpen(true);
    } else if (templateId === 'realestate') {
      setIsRealEstateSelectorOpen(true);
    } else if (templateId === 'wedding') {
      setIsWeddingSelectorOpen(true);
    } else if (templateId === 'ngo') {
      setIsNgoSelectorOpen(true);
    } else if (templateId === 'corporate') {
      setIsCorporateSelectorOpen(true);
    } else if (templateId === 'medical-shop') {
      setIsMedicalShopSelectorOpen(true);
    } else {
      setSelectedTemplateId(templateId);
      setIsWizardOpen(true);
    }
  };

  const handleApplyThemeAndCreateWorkspace = async () => {
    if (!themeSelectorTemplateId) return;
    if (!selectedThemeIdInSelector) {
      showToast('Please select a theme first.', true);
      return;
    }
    const theme = THEMES_30.find(t => t.id === selectedThemeIdInSelector);
    if (!theme) return;

    const companyName = themeSelectorCompanyName.trim() || theme.name;

    if (projects.some((p) => p.name.trim().toLowerCase() === companyName.toLowerCase())) {
      showToast(`A workspace named "${companyName}" already exists! Please enter a unique company/store name.`, true);
      return;
    }

    setIsCreatingThemedWorkspace(true);
    showToast(`Initializing themed workspace for "${companyName}"...`);

    try {
      // 1. Map theme industry/colors to closest preset color block theme
      let mappedThemePreset = 'slate';
      const industryLower = theme.industry.toLowerCase();
      if (industryLower.includes('fashion') || industryLower.includes('beauty')) {
        mappedThemePreset = 'purple';
      } else if (industryLower.includes('restaurant') || industryLower.includes('food')) {
        mappedThemePreset = 'sunset';
      } else if (industryLower.includes('tech') || industryLower.includes('electronic')) {
        mappedThemePreset = 'deepblue';
      } else if (industryLower.includes('grocery') || industryLower.includes('pet') || industryLower.includes('estate')) {
        mappedThemePreset = 'emerald';
      }

      // 2. Generate blocks for this template
      let themedBlocks: any[] = [];

      if (themeSelectorTemplateId === 'scratch') {
        themedBlocks = [
          {
            id: Date.now() + '-announcement',
            type: 'announcement_bar',
            theme: mappedThemePreset,
            content: {
              text: theme.tagline || 'Welcome to our new store!'
            }
          },
          {
            id: Date.now() + '-header',
            type: 'header',
            theme: mappedThemePreset,
            content: {
              companyName: companyName,
              logoIcon: theme.brandIcon || '✨',
              layout: 'left-logo',
              links: [
                { label: 'Home', url: '#' },
                { label: 'Shop All', url: '#products' },
                { label: 'Contact Us', url: '#footer' }
              ]
            }
          },
          {
            id: Date.now() + '-image_banner',
            type: 'image_banner',
            theme: mappedThemePreset,
            content: {
              title: companyName,
              subtitle: theme.tagline,
              btnText: 'Shop Now',
              btnUrl: '#products',
              imageUrl: theme.bannerImageUrl
            }
          },
          {
            id: Date.now() + '-text_block',
            type: 'text_block',
            theme: 'slate',
            content: {
              title: `About ${companyName}`,
              text: theme.desc
            }
          },
          {
            id: Date.now() + '-products',
            type: 'products',
            theme: 'slate',
            content: {
              title: 'Featured Collection',
              subtitle: 'Discover our premium selections'
            }
          },
          {
            id: Date.now() + '-footer',
            type: 'footer',
            theme: mappedThemePreset,
            content: {
              text: `© 2026 ${companyName}. Powered by ZATBIZ Creator.`,
              layout: 'simple'
            }
          }
        ];
      } else {
        const baseBlocks = generateTemplateBlocks({
          selectedTemplateId: themeSelectorTemplateId,
          companyName: companyName,
          slogan: theme.tagline,
          contactEmail: 'hello@' + companyName.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
          contactPhone: '+1 (555) 019-2834',
          logoType: 'icon',
          logoIcon: theme.brandIcon || '✨',
          customLogoUrl: '',
          heroType: 'custom',
          customHeroUrl: theme.heroImageUrl || theme.bannerImageUrl,
          shopNiche: theme.id
        });

        themedBlocks = baseBlocks.map(block => {
          let blockTheme = block.theme;
          if (blockTheme === 'slate' || blockTheme === 'deepblue' || blockTheme === 'purple' || blockTheme === 'sunset' || blockTheme === 'emerald') {
            blockTheme = mappedThemePreset;
          }

          const content = { ...block.content };

          if (block.type === 'header') {
            content.companyName = companyName;
            content.logoIcon = theme.brandIcon;
          } else if (block.type === 'hero') {
            content.title = `Welcome to ${companyName}`;
            content.subtitle = theme.tagline;
            content.imageUrl = theme.heroImageUrl || theme.bannerImageUrl;
          } else if (block.type === 'image_banner') {
            content.title = companyName;
            content.subtitle = theme.tagline;
            content.imageUrl = theme.bannerImageUrl;
          } else if (block.type === 'text_block') {
            content.title = `About ${companyName}`;
            content.text = theme.desc;
          } else if (block.type === 'footer') {
            content.text = `© 2026 ${companyName}. Powered by ZATBIZ Creator.`;
          } else if (block.type === 'login_config') {
            content.title = `${companyName} Access Portal`;
            content.logoIcon = theme.brandIcon;
          }

          return {
            ...block,
            theme: blockTheme,
            content
          };
        });

        if (!themedBlocks.some(b => b.type === 'announcement_bar')) {
          themedBlocks.unshift({
            id: Date.now() + '-announcement',
            type: 'announcement_bar',
            theme: mappedThemePreset,
            content: {
              text: theme.tagline || 'Welcome to our brand new store!'
            }
          });
        }

        if (!themedBlocks.some(b => b.type === 'business_config')) {
          themedBlocks.push({
            id: 'business-config-block',
            type: 'business_config',
            theme: mappedThemePreset,
            content: {
              businessType: themeSelectorTemplateId === 'storefront' ? 'shop' : 'general',
              shopNiche: theme.id,
              currency: 'INR (₹)',
              domainName: `${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.zatbiz.site`
            }
          });
        }
      }

      const payload = {
        name: companyName,
        description: theme.desc,
        blocksJson: JSON.stringify(themedBlocks),
        status: 'Draft'
      };

      const newProj = await api.projects.create(payload);

      try {
        const existingProducts = await api.products.list(newProj.id);
        for (const p of existingProducts) {
          if (p.id) await api.products.delete(p.id);
        }
      } catch (err) {
        console.error('Failed to clean up old products:', err);
      }

      for (const prod of theme.products) {
        try {
          await api.products.create({
            projectId: newProj.id,
            name: prod.name,
            description: prod.description,
            price: prod.price,
            category: prod.category,
            imageUrl: prod.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
            stock: 100,
            available: true,
            brand: companyName,
            color: 'default',
            rating: 4.8,
            discount: 10
          });
        } catch (err) {
          console.error('Failed to seed theme product during workspace creation:', prod.name, err);
        }
      }

      setActiveThemeId(theme.id);
      localStorage.setItem('active_theme_id', theme.id);

      setIsThemeSelectorOpen(false);
      setProjects((prev) => [newProj, ...prev]);
      showToast(`Successfully initialized "${companyName}" workspace!`);
      
      router.push(`/builder/${newProj.id}`);

    } catch (err) {
      console.error(err);
      showToast('Failed to create themed workspace project.', true);
    } finally {
      setIsCreatingThemedWorkspace(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('zatbizApiEndpoint', apiEndpoint);
    showToast('Spring Boot endpoint settings saved successfully.');
    checkBackendHealth();
  };

  const handleRenameStore = async () => {
    if (!editedStoreName.trim()) return;

    if (projects.length > 0) {
      const activeProject = projects[0];
      try {
        const updatedProject = await api.projects.update(activeProject.id, {
          ...activeProject,
          name: editedStoreName.trim(),
        });
        setProjects((prev) =>
          prev.map((p) => (p.id === activeProject.id ? updatedProject : p))
        );
        setIsEditingStoreName(false);
        showToast('Store name updated successfully!');
      } catch (err) {
        console.error(err);
        showToast('Failed to update store name in database.', true);
      }
    } else {
      // Lazy initialize a project when the user renames a non-existent store
      try {
        const payload = {
          name: editedStoreName.trim(),
          description: 'Custom online storefront canvas synced to H2 database.',
          blocksJson: JSON.stringify([
            {
              id: Date.now() + '-header',
              type: 'header',
              theme: 'slate',
              content: {
                companyName: editedStoreName.trim(),
                logoIcon: '⚡',
                layout: 'left-logo',
              },
            },
            {
              id: Date.now() + '-hero',
              type: 'hero',
              theme: 'deepblue',
              content: {
                title: editedStoreName.trim(),
                subtitle: 'Customize this storefront template visually.',
                btn1Text: 'Get Started',
                btn1Url: '#',
                btn2Text: 'Learn More',
                btn2Url: '#',
              },
            },
            {
              id: Date.now() + '-footer',
              type: 'footer',
              theme: 'slate',
              content: {
                text: `© 2026 ${editedStoreName.trim()}. All rights reserved.`,
                layout: 'simple',
              },
            },
          ]),
          status: 'Draft',
        };
        const newProj = await api.projects.create(payload);
        setProjects([newProj]);
        setIsEditingStoreName(false);
        showToast('Initialized new store with name: ' + editedStoreName.trim());
      } catch (err) {
        console.error(err);
        showToast('Failed to initialize store in database.', true);
      }
    }
  };

  const handleSetupCardClick = async (tab: 'products' | 'landing') => {
    if (projects.length > 0) {
      router.push(`/builder/${projects[0].id}?tab=${tab}`);
      return;
    }

    // Otherwise, create default project first!
    const defaultName = editedStoreName.trim() || 'My Custom Store';
    const payload = {
      name: defaultName,
      description: 'Custom online storefront canvas synced to H2 database.',
      blocksJson: JSON.stringify([
        {
          id: Date.now() + '-header',
          type: 'header',
          theme: 'slate',
          content: {
            companyName: defaultName,
            logoIcon: '⚡',
            layout: 'left-logo',
          },
        },
        {
          id: Date.now() + '-hero',
          type: 'hero',
          theme: 'deepblue',
          content: {
            title: defaultName,
            subtitle: 'Customize this storefront template visually.',
            btn1Text: 'Get Started',
            btn1Url: '#',
            btn2Text: 'Learn More',
            btn2Url: '#',
          },
        },
        {
          id: Date.now() + '-footer',
          type: 'footer',
          theme: 'slate',
          content: {
            text: `© 2026 ${defaultName}. All rights reserved.`,
            layout: 'simple',
          },
        },
      ]),
      status: 'Draft',
    };

    try {
      const newProj = await api.projects.create(payload);
      setProjects([newProj]);
      router.push(`/builder/${newProj.id}?tab=${tab}`);
      showToast('Initialized new website canvas workspace.');
    } catch (err) {
      console.error(err);
      showToast('Failed to auto-create workspace project.', true);
    }
  };

  const handleDownloadTheme = async (theme: ThemeDef) => {
    setIsDownloadingMap((prev) => ({ ...prev, [theme.id]: true }));
    showToast(`Downloading theme "${theme.name}"...`);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const updated = [...downloadedThemes, theme.id];
    setDownloadedThemes(updated);
    localStorage.setItem('downloaded_themes', JSON.stringify(updated));
    setIsDownloadingMap((prev) => ({ ...prev, [theme.id]: false }));
    showToast(`Theme "${theme.name}" added to your store!`);
  };

  const handleRemoveTheme = (themeId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from your theme library?`)) return;
    const updated = downloadedThemes.filter(id => id !== themeId);
    setDownloadedThemes(updated);
    localStorage.setItem('downloaded_themes', JSON.stringify(updated));
    showToast(`Removed "${name}" from your library.`);
  };

  const handlePublishTheme = async (theme: ThemeDef) => {
    setIsPublishingMap((prev) => ({ ...prev, [theme.id]: true }));
    showToast(`Publishing theme "${theme.name}"...`);
    try {
      let targetProject = projects[0];

      // If no project exists, initialize a new default project
      if (!targetProject) {
        const payload = {
          name: theme.name,
          description: theme.desc,
          blocksJson: '',
          status: 'Published',
        };
        const newProj = await api.projects.create(payload);
        targetProject = newProj;
        setProjects([newProj]);
      }

      // Construct themed blocksJson
      const themedBlocks = [
        {
          id: Date.now() + '-announcement',
          type: 'announcement_bar',
          theme: 'slate',
          content: {
            text: '20% OFF STOREWIDE - Use code WELCOME at checkout!'
          }
        },
        {
          id: Date.now() + '-header',
          type: 'header',
          theme: 'slate',
          content: {
            companyName: theme.name,
            logoIcon: theme.brandIcon,
            layout: 'left-logo',
            links: [
              { label: 'Shop All', url: '#products' },
              { label: 'Our Story', url: '#story' },
              { label: 'Contact Us', url: '#contact' }
            ]
          }
        },
        {
          id: Date.now() + '-image_banner',
          type: 'image_banner',
          theme: 'slate',
          content: {
            title: theme.name,
            subtitle: theme.tagline,
            btnText: 'Shop Now',
            btnUrl: '#products',
            imageUrl: theme.bannerImageUrl
          }
        },
        {
          id: Date.now() + '-business_config',
          type: 'business_config',
          theme: 'slate',
          content: {
            businessType: 'ecommerce',
            shopNiche: theme.id === 'fashion-boutique' ? 'cloth' : 
                       theme.id === 'grocery-organic' ? 'grocery' :
                       theme.id === 'tech-gadgets' ? 'electronics' : 
                       theme.id === 'pet-supplies' ? 'pet' : 
                       theme.id === 'books-literature' ? 'books' : theme.id,
            shopCurrency: 'INR'
          }
        },
        {
          id: Date.now() + '-text_block',
          type: 'text_block',
          theme: 'slate',
          content: {
            title: 'Our Brand Mission',
            text: `${theme.desc} At ${theme.name}, we are dedicated to crafting high-quality products that merge form, utility, and modern details. Every item in our store is hand-curated and authenticated by experts.`
          }
        },
        {
          id: Date.now() + '-products',
          type: 'products',
          theme: 'slate',
          content: {
            title: 'Featured Collection',
            subtitle: 'Discover our premium curated collections'
          }
        },
        {
          id: Date.now() + '-features',
          type: 'features',
          theme: 'slate',
          content: {
            title: `Why Choose ${theme.name}`,
            subtitle: 'Crafted for quality and reliable service.',
            items: [
              { icon: '🚚', title: 'Free Express Delivery', desc: 'Complimentary shipping above ₹999.' },
              { icon: '🔒', title: '105% Secure Checkout', desc: 'PCI compliant payment gateway support.' },
              { icon: '🔄', title: 'Easy Return Slips', desc: '30-day hassle-free refunds guarantee.' }
            ]
          }
        },
        {
          id: Date.now() + '-footer',
          type: 'footer',
          theme: 'slate',
          content: {
            text: `© 2026 ${theme.name}. Powered by ZATBIZ Creator.`,
            layout: 'simple'
          }
        }
      ];

      // Update project layout in DB
      const updatedProj = await api.projects.update(targetProject.id, {
        ...targetProject,
        name: theme.name,
        description: theme.desc,
        blocksJson: JSON.stringify(themedBlocks),
        status: 'Published'
      });

      // Update projects local state
      setProjects((prev) => prev.map((p) => (p.id === targetProject.id ? updatedProj : p)));

      // Seed products in backend database
      try {
        const existingProducts = await api.products.list(targetProject.id);
        for (const p of existingProducts) {
          if (p.id) await api.products.delete(p.id);
        }
      } catch (err) {
        console.error('Failed to clean up old products:', err);
      }

      for (const prod of theme.products) {
        try {
          await api.products.create({
            projectId: targetProject.id,
            name: prod.name,
            description: prod.description,
            price: prod.price,
            category: prod.category,
            imageUrl: prod.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200',
            stock: 100,
            available: true,
            brand: theme.name,
            color: 'default',
            rating: 4.8,
            discount: 10
          });
        } catch (err) {
          console.error('Failed to seed product:', prod.name, err);
        }
      }

      setActiveThemeId(theme.id);
      localStorage.setItem('active_theme_id', theme.id);
      showToast(`Theme "${theme.name}" published successfully! Storefront synchronized.`);
    } catch (err) {
      console.error(err);
      showToast('Failed to publish theme to database.', true);
    } finally {
      setIsPublishingMap((prev) => ({ ...prev, [theme.id]: false }));
    }
  };

  const handlePreviewTheme = (theme: ThemeDef) => {
    setPreviewTheme(theme);
    setPreviewPage('home');
    setPreviewDevice('desktop');
    setThemePreviewModalOpen(true);
  };

  // Filter projects by search query
  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!userEmail) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span className="w-6 h-6 border-2 border-indigo-650 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-semibold text-slate-400">Verifying Session...</p>
        </div>
      </div>
    );
  }

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Helper to extract niche configurations from the active project
  const getActiveProjectConfig = () => {
    if (projects.length === 0) return null;
    const activeProject = projects[0]; // default to first
    try {
      const blocks = JSON.parse(activeProject.blocksJson || '[]');
      const configBlock = blocks.find((b: any) => b.type === 'business_config');
      return {
        content: configBlock?.content || null,
        projectName: activeProject.name,
      };
    } catch (e) {
      return null;
    }
  };

  const activeConfig = getActiveProjectConfig();
  const shopNiche = activeConfig?.content?.shopNiche;
  const bizType = activeConfig?.content?.businessType || null;

  // Let's setup niche specific UI elements
  let welcomeBannerBg = 'bg-gradient-to-r from-indigo-900 via-indigo-850 to-slate-900';
  let welcomeSubtitle = 'Generate website layouts, customize theme blocks, configure settings, and sync pages instantly to your Spring Boot database backend.';
  let isNicheThemed = false;
  let nicheThemeName = '';

  if (shopNiche === 'cloth' || (shopNiche && shopNiche.startsWith('fashion'))) {
    welcomeBannerBg = 'bg-gradient-to-r from-slate-800 via-slate-900 to-zinc-950 border border-slate-750';
    welcomeSubtitle = `Boutique dashboard active for ${activeConfig?.projectName || 'your shop'}. Manage clothing apparel inventory, track garment variants, and view customer storefront order flows.`;
    isNicheThemed = true;
    nicheThemeName = 'Boutique Store';
  } else if (shopNiche === 'grocery' || (shopNiche && shopNiche.startsWith('grocery'))) {
    welcomeBannerBg = 'bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-950 border border-emerald-900/30';
    welcomeSubtitle = `Grocery store dashboard active for ${activeConfig?.projectName || 'your shop'}. Check fresh produce inventory levels, perishables alerts, and manage incoming delivery checkout slots.`;
    isNicheThemed = true;
    nicheThemeName = 'Groceries & Supermarket';
  } else if (shopNiche === 'electronics' || (shopNiche && shopNiche.startsWith('electronics'))) {
    welcomeBannerBg = 'bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-900/20';
    welcomeSubtitle = `Electronics & gadgets dashboard active for ${activeConfig?.projectName || 'your shop'}. Monitor tech inventory stock, mechanical peripheral variants, and view cyber store checkout statistics.`;
    isNicheThemed = true;
    nicheThemeName = 'Next-Gen Electronics';
  } else if (shopNiche && shopNiche.startsWith('pet')) {
    welcomeBannerBg = 'bg-gradient-to-r from-teal-955 via-slate-900 to-slate-955 border border-teal-900/20';
    welcomeSubtitle = `Pet store dashboard active for ${activeConfig?.projectName || 'your shop'}. Track pet foods, toys, comfort accessories, and process customer checkouts.`;
    isNicheThemed = true;
    nicheThemeName = 'Pet Care & Supplies';
  } else if (shopNiche && shopNiche.startsWith('books')) {
    welcomeBannerBg = 'bg-gradient-to-r from-purple-955 via-slate-900 to-indigo-955 border border-purple-900/20';
    welcomeSubtitle = `Book store dashboard active for ${activeConfig?.projectName || 'your shop'}. Manage novels, academic literature, downloadable e-books, and monitor reader transactions.`;
    isNicheThemed = true;
    nicheThemeName = 'Literature Nest';
  } else if (shopNiche) {
    const nicheCap = shopNiche.charAt(0).toUpperCase() + shopNiche.slice(1);
    welcomeBannerBg = 'bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-900/20';
    welcomeSubtitle = `${nicheCap} store dashboard active for ${activeConfig?.projectName || 'your shop'}. Track catalog products, customize visual blocks, and process retail customer orders.`;
    isNicheThemed = true;
    nicheThemeName = `${nicheCap} Store`;
  }

  // Dynamic Quick Metrics
  const getMetrics = () => {
    const baseMetrics = [
      {
        title: 'Workspaces',
        value: projects.length,
        desc: 'Active storefront configurations',
        icon: 'fa-folder',
        bg: 'bg-indigo-50 text-indigo-600',
      },
      {
        title: 'Live Sites',
        value: projects.filter(p => p.status === 'Published' || p.status === 'Live').length || 1,
        desc: 'Synced to database backend',
        icon: 'fa-globe',
        bg: 'bg-emerald-50 text-emerald-600',
      },
    ];

    if (shopNiche === 'cloth' || (shopNiche && shopNiche.startsWith('fashion'))) {
      return [
        ...baseMetrics,
        {
          title: 'Boutique Revenue',
          value: '₹1,45,200',
          desc: '▲ 18.5% AOV this week',
          icon: 'fa-shirt',
          bg: 'bg-pink-50 text-pink-600',
        },
        {
          title: 'Garments Sold',
          value: '148 units',
          desc: 'Stock level: Normal',
          icon: 'fa-tags',
          bg: 'bg-slate-100 text-slate-700',
        }
      ];
    } else if (shopNiche === 'grocery' || (shopNiche && shopNiche.startsWith('grocery'))) {
      return [
        ...baseMetrics,
        {
          title: 'Grocery Sales',
          value: '₹89,420',
          desc: '▲ 8.2% fresh produce sales',
          icon: 'fa-apple-whole',
          bg: 'bg-emerald-50 text-emerald-600',
        },
        {
          title: 'Baskets Filled',
          value: '312 orders',
          desc: '5 low-stock warning items',
          icon: 'fa-basket-shopping',
          bg: 'bg-amber-50 text-amber-600',
        }
      ];
    } else if (shopNiche === 'electronics' || (shopNiche && shopNiche.startsWith('electronics'))) {
      return [
        ...baseMetrics,
        {
          title: 'Tech Gadget Sales',
          value: '₹3,84,500',
          desc: '▲ 24% cyber orders',
          icon: 'fa-laptop',
          bg: 'bg-blue-50 text-blue-600',
        },
        {
          title: 'Low-Stock Peripherals',
          value: '3 warnings',
          desc: 'Keyboards & ANC headphones',
          icon: 'fa-keyboard',
          bg: 'bg-red-50 text-red-600',
        }
      ];
    } else if (shopNiche && shopNiche.startsWith('pet')) {
      return [
        ...baseMetrics,
        {
          title: 'Pet Care Revenue',
          value: '₹42,300',
          desc: '▲ 15% pet essentials sales',
          icon: 'fa-paw',
          bg: 'bg-teal-50 text-teal-600',
        },
        {
          title: 'Pet Items Active',
          value: '58 items',
          desc: 'Healthy stock levels',
          icon: 'fa-bone',
          bg: 'bg-amber-100 text-amber-700',
        }
      ];
    } else if (shopNiche && shopNiche.startsWith('books')) {
      return [
        ...baseMetrics,
        {
          title: 'Book Sales Revenue',
          value: '₹34,120',
          desc: '▲ 10.2% book reader orders',
          icon: 'fa-book-open',
          bg: 'bg-purple-50 text-purple-600',
        },
        {
          title: 'Library Catalog',
          value: '142 units',
          desc: 'Best-sellers online',
          icon: 'fa-bookmark',
          bg: 'bg-indigo-100 text-indigo-700',
        }
      ];
    } else if (shopNiche) {
      const nicheCap = shopNiche.charAt(0).toUpperCase() + shopNiche.slice(1);
      return [
        ...baseMetrics,
        {
          title: `${nicheCap} Revenue`,
          value: '₹54,200',
          desc: '▲ 12.4% since publish',
          icon: 'fa-cart-shopping',
          bg: 'bg-indigo-50 text-indigo-600',
        },
        {
          title: 'Catalog Size',
          value: '2 items active',
          desc: '3 default products seeded',
          icon: 'fa-box',
          bg: 'bg-purple-50 text-purple-600',
        }
      ];
    }

    return [
      ...baseMetrics,
      {
        title: 'Visits',
        value: '1,248',
        desc: '+14.2% vs last week',
        icon: 'fa-chart-simple',
        bg: 'bg-cyan-50 text-cyan-600',
      },
      {
        title: 'API Sync',
        value: 'Instant',
        desc: 'Automatic layout save-on-drag',
        icon: 'fa-cloud-arrow-up',
        bg: 'bg-amber-50 text-amber-600',
      }
    ];
  };

  const metrics = getMetrics();

  // Dynamic Onboarding Checklist
  const getChecklist = () => {
    if (shopNiche === 'cloth' || (shopNiche && shopNiche.startsWith('fashion'))) {
      return [
        {
          title: 'Review Boutique Seeding Products',
          desc: 'Double-check your seeded apparel catalog items (Vintage Denim, Floral Dresses) in builder database table.',
          link: projects.length > 0 ? `/builder/${projects[0].id}` : '#',
          linkLabel: 'Verify catalog garments →',
          isDone: projects.length > 0,
        },
        {
          title: 'Customize Storefront Landing Header & Colors',
          desc: 'Open the visual builder, modify heading slogans, customize background colors, and set your boutique logo icon.',
          link: projects.length > 0 ? `/builder/${projects[0].id}` : '#',
          linkLabel: 'Open visual builder →',
          isDone: projects.length > 0,
        },
        {
          title: 'Configure Boutique Billing Currency',
          desc: 'Ensure your checkout currency is configured for INR (₹) or your regional billing currency.',
          link: '#',
          linkLabel: '',
          isDone: true,
        }
      ];
    } else if (shopNiche === 'grocery' || (shopNiche && shopNiche.startsWith('grocery'))) {
      return [
        {
          title: 'Inspect Fresh Fruit & Bakery Seed Items',
          desc: 'Verify that fresh Gala apples, whole wheat sourdough, and organic milk are correctly seeded in the catalog database.',
          link: projects.length > 0 ? `/builder/${projects[0].id}` : '#',
          linkLabel: 'Check seeded inventory →',
          isDone: projects.length > 0,
        },
        {
          title: 'Design Greenery-Themed Page Sections',
          desc: 'Configure background grids and buttons with emerald/sunset theme presets in the block builder.',
          link: projects.length > 0 ? `/builder/${projects[0].id}` : '#',
          linkLabel: 'Open visual designer →',
          isDone: projects.length > 0,
        },
        {
          title: 'Setup Expiry Warnings & Perishables Alerts',
          desc: 'Ensure automatic low-stock notifications are active to alert staff of fresh dairy or produce shortages.',
          link: '#',
          linkLabel: '',
          isDone: true,
        }
      ];
    } else if (shopNiche) {
      const nicheCap = shopNiche.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return [
        {
          title: `Seed ${nicheCap} catalog products`,
          desc: `Double-check your seeded items in the builder products database to ensure customer purchases are live.`,
          link: projects.length > 0 ? `/builder/${projects[0].id}` : '#',
          linkLabel: `Check ${nicheCap} products →`,
          isDone: projects.length > 0,
        },
        {
          title: 'Setup Brand Color Schemes & Banners',
          desc: 'Apply theme presets and configure your custom uploaded storefront banners inside builder properties panel.',
          link: projects.length > 0 ? `/builder/${projects[0].id}` : '#',
          linkLabel: 'Open builder theme settings →',
          isDone: projects.length > 0,
        },
        {
          title: 'Review Sync Telemetry Logs',
          desc: 'Confirm layout saves are persisting cleanly to your JPA Spring Boot tables.',
          link: '#',
          linkLabel: '',
          isDone: true,
        }
      ];
    }

    return [
      {
        title: 'Create a website project',
        desc: 'Start with a blank canvas layout or use template presets.',
        link: '#',
        linkLabel: 'Generate project now →',
        isDone: projects.length > 0,
      },
      {
        title: 'Customize components visually',
        desc: 'Open the builder and add headlines, color palettes, and buttons.',
        link: projects.length > 0 ? `/builder/${projects[0].id}` : '#',
        linkLabel: 'Open builder workspace →',
        isDone: projects.length > 0,
      },
      {
        title: 'Verify Spring Boot JPA persistence',
        desc: 'Ensure layouts sync perfectly to your backend database tables.',
        link: '#',
        linkLabel: '',
        isDone: true,
      }
    ];
  };

  const checklist = getChecklist();

  const coreLinks = [
    { id: 'home', label: 'Home', icon: 'fa-house' },
    { id: 'browse_products', label: 'Browse Products', icon: 'fa-compass' },
    { id: 'categories', label: 'Categories', icon: 'fa-layer-group' },
    { id: 'orders', label: 'My Orders', icon: 'fa-receipt' },
    { id: 'downloads', label: 'Downloads', icon: 'fa-download' },
    { id: 'wishlist', label: 'Wishlist', icon: 'fa-heart', count: wishlistCount || undefined },
    { id: 'reviews', label: 'Reviews', icon: 'fa-star' },
    { id: 'messages', label: 'Messages', icon: 'fa-comment-dots' },
    { id: 'settings', label: 'Settings', icon: 'fa-sliders' },
  ];

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-[#fcfcfd] text-slate-655 border-r border-slate-150 select-none">
      {/* Branding Logo Area */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-100 bg-[#fcfcfd]">
        <div className="w-8.5 h-8.5 flex items-center justify-center bg-gradient-to-tr from-[#6366f1] via-[#5c3bee] to-[#a855f7] rounded-xl shadow-md">
          <span className="text-white text-base font-extrabold italic">Z</span>
        </div>
        <span className="text-slate-900 font-extrabold text-lg tracking-tight">ZatBiz</span>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {coreLinks.map((link) => {
          const isActive = activeTab === link.id || 
            (link.id === 'browse_products' && activeTab === 'templates') ||
            (link.id === 'categories' && activeTab === 'categories') ||
            (link.id === 'downloads' && activeTab === 'projects');
          return (
            <button
              key={link.id}
              onClick={() => {
                if (link.id === 'browse_products' || link.id === 'categories') {
                  setActiveTab('templates');
                } else if (link.id === 'downloads') {
                  setActiveTab('projects');
                } else {
                  setActiveTab(link.id as TabType);
                }
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 hover:scale-[1.01] cursor-pointer border ${
                isActive
                  ? 'bg-[#f0eaff] text-[#5c3bee] border-transparent shadow-sm'
                  : 'hover:bg-slate-50 hover:text-slate-900 text-slate-500 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <i className={`fa-solid ${link.icon} text-sm w-4 text-center ${isActive ? 'text-[#5c3bee]' : 'text-slate-400'}`} />
                <span className="tracking-wide">{link.label}</span>
              </div>
              {link.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold ${
                  isActive ? 'bg-white text-[#5c3bee]' : 'bg-slate-100 text-slate-400'
                }`}>
                  {link.count}
                </span>
              )}
            </button>
          );
        })}

        {userEmail === 'admin@gmail.com' && (
          <div className="pt-5 border-t border-slate-100 mt-5">
            <p className="px-3 text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">
              System Control
            </p>
            <button
              onClick={() => {
                setActiveTab('superadmin');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 hover:scale-[1.01] cursor-pointer border ${
                activeTab === 'superadmin'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200 shadow-sm'
                  : 'hover:bg-slate-50 hover:text-slate-900 text-slate-500 border-transparent'
              }`}
            >
              <i className={`fa-solid fa-user-shield text-sm w-4 text-center ${activeTab === 'superadmin' ? 'text-amber-600' : 'text-slate-455'}`} />
              <span className="tracking-wide">Admin Console</span>
            </button>
          </div>
        )}
      </nav>

      {/* Upgrade to Premium Widget */}
      <div className="px-4 py-4 border-t border-slate-100 bg-[#fcfcfd] space-y-3">
        <div className="bg-[#fcfaff] rounded-2xl p-4 border border-[#f3ebff] relative overflow-hidden shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-purple-650">💎</span>
            <span className="text-xs font-extrabold text-[#5c3bee] tracking-wide">Upgrade to Premium</span>
          </div>
          <p className="text-[10px] text-slate-500 font-semibold leading-normal mt-2">
            Unlock exclusive products, amazing discounts and priority support.
          </p>
          <button
            onClick={() => showToast("Premium plans checkout process initialized.")}
            className="w-full mt-3 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-[10px] font-black py-2 px-3 rounded-xl shadow-md transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1 cursor-pointer border-0"
          >
            <span>Upgrade Now</span>
            <span>➔</span>
          </button>
        </div>
      </div>

      {/* User Info & Footer */}
      <div className="p-4 border-t border-slate-100 bg-[#fcfcfd]">
        <div className="flex items-center justify-between gap-3 p-1.5 bg-[#fcfcfd] rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2.5 truncate">
            <span className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center font-black text-xs text-white uppercase select-none shadow-sm">
              {userEmail ? userEmail[0] : 'D'}
            </span>
            <div className="truncate leading-tight text-left">
              <p className="text-xs font-extrabold text-slate-805 truncate">{userEmail ? userEmail.split('@')[0] : 'demo'}</p>
              <span className="text-[9px] text-slate-400 font-semibold truncate">{userEmail || 'demo@zatbiz.com'}</span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-rose-600 rounded-xl hover:bg-[#eae8ff] transition-all duration-200 cursor-pointer border-0 bg-transparent"
            >
              <i className="fa-solid fa-right-from-bracket text-xs" />
            </button>
            <i className="fa-solid fa-chevron-down text-[9px] text-slate-400 ml-1 pr-1.5" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`h-screen flex overflow-hidden antialiased font-sans transition-colors duration-300 ${themeMode === 'dark' ? 'dark-mode bg-[#0c0a09]' : 'bg-slate-50 text-slate-800'}`}>
      <style>{`
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 4px rgba(16, 185, 129, 0.4); opacity: 0.8; }
          50% { box-shadow: 0 0 12px rgba(16, 185, 129, 0.8); opacity: 1; }
        }
        .status-glow-green {
          animation: statusPulse 2s infinite ease-in-out;
        }
        @keyframes statusPulseRed {
          0%, 100% { box-shadow: 0 0 4px rgba(239, 68, 68, 0.4); opacity: 0.8; }
          50% { box-shadow: 0 0 12px rgba(239, 68, 68, 0.8); opacity: 1; }
        }
        .status-glow-red {
          animation: statusPulseRed 2s infinite ease-in-out;
        }
      `}</style>

      {/* Sidebar - Desktop */}
      <aside className="hidden md:block w-60 flex-shrink-0 z-20">
        {renderSidebarContent()}
      </aside>

      {/* Sidebar - Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-450 hover:text-slate-800"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main View Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Global Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200/40 flex items-center justify-between px-6 z-10 flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition"
            >
              <i className="fa-solid fa-bars text-sm" />
            </button>

            {/* Global search */}
            <div className="relative max-w-lg w-full hidden sm:flex items-center mx-auto">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-455">
                <i className="fa-solid fa-magnifying-glass text-xs" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, templates, categories..."
                className="w-full bg-[#f4f4f5] focus:bg-white border border-slate-200/35 focus:border-[#5c3bee] rounded-full pl-10 pr-16 py-2 text-xs text-slate-805 placeholder-slate-400 font-bold outline-none transition duration-300 shadow-sm focus:shadow-md"
              />
              <div className="absolute right-3.5 flex items-center gap-0.5 pointer-events-none bg-white border border-slate-200 px-1.5 py-0.5 rounded-md text-[10px] text-slate-400 font-black shadow-sm select-none">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4.5 pl-4">
            {/* Cart Button */}
            <button 
              onClick={() => showToast('Shopping cart view coming soon!')}
              className="relative w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-655 transition cursor-pointer select-none border-0"
            >
              <i className="fa-solid fa-cart-shopping text-sm" />
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-[#5c3bee] rounded-full text-white text-[9px] font-black flex items-center justify-center shadow-md">
                3
              </span>
            </button>

            {/* Notification Bell */}
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-655 transition cursor-pointer select-none border-0">
              <i className="fa-solid fa-bell text-sm" />
            </button>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-655 transition cursor-pointer select-none border-0"
              title={themeMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {themeMode === 'light' ? (
                <i className="fa-solid fa-moon text-sm text-slate-600" />
              ) : (
                <i className="fa-solid fa-sun text-sm text-amber-500" />
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 shadow-sm relative flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80" alt="John Doe" className="object-cover w-full h-full" />
              </div>
              <div className="hidden md:flex flex-col text-left leading-none">
                <span className="text-xs font-black text-slate-800">{userEmail ? userEmail.split('@')[0] : 'John Doe'}</span>
                <span className="text-[9px] text-[#5c3bee] font-black uppercase tracking-wider mt-1">Premium Member</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content Panel */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8">
          {activeTab === 'home' && (
            <DashboardHome 
              userName={userEmail ? userEmail.split('@')[0] : 'John Doe'}
              onNavigateTab={(tab) => {
                if (tab === 'browse_products') setActiveTab('templates');
                if (tab === 'categories') setActiveTab('templates');
                if (tab === 'downloads') setActiveTab('projects');
              }}
              wishlistCount={wishlistCount}
              onUpdateWishlist={setWishlistCount}
              showToast={showToast}
            />
          )}

          {(activeTab === 'projects' || activeTab === 'downloads') && (
            <section className="space-y-6 max-w-[1440px] mx-auto animate-fade-in text-left">
              <div className="flex justify-between items-center border-b border-slate-200/50 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#f5f3ff] border border-[#eae8ff] flex items-center justify-center text-[#5c3bee] shadow-sm flex-shrink-0">
                    <i className="fa-solid fa-folder text-lg" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      My Website Workspaces
                    </h2>
                    <p className="text-xs text-slate-500 font-semibold">
                      Manage your websites, edit designs, and sync with backend.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-5 py-2.5 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-xs font-black rounded-xl shadow-md shadow-indigo-100 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider flex items-center gap-1.5 border-0"
                >
                  <span>+</span>
                  <span>Create New Workspace</span>
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <span className="w-8 h-8 border-4 border-indigo-600/35 border-t-indigo-600 rounded-full animate-spin" />
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Loading Workspace Sites...
                  </span>
                </div>
              ) : (
                <ProjectsGrid
                  projects={filteredProjects}
                  onDeleteProject={handleDelete}
                  onNavigateToTemplates={() => setActiveTab('templates')}
                />
              )}
            </section>
          )}

          {(activeTab === 'templates' || activeTab === 'browse_products' || activeTab === 'categories') && (
            <div className="space-y-8 max-w-[1440px] mx-auto animate-fade-in text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Template Marketplace
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Browse professional pre-made website themes and load them directly as active canvases.
                </p>
              </div>
              <CategoriesFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <TemplatesGrid
                selectedCategory={selectedCategory}
                onSelectTemplate={handleSelectTemplate}
              />
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="max-w-[1440px] mx-auto space-y-6 animate-fade-in text-left">
              <h2 className="text-2xl font-black text-slate-900">My Orders</h2>
              <p className="text-xs text-slate-505 font-semibold">Track and manage your product purchases and templates licenses.</p>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm divide-y divide-slate-100">
                {[
                  { id: 'ORD-84920', date: 'June 22, 2026', title: 'Minimal Digital Planner', price: '$19.00', status: 'Delivered', icon: '📝' },
                  { id: 'ORD-73910', date: 'June 18, 2026', title: 'Notion Business OS', price: '$29.00', status: 'Delivered', icon: '📓' },
                  { id: 'ORD-62810', date: 'June 10, 2026', title: 'Brand Guidelines Kit', price: '$25.00', status: 'Delivered', icon: '📦' }
                ].map((order, idx) => (
                  <div key={idx} className="py-4 flex items-center justify-between first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3.5">
                      <span className="text-2xl">{order.icon}</span>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-800">{order.title}</h4>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">{order.id} • {order.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-indigo-650">{order.price}</span>
                      <span className="block text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded mt-1.5">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="max-w-[1440px] mx-auto space-y-6 animate-fade-in text-left">
              <h2 className="text-2xl font-black text-slate-900">My Wishlist</h2>
              <p className="text-xs text-slate-505 font-semibold">Saved products and templates you plan to purchase later.</p>
              {wishlistCount === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-200 border-dashed rounded-3xl text-slate-400 font-bold text-sm">
                  Your wishlist is empty. Explore products to add them here!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { id: 'tp1', name: 'Minimal Digital Planner', category: 'Digital Planners', price: 19.00, rating: 4.9, imageUrl: '/images/builder_canvas.png' },
                    { id: 'tp2', name: 'Notion Business OS', category: 'Notion Templates', price: 29.00, rating: 4.8, imageUrl: '/images/clinic_template.png' },
                    { id: 'tp3', name: 'Brand Guidelines Kit', category: 'Design Assets', price: 25.00, rating: 4.9, imageUrl: '/images/gym_template.png' }
                  ].slice(0, Math.min(3, wishlistCount)).map((product) => (
                    <div key={product.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <div className="h-32 bg-slate-50 relative">
                        <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-[9px] font-black text-slate-400 uppercase">{product.category}</span>
                        <h4 className="text-xs font-extrabold text-slate-850 truncate">{product.name}</h4>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                          <span className="text-xs font-black text-indigo-650">${product.price.toFixed(2)}</span>
                          <button 
                            onClick={() => {
                              setWishlistCount(prev => Math.max(0, prev - 1));
                              showToast(`Removed "${product.name}" from your wishlist.`);
                            }}
                            className="text-[10px] text-rose-500 hover:text-rose-700 font-bold bg-transparent border-0 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-[1440px] mx-auto space-y-6 animate-fade-in text-left">
              <h2 className="text-2xl font-black text-slate-900">Product Reviews</h2>
              <p className="text-xs text-slate-500 font-semibold">Feedback and ratings you've submitted for templates and assets.</p>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 divide-y divide-slate-100">
                {[
                  { title: 'Minimal Digital Planner', rating: 5, date: 'June 15, 2026', comment: 'Absolutely stunning design, fits my daily routine perfectly. Highly recommended!' },
                  { title: 'Notion Business OS', rating: 4, date: 'June 02, 2026', comment: 'Great structure, very helpful for organizing my team workflows. Uptime sync is flawless.' }
                ].map((rev, idx) => (
                  <div key={idx} className="pt-6 first:pt-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-850">{rev.title}</h4>
                        <div className="flex text-amber-400 text-xs mt-1">
                          {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">{rev.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed mt-2">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="max-w-[1440px] mx-auto h-[550px] bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col overflow-hidden animate-fade-in text-left">
              <div className="p-4 border-b border-slate-150/65 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#5c3bee] text-white flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-wand-magic-sparkles text-xs" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-850">ZatBiz Sidekick AI</h4>
                    <span className="text-[9px] text-emerald-600 font-black flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                      Online Assistant
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Scrollable messages area */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/30">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#5c3bee] text-white flex items-center justify-center text-xs flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl p-3 max-w-md text-xs font-semibold text-slate-800 shadow-sm leading-relaxed">
                    Hello! I am your ZatBiz AI Creator Assistant. How can I help you customize your digital product hub or generate a themed website workspace today?
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-slate-150/65 bg-white">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  showToast('Sidekick query sent!');
                }} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type your message to Sidekick..." 
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-650 rounded-xl px-4 py-2.5 text-xs text-slate-850 placeholder-slate-400 font-bold outline-none"
                  />
                  <button type="submit" className="px-5 py-2.5 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-xs font-black rounded-xl transition cursor-pointer border-0">
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'themes' && (
            <div className="space-y-8 max-w-[1440px] mx-auto animate-fade-in pb-16">
              {/* Header */}
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Online Store Themes
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Manage and customize the templates used for your online storefront. Publish themes instantly to your active workspace.
                </p>
              </div>

              {/* Active Theme Card */}
              {(() => {
                const activeTheme = THEMES_30.find(t => t.id === activeThemeId) || THEMES_30[0];
                return (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center gap-8 text-left">
                    {/* Visual box */}
                    <div className={`w-full md:w-64 h-40 rounded-2xl bg-gradient-to-tr ${activeTheme.gradient} flex flex-col items-center justify-center text-white relative shadow-inner overflow-hidden flex-shrink-0`}>
                      <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-extrabold">Active Theme</div>
                      <span className="text-5xl drop-shadow-md">{activeTheme.icon}</span>
                      <p className="text-sm font-black uppercase tracking-wider mt-3 text-center px-4 drop-shadow">{activeTheme.name}</p>
                    </div>

                    {/* Details and CTAs */}
                    <div className="flex-1 space-y-4">
                      <div className="space-y-1.5">
                        <span className="bg-indigo-50 border border-indigo-150 text-indigo-700 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                          {activeTheme.industry}
                        </span>
                        <h3 className="text-base font-black text-slate-900">{activeTheme.name}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                          {activeTheme.desc}
                        </p>
                        <p className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-1.5 pt-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 status-glow-green" />
                          Live storefront template synced with database.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            if (projects.length > 0) {
                              router.push(`/builder/${projects[0].id}`);
                            } else {
                              showToast('Please customize via visual workspaces or build a theme first.', true);
                            }
                          }}
                          className="px-5 py-2.5 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                        >
                          <i className="fa-solid fa-pencil text-[10px]" />
                          <span>Customize</span>
                        </button>
                        <button
                          onClick={() => handlePreviewTheme(activeTheme)}
                          className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm transition cursor-pointer"
                        >
                          <i className="fa-solid fa-eye text-[10px] mr-1.5" />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Theme Library Section */}
              <div className="space-y-4 pt-4 text-left">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">
                  Theme Library
                </h3>
                {downloadedThemes.filter(id => id !== activeThemeId).length === 0 ? (
                  <div className="text-center py-8 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold">
                    No other themes downloaded. Browse the Theme Store below to install more!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {THEMES_30.filter(t => downloadedThemes.includes(t.id) && t.id !== activeThemeId).map(theme => (
                      <div key={theme.id} className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition duration-300">
                        <div className={`w-20 h-20 rounded-xl bg-gradient-to-tr ${theme.gradient} flex items-center justify-center text-white text-3xl shadow-inner flex-shrink-0`}>
                          {theme.icon}
                        </div>
                        <div className="flex-1 min-w-0 text-left space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-black text-slate-900 truncate">{theme.name}</h4>
                            <span className="text-[8px] bg-slate-100 text-slate-500 font-extrabold px-1.5 py-0.5 rounded-full uppercase truncate">
                              {theme.industry}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-455 line-clamp-2 font-medium">
                            {theme.desc}
                          </p>
                          <div className="flex items-center gap-2 pt-1.5">
                            <button
                              onClick={() => handlePublishTheme(theme)}
                              disabled={isPublishingMap[theme.id]}
                              className="px-2.5 py-1 bg-slate-900 hover:bg-black disabled:bg-slate-350 text-white text-[9px] font-black rounded uppercase tracking-wider cursor-pointer flex items-center gap-1"
                            >
                              {isPublishingMap[theme.id] ? (
                                <>
                                  <span className="w-2.5 h-2.5 border border-white border-t-transparent rounded-full animate-spin" />
                                  <span>Publishing...</span>
                                </>
                              ) : (
                                <span>Publish</span>
                              )}
                            </button>
                            <button
                              onClick={() => handlePreviewTheme(theme)}
                              className="px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[9px] font-bold rounded cursor-pointer"
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => handleRemoveTheme(theme.id, theme.name)}
                              className="text-[9px] text-slate-400 hover:text-rose-600 font-bold px-1.5 transition cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Store / Marketplace */}
              <div className="space-y-6 pt-6 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/50 pb-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                      Theme Store
                    </h3>
                    <p className="text-[11px] text-slate-400 font-semibold">
                      Explore 30 stunning themes across various industries. Download to add to your library.
                    </p>
                  </div>
                  {/* Theme Search */}
                  <div className="relative w-full sm:w-64">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <i className="fa-solid fa-magnifying-glass text-[10px]" />
                    </span>
                    <input
                      type="text"
                      value={searchThemeQuery}
                      onChange={(e) => setSearchThemeQuery(e.target.value)}
                      placeholder="Search industry themes..."
                      className="w-full bg-white border border-slate-250 focus:border-[#5c3bee] rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 font-bold outline-none transition"
                    />
                  </div>
                </div>

                {/* Category filtering chips */}
                <div className="flex flex-wrap gap-2">
                  {['All', 'Fashion', 'Electronics', 'Grocery', 'Health & Beauty', 'Pets', 'Books & Media', 'Real Estate', 'Automotive', 'Travel', 'Sports & Fitness', 'Restaurants/Food', 'Education', 'Florist/Gifts', 'Toys & Kids'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedThemeCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-black tracking-wider transition-all duration-200 cursor-pointer ${
                        selectedThemeCategory === cat
                          ? 'bg-[#5c3bee] text-white shadow-sm'
                          : 'bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Themes list grid */}
                {(() => {
                  const filteredThemes = THEMES_30.filter(t => {
                    const matchesSearch = t.name.toLowerCase().includes(searchThemeQuery.toLowerCase()) ||
                                          t.desc.toLowerCase().includes(searchThemeQuery.toLowerCase()) ||
                                          t.industry.toLowerCase().includes(searchThemeQuery.toLowerCase());
                    const matchesCat = selectedThemeCategory === 'All' || t.industry === selectedThemeCategory;
                    return matchesSearch && matchesCat;
                  });

                  if (filteredThemes.length === 0) {
                    return (
                      <div className="text-center py-12 bg-white border border-slate-200 rounded-3xl text-slate-400 font-bold text-xs max-w-md mx-auto">
                        No themes found matching "{searchThemeQuery}" in category "{selectedThemeCategory}".
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filteredThemes.map(theme => {
                        const isDownloaded = downloadedThemes.includes(theme.id);
                        const isActive = activeThemeId === theme.id;
                        return (
                          <div key={theme.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                            {/* Graphic box header */}
                            <div className={`w-full h-36 bg-gradient-to-tr ${theme.gradient} flex flex-col items-center justify-center text-white relative shadow-inner overflow-hidden`}>
                              <div className="absolute top-2.5 left-2.5 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">{theme.industry}</div>
                              {isActive && (
                                <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                  <span>Active</span>
                                </div>
                              )}
                              <span className="text-4xl group-hover:scale-110 transition duration-300">{theme.icon}</span>
                              <p className="text-xs font-black uppercase tracking-wider mt-2.5 text-center px-4 drop-shadow">{theme.name}</p>
                            </div>

                            {/* Details and actions */}
                            <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                              <div className="space-y-1">
                                <h4 className="text-xs font-black text-slate-805">{theme.name}</h4>
                                <p className="text-[10px] text-slate-455 leading-relaxed line-clamp-3 font-semibold">
                                  {theme.desc}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                                {isActive ? (
                                  <span className="flex-1 py-2 text-center text-[10px] font-extrabold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100">
                                    Active Theme
                                  </span>
                                ) : isDownloaded ? (
                                  <button
                                    onClick={() => handlePublishTheme(theme)}
                                    disabled={isPublishingMap[theme.id]}
                                    className="flex-1 py-2 bg-slate-900 hover:bg-black text-white text-[10px] font-black rounded-lg uppercase tracking-wider cursor-pointer transition flex items-center justify-center gap-1"
                                  >
                                    {isPublishingMap[theme.id] ? (
                                      <>
                                        <span className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Publishing...</span>
                                      </>
                                    ) : (
                                      <span>Publish</span>
                                    )}
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleDownloadTheme(theme)}
                                    disabled={isDownloadingMap[theme.id]}
                                    className="flex-1 py-2 bg-[#5c3bee] hover:bg-[#4f46e5] disabled:bg-slate-200 disabled:text-slate-400 text-white text-[10px] font-black rounded-lg uppercase tracking-wider cursor-pointer transition flex items-center justify-center gap-1"
                                  >
                                    {isDownloadingMap[theme.id] ? (
                                      <>
                                        <span className="w-2.5 h-2.5 border-2 border-slate-450 border-t-transparent rounded-full animate-spin" />
                                        <span>Downloading...</span>
                                      </>
                                    ) : (
                                      <span>Download</span>
                                    )}
                                  </button>
                                )}
                                <button
                                  onClick={() => handlePreviewTheme(theme)}
                                  className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-[10px] font-bold rounded-lg transition cursor-pointer"
                                >
                                  Preview
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="max-w-[1440px] mx-auto space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Analytics & Backend Telemetry
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Monitor live performance of synced websites and Spring Boot repository interactions.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Visitor Conversion Rate</span>
                    <p className="text-3xl font-black text-indigo-900 mt-2">2.4%</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 border border-emerald-150 px-1.5 py-0.5 rounded"><i className="fa-solid fa-caret-up" /> +0.8%</span>
                      <span className="text-[10px] text-slate-400 font-medium">vs last month</span>
                    </div>
                  </div>
                  {/* CSS Visual Bar Chart */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Header Clicks</span>
                      <span>54%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: '54%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Hero CTA Clicks</span>
                      <span>72%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-650 h-full rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Database Repository Syncs</span>
                    <p className="text-3xl font-black text-slate-900 mt-2">842</p>
                    <span className="text-[10px] text-indigo-600 font-extrabold bg-indigo-50 border border-indigo-150 px-2 py-0.5 rounded mt-2 inline-block"><i className="fa-solid fa-cloud-arrow-up" /> Active Session Pool</span>
                  </div>
                  {/* Sync load representation */}
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
                      <span>Query Event Type</span>
                      <span>Count</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-650">
                      <span>project_layout_load</span>
                      <span className="font-extrabold text-slate-805">428 times</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-655">
                      <span>project_layout_save</span>
                      <span className="font-extrabold text-slate-805">361 times</span>
                    </div>
                    <div className="flex justify-between font-semibold text-slate-655">
                      <span>project_layout_delete</span>
                      <span className="font-extrabold text-slate-805">53 times</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Server Response Time</span>
                    <p className="text-3xl font-black text-emerald-600 mt-2">42 ms</p>
                    <span className="text-[10px] text-slate-455 font-medium mt-1 inline-block">Average API ping under Hibernate load</span>
                  </div>
                  <div className="pt-2 flex items-center gap-3 bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4">
                    <span className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin" />
                    <span className="text-[10px] text-slate-550 font-black uppercase tracking-wider">Live monitor running</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200/50 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] animate-fade-in">
              <div className="border-b border-slate-200 pb-5 mb-6">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  API & Settings Configuration
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  Adjust developer connection settings and JPA repository persistence variables.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Spring Boot API Server Endpoint
                  </label>
                  <input
                    type="url"
                    required
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                    placeholder="e.g. http://localhost:8080"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-550 focus:bg-white rounded-xl px-4 py-2.5 text-xs text-slate-900 outline-none transition"
                  />
                  <p className="text-[10px] text-slate-450 font-medium mt-1.5">
                    This address points to the running backend Spring Boot REST services responsible for storing layouts.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-bold text-slate-605 uppercase tracking-wider">
                    Database Driver
                  </span>
                  <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-800">Spring JPA / Hibernate ORM</p>
                      <p className="text-[10px] text-slate-455 font-medium">Schema initialized via H2 memory tables</p>
                    </div>
                    <span className="bg-indigo-50 px-2 py-0.5 rounded text-[10px] font-bold text-indigo-755">Active</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="block text-xs font-bold text-slate-605 uppercase tracking-wider">
                    Developer Telemetry Logs
                  </span>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-slate-350 text-indigo-650 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-600">Auto-capture query response latency metrics</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-slate-350 text-indigo-650 cursor-pointer"
                    />
                    <span className="text-xs font-medium text-slate-600">Print Hibernate transaction traces to console</span>
                  </label>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow transition"
                  >
                    Save & Test Connection
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'superadmin' && userEmail === 'admin@gmail.com' && (
            <SuperAdminPanel />
          )}
        </main>
      </div>

      {/* Create Blank Project Modal Dialog */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-[480px] p-8 bg-white rounded-3xl border border-slate-200/60 shadow-2xl relative animate-fade-in text-left">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-widest">
                Create Blank Website
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer text-sm w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-50 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEmpty} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  required
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. My Custom Shop"
                  className="w-full bg-slate-50 border border-slate-200/80 focus:border-indigo-550 focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none transition duration-200 focus:shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                  Description Details
                </label>
                <textarea
                  required
                  rows={3}
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Brief description of the website..."
                  className="w-full bg-slate-50 border border-slate-200/80 focus:border-indigo-550 focus:bg-white rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 outline-none transition duration-200 resize-none focus:shadow-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4.5 py-2.5 text-xs font-bold border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition cursor-pointer uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98]"
                >
                  Initialize Canvas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Theme Selection Modal for Template personalization */}
      {isThemeSelectorOpen && themeSelectorTemplateId && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center text-2xl shadow-inner animate-pulse">
                  {themeSelectorTemplateId === 'scratch' ? '✨' : '🎨'}
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Personalize your Template</span>
                    <span className="bg-indigo-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                      {themeSelectorTemplateId}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Select a theme to apply layout styling, custom banner visuals, and seed standard product items.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsThemeSelectorOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Inputs, Search and Filters */}
            <div className="p-6 border-b border-slate-100 flex flex-col gap-4 flex-shrink-0">
              {/* Store Name Input */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-slate-50/85 p-4.5 rounded-2xl border border-slate-100">
                <div className="md:col-span-2 space-y-1.5 text-left">
                  <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                    Company / Store Name
                  </label>
                  <input
                    type="text"
                    value={themeSelectorCompanyName}
                    onChange={(e) => setThemeSelectorCompanyName(e.target.value)}
                    placeholder="Enter your store/company name..."
                    className="w-full bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-xs font-semibold text-slate-800 transition"
                  />
                </div>
                <div>
                  <button
                    onClick={handleApplyThemeAndCreateWorkspace}
                    disabled={isCreatingThemedWorkspace || !selectedThemeIdInSelector}
                    className={`w-full py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                      selectedThemeIdInSelector 
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-[1.02] active:scale-[0.98]' 
                        : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                    }`}
                  >
                    {isCreatingThemedWorkspace ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Initializing...</span>
                      </>
                    ) : (
                      <>
                        <span>Apply & Create ➔</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col md:flex-row items-center gap-4 justify-between pt-2">
                <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                  {['All', 'Fashion', 'Grocery', 'Electronics', 'Restaurants/Food', 'Pets', 'Health & Beauty', 'Real Estate', 'Sports & Fitness'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setThemeSelectorCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        themeSelectorCategory === cat
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-655 hover:bg-slate-200/80'
                      }`}
                    >
                      {cat === 'All' ? '🌐 All Industries' : cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64 flex-shrink-0">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 select-none">🔍</span>
                  <input
                    type="text"
                    value={themeSelectorSearchQuery}
                    onChange={(e) => setThemeSelectorSearchQuery(e.target.value)}
                    placeholder="Search themes..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-1.8 text-xs font-semibold transition"
                  />
                </div>
              </div>
            </div>

            {/* Grid of 30 themes */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {THEMES_30.filter((theme) => {
                  if (themeSelectorCategory !== 'All' && theme.industry !== themeSelectorCategory) {
                    return false;
                  }
                  if (themeSelectorSearchQuery.trim()) {
                    const query = themeSelectorSearchQuery.toLowerCase();
                    const matchName = theme.name.toLowerCase().includes(query);
                    const matchDesc = theme.desc.toLowerCase().includes(query);
                    const matchInd = theme.industry.toLowerCase().includes(query);
                    if (!matchName && !matchDesc && !matchInd) return false;
                  }
                  return true;
                }).map((theme) => {
                  const isSelected = selectedThemeIdInSelector === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => {
                        setSelectedThemeIdInSelector(theme.id);
                        if (!themeSelectorCompanyName.trim()) {
                          setThemeSelectorCompanyName(theme.name);
                        }
                      }}
                      className={`group flex flex-col bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative cursor-pointer text-left ${
                        isSelected 
                          ? 'border-indigo-600 ring-2 ring-indigo-500/25 scale-[1.01]' 
                          : 'border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      {/* Active Indicator checkmark */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-black shadow-md z-30">
                          ✓
                        </div>
                      )}

                      {/* Cover image or gradient header */}
                      <div className="w-full h-24 overflow-hidden relative bg-slate-900 border-b border-slate-100 flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-tr ${theme.gradient} opacity-20 z-10`} />
                        <img 
                          src={theme.bannerImageUrl} 
                          alt={theme.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Floating Emoji Icon Badge */}
                        <div className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-base absolute bottom-2 left-3 z-20">
                          {theme.icon}
                        </div>
                      </div>

                      {/* Contents */}
                      <div className="p-4.5 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-black text-slate-850 tracking-tight uppercase line-clamp-1">
                              {theme.name}
                            </h3>
                            <span className="bg-slate-100 text-slate-650 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                              {theme.industry}
                            </span>
                          </div>
                          
                          <p className="text-[10px] text-slate-400 font-bold italic line-clamp-1">
                            "{theme.tagline}"
                          </p>

                          <p className="text-[10px] text-slate-500 leading-normal font-semibold line-clamp-2">
                            {theme.desc}
                          </p>

                          {/* Color Swatches */}
                          <div className="flex items-center gap-1.5 pt-2">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mr-1">Colors:</span>
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: theme.primaryColor }} title="Primary Color" />
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: theme.secondaryColor }} title="Secondary Color" />
                            <span className="w-3.5 h-3.5 rounded-full border border-slate-200 shadow-sm" style={{ backgroundColor: theme.bgColor }} title="Bg Color" />
                          </div>
                        </div>

                        {/* Card CTA Buttons */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreviewTheme(theme);
                              setPreviewPage('home');
                              setThemePreviewModalOpen(true);
                            }}
                            className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-705 font-bold rounded-lg text-[10px] transition text-center"
                          >
                            👁 Preview Live
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedThemeIdInSelector(theme.id);
                              if (!themeSelectorCompanyName.trim()) {
                                setThemeSelectorCompanyName(theme.name);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-lg font-black text-[10px] uppercase tracking-wider transition ${
                              isSelected
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Restaurant Category Selector Modal */}
      {isRestaurantSelectorOpen && (
        <RestaurantSelectorModal
          isOpen={isRestaurantSelectorOpen}
          onClose={() => setIsRestaurantSelectorOpen(false)}
          onSelectCategory={(category, configData) => {
            setIsRestaurantSelectorOpen(false);
            setSelectedTemplateId('restaurant');
            setSelectedRestaurantCategory(category);
            setSelectedRestaurantConfig(configData);
            setIsWizardOpen(true);
          }}
        />
      )}

      {/* Hospital Category Selector Modal */}
      {isHospitalSelectorOpen && (
        <HospitalSelectorModal
          isOpen={isHospitalSelectorOpen}
          onClose={() => setIsHospitalSelectorOpen(false)}
          onSelectCategory={(category) => {
            setIsHospitalSelectorOpen(false);
            setSelectedTemplateId('clinic');
            setSelectedHospitalCategory(category);
            setIsWizardOpen(true);
          }}
          onBuildFromScratch={() => {
            setIsHospitalSelectorOpen(false);
            setSelectedTemplateId('clinic');
            setSelectedHospitalCategory(null);
            setIsWizardOpen(true);
          }}
        />
      )}

      {/* Medical Shop Category Selector Modal */}
      {isMedicalShopSelectorOpen && (
        <MedicalShopSelectorModal
          isOpen={isMedicalShopSelectorOpen}
          onClose={() => setIsMedicalShopSelectorOpen(false)}
          onSelectCategory={(category, configData) => {
            setIsMedicalShopSelectorOpen(false);
            setSelectedTemplateId('medical-shop');
            setSelectedMedicalShopConfig(configData);
            setIsWizardOpen(true);
          }}
        />
      )}

      {/* Gym Category Selector Modal */}
      {isGymSelectorOpen && (
        <GymSelectorModal
          isOpen={isGymSelectorOpen}
          onClose={() => setIsGymSelectorOpen(false)}
          onSelectCategory={(category, config) => {
            setIsGymSelectorOpen(false);
            setSelectedTemplateId('gym');
            setSelectedGymCategory(category);
            setSelectedGymThemeId(config.selectedTheme);
            setSelectedGymThemeColor(config.themeColor);
            setSelectedGymConfig(config);
            setIsWizardOpen(true);
          }}
          onBuildFromScratch={() => {
            setIsGymSelectorOpen(false);
            setSelectedTemplateId('gym');
            setSelectedGymCategory(null);
            setSelectedGymThemeId(null);
            setSelectedGymThemeColor(null);
            setSelectedGymConfig(null);
            setIsWizardOpen(true);
          }}
        />
      )}

      {/* Real Estate Category Selector Modal */}
      {isRealEstateSelectorOpen && (
        <RealEstateSelectorModal
          isOpen={isRealEstateSelectorOpen}
          onClose={() => setIsRealEstateSelectorOpen(false)}
          onSelectCategory={(category, themeId, themeColor) => {
            setIsRealEstateSelectorOpen(false);
            setSelectedTemplateId('realestate');
            setSelectedRealEstateCategory(category);
            setSelectedRealEstateThemeId(themeId);
            setSelectedRealEstateThemeColor(themeColor);
            setIsWizardOpen(true);
          }}
          onBuildFromScratch={() => {
            setIsRealEstateSelectorOpen(false);
            setSelectedTemplateId('realestate');
            setSelectedRealEstateCategory(null);
            setSelectedRealEstateThemeId(null);
            setSelectedRealEstateThemeColor(null);
            setIsWizardOpen(true);
          }}
        />
      )}

      {/* Wedding Category Selector Modal */}
      {isWeddingSelectorOpen && (
        <WeddingSelectorModal
          isOpen={isWeddingSelectorOpen}
          onClose={() => setIsWeddingSelectorOpen(false)}
          onSelectCategory={(category) => {
            setIsWeddingSelectorOpen(false);
            setSelectedTemplateId('wedding');
            setSelectedWeddingCategory(category);
            setIsWizardOpen(true);
          }}
          onBuildFromScratch={() => {
            setIsWeddingSelectorOpen(false);
            setSelectedTemplateId('wedding');
            setSelectedWeddingCategory(null);
            setIsWizardOpen(true);
          }}
        />
      )}

      {/* NGO Category Selector Modal */}
      {isNgoSelectorOpen && (
        <DynamicCategorySelectorModal
          isOpen={isNgoSelectorOpen}
          onClose={() => setIsNgoSelectorOpen(false)}
          emoji="🤝"
          title="NGO & Non-Profit Categories"
          searchPlaceholder="Search NGO subcategory..."
          footerText="NGO subcategories initialize campaign features and donor modules."
          categories={[
            { id: 'charity', name: 'Charity', icon: '❤️', desc: 'Fundraising campaigns, donor relations, and volunteer mobilization.', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80' },
            { id: 'religious-org', name: 'Religious Organization', icon: '⛪', desc: 'Community worship, event calendars, and spiritual guidance.', image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&auto=format&fit=crop&q=80' },
            { id: 'community-org', name: 'Community Organization', icon: '🏡', desc: 'Neighborhood associations, local projects, and social services.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&auto=format&fit=crop&q=80' },
            { id: 'political-campaign', name: 'Political Campaign', icon: '📢', desc: 'Elections, candidate profiling, volunteers, and donations.', image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&auto=format&fit=crop&q=80' }
          ]}
          onSelectCategory={(category) => {
            setIsNgoSelectorOpen(false);
            setSelectedTemplateId('ngo');
            setSelectedNgoCategory(category);
            setIsWizardOpen(true);
          }}
          onBuildFromScratch={() => {
            setIsNgoSelectorOpen(false);
            setSelectedTemplateId('ngo');
            setSelectedNgoCategory(null);
            setIsWizardOpen(true);
          }}
        />
      )}

      {/* Corporate Category Selector Modal */}
      {isCorporateSelectorOpen && (
        <DynamicCategorySelectorModal
          isOpen={isCorporateSelectorOpen}
          onClose={() => setIsCorporateSelectorOpen(false)}
          emoji="🏢"
          title="Corporate Niche Categories"
          searchPlaceholder="Search corporate subcategory..."
          footerText="Corporate niches initialize professional portfolios and forms."
          categories={[
            { id: 'business-consulting', name: 'Business Consulting', icon: '📈', desc: 'Strategic advice, financial auditing, and growth consulting.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80' },
            { id: 'startup-company', name: 'Startup Company', icon: '🚀', desc: 'Venture pitches, tech innovate showcases, and landing page details.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80' },
            { id: 'it-company', name: 'IT Company', icon: '💻', desc: 'Managed IT support, network administration, and helpdesk solutions.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80' },
            { id: 'software-company', name: 'Software Company', icon: '⚙️', desc: 'SaaS platforms, application engineering, and custom software.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80' },
            { id: 'digital-marketing', name: 'Digital Marketing Agency', icon: '📣', desc: 'SEO, SEM, social media management, and online advertising.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80' },
            { id: 'advertising-agency', name: 'Advertising Agency', icon: '🎨', desc: 'Creative campaigns, print ads, billboards, and media buying.', image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=600&auto=format&fit=crop&q=80' },
            { id: 'creative-agency', name: 'Creative Agency', icon: '✨', desc: 'Graphic design, web experiences, content creation, and copywriting.', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80' },
            { id: 'branding-agency', name: 'Branding Agency', icon: '🏷️', desc: 'Brand guidelines, logo identity, positioning, and strategy.', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&auto=format&fit=crop&q=80' },
            { id: 'hr-consultancy', name: 'HR Consultancy', icon: '👥', desc: 'Recruitment, talent acquisition, payroll, and corporate training.', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&auto=format&fit=crop&q=80' },
            { id: 'accounting-firm', name: 'Accounting Firm', icon: '📊', desc: 'Bookkeeping, balance sheets, payroll audit, and accounts prep.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80' },
            { id: 'ca-tax-consultant', name: 'CA & Tax Consultant', icon: '⚖️', desc: 'Corporate taxation, chartered accountancy, and tax returns.', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80' },
            { id: 'legal-firm', name: 'Legal Firm', icon: '💼', desc: 'Corporate compliance, litigation, contract drafting, and counsel.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=80' },
            { id: 'lawyer-website', name: 'Lawyer Website', icon: '⚖️', desc: 'Individual attorney profiles, consultation booking, and case records.', image: 'https://images.unsplash.com/photo-1505664194779-8bebcb95c02e?w=600&auto=format&fit=crop&q=80' },
            { id: 'insurance-agency', name: 'Insurance Agency', icon: '🛡️', desc: 'Health, home, auto, and commercial insurance coverage plans.', image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80' }
          ]}
          onSelectCategory={(category) => {
            setIsCorporateSelectorOpen(false);
            setSelectedTemplateId('corporate');
            setSelectedCorporateCategory(category);
            setIsWizardOpen(true);
          }}
          onBuildFromScratch={() => {
            setIsCorporateSelectorOpen(false);
            setSelectedTemplateId('corporate');
            setSelectedCorporateCategory(null);
            setIsWizardOpen(true);
          }}
        />
      )}

      {/* Onboarding Template Customizer Modal Dialog */}
      {isWizardOpen && (
        <BusinessWizard
          isOpen={isWizardOpen}
          initialTemplateId={selectedTemplateId}
          initialRestaurantCategory={selectedRestaurantCategory}
          initialHospitalCategory={selectedHospitalCategory}
          initialGymCategory={selectedGymCategory}
          initialGymThemeId={selectedGymThemeId}
          initialGymThemeColor={selectedGymThemeColor}
          initialRealEstateCategory={selectedRealEstateCategory}
          initialRealEstateThemeId={selectedRealEstateThemeId}
          initialRealEstateThemeColor={selectedRealEstateThemeColor}
          initialWeddingCategory={selectedWeddingCategory}
          initialNgoCategory={selectedNgoCategory}
          initialCorporateCategory={selectedCorporateCategory}
          initialMedicalShopConfig={selectedMedicalShopConfig}
          initialRestaurantConfig={selectedRestaurantConfig}
          initialGymConfig={selectedGymConfig}
          projects={projects}
          onClose={() => {
            setIsWizardOpen(false);
            setSelectedTemplateId(null);
            setSelectedRestaurantCategory(null);
            setSelectedHospitalCategory(null);
            setSelectedGymCategory(null);
            setSelectedGymThemeId(null);
            setSelectedGymThemeColor(null);
            setSelectedGymConfig(null);
            setSelectedRealEstateCategory(null);
            setSelectedRealEstateThemeId(null);
            setSelectedRealEstateThemeColor(null);
            setSelectedWeddingCategory(null);
            setSelectedNgoCategory(null);
            setSelectedCorporateCategory(null);
            setSelectedMedicalShopConfig(null);
            setSelectedRestaurantConfig(null);
          }}
          onComplete={(newProj) => {
            setProjects((prev) => [newProj, ...prev]);
            setIsWizardOpen(false);
            setSelectedMedicalShopConfig(null);
            setSelectedRestaurantConfig(null);
            setSelectedGymConfig(null);
            setActiveTab('downloads');
          }}
          showToast={showToast}
          onSelectThemeTemplates={() => {
            setIsWizardOpen(false);
            setThemeSelectorTemplateId(selectedTemplateId || 'storefront');
            setThemeSelectorCompanyName('');
            setThemeSelectorSearchQuery('');
            setThemeSelectorCategory('All');
            setSelectedThemeIdInSelector(null);
            setIsThemeSelectorOpen(true);
          }}
        />
      )}

      {/* Interactive Multi-page Theme Previewer Modal Overlay */}
      {themePreviewModalOpen && previewTheme && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex flex-col p-4 md:p-6 animate-fade-in">
          {/* Top Control Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-lg mb-4 flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0 border border-slate-100">
            {/* Theme Info */}
            <div className="flex items-center gap-3 text-left">
              <span className="text-3xl">{previewTheme.icon}</span>
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <span>{previewTheme.name}</span>
                  <span className="bg-indigo-50 border border-indigo-150 text-[#5c3bee] text-[9px] px-2 py-0.5 rounded-full font-black">
                    {previewTheme.industry}
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400 font-semibold leading-none mt-1">
                  Previewing custom layout flow
                </p>
              </div>
            </div>

            {/* Page Toggles */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              {(['home', 'login', 'dashboard'] as const).map((page) => (
                <button
                  key={page}
                  onClick={() => setPreviewPage(page)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                    previewPage === page
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {page === 'home' ? '🏠 Home Page' : page === 'login' ? '🔑 Login Page' : '📊 Dashboard'}
                </button>
              ))}
            </div>

            {/* Device Toggles & Actions */}
            <div className="flex items-center gap-3">
              {/* Device Switches */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    previewDevice === 'desktop' ? 'bg-white text-slate-905 shadow-sm' : 'text-slate-400 hover:text-slate-655'
                  }`}
                  title="Desktop Preview"
                >
                  💻 Desktop
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                    previewDevice === 'mobile' ? 'bg-white text-slate-905 shadow-sm' : 'text-slate-400 hover:text-slate-655'
                  }`}
                  title="Mobile Preview"
                >
                  📱 Mobile
                </button>
              </div>

              {/* Install / Publish Action */}
              {(() => {
                const isDownloaded = downloadedThemes.includes(previewTheme.id);
                const isActive = activeThemeId === previewTheme.id;
                
                if (isActive) {
                  return (
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-xl uppercase tracking-wider border border-emerald-250 select-none">
                      Active Theme
                    </span>
                  );
                } else if (isDownloaded) {
                  return (
                    <button
                      onClick={() => {
                        handlePublishTheme(previewTheme);
                        setThemePreviewModalOpen(false);
                      }}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-[10px] font-black rounded-xl uppercase tracking-wider cursor-pointer transition shadow-md"
                    >
                      Publish Theme
                    </button>
                  );
                } else {
                  return (
                    <button
                      onClick={() => handleDownloadTheme(previewTheme)}
                      disabled={isDownloadingMap[previewTheme.id]}
                      className="px-5 py-2.5 bg-[#5c3bee] hover:bg-[#4f46e5] text-white text-[10px] font-black rounded-xl uppercase tracking-wider cursor-pointer transition shadow-md flex items-center gap-1"
                    >
                      {isDownloadingMap[previewTheme.id] ? (
                        <>
                          <span className="w-3 h-3 border-2 border-slate-200 border-t-transparent rounded-full animate-spin" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <span>Download Theme</span>
                      )}
                    </button>
                  );
                }
              })()}

              {/* Close Button */}
              <button
                onClick={() => setThemePreviewModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-400 hover:text-slate-800 transition cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Interactive Frame Panel */}
          <div className="flex-1 overflow-y-auto bg-slate-900/40 rounded-3xl p-4 flex items-center justify-center border border-slate-800/10">
            <div
              className={`transition-all duration-350 ${
                previewDevice === 'mobile'
                  ? 'w-[375px] h-[667px] border-[10px] border-zinc-955 rounded-[45px] overflow-hidden shadow-2xl relative bg-white flex flex-col'
                  : 'w-full max-w-[1440px] h-[620px] border border-slate-200 rounded-2xl overflow-hidden shadow-2xl relative bg-white flex flex-col'
              }`}
            >
              {/* Simulated Page Content */}
              <div className="flex-1 overflow-y-auto flex flex-col bg-white">
                
                {/* 1. HOME PAGE PREVIEW */}
                {previewPage === 'home' && (
                  <div className="w-full flex flex-col text-slate-800 text-left bg-white" style={{ backgroundColor: previewTheme.bgColor }}>
                    
                    {/* Announcement Bar */}
                    <div className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-wider py-2 px-4 text-center flex items-center justify-center gap-1.5 z-20">
                      <span>📢</span>
                      <span>20% OFF STOREWIDE - Use code WELCOME at checkout!</span>
                    </div>

                    {/* Simulated Header */}
                    <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200/50 bg-white shadow-sm z-10 sticky top-0">
                      <div className="flex items-center gap-2 font-black text-sm">
                        <span className="text-xl">{previewTheme.brandIcon}</span>
                        <span className="tracking-wide">{previewTheme.name.toUpperCase()}</span>
                      </div>
                      <nav className="hidden md:flex items-center gap-5 text-[11px] font-extrabold text-slate-505 uppercase tracking-wider">
                        <span className="hover:text-black cursor-pointer">Catalog</span>
                        <span className="hover:text-black cursor-pointer">About</span>
                        <span className="hover:text-black cursor-pointer">Blog</span>
                        <span className="hover:text-black cursor-pointer">Contact</span>
                      </nav>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full cursor-pointer">
                          Cart (0)
                        </span>
                        <span className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs cursor-pointer text-slate-600 font-bold">
                          👤
                        </span>
                      </div>
                    </header>

                    {/* Simulated Image Banner */}
                    <section className="relative h-80 flex items-center justify-center text-center px-6 overflow-hidden bg-slate-950">
                      <img 
                        src={previewTheme.bannerImageUrl} 
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.45]" 
                        alt="banner" 
                      />
                      <div className="relative z-10 max-w-xl space-y-4 text-center">
                        <span className="bg-white/20 backdrop-blur text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest text-white inline-block">
                          Welcome Offer
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                          {previewTheme.name}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-202 font-semibold max-w-md mx-auto leading-relaxed">
                          {previewTheme.tagline} Discover our premium collections configured specifically for your lifestyle.
                        </p>
                        <div className="flex justify-center gap-3 pt-2">
                          <button
                            style={{ backgroundColor: previewTheme.primaryColor }}
                            className="text-white hover:opacity-90 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider shadow-md border-0 cursor-pointer"
                          >
                            Shop Catalog
                          </button>
                          <button className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider border border-white/20 cursor-pointer">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </section>

                    {/* Brand Story Section */}
                    <section className="py-12 px-6 bg-white/50 border-b border-slate-100">
                      <div className="max-w-2xl mx-auto text-center space-y-4">
                        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Our Brand Mission</h2>
                        <p className="text-xs text-slate-505 leading-relaxed font-semibold">
                          {previewTheme.desc} At {previewTheme.name}, we are dedicated to crafting high-quality products that merge form, utility, and modern details. Every item in our store is hand-curated and authenticated by experts.
                        </p>
                      </div>
                    </section>

                    {/* Simulated Products Grid */}
                    <section className="py-12 px-6 max-w-5xl mx-auto w-full">
                      <div className="text-center mb-8 space-y-1">
                        <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Featured Collection</h2>
                        <p className="text-xs text-slate-400 font-semibold">Explore trending products in our store today</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {previewTheme.products.map((p, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col justify-between">
                            <div className="h-44 bg-slate-50 flex items-center justify-center border-b border-slate-100 overflow-hidden p-2">
                              <img src={p.imageUrl} className="max-h-full max-w-full object-contain" alt={p.name} />
                            </div>
                            <div className="p-4 space-y-3">
                              <div className="space-y-1">
                                <span className="bg-slate-100 text-slate-550 text-[8px] font-black uppercase px-2 py-0.5 rounded-full inline-block">
                                  {p.category}
                                </span>
                                <h3 className="text-xs font-black text-slate-900">{p.name}</h3>
                                <p className="text-[10px] text-slate-400 leading-normal line-clamp-2 font-medium">
                                  {p.description}
                                </p>
                              </div>
                              <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-2">
                                <span className="text-xs font-black text-slate-900">₹{p.price.toLocaleString()}</span>
                                <button
                                  style={{ backgroundColor: previewTheme.primaryColor }}
                                  className="text-white text-[9px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-md hover:opacity-90 shadow-sm border-0 cursor-pointer"
                                >
                                  Buy Now
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Features section */}
                    <section className="py-8 px-6 bg-slate-50 border-b border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/50 shadow-sm">
                          <span className="text-2xl">🚚</span>
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-805">Free Express Delivery</h4>
                            <p className="text-[10px] text-slate-400 font-medium">Complimentary shipping on orders above ₹999.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/50 shadow-sm">
                          <span className="text-2xl">🔒</span>
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-805">100% Secure Checkout</h4>
                            <p className="text-[10px] text-slate-400 font-medium">Encrypted card & UPI transactions.</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200/50 shadow-sm">
                          <span className="text-2xl">🔄</span>
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-805">Easy Return Slips</h4>
                            <p className="text-[10px] text-slate-400 font-medium">30-day hassle-free refunds guarantee.</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Simulated Footer */}
                    <footer className="bg-slate-900 text-slate-400 py-10 px-6 text-center border-t border-slate-800">
                      <div className="max-w-4xl mx-auto space-y-4">
                        <div className="flex items-center justify-center gap-2 font-black text-white text-xs uppercase tracking-wider">
                          <span>{previewTheme.brandIcon}</span>
                          <span>{previewTheme.name}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold max-w-sm mx-auto">
                          Custom storefront design configured instantly to your Spring Boot H2 relational database backend.
                        </p>
                        <p className="text-[9px] text-slate-605 font-extrabold uppercase pt-4 border-t border-slate-800/60">
                          © 2026 {previewTheme.name}. All rights reserved. Powered by ZATBIZ.
                        </p>
                      </div>
                    </footer>

                  </div>
                )}

                {/* 2. LOGIN PAGE PREVIEW */}
                {previewPage === 'login' && (
                  <div className="w-full min-h-[500px] flex flex-col md:flex-row text-slate-800 text-left">
                    {/* Left Column Gradient */}
                    <div className={`flex-1 bg-gradient-to-tr ${previewTheme.gradient} text-white p-8 flex flex-col justify-between min-h-[220px] md:min-h-0`}>
                      <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
                        <span className="text-xl">{previewTheme.brandIcon}</span>
                        <span>{previewTheme.name}</span>
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-2xl font-black leading-tight">{previewTheme.name} Portal</h2>
                        <p className="text-xs opacity-90 font-medium leading-relaxed max-w-xs">
                          {previewTheme.tagline} Log in to view catalog items, process payments, and track shipment status.
                        </p>
                      </div>
                      <p className="text-[9px] opacity-60 font-semibold uppercase tracking-wider">
                        SECURED VIA PRIME-SSL 256
                      </p>
                    </div>

                    {/* Right Column Form */}
                    <div className="flex-1 bg-white p-8 flex flex-col justify-center max-w-md mx-auto w-full">
                      <div className="space-y-6">
                        <div className="space-y-1.5">
                          <h3 className="text-lg font-black text-slate-900">Welcome Back</h3>
                          <p className="text-[11px] text-slate-400 font-semibold">Please enter your credentials to log in</p>
                        </div>

                        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              Email Address
                            </label>
                            <input
                              type="email"
                              disabled
                              placeholder="customer@demo.com"
                              className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs outline-none"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              Password
                            </label>
                            <input
                              type="password"
                              disabled
                              placeholder="••••••••"
                              className="w-full bg-slate-50 border border-slate-205 rounded-xl px-4 py-2.5 text-xs outline-none"
                            />
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 pt-1">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#5c3bee]" disabled />
                              <span>Remember Me</span>
                            </label>
                            <span className="hover:text-black cursor-pointer">Forgot Password?</span>
                          </div>

                          <button
                            type="button"
                            style={{ backgroundColor: previewTheme.primaryColor }}
                            className="w-full text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:opacity-95 mt-4"
                          >
                            Sign In
                          </button>
                        </form>

                        <p className="text-center text-[10px] font-bold text-slate-400 pt-4">
                          Don't have an account?{' '}
                          <span className="text-indigo-650 hover:underline cursor-pointer">Register here</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. DASHBOARD PAGE PREVIEW */}
                {previewPage === 'dashboard' && (
                  <div className="w-full min-h-[500px] flex text-slate-800 text-left bg-slate-50">
                    {/* Simulated Mini Sidebar */}
                    <div className={`w-48 ${previewTheme.sidebarBgClass} p-4 flex flex-col justify-between flex-shrink-0 hidden sm:flex`}>
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider border-b border-white/10 pb-3">
                          <span className="text-lg">{previewTheme.brandIcon}</span>
                          <span>{previewTheme.name}</span>
                        </div>
                        <nav className="space-y-1 text-[11px] font-extrabold opacity-80">
                          <div className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded-lg cursor-pointer">
                            <span>📊</span>
                            <span>Overview</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer">
                            <span>📦</span>
                            <span>Products</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer">
                            <span>🛒</span>
                            <span>Orders</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer">
                            <span>👤</span>
                            <span>Customers</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg cursor-pointer">
                            <span>⚙️</span>
                            <span>Settings</span>
                          </div>
                        </nav>
                      </div>
                      <div className="text-[9px] opacity-40 font-semibold uppercase tracking-wider">
                        PORTAL VERSION 1.4
                      </div>
                    </div>

                    {/* Simulated Main Dashboard View */}
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                      {/* Top Bar */}
                      <header className="flex justify-between items-center border-b border-slate-200/60 pb-4">
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">{previewTheme.name} Dashboard</h3>
                          <p className="text-[10px] text-slate-400 font-semibold">Welcome back, Administrator</p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase flex items-center gap-1 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Database Online
                        </span>
                      </header>

                      {/* Stat Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200/50 shadow-sm text-left">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Sales Revenue</span>
                          <p className="text-lg font-black text-slate-900 mt-1">₹1,48,200</p>
                          <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-2">
                            ▲ +12% this week
                          </span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200/50 shadow-sm text-left">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Storefront Checkout Orders</span>
                          <p className="text-lg font-black text-slate-900 mt-1">214 Orders</p>
                          <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-2">
                            ▲ +8% conversion
                          </span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200/50 shadow-sm text-left">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Low Stock Alert Items</span>
                          <p className="text-lg font-black text-slate-900 mt-1">0 Items</p>
                          <span className="text-[9px] text-slate-400 font-extrabold bg-slate-50 px-1.5 py-0.5 rounded inline-block mt-2 border border-slate-100">
                            Stock level normal
                          </span>
                        </div>
                      </div>

                      {/* Order Data Table */}
                      <div className="bg-white rounded-xl border border-slate-200/50 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent Orders (Simulated)</h4>
                        </div>
                        <div className="overflow-x-auto text-[11px]">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-150 font-black text-slate-405 uppercase tracking-wider">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Product Ordered</th>
                                <th className="p-3">Subtotal</th>
                                <th className="p-3">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-semibold text-slate-655">
                              <tr>
                                <td className="p-3 font-black">#ORD-9042</td>
                                <td className="p-3">Rahul Sharma</td>
                                <td className="p-3">{previewTheme.products[0].name}</td>
                                <td className="p-3 font-bold">₹{previewTheme.products[0].price}</td>
                                <td className="p-3"><span className="px-2 py-0.5 bg-emerald-55 text-emerald-700 rounded text-[9px] font-black uppercase">Delivered</span></td>
                              </tr>
                              <tr>
                                <td className="p-3 font-black">#ORD-9041</td>
                                <td className="p-3">Pooja Patel</td>
                                <td className="p-3">{previewTheme.products[1].name}</td>
                                <td className="p-3 font-bold">₹{previewTheme.products[1].price}</td>
                                <td className="p-3"><span className="px-2 py-0.5 bg-amber-55 text-amber-700 rounded text-[9px] font-black uppercase">Pending</span></td>
                              </tr>
                              <tr>
                                <td className="p-3 font-black">#ORD-9040</td>
                                <td className="p-3">Amit Verma</td>
                                <td className="p-3">{previewTheme.products[2].name}</td>
                                <td className="p-3 font-bold">₹{previewTheme.products[2].price}</td>
                                <td className="p-3"><span className="px-2 py-0.5 bg-emerald-55 text-emerald-700 rounded text-[9px] font-black uppercase">Delivered</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Parent Login / Chat Link */}
      <a
        href="https://jdk-pi.vercel.app/login"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-white border border-slate-250 text-slate-800 hover:text-indigo-600 font-bold rounded-full shadow-lg transition hover:scale-105 hover:bg-slate-50 active:scale-95 cursor-pointer text-xs"
      >
        <span className="text-sm select-none">💬</span>
        <span>My Chat</span>
      </a>

      {/* Toast Alert Log Container */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
