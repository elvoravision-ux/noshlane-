import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { Testimonial } from '../../../data/agency';
import { ConfirmModal } from '../../../components/admin/AdminComponents';
import { Plus, Edit2, Trash2, Quote, Star, Building2, MapPin } from 'lucide-react';

export const AdminTestimonialsTab: React.FC = () => {
  const { testimonials, saveTestimonial, deleteTestimonial } = useContent();

  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const initialForm: Testimonial = {
    id: '',
    name: '',
    role: 'Founder & CEO',
    company: '',
    location: 'Lahore, Pakistan',
    quote: '',
    metric: '+250% Growth',
    service: 'Social Media & Paid Ads',
    initials: 'AB'
  };

  const [formData, setFormData] = useState<Testimonial>(initialForm);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      ...initialForm,
      id: `testim-${Date.now()}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.quote || !formData.company) {
      showToast('Client Name, Company, and Quote are required', 'error');
      return;
    }

    try {
      const initials = formData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

      const toSave: Testimonial = {
        ...formData,
        id: formData.id || `testim-${Date.now()}`,
        initials: initials || 'NL'
      };

      await saveTestimonial(toSave, !editingItem);
      showToast(editingItem ? 'Testimonial updated!' : 'Testimonial added!', 'success');
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save testimonial', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!isDeletingId) return;
    try {
      await deleteTestimonial(isDeletingId);
      showToast('Testimonial deleted successfully', 'success');
    } catch {
      showToast('Failed to delete testimonial', 'error');
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 ${
          toastMsg.type === 'success' ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
        }`}>
          {toastMsg.message}
        </div>
      )}

      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#120D24] p-5 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-xl font-bold text-white">Client Testimonials ({testimonials.length})</h2>
          <p className="text-xs text-white/50 mt-1">Manage verified quotes, executive roles, and verifiable metrics</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium hover:opacity-90 transition shadow-lg shadow-cyan-500/20 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-[#120D24] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs border border-cyan-500/20">
                  {t.metric}
                </span>
                <div className="flex text-amber-400 text-xs gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-white/80 italic line-clamp-4 leading-relaxed">
                "{t.quote}"
              </p>

              <div className="pt-3 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-bold flex items-center justify-center text-xs shadow-inner">
                    {t.initials || t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-[11px] text-white/50">{t.role}, {t.company}</p>
                    <p className="text-[10px] text-white/40 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5" /> {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
              <span className="text-[11px] text-indigo-400 font-medium">{t.service}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(t)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition cursor-pointer"
                  title="Edit testimonial"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsDeletingId(t.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition cursor-pointer"
                  title="Delete testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#120D24] border border-white/10 rounded-2xl max-w-lg w-full p-6 my-8 space-y-5">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editingItem ? 'Edit Testimonial' : 'Add Client Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white text-sm cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="Hamza Tariq"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Company / Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="Aurora Roastery"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="Founder & CEO"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="Lahore (Gulberg / DHA)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Key Result / Metric</label>
                  <input
                    type="text"
                    value={formData.metric}
                    onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-cyan-400 font-bold focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="+310% Online D2C Revenue"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Service Provided</label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="Branding & Social Media"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Client Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  placeholder="NOSHLANE transformed our brand and customer acquisition..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-white/60 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs transition cursor-pointer"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!isDeletingId}
        title="Delete Testimonial"
        message="Are you sure you want to remove this testimonial? It will no longer appear on the home or about pages."
        confirmText="Delete"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setIsDeletingId(null)}
      />
    </div>
  );
};
