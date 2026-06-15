'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AiSidekick from '../components/AiSidekick';

interface Project {
  id: number;
  name: string;
  description: string;
  blocksJson: string;
  status: string;
  updatedAt?: string;
}

const TEMPLATES = [
  {
    id: 'storefront',
    name: 'Minimal Storefront',
    desc: 'Shopify-style commerce template featuring a customizable logo header, large storefront hero banner, product pricing cards, and a directory links footer. Perfect for e-commerce.',
    icon: '🛍️'
  },
  {
    id: 'agency',
    name: 'Creative Agency',
    desc: 'Visual marketing template containing customizable brand header, service columns grid, split-graphical rows, collapsible FAQ accordions, and social links footer.',
    icon: '🎨'
  },
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    desc: 'Elegant designer portfolio template containing custom profile layout, personal hero headings, skills features, and minimalist copy footer.',
    icon: '💼'
  }
];

export default function DashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'projects' | 'templates'>('projects');
  
  // Create project modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  
  // Onboarding template customization modal
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [logoIcon, setLogoIcon] = useState('📦');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch projects from Spring Boot backend on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('http://localhost:8080/api/projects')
      .then((res) => {
        if (!res.ok) throw new Error('Could not fetch projects');
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setErrorMsg('Could not connect to Spring Boot backend API. Ensure it is running on http://localhost:8080.');
        setLoading(false);
      });
  };

  // Delete project trigger -> DELETE /api/projects/{id}
  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this website project? This action is permanent!')) return;

    fetch(`http://localhost:8080/api/projects/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Delete operation failed');
        setProjects((prev) => prev.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error('Delete error:', err);
        alert('Failed to delete project. Is the backend running?');
      });
  };

  // Create standard empty project trigger -> POST /api/projects
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const payload = {
      name: newProjectName.trim(),
      description: newProjectDesc.trim(),
      blocksJson: JSON.stringify([
        {
          id: Date.now() + '-header',
          type: 'header',
          theme: 'slate',
          content: {
            companyName: newProjectName.trim(),
            logoIcon: '⚡',
            layout: 'left-logo'
          }
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
            layout: 'simple'
          }
        }
      ]),
      status: 'Draft',
    };

    saveNewProject(payload);
  };

  // Create customized template project trigger
  const handleTemplateOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !selectedTemplateId) return;

    const brandName = companyName.trim();
    const blocksList: any[] = [];

    // 1. Header
    blocksList.push({
      id: Date.now() + '-header',
      type: 'header',
      theme: 'slate',
      content: {
        companyName: brandName,
        logoIcon: logoIcon,
        layout: 'left-logo'
      }
    });

    // 2. Body sections based on selected template
    if (selectedTemplateId === 'storefront') {
      blocksList.push({
        id: Date.now() + '-hero',
        type: 'hero',
        theme: 'deepblue',
        content: {
          title: `${brandName} Storefront`,
          subtitle: `Welcome to the global commerce catalog of ${brandName}. Handcrafted items designed to elevate your visual lifestyle.`,
          btn1Text: 'Shop Catalog',
          btn2Text: 'Explore Collections'
        }
      });
      blocksList.push({
        id: Date.now() + '-pricing',
        type: 'pricing',
        theme: 'slate',
        content: {
          title: 'Featured Products & Tiers',
          items: [
            { title: 'Standard Edition', price: '$49', features: ['Handcrafted quality leather', 'Water resistant casing', 'Free shipping worldwide'], isFeatured: false },
            { title: 'Premium Edition Pack', price: '$89', features: ['Full-grain vintage leather', 'Double stitch reinforced binding', 'Limited numbering series', '2 Year complete warranty'], isFeatured: true }
          ]
        }
      });
      blocksList.push({
        id: Date.now() + '-footer',
        type: 'footer',
        theme: 'slate',
        content: {
          text: `© 2026 ${brandName}. Proudly visual-styled with PrimeZat storefront.`,
          layout: 'directory'
        }
      });
    } 
    else if (selectedTemplateId === 'agency') {
      blocksList.push({
        id: Date.now() + '-hero',
        type: 'hero',
        theme: 'purple',
        content: {
          title: `Visual scaling solutions for ${brandName}`,
          subtitle: 'Digital agency constructing sleek corporate interfaces and responsive SaaS designs.',
          btn1Text: 'View Portfolio',
          btn2Text: 'Our Services'
        }
      });
      blocksList.push({
        id: Date.now() + '-features',
        type: 'features',
        theme: 'slate',
        content: {
          title: 'Our Core Services',
          subtitle: 'Custom blocks tailored to support your business goals.',
          items: [
            { icon: '🎨', title: 'UI/UX Visuals', desc: 'Crafting responsive layouts and custom-tailored user interfaces.' },
            { icon: '💻', title: 'React Deployment', desc: 'Next.js App router combined with Spring Boot REST APIs.' },
            { icon: '📈', title: 'Performance SEO', desc: 'Optimizing static page load timings and boosting index visibility.' }
          ]
        }
      });
      blocksList.push({
        id: Date.now() + '-faq',
        type: 'faq',
        theme: 'slate',
        content: {
          title: 'Frequently Asked Questions',
          items: [
            { question: 'What is your project turnaround?', answer: 'Standard visual projects are completed between 2 to 4 weeks depending on the template stack.' },
            { question: 'Do you offer maintenance?', answer: 'Yes! We configure automatic syncing updates and persistence database services.' }
          ]
        }
      });
      blocksList.push({
        id: Date.now() + '-footer',
        type: 'footer',
        theme: 'purple',
        content: {
          text: `© 2026 ${brandName} Creative Agency. All rights reserved.`,
          layout: 'socials'
        }
      });
    } 
    else {
      // Personal Portfolio
      blocksList.push({
        id: Date.now() + '-hero',
        type: 'hero',
        theme: 'sunset',
        content: {
          title: `Hello, I am the designer behind ${brandName}`,
          subtitle: 'Sleek, minimalistic layout structures that combine shape, typography, and text gracefully.',
          btn1Text: 'View Designs',
          btn2Text: 'Contact Me'
        }
      });
      blocksList.push({
        id: Date.now() + '-text-image',
        type: 'text-image',
        theme: 'slate',
        content: {
          title: 'Visual Minimalism & Balance',
          text: 'I believe in spacious margins and bold, clear heading fonts. Every design I build focuses on highlighting content while ensuring responsive navigation.',
          align: 'left'
        }
      });
      blocksList.push({
        id: Date.now() + '-footer',
        type: 'footer',
        theme: 'slate',
        content: {
          text: `© 2026 ${brandName} Studio. Designed with clean minimal layouts.`,
          layout: 'simple'
        }
      });
    }

    const payload = {
      name: `${brandName} Layout`,
      description: `Customized starter project utilizing the ${selectedTemplateId} template preset.`,
      blocksJson: JSON.stringify(blocksList),
      status: 'Draft'
    };

    saveNewProject(payload);
  };

  const saveNewProject = (payload: any) => {
    fetch('http://localhost:8080/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Create operation failed');
        return res.json();
      })
      .then((project: Project) => {
        setIsModalOpen(false);
        setIsOnboardingOpen(false);
        router.push(`/builder/${project.id}`);
      })
      .catch((err) => {
        console.error('Create error:', err);
        alert('Failed to create project. Verify H2 database backend is active.');
      });
  };

  const openTemplateOnboard = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setCompanyName('');
    setLogoIcon('📦');
    setIsOnboardingOpen(true);
  };

  const publishedCount = projects.filter((p) => p.status === 'Published').length;

  return (
    <div className="flex min-h-screen relative bg-slate-50/50 text-slate-900">
      {/* Background Glowing Blobs */}
      <div className="glowing-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col p-6 fixed h-full left-0 top-0 z-20 shadow-sm">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-650 bg-clip-text text-transparent mb-10">
          <div className="w-3 h-3 bg-indigo-600 rounded-full shadow-[0_0_8px_#4f46e5]" />
          PrimeZat
        </Link>
        
        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md transition text-left cursor-pointer ${
              activeTab === 'projects' ? 'bg-indigo-50 text-indigo-600 border-l-2 border-indigo-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            📂 Projects
          </button>
          
          <button 
            onClick={() => setActiveTab('templates')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-md transition text-left cursor-pointer ${
              activeTab === 'templates' ? 'bg-indigo-50 text-indigo-600 border-l-2 border-indigo-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            🎨 Templates
          </button>
          
          <button 
            onClick={() => alert('Connect custom domains to configure server-side analytics dashboards.')} 
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition text-left cursor-pointer"
          >
            📈 Analytics
          </button>
        </nav>

        <div className="border-t border-slate-200 pt-6">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-400 hover:text-slate-800 transition">
            🚪 Exit Workspace
          </Link>
        </div>
      </aside>

      {/* Workspace Area */}
      <main className="flex-1 ml-64 p-10 max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 mb-1 tracking-tight">
              {activeTab === 'projects' ? 'My Workspace' : 'Templates Library'}
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              {activeTab === 'projects' 
                ? 'Manage and visual edit your next-gen page layouts.' 
                : 'Select pre-designed structures and customize branding to build websites.'}
            </p>
          </div>
          <div className="flex gap-4 items-center">
            {activeTab === 'projects' && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition cursor-pointer"
              >
                + Create Blank Site
              </button>
            )}
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
              JD
            </div>
          </div>
        </header>

        {/* Backend Connectivity Status Alert */}
        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-md mb-8">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Tab contents */}
        {activeTab === 'projects' ? (
          <>
            {/* Stats widgets */}
            <section className="grid grid-cols-3 gap-6 mb-10">
              <div className="p-6 bg-white rounded-xl border border-slate-200/70 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Projects</div>
                <div className="text-3xl font-extrabold text-slate-900">{projects.length}</div>
              </div>
              <div className="p-6 bg-white rounded-xl border border-slate-200/70 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Published Sites</div>
                <div className="text-3xl font-extrabold text-slate-900">{publishedCount}</div>
              </div>
              <div className="p-6 bg-white rounded-xl border border-slate-200/70 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Workspace Views</div>
                <div className="text-3xl font-extrabold text-cyan-600">
                  {projects.length * 123 + 450} <span className="text-xs font-normal text-slate-400">views</span>
                </div>
              </div>
            </section>

            {/* Project Grid */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-base font-extrabold text-slate-900">Recent Work</h2>
                <span className="text-xs text-slate-400 font-semibold">Decoupled React-driven layout listing</span>
              </div>

              {loading ? (
                <div className="text-slate-500 text-sm font-medium">Loading database projects...</div>
              ) : projects.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-slate-200 rounded-xl bg-white shadow-sm">
                  <span className="text-3xl block mb-4">📂</span>
                  <h3 className="text-slate-900 font-bold mb-1">No pages found</h3>
                  <p className="text-slate-500 text-xs max-w-xs mx-auto mb-6 leading-relaxed">Create a website design using template models or compile custom blank sites directly to Spring H2.</p>
                  <button 
                    onClick={() => setActiveTab('templates')}
                    className="px-4 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition cursor-pointer"
                  >
                    View Layout Templates
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project.id} className="group relative flex flex-col bg-white border border-slate-200/70 hover:border-indigo-500/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200">
                      {/* Thumbnail Banner */}
                      <div className="h-40 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center border-b border-slate-100 relative">
                        <span className="text-3xl select-none">⚡</span>
                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-white/95 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 border border-slate-100 shadow-inner transition-opacity duration-200">
                          <Link href={`/builder/${project.id}`} className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                            Edit Layout
                          </Link>
                          <Link href={`/preview/${project.id}`} target="_blank" className="px-3.5 py-1.5 text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg shadow-sm transition">
                            Live Preview
                          </Link>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-slate-900 text-base truncate pr-2">{project.name}</h3>
                            <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded-full ${
                              project.status === 'Published' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-650'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 font-medium">{project.description}</p>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-bold">
                          <span>ID: #{project.id}</span>
                          <button 
                            onClick={(e) => handleDelete(project.id, e)}
                            className="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded-md transition cursor-pointer font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : (
          /* Templates Grid view tab */
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEMPLATES.map((tpl) => (
              <div key={tpl.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-indigo-500/20 transition duration-200">
                <div>
                  <div className="text-3xl mb-4 select-none">{tpl.icon}</div>
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2">{tpl.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">{tpl.desc}</p>
                </div>
                <button 
                  onClick={() => openTemplateOnboard(tpl.id)}
                  className="w-full py-2.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition shadow-sm text-center cursor-pointer"
                >
                  Customize & Create ➔
                </button>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* Create Blank Project Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-[480px] p-8 bg-white rounded-xl border border-slate-200 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Create Blank Website</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕</button>
            </div>
            
            <form onSubmit={handleCreate} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Project Name
                </label>
                <input 
                  type="text" 
                  required 
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="e.g. Portfolio Site"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-655 focus:bg-white rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Description Details
                </label>
                <textarea 
                  required 
                  rows={3}
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  placeholder="Brief description of the website..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-655 focus:bg-white rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition cursor-pointer"
                >
                  Initialize Blank Builder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Onboarding Template Customizer Modal Dialog */}
      {isOnboardingOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="w-full max-w-[480px] p-8 bg-white rounded-xl border border-slate-200 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Configure Your Store & Brand</h3>
              <button onClick={() => setIsOnboardingOpen(false)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕</button>
            </div>
            
            <form onSubmit={handleTemplateOnboardSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Company / Store Name
                </label>
                <input 
                  type="text" 
                  required 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Oak & Iron Store"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-655 focus:bg-white rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                  Select Brand Logo Icon
                </label>
                <div className="flex gap-3">
                  {[
                    { icon: '📦', name: 'Cube' },
                    { icon: '⭐', name: 'Star' },
                    { icon: '💎', name: 'Gem' },
                    { icon: '⚡', name: 'Bolt' }
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset.icon}
                      onClick={() => setLogoIcon(preset.icon)}
                      className={`flex-1 py-3 text-lg rounded-lg border text-center font-bold transition cursor-pointer ${
                        logoIcon === preset.icon ? 'border-indigo-500 bg-indigo-50 text-indigo-650' : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="block">{preset.icon}</span>
                      <span className="block text-[9px] font-semibold text-slate-400 mt-1">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200/50 rounded-lg text-[10px] text-stone-500 font-semibold leading-relaxed">
                💡 **Shopify Customizer Tip**: This details company parameters to build your visual headers and footers automatically.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsOnboardingOpen(false)}
                  className="px-4 py-2 text-xs font-bold border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-700 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition cursor-pointer"
                >
                  Generate Customized Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Sidekick Assistant Drawer */}
      <AiSidekick context="dashboard" />
    </div>
  );
}
