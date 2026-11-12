import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useContent } from '../../context/ContentContext';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Layers,
  FileText,
  MessageSquareQuote,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Database
} from 'lucide-react';

interface AdminLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  children
}) => {
  const { user, logout } = useAuth();
  const { leads, seedInitialDataToFirestore, isSeeding } = useContent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const newLeadsCount = leads.filter(l => l.status === 'new').length;

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads & Inquiries', icon: Inbox, badge: newLeadsCount > 0 ? newLeadsCount : undefined },
    { id: 'portfolio', label: 'Portfolio Projects', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'blog', label: 'Blog & Insights', icon: FileText },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'settings', label: 'Settings & SEO', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/admin';
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0716] text-white flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#120D24] border-b border-white/5 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <img
            src="/assets/aistudio/image_9171a724.png"
            alt="NOSHLANE"
            className="w-7 h-7 object-contain"
          />
          <span className="font-bold tracking-wider text-sm bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            NOSHLANE ADMIN
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="p-2 text-white/60 hover:text-cyan-400"
            title="View Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#100B22] border-r border-white/5 z-40 flex flex-col justify-between transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <div className="p-1.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-white/10">
              <img
                src="/assets/aistudio/image_9171a724.png"
                alt="NOSHLANE"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <div className="font-black tracking-wider text-sm text-white">NOSHLANE</div>
              <div className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" /> Admin Console
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 font-semibold shadow-lg shadow-cyan-500/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-white/40'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-black shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer in Sidebar */}
        <div className="p-4 border-t border-white/5 space-y-3 bg-black/20">
          <div className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-black">
              {user?.email?.slice(0, 2).toUpperCase() || 'AD'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-white truncate">{user?.email}</div>
              <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Authorized Admin
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto">
        {/* Top Breadcrumb & Live preview action bar on desktop */}
        <div className="hidden md:flex justify-between items-center mb-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white/40">NOHSLANE Console</span>
            <span className="text-white/20">/</span>
            <span className="text-cyan-400 font-semibold capitalize">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={seedInitialDataToFirestore}
              disabled={isSeeding}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs transition border border-white/5 cursor-pointer disabled:opacity-50"
              title="Ensure default agency content is seeded into Firestore"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isSeeding ? 'Syncing...' : 'Sync Default Content'}</span>
            </button>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-medium border border-cyan-500/20 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Public Site
            </a>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};
