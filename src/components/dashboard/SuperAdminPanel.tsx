'use client';

import { useState } from 'react';

export default function SuperAdminPanel() {
  const [subTab, setSubTab] = useState<'overview' | 'users' | 'companies' | 'subscriptions' | 'templates' | 'payments' | 'settings'>('overview');

  // Simulated platform-wide data
  const stats = {
    mrr: '₹14,82,400',
    activeUsers: '2,842',
    activeCompanies: '1,424',
    newSignups: '128 this week',
    systemHealth: '99.98% (All nodes active)',
  };

  const usersList = [
    { id: 1, name: 'Alice Merchant', email: 'alice@bistro.com', company: 'Royal Bistro Cafe', plan: 'Enterprise', status: 'Active' },
    { id: 2, name: 'Bob Dealer', email: 'bob@spark.com', company: 'Spark Shop Ltd', plan: 'Pro', status: 'Active' },
    { id: 3, name: 'Charlie Dean', email: 'charlie@academy.edu', company: 'Apex Academy', plan: 'Pro', status: 'Active' },
    { id: 4, name: 'Diana Health', email: 'diana@clinic.org', company: 'Metropolitan Hospital', plan: 'Free', status: 'Suspended' },
  ];

  const companiesList = [
    { id: 1, name: 'Royal Bistro Cafe', domain: 'bistro.zatbiz.site', type: 'Restaurant', orders: 124, revenue: '₹4,52,000' },
    { id: 2, name: 'Spark Shop Ltd', domain: 'spark.com', type: 'Shop', orders: 342, revenue: '₹8,92,400' },
    { id: 3, name: 'Apex Academy', domain: 'apex.zatbiz.site', type: 'School', orders: 12, revenue: '₹1,20,000' },
    { id: 4, name: 'Metropolitan Hospital', domain: 'metroclinic.com', type: 'Hospital', orders: 0, revenue: '₹0' },
  ];

  const paymentsLog = [
    { id: 'TXN-90812', company: 'Spark Shop Ltd', amount: '₹2,500', date: 'Today, 2:15 PM', status: 'Completed' },
    { id: 'TXN-90811', company: 'Royal Bistro Cafe', amount: '₹9,999', date: 'Yesterday, 11:30 AM', status: 'Completed' },
    { id: 'TXN-90810', company: 'Apex Academy', amount: '₹2,500', date: 'Yesterday, 8:45 AM', status: 'Completed' },
    { id: 'TXN-90809', company: 'Metropolitan Hospital', amount: '₹0', date: '3 days ago', status: 'Failed' },
  ];

  const [supportTickets, setSupportTickets] = useState([
    { id: 101, user: 'Alice Merchant', title: 'Stripe gateway checkout redirect delay', status: 'Open', priority: 'High' },
    { id: 102, user: 'Bob Dealer', title: 'Custom domain DNS CNAME validation issues', status: 'Closed', priority: 'Medium' },
    { id: 103, user: 'Charlie Dean', title: 'AP courses pricing card columns stack order', status: 'Open', priority: 'Low' },
  ]);

  return (
    <div className="space-y-8 animate-fade-in text-xs text-slate-800 font-sans">
      
      {/* Super Admin Top Control Tabs */}
      <div className="flex bg-slate-200/50 p-1.5 rounded-xl border border-slate-250/20 max-w-2xl text-[10px] font-black uppercase tracking-wider">
        {[
          { id: 'overview', label: '📊 Telemetry' },
          { id: 'users', label: '👥 Users' },
          { id: 'companies', label: '🏢 Companies' },
          { id: 'subscriptions', label: '💎 Plans' },
          { id: 'templates', label: '🎨 Templates' },
          { id: 'payments', label: '💰 Payments' },
          { id: 'settings', label: '⚙️ Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id as any)}
            className={`flex-1 py-2 rounded-lg text-center transition cursor-pointer ${
              subTab === tab.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview/Telemetry Tab */}
      {subTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Monthly Recurring Revenue (MRR)', val: stats.mrr, trend: '▲ 12.8% since last month', color: 'text-indigo-650' },
              { title: 'Total Registered Users', val: stats.activeUsers, trend: '+45 accounts today', color: 'text-purple-600' },
              { title: 'Registered Businesses', val: stats.activeCompanies, trend: '+12 live storefronts today', color: 'text-emerald-600' },
              { title: 'Server Cluster Nodes', val: stats.systemHealth, trend: 'Ping latency: 12ms', color: 'text-slate-905' },
            ].map((card, i) => (
              <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider mb-2">
                  {card.title}
                </span>
                <h3 className={`text-xl font-extrabold ${card.color} tracking-tight`}>{card.val}</h3>
                <span className="text-[9px] font-bold text-slate-500 mt-1 block">{card.trend}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* System Node Load Charts */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <h4 className="text-xs font-bold text-slate-900 uppercase mb-4">API Server Load (Cluster Node CPU)</h4>
              <div className="h-40 flex items-end gap-1.5 pt-4">
                {[30, 45, 35, 55, 60, 50, 40, 65, 75, 45, 30, 25].map((val, idx) => (
                  <div key={idx} className="flex-1 bg-indigo-50 hover:bg-indigo-150 rounded-t h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-500 to-indigo-600 rounded-t transition-all duration-300"
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-2">
                <span>00:00 AM</span>
                <span>12:00 PM</span>
                <span>08:00 PM</span>
              </div>
            </div>

            {/* Support Tickets */}
            <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase mb-4">Active Support Helpdesk tickets</h4>
                <div className="space-y-3">
                  {supportTickets.map((t) => (
                    <div key={t.id} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-slate-800">#{t.id} - {t.title}</span>
                        <span className="text-[9px] text-slate-400 block mt-0.5 font-semibold">User: {t.user}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                        t.status === 'Open' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full mt-4 py-2 border border-slate-200 hover:bg-slate-50 text-[10px] font-bold text-indigo-650 rounded-xl transition cursor-pointer">
                View All Tickets (24 unresolved)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {subTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Username / Email</th>
                <th className="p-4">Assigned Company</th>
                <th className="p-4">Billing Plan</th>
                <th className="p-4">Account status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {usersList.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50">
                  <td className="p-4 pl-6">
                    <span className="font-bold text-slate-900 block">{u.name}</span>
                    <span className="text-slate-400 font-semibold">{u.email}</span>
                  </td>
                  <td className="p-4 font-semibold text-slate-655">{u.company}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      u.plan === 'Enterprise' ? 'bg-indigo-50 text-indigo-600' : u.plan === 'Pro' ? 'bg-purple-50 text-purple-650' : 'bg-slate-105 text-slate-600'
                    }`}>
                      {u.plan}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`w-2 h-2 rounded-full inline-block mr-1.5 ${
                      u.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />
                    <span className="font-semibold">{u.status}</span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-2 py-1 border border-slate-200 hover:bg-slate-50 rounded text-[9px] font-bold text-slate-700">Edit</button>
                      <button className="px-2 py-1 bg-rose-50 hover:bg-rose-100 rounded text-[9px] font-bold text-rose-650">Suspend</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Companies Tab */}
      {subTab === 'companies' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Business Registries</th>
                <th className="p-4">Sector</th>
                <th className="p-4">Custom Domain</th>
                <th className="p-4">Orders count</th>
                <th className="p-4">MRR Volume</th>
                <th className="p-4 pr-6 text-right">Live View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {companiesList.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-4 pl-6 font-bold text-slate-900">{c.name}</td>
                  <td className="p-4 font-semibold text-slate-500">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold uppercase text-[8px]">
                      {c.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-indigo-650">{c.domain}</td>
                  <td className="p-4 font-bold text-slate-700">{c.orders} sales</td>
                  <td className="p-4 font-extrabold text-slate-900">{c.revenue}</td>
                  <td className="p-4 pr-6 text-right">
                    <button className="text-indigo-600 hover:underline font-bold">Inspect site →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Subscriptions Tab */}
      {subTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { plan: 'Free Tier', price: '₹0 / month', users: '1,824 active sites', limits: '1 Website, No custom domains, Standard Blocks' },
              { plan: 'Pro Merchant', price: '₹2,500 / month', users: '942 active sites', limits: 'Unlimited layouts, Custom Subdomain, Core CRM/ERP' },
              { plan: 'Enterprise Suite', price: '₹9,999 / month', users: '58 active sites', limits: 'Full custom domains, Dedicated server, 24/7 Priority support' },
            ].map((plan, i) => (
              <div key={i} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1">{plan.plan}</h4>
                  <span className="text-xl font-black text-indigo-650 block mb-4">{plan.price}</span>
                  <p className="text-slate-500 font-semibold mb-4">Active subscriptions: **{plan.users}**</p>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Plan Limitations</span>
                  <p className="text-slate-655 font-medium leading-relaxed">{plan.limits}</p>
                </div>
                <button className="w-full mt-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-bold transition">
                  Modify Pricing Limits
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates Marketplace Tab */}
      {subTab === 'templates' && (
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
          <h4 className="text-xs font-bold text-slate-900 uppercase">System Templates Repository</h4>
          <p className="text-slate-500 font-medium">Add, publish, or deprecate global builder templates in the marketplace library.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {[
              { name: 'Restaurant Preset V1', icon: '🍕', category: 'Restaurant', status: 'Published' },
              { name: 'Ecommerce Retail V2', icon: '🛍️', category: 'Shop', status: 'Published' },
              { name: 'AP Honors Academy', icon: '🏫', category: 'School', status: 'Published' },
              { name: 'Clinical Specialist V1', icon: '🏥', category: 'Hospital', status: 'Published' },
            ].map((t, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <span className="font-bold text-slate-900 block">{t.name}</span>
                    <span className="text-[9px] font-bold text-slate-450 uppercase">{t.category}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-extrabold uppercase">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payments Log Tab */}
      {subTab === 'payments' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-bold text-slate-500 uppercase">
                <th className="p-4 pl-6">Transaction ID</th>
                <th className="p-4">Paid By Company</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment date</th>
                <th className="p-4 pr-6">Gateway status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paymentsLog.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="p-4 pl-6 font-bold text-slate-900 font-mono">{log.id}</td>
                  <td className="p-4 font-semibold text-slate-600">{log.company}</td>
                  <td className="p-4 font-extrabold text-slate-905">{log.amount}</td>
                  <td className="p-4 text-slate-450 font-semibold">{log.date}</td>
                  <td className="p-4 pr-6">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${
                      log.status === 'Completed' ? 'bg-emerald-50 text-emerald-650' : 'bg-rose-50 text-rose-650'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* System Settings Tab */}
      {subTab === 'settings' && (
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
          <h4 className="text-xs font-bold text-slate-900 uppercase">Global Platform Configurations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Allowed Multi-Tenancy Subdomains
                </label>
                <input
                  type="text"
                  defaultValue="*.zatbiz.site, *.zatbiz.store"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  System SMTP Server Hostname
                </label>
                <input
                  type="text"
                  defaultValue="smtp.mailgun.zatbiz.net"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Server JWT secret token keys
                </label>
                <input
                  type="password"
                  defaultValue="superSecretSecretJWTSignatureKeySignatureTokenString"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none"
                />
              </div>
              <div className="flex justify-between items-center bg-slate-50 p-4 border border-slate-200 rounded-xl">
                <div>
                  <span className="block font-bold text-slate-900">Force HTTPS SSL Redirect</span>
                  <span className="block text-[9px] text-slate-400 mt-0.5 font-semibold">Redirects all HTTP platform traffic to HTTPS.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4 border-t border-slate-150">
            <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition">
              Save Global Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
