import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { ServiceItem, ServiceFAQ, ServiceProcessStep } from '../../../data/services';
import { ConfirmModal } from '../../../components/admin/AdminComponents';
import { Plus, Edit3, Trash2, ExternalLink, Sparkles, HelpCircle } from 'lucide-react';

export const AdminServicesTab: React.FC = () => {
  const { services, saveService, deleteService } = useContent();

  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const initialForm: ServiceItem = {
    id: '',
    slug: '',
    title: '',
    heroKicker: 'Strategic Performance Engine',
    tagline: '',
    shortDescription: '',
    fullDescription: '',
    iconName: 'TrendingUp',
    statHighlight: {
      value: '4.2x',
      label: 'Average Performance Lift'
    },
    whatsIncluded: [
      {
        title: 'Strategy & Execution',
        description: 'Comprehensive workflow designed to drive organic and paid growth.',
        items: ['Full audit & competitive analysis', 'Execution roadmap & weekly sprints']
      }
    ],
    processSteps: [
      { step: '01', title: 'Audit & Discovery', description: 'Deep market analysis and brand voice extraction.' },
      { step: '02', title: 'Roadmap & Production', description: 'Execution plan with timeline milestones.' }
    ],
    deliverables: ['Custom dashboard access', 'Weekly progress reporting'],
    faqs: [
      { question: 'What is the turnaround time?', answer: 'We kick off within 48 hours of onboarding.' }
    ],
    idealFor: ['High-growth brands in Pakistan & GCC', 'E-commerce retailers']
  };

  const [formData, setFormData] = useState<ServiceItem>(initialForm);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      ...initialForm,
      id: `service-${Date.now()}`,
      slug: `service-${Date.now()}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (svc: ServiceItem) => {
    setEditingService(svc);
    setFormData(JSON.parse(JSON.stringify(svc)));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription) {
      showToast('Title and Short Description are required', 'error');
      return;
    }

    try {
      const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const toSave: ServiceItem = {
        ...formData,
        id: formData.id || slug,
        slug: slug
      };

      await saveService(toSave, !editingService);
      showToast(editingService ? 'Service updated successfully!' : 'New service created!', 'success');
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save service', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!isDeletingId) return;
    try {
      await deleteService(isDeletingId);
      showToast('Service deleted successfully', 'success');
    } catch {
      showToast('Failed to delete service', 'error');
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
          <h2 className="text-xl font-bold text-white">Services Management ({services.length})</h2>
          <p className="text-xs text-white/50 mt-1">Edit service descriptions, process steps, FAQs, and deliverables</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium hover:opacity-90 transition shadow-lg shadow-cyan-500/20 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-[#120D24] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                  {svc.heroKicker || 'Service'}
                </span>
                <span className="text-xs text-white/40">/{svc.slug}</span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">{svc.title}</h3>
              <p className="text-xs text-white/70 italic">{svc.tagline}</p>
              <p className="text-xs text-white/50 line-clamp-2">{svc.shortDescription}</p>

              <div className="flex flex-wrap gap-4 pt-2 text-[11px] text-white/40">
                <span>⚡ Stat: <strong className="text-cyan-400">{svc.statHighlight?.value}</strong> ({svc.statHighlight?.label})</span>
                <span>📦 Modules: <strong className="text-white">{svc.whatsIncluded?.length || 0}</strong></span>
                <span>📋 Steps: <strong className="text-white">{svc.processSteps?.length || 0}</strong></span>
                <span>❓ FAQs: <strong className="text-white">{svc.faqs?.length || 0}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <a
                href={`/services/${svc.slug}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Live
              </a>
              <button
                onClick={() => handleOpenEdit(svc)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition cursor-pointer"
                title="Edit service"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsDeletingId(svc.id)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition cursor-pointer"
                title="Delete service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#120D24] border border-white/10 rounded-2xl max-w-3xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editingService ? `Edit Service: ${editingService.title}` : 'Add New Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white text-sm cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Social Media Management"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Hero Kicker Badge</label>
                  <input
                    type="text"
                    value={formData.heroKicker}
                    onChange={(e) => setFormData({ ...formData, heroKicker: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Organic Reach & Community Velocity"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Punchy Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. Build cultural relevance and predictable organic lead flow."
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Short Description (Cards & Overviews) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Full Detailed Description (Service Detail Page)</label>
                <textarea
                  rows={3}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                />
              </div>

              {/* Stat Highlight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-black/20 rounded-xl border border-white/5">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Stat Highlight Value</label>
                  <input
                    type="text"
                    value={formData.statHighlight?.value || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      statHighlight: { value: e.target.value, label: formData.statHighlight?.label || '' }
                    })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-cyan-400 font-bold text-xs"
                    placeholder="e.g. 4.4x"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Stat Highlight Label</label>
                  <input
                    type="text"
                    value={formData.statHighlight?.label || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      statHighlight: { value: formData.statHighlight?.value || '', label: e.target.value }
                    })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                    placeholder="e.g. Average Paid ROAS"
                  />
                </div>
              </div>

              {/* Process Steps */}
              <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-white">Process Steps ({formData.processSteps?.length || 0})</label>
                  <button
                    type="button"
                    onClick={() => {
                      const nextStepNum = String((formData.processSteps?.length || 0) + 1).padStart(2, '0');
                      setFormData({
                        ...formData,
                        processSteps: [
                          ...(formData.processSteps || []),
                          { step: nextStepNum, title: 'New Step', description: 'Step description' }
                        ]
                      });
                    }}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Step
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.processSteps?.map((stepItem, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-[#1A1433] p-2.5 rounded-xl border border-white/5">
                      <span className="font-mono text-cyan-400 font-bold text-xs mt-1">{stepItem.step}</span>
                      <div className="flex-1 space-y-1">
                        <input
                          type="text"
                          value={stepItem.title}
                          onChange={(e) => {
                            const updated = [...(formData.processSteps || [])];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, processSteps: updated });
                          }}
                          placeholder="Step Title"
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-white text-xs"
                        />
                        <textarea
                          rows={2}
                          value={stepItem.description}
                          onChange={(e) => {
                            const updated = [...(formData.processSteps || [])];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, processSteps: updated });
                          }}
                          placeholder="Step Description"
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-white/80 text-xs"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.processSteps || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, processSteps: updated });
                        }}
                        className="text-red-400 hover:text-red-300 p-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-white">Frequently Asked Questions ({formData.faqs?.length || 0})</label>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        faqs: [...(formData.faqs || []), { question: 'New Question', answer: 'Answer details here.' }]
                      });
                    }}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add FAQ
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.faqs?.map((faq, idx) => (
                    <div key={idx} className="bg-[#1A1433] p-2.5 rounded-xl border border-white/5 space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...(formData.faqs || [])];
                            updated[idx].question = e.target.value;
                            setFormData({ ...formData, faqs: updated });
                          }}
                          placeholder="Question..."
                          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-white text-xs font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (formData.faqs || []).filter((_, i) => i !== idx);
                            setFormData({ ...formData, faqs: updated });
                          }}
                          className="text-red-400 hover:text-red-300 px-1 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...(formData.faqs || [])];
                          updated[idx].answer = e.target.value;
                          setFormData({ ...formData, faqs: updated });
                        }}
                        placeholder="Detailed answer..."
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-white/80 text-xs"
                      />
                    </div>
                  ))}
                </div>
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!isDeletingId}
        title="Delete Service"
        message="Are you sure you want to delete this service? All service pages and references will be affected."
        confirmText="Delete Service"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setIsDeletingId(null)}
      />
    </div>
  );
};
