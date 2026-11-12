import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Inbox,
  Briefcase,
  FileText,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  Database,
  CheckCircle2,
  Loader2,
  Clock,
} from 'lucide-react';
import { useContent } from '../../../context/ContentContext';

interface AdminOverviewTabProps {
  onNavigateTab: (tab: string) => void;
}

export function AdminOverviewTab({ onNavigateTab }: AdminOverviewTabProps) {
  const {
    leads,
    portfolio,
    blog,
    services,
    team,
    seedInitialDataToFirestore,
    isSeeding,
  } = useContent();

  const [seedSuccess, setSeedSuccess] = useState(false);

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const totalProjects = portfolio.length;
  const totalPosts = blog.length;

  const latestLeads = leads.slice(0, 5);

  const handleSeed = async () => {
    await seedInitialDataToFirestore();
    setSeedSuccess(true);
    setTimeout(() => setSeedSuccess(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400">
            Real-time pipeline metrics and live website content status
          </p>
        </div>

        {/* Database Sync / Seed Button */}
        <button
          type="button"
          onClick={handleSeed}
          disabled={isSeeding}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl transition-colors cursor-pointer"
        >
          {isSeeding ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : seedSuccess ? (
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
          ) : (
            <Database className="w-3.5 h-3.5" />
          )}
          <span>{isSeeding ? 'Syncing...' : seedSuccess ? 'Database Synced!' : 'Sync All Content to Firestore'}</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-[#120E27] border border-cyan-500/20 hover:border-cyan-500/40 rounded-2xl p-5 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Total Inbound Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
            {totalLeads}
          </div>
          <p className="text-[11px] text-cyan-400 mt-1 flex items-center gap-1">
            <span>View all submissions</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-[#120E27] border border-amber-500/20 hover:border-amber-500/40 rounded-2xl p-5 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              New / Uncontacted
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-300 font-mono tabular-nums">
            {newLeads}
          </div>
          <p className="text-[11px] text-amber-400 mt-1 flex items-center gap-1">
            <span>Requires triage</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('portfolio')}
          className="bg-[#120E27] border border-indigo-500/20 hover:border-indigo-500/40 rounded-2xl p-5 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Portfolio Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
            {totalProjects}
          </div>
          <p className="text-[11px] text-indigo-400 mt-1 flex items-center gap-1">
            <span>Manage case studies</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('blog')}
          className="bg-[#120E27] border border-teal-500/20 hover:border-teal-500/40 rounded-2xl p-5 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Published Articles
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
            {totalPosts}
          </div>
          <p className="text-[11px] text-teal-400 mt-1 flex items-center gap-1">
            <span>Manage blog posts</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </p>
        </div>
      </div>

      {/* Latest 5 Leads Table */}
      <div className="bg-[#120E27] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold text-white">Latest Inbound Submissions</h2>
            <p className="text-xs text-slate-400">Most recent Contact and Free Audit requests from website visitors</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('leads')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View All Leads ({leads.length}) →
          </button>
        </div>

        {latestLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Prospect</th>
                  <th className="py-3 px-3">Business</th>
                  <th className="py-3 px-3">Type / Service</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {latestLeads.map((lead) => {
                  const whatsappClean = lead.phone.replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
                    `Hi ${lead.name}, this is NOSHLANE Agency following up regarding your ${
                      lead.type === 'audit' ? 'Free Audit request' : 'inquiry'
                    } for ${lead.business}.`
                  )}`;

                  return (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </td>
                      <td className="py-3.5 px-3">
                        <p className="font-semibold text-white">{lead.name}</p>
                        <p className="text-[11px] text-slate-400">{lead.phone}</p>
                      </td>
                      <td className="py-3.5 px-3 text-slate-300 font-medium">
                        {lead.business}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300">
                          {lead.type === 'audit' ? 'Free Audit' : lead.service || 'Contact Brief'}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold font-mono uppercase ${
                            lead.status === 'new'
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                              : lead.status === 'contacted'
                              ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                              : lead.status === 'won'
                              ? 'bg-teal-500/10 text-teal-300 border border-teal-500/20'
                              : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400 bg-[#0A0716] rounded-xl border border-white/5">
            <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-300">No leads recorded yet.</p>
            <p className="text-[11px] text-slate-500">Submissions from Contact & Free Audit forms will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
