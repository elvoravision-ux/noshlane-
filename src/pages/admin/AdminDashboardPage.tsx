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
  const { user, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
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

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0716] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#120D24] border border-red-500/30 rounded-2xl p-6 text-center space-y-4">
          <ShieldAlert className="w-10 h-10 text-red-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">Access Restricted</h2>
          <p className="text-xs text-white/60">
            Your account ({user.email}) does not have administrator privileges for NOSHLANE Console.
          </p>
          <button
            type="button"
            onClick={() => logout().then(() => navigate('/admin'))}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition cursor-pointer"
          >
            Sign Out & Return
          </button>
        </div>
      </div>
    );
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
