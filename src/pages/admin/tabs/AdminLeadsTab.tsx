import { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  MessageCircle,
  Trash2,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { useContent, LeadItem } from '../../../context/ContentContext';
import { ConfirmModal } from '../../../components/admin/AdminComponents';

export function AdminLeadsTab() {
  const { leads, updateLeadStatus, deleteLead } = useContent();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [deletingLead, setDeletingLead] = useState<LeadItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
      const matchesType = typeFilter === 'all' || lead.type === typeFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        lead.name.toLowerCase().includes(q) ||
        lead.business.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        (lead.service && lead.service.toLowerCase().includes(q)) ||
        (lead.websiteOrSocial && lead.websiteOrSocial.toLowerCase().includes(q));

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [leads, search, statusFilter, typeFilter]);

  const handleDelete = async () => {
    if (!deletingLead) return;
    setIsDeleting(true);
    try {
      await deleteLead(deletingLead.id);
      setDeletingLead(null);
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Client Inquiries & Audit Leads
          </h1>
          <p className="text-xs text-slate-400">
            Manage, triage, and reply to all inbound contact submissions in one place
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg shrink-0">
          Total Leads: {leads.length}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-[#120E27] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-lg">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, brand..."
            className="w-full bg-[#0A0716] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-[#0A0716] border border-white/10 rounded-xl px-2.5 py-1 text-xs">
            <span className="text-[11px] text-slate-400 font-mono">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#120E27]">All</option>
              <option value="new" className="bg-[#120E27]">New</option>
              <option value="contacted" className="bg-[#120E27]">Contacted</option>
              <option value="won" className="bg-[#120E27]">Won</option>
              <option value="lost" className="bg-[#120E27]">Lost</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0A0716] border border-white/10 rounded-xl px-2.5 py-1 text-xs">
            <span className="text-[11px] text-slate-400 font-mono">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-[#120E27]">All Types</option>
              <option value="contact" className="bg-[#120E27]">Contact Form</option>
              <option value="audit" className="bg-[#120E27]">Free Audit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#120E27] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#0A0716] border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Contact & Business</th>
                  <th className="py-3.5 px-4">Submission Details</th>
                  <th className="py-3.5 px-4">Message / Notes</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.map((lead) => {
                  const whatsappClean = lead.phone.replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
                    `Hi ${lead.name}! This is NOSHLANE Agency reaching out regarding your ${
                      lead.type === 'audit' ? 'Free Marketing Audit request' : 'project brief'
                    } for ${lead.business}.`
                  )}`;

                  return (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      {/* Date */}
                      <td className="py-4 px-4 text-slate-400 whitespace-nowrap font-mono text-[11px] align-top">
                        {new Date(lead.createdAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                        <span className="block text-[10px] text-slate-600">
                          {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* Contact & Business */}
                      <td className="py-4 px-4 align-top space-y-1">
                        <p className="font-bold text-white text-sm">{lead.name}</p>
                        <p className="text-xs text-cyan-300 font-medium">{lead.business}</p>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                          <Phone className="w-3 h-3 text-cyan-400" />
                          <span>{lead.phone}</span>
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{lead.email}</span>
                          </div>
                        )}
                      </td>

                      {/* Details & Link */}
                      <td className="py-4 px-4 align-top space-y-1 max-w-[200px]">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {lead.type === 'audit' ? 'Free Audit Request' : lead.service || 'Service Inquiry'}
                        </span>
                        {lead.websiteOrSocial && (
                          <div className="text-[11px] text-slate-300 truncate">
                            <span className="text-slate-500">Asset: </span>
                            <span className="font-mono text-cyan-400">{lead.websiteOrSocial}</span>
                          </div>
                        )}
                        {lead.adSpend && (
                          <p className="text-[10px] text-slate-400">
                            Spend: <span className="text-slate-200">{lead.adSpend}</span>
                          </p>
                        )}
                        {lead.primaryGoal && (
                          <p className="text-[10px] text-slate-400">
                            Goal: <span className="text-slate-200">{lead.primaryGoal}</span>
                          </p>
                        )}
                      </td>

                      {/* Message */}
                      <td className="py-4 px-4 align-top max-w-[240px]">
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                          {lead.message || 'No additional note provided.'}
                        </p>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-4 px-4 align-top">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                            lead.status === 'new'
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                              : lead.status === 'contacted'
                              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                              : lead.status === 'won'
                              ? 'bg-teal-500/10 border-teal-500/30 text-teal-300'
                              : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                          }`}
                        >
                          <option value="new" className="bg-[#120E27] text-amber-300">New</option>
                          <option value="contacted" className="bg-[#120E27] text-cyan-300">Contacted</option>
                          <option value="won" className="bg-[#120E27] text-teal-300">Won</option>
                          <option value="lost" className="bg-[#120E27] text-slate-400">Lost</option>
                        </select>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-4 align-top text-right space-x-2 whitespace-nowrap">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>WhatsApp</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setDeletingLead(lead)}
                          className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-400">
            <FileSpreadsheet className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-white">No submissions match the filter.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the search or filter dropdowns.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingLead)}
        title="Delete Inbound Lead"
        message={`Are you sure you want to permanently remove lead from ${deletingLead?.name} (${deletingLead?.business})? This action cannot be undone.`}
        isDeleting={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setDeletingLead(null)}
      />
    </div>
  );
}
