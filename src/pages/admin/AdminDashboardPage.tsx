import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminLayout } from './AdminLayout';
import { AdminOverviewTab } from './tabs/AdminOverviewTab';
import { AdminLeadsTab } from './tabs/AdminLeadsTab';
import { AdminPortfolioTab } from './tabs/AdminPortfolioTab';
import { AdminServicesTab } from './tabs/AdminServicesTab';
import { AdminBlogTab } from './tabs/AdminBlogTab';
import { AdminTestimonialsTab } from './tabs/AdminTestimonialsTab';
import { AdminTeamTab } from './tabs/AdminTeamTab';
import { AdminSettingsTab } from './tabs/AdminSettingsTab';
import { ShieldAlert, Loader2 } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, isAdmin, loadingAuth } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loadingAuth && !user) {
      navigate('/admin');
    }
  }, [user, loadingAuth, navigate]);

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#0A0716] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-cyan-400">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-xs text-white/50 tracking-wider uppercase font-semibold">
            Authenticating Admin Console...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'overview' && <AdminOverviewTab onNavigateTab={setActiveTab} />}
      {activeTab === 'leads' && <AdminLeadsTab />}
      {activeTab === 'portfolio' && <AdminPortfolioTab />}
      {activeTab === 'services' && <AdminServicesTab />}
      {activeTab === 'blog' && <AdminBlogTab />}
      {activeTab === 'testimonials' && <AdminTestimonialsTab />}
      {activeTab === 'team' && <AdminTeamTab />}
      {activeTab === 'settings' && <AdminSettingsTab />}
    </AdminLayout>
  );
};
