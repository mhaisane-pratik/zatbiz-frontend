import { useState } from 'react';
import { Block } from '@/types';

interface UseBuilderCanvasOptions {
  projectId: number;
  projectName: string;
  projectConfig: any;
  saveLayout: (
    updatedPages: Record<string, Block[]>,
    activePgs: string[],
    currPg: string,
    config: any,
    name: string,
    saveStatus: string,
    isAutoSave?: boolean
  ) => Promise<void>;
  triggerAutosave: (
    updatedPages: Record<string, Block[]>,
    activePgs: string[],
    currPg: string,
    config: any,
    updatedName?: string
  ) => void;
  showToast: (text: string, isError?: boolean) => void;
}

export function useBuilderCanvas({
  projectId,
  projectName,
  projectConfig,
  saveLayout,
  triggerAutosave,
  showToast
}: UseBuilderCanvasOptions) {
  const [pages, setPages] = useState<Record<string, Block[]>>({ home: [] });
  const [activePages, setActivePages] = useState<string[]>(['home']);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);

  const syncBlocks = (updatedBlocks: Block[]) => {
    setBlocks(updatedBlocks);
    const updatedPages = {
      ...pages,
      [currentPage]: updatedBlocks
    };
    setPages(updatedPages);
    triggerAutosave(updatedPages, activePages, currentPage, projectConfig);
  };

  const handleCreatePage = (pageName: string) => {
    if (activePages.includes(pageName)) {
      showToast(`Page "${pageName}" already exists!`, true);
      return;
    }

    const headerBlock = {
      id: `header-${pageName}-${Date.now()}`,
      type: 'header',
      theme: projectConfig.themePreset || 'slate',
      content: {
        companyName: projectName || 'My Business',
        logoIcon: projectConfig.logoIcon || '⚡',
        logoUrl: projectConfig.logoUrl || '',
        layout: 'left-logo',
        links: [...activePages, pageName].map(p => ({
          label: p === 'home' ? 'Home' : p.charAt(0).toUpperCase() + p.slice(1),
          url: `?page=${p}`
        }))
      }
    };

    let bodyBlocks: any[] = [];
    if (pageName === 'shop') {
      bodyBlocks = [
        {
          id: `hero-${pageName}-${Date.now()}`,
          type: 'hero',
          theme: projectConfig.themePreset || 'slate',
          content: {
            title: 'Our Catalog Store',
            subtitle: 'Browse our exclusive database catalog and order premium products online.',
            imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
            btn1Text: 'View All Products',
            btn2Text: 'Search Filters'
          }
        },
        {
          id: `products-${pageName}-${Date.now()}`,
          type: 'products',
          theme: projectConfig.themePreset || 'slate',
          content: {
            title: 'Featured Store Products',
            subtitle: 'Curated products with automated checkout.'
          }
        }
      ];
    } else if (pageName === 'faq') {
      bodyBlocks = [
        {
          id: `faq-${pageName}-${Date.now()}`,
          type: 'faq',
          theme: projectConfig.themePreset || 'slate',
          content: {
            title: 'Help Desk FAQ',
            items: [
              { question: 'What is your refund policy?', answer: 'We offer full returns within 14 days of ordering.' },
              { question: 'Do you offer worldwide delivery?', answer: 'Yes! We ship across major continents with standard rates.' }
            ]
          }
        }
      ];
    } else if (pageName === 'gallery') {
      bodyBlocks = [
        {
          id: `gallery-${pageName}-${Date.now()}`,
          type: 'gallery',
          theme: projectConfig.themePreset || 'slate',
          content: {
            title: 'Our Project Showcase',
            images: [
              'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=300&auto=format&fit=crop&q=80',
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80'
            ]
          }
        }
      ];
    } else if (pageName === 'services') {
      bodyBlocks = [
        {
          id: `services-${pageName}-${Date.now()}`,
          type: 'features',
          theme: projectConfig.themePreset || 'slate',
          content: {
            title: 'Our Specialist Services',
            subtitle: 'Professional solutions tailored for your business needs.',
            items: [
              { icon: '⭐', title: 'Premium Advising', desc: 'Consult with our in-house trade specialists.' },
              { icon: '⚡', title: 'Express Integration', desc: 'Get your portal setup configured in minutes.' },
              { icon: '🔒', title: 'Secure Checkouts', desc: 'Secure payment gateway encryption tags.' }
            ]
          }
        }
      ];
    } else {
      bodyBlocks = [
        {
          id: `hero-${pageName}-${Date.now()}`,
          type: 'hero',
          theme: projectConfig.themePreset || 'slate',
          content: {
            title: pageName.charAt(0).toUpperCase() + pageName.slice(1),
            subtitle: `Welcome to the ${pageName} page of our visual portal.`,
            imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80',
          }
        }
      ];
    }

    const footerBlock = {
      id: `footer-${pageName}-${Date.now()}`,
      type: 'footer',
      theme: projectConfig.themePreset || 'slate',
      content: {
        text: `© 2026 ${projectName || 'My Business'}. All rights reserved.`,
        layout: 'simple'
      }
    };

    const newPageBlocks = [headerBlock, ...bodyBlocks, footerBlock];
    const updatedPages = { ...pages };
    const updatedActivePages = [...activePages, pageName];

    // Propagate new header links to ALL active pages
    const propagatedLinks = updatedActivePages.map(p => ({
      label: p === 'home' ? 'Home' : p.charAt(0).toUpperCase() + p.slice(1),
      url: `?page=${p}`
    }));

    for (const p of updatedActivePages) {
      const pBlocks = p === pageName ? newPageBlocks : updatedPages[p];
      if (pBlocks) {
        updatedPages[p] = pBlocks.map((b) => {
          if (b.type === 'header') {
            return {
              ...b,
              content: {
                ...b.content,
                links: propagatedLinks
              }
            };
          }
          return b;
        });
      }
    }

    setPages(updatedPages);
    setActivePages(updatedActivePages);
    setCurrentPage(pageName);
    setBlocks(updatedPages[pageName]);
    setActiveBlockId(null);
    showToast(`Created page: ${pageName}`);

    saveLayout(updatedPages, updatedActivePages, pageName, projectConfig, projectName, 'Draft', false);
  };

  const handleAddBlock = (type: string) => {
    const defaultTemplates: Record<string, any> = {
      header: {
        companyName: projectName || 'My Shop',
        logoIcon: '📦',
        layout: 'left-logo',
        links: activePages.map(p => ({
          label: p === 'home' ? 'Home' : p.charAt(0).toUpperCase() + p.slice(1),
          url: `?page=${p}`
        }))
      },
      hero: {
        title: 'Design beautiful websites in minutes',
        subtitle:
          'Bring your ideas to life with ZATBIZ, the next-generation block-based builder. Completely visual, fast, and responsive.',
        btn1Text: 'Get Started',
        btn1Url: '#',
        btn2Text: 'Learn More',
        btn2Url: '#',
      },
      image_banner: {
        title: 'Premium Collections',
        subtitle: 'Explore our latest curated catalogs and seasonal fashion releases.',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&auto=format&fit=crop&q=80',
      },
      features: {
        title: 'Futuristic Capabilities',
        subtitle: 'Discover the state-of-the-art tools powering your website project.',
        items: [
          { icon: '⚡', title: 'Lightning Fast', desc: 'Pre-rendered static React code structures load in a blink of an eye.' },
          { icon: '🎨', title: 'Tailwind Design', desc: 'Easily customize copy headers, theme layouts, and alignments.' },
          { icon: '📱', title: 'Fully Responsive', desc: 'Your content displays cleanly on mobiles, tablets, and desktops.' }
        ]
      },
      'text-image': {
        title: 'A Visual Workflow Without Code Restrictions',
        text: 'Say goodbye to complex CSS alignment hacks. ZATBIZ allows you to stack elements, customize block themes, and configure parameters in real time.',
        align: 'left'
      },
      text_block: {
        title: 'Our Craftsmanship & Heritage',
        text: 'Every item in our collection is hand-crafted and verified for premium quality. We merge traditional style values with modern materials to create durable, timeless essentials.'
      },
      gallery: {
        title: 'Visual Highlights',
        images: [
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=300&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80'
        ]
      },
      pricing: {
        title: 'Flexible Premium Pricing',
        items: [
          { title: 'Standard', price: '$0', features: ['1 Active Project', 'Standard blocks library', 'Subdomain hosting'], isFeatured: false },
          { title: 'Pro', price: '$15', features: ['Unlimited layouts', 'All block themes', 'Priority support', 'Traffic analytics'], isFeatured: true }
        ]
      },
      products: {
        title: 'Featured Products Catalog',
        subtitle: 'Explore our latest releases and premium essentials.'
      },
      contact_form: {
        title: 'Send Us an Inquiry',
        fields: ['Name', 'Email', 'Inquiry Type', 'Message'],
        btnText: 'Submit Inquiry'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          { question: 'How do I publish my layout?', answer: 'Click the "Publish Page" button in the header toolbar. Your site is instantly viewable on the preview endpoint.' },
          { question: 'Can I export the code?', answer: 'Yes! Next.js compiles clean Tailwind CSS structures which can be copy-pasted anywhere.' }
        ]
      },
      testimonials: {
        title: 'Client Testimonials',
        items: [
          { quote: 'The customer service and product quality are both outstanding! Recommending them to all my colleagues.', author: 'Sarah Jenkins', role: 'Premium Buyer' },
          { quote: 'A beautiful shopping interface and high-speed delivery. Truly a state-of-the-art store experience.', author: 'David Miller', role: 'Verified Customer' }
        ]
      },
      footer: {
        text: `© 2026 ${projectName || 'ZATBIZ'}. All rights reserved.`,
        layout: 'simple',
        socials: [
          { icon: '📘', label: 'Facebook', url: '#' },
          { icon: '🐦', label: 'Twitter', url: '#' },
          { icon: '📸', label: 'Instagram', url: '#' }
        ]
      }
    };

    const newBlock: Block = {
      id: Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      type,
      theme: type === 'header' || type === 'footer' ? 'slate' : (projectConfig.themePreset || 'slate'),
      content: defaultTemplates[type] || {}
    };

    let updated: Block[] = [];
    if (type === 'header') {
      updated = [newBlock, ...blocks];
    } else if (type === 'footer') {
      updated = [...blocks, newBlock];
    } else {
      const footerIdx = blocks.findIndex((b) => b.type === 'footer');
      if (footerIdx !== -1) {
        updated = [...blocks.slice(0, footerIdx), newBlock, ...blocks.slice(footerIdx)];
      } else {
        updated = [...blocks, newBlock];
      }
    }

    setActiveBlockId(newBlock.id);
    showToast(`Added ${type} section`);
    syncBlocks(updated);
  };

  const deleteBlock = (id: string) => {
    const updated = blocks.filter((b) => b.id !== id);
    if (activeBlockId === id) setActiveBlockId(null);
    showToast('Section removed');
    syncBlocks(updated);
  };

  const handleOutlineDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteBlock(id);
  };

  const handleReorderOutline = (draggedId: string, targetId: string) => {
    const dragIdx = blocks.findIndex((b) => b.id === draggedId);
    const targetIdx = blocks.findIndex((b) => b.id === targetId);
    if (dragIdx === -1 || targetIdx === -1) return;

    const draggedBlock = blocks[dragIdx];
    const targetBlock = blocks[targetIdx];
    if (draggedBlock.type === 'header' || draggedBlock.type === 'footer') return;
    if (targetBlock.type === 'header' || targetBlock.type === 'footer') return;

    const updated = [...blocks];
    updated.splice(dragIdx, 1);

    const newTargetIdx = updated.findIndex((b) => b.id === targetId);
    updated.splice(newTargetIdx, 0, draggedBlock);

    syncBlocks(updated);
    showToast('Layout section order updated.');
  };

  const moveBlock = (id: string, dir: number) => {
    const index = blocks.findIndex((b) => b.id === id);
    if (index === -1) return;

    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= blocks.length) return;

    const block = blocks[index];
    const targetBlock = blocks[newIdx];
    if (block.type === 'header' || targetBlock.type === 'header') return;
    if (block.type === 'footer' || targetBlock.type === 'footer') return;

    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[newIdx];
    updated[newIdx] = temp;

    syncBlocks(updated);
  };

  const updateBlockContent = (id: string, field: string, value: any) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return {
        ...b,
        content: {
          ...b.content,
          [field]: value
        }
      };
    });
    syncBlocks(updated);
  };

  const updateBlockTheme = (id: string, theme: string) => {
    const updated = blocks.map((b) => {
      if (b.id !== id) return b;
      return { ...b, theme };
    });
    syncBlocks(updated);
  };

  const handleAiAction = (action: string, payload: any) => {
    if (action === 'UPDATE_CONTENT') {
      if (!activeBlockId) {
        showToast('Please click on a block in the canvas first to apply copywriting!', true);
        return;
      }
      const updated = blocks.map((b) => {
        if (b.id !== activeBlockId) return b;
        return {
          ...b,
          content: {
            ...b.content,
            ...payload
          }
        };
      });
      showToast('Copywriting applied to selected block!');
      syncBlocks(updated);
    } else if (action === 'ADD_BLOCK') {
      handleAddBlock(payload.blockType);
    } else if (action === 'SET_THEME') {
      if (!activeBlockId) {
        showToast('Please select a block first to set its theme!', true);
        return;
      }
      updateBlockTheme(activeBlockId, payload.theme);
      showToast(`Block theme updated to ${payload.theme}!`);
    }
  };

  return {
    pages,
    setPages,
    activePages,
    setActivePages,
    currentPage,
    setCurrentPage,
    blocks,
    setBlocks,
    activeBlockId,
    setActiveBlockId,
    syncBlocks,
    handleCreatePage,
    handleAddBlock,
    deleteBlock,
    handleOutlineDelete,
    handleReorderOutline,
    moveBlock,
    updateBlockContent,
    updateBlockTheme,
    handleAiAction
  };
}
