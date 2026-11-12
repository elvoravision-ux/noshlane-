import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { PortfolioProject } from '../../../data/portfolio';
import { ImageUploader, ConfirmModal } from '../../../components/admin/AdminComponents';
import { Plus, Edit2, Trash2, ExternalLink, Tag } from 'lucide-react';

export const AdminPortfolioTab: React.FC = () => {
  const { portfolio, saveProject, deleteProject } = useContent();

  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const initialForm: PortfolioProject = {
    id: '',
    slug: '',
    title: '',
    client: '',
    year: '2026',
    category: 'Social Media',
    categories: ['Social Media'],
    featured: false,
    coverImage: '',
    galleryImages: [],
    heroSnippet: '',
    keyMetric: '+300% Growth',
    challenge: '',
    solution: '',
    strategyHighlights: ['Organic social growth', 'Paid performance scaling'],
    results: [
      { value: '4.2x', label: 'ROAS Lift' },
      { value: '+45K', label: 'Community Growth' }
    ],
    testimonialQuote: {
      text: '',
      author: '',
      role: ''
    }
  };

  const [formData, setFormData] = useState<PortfolioProject>(initialForm);

  const categories = ['All', 'Social Media', 'Paid Ads', 'Branding', 'Content Creation', 'Web Development'];

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData({
      ...initialForm,
      id: `project-${Date.now()}`,
      slug: `project-${Date.now()}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({ ...project });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client) {
      showToast('Title and Client are required', 'error');
      return;
    }

    try {
      const generatedSlug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const toSave: PortfolioProject = {
        ...formData,
        id: formData.id || generatedSlug,
        slug: generatedSlug,
        categories: formData.categories?.length ? formData.categories : [formData.category]
      };

      await saveProject(toSave, !editingProject);
      showToast(editingProject ? 'Project updated successfully!' : 'New project added to portfolio!', 'success');
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save project', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!isDeletingId) return;
    try {
      await deleteProject(isDeletingId);
      showToast('Project deleted successfully', 'success');
    } catch {
      showToast('Failed to delete project', 'error');
    } finally {
      setIsDeletingId(null);
    }
  };

  const filteredProjects = portfolio.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.client.toLowerCase().includes(search.toLowerCase()) ||
                          p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || p.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

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
          <h2 className="text-xl font-bold text-white">Portfolio Projects ({portfolio.length})</h2>
          <p className="text-xs text-white/50 mt-1">Manage case studies, metrics, cover images, and galleries</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium hover:opacity-90 transition shadow-lg shadow-cyan-500/20 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search projects by title, client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-[#120D24] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat.toLowerCase())}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                filterCategory === cat.toLowerCase()
                  ? 'bg-cyan-500 text-white'
                  : 'bg-[#120D24] text-white/60 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#120D24] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition flex flex-col group"
          >
            <div className="relative h-48 bg-black/40 overflow-hidden">
              <img
                src={project.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-cyan-400 border border-white/10 flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> {project.category}
              </span>
              {project.featured && (
                <span className="absolute top-3 right-3 bg-indigo-500/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase">
                  Featured
                </span>
              )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">{project.client} • {project.year}</p>
                <h3 className="text-base font-bold text-white mt-1 line-clamp-1">{project.title}</h3>
                <p className="text-xs text-white/50 mt-2 line-clamp-2">{project.heroSnippet || project.challenge || 'Digital marketing campaign'}</p>
                
                {project.results && project.results.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5">
                    {project.results.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="bg-black/30 p-2 rounded-lg text-center">
                        <div className="text-cyan-400 font-bold text-sm">{m.value}</div>
                        <div className="text-white/40 text-[10px] uppercase truncate">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                <a
                  href={`/portfolio/${project.slug || project.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/50 hover:text-cyan-400 flex items-center gap-1 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Live
                </a>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition cursor-pointer"
                    title="Edit project"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsDeletingId(project.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition cursor-pointer"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-[#120D24] rounded-2xl border border-white/5 text-white/40">
          No projects match your search criteria.
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#120D24] border border-white/10 rounded-2xl max-w-2xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editingProject ? 'Edit Project' : 'Add New Portfolio Project'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white text-sm cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Scaling Al-Fatah E-commerce ROAS"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Al-Fatah Lahore"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Social Media">Social Media</option>
                    <option value="Paid Ads">Paid Ads</option>
                    <option value="Branding">Branding</option>
                    <option value="Content Creation">Content Creation</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    placeholder="2026"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-white/80">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded bg-[#1A1433] border-white/20 text-cyan-500 focus:ring-0"
                    />
                    Featured on Home Page
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Hero Snippet / Tagline</label>
                <input
                  type="text"
                  value={formData.heroSnippet}
                  onChange={(e) => setFormData({ ...formData, heroSnippet: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  placeholder="e.g. How we scaled online sales by +310% in 90 days."
                />
              </div>

              {/* Cover Image */}
              <ImageUploader
                label="Cover Image (Direct URL or Upload file)"
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                storagePath="portfolio"
              />

              {/* Key Metrics */}
              <div>
                <label className="block text-xs text-white/60 mb-1">Key Metrics (Value & Label)</label>
                <div className="space-y-2">
                  {formData.results?.map((metric, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Value (e.g. +310%, 4.4x)"
                        value={metric.value}
                        onChange={(e) => {
                          const updated = [...(formData.results || [])];
                          updated[idx].value = e.target.value;
                          setFormData({ ...formData, results: updated });
                        }}
                        className="w-32 bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs font-bold text-cyan-400"
                      />
                      <input
                        type="text"
                        placeholder="Label (e.g. D2C Online Sales Lift)"
                        value={metric.label}
                        onChange={(e) => {
                          const updated = [...(formData.results || [])];
                          updated[idx].label = e.target.value;
                          setFormData({ ...formData, results: updated });
                        }}
                        className="flex-1 bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.results || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, results: updated });
                        }}
                        className="px-2 text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        results: [...(formData.results || []), { value: '', label: '' }],
                      });
                    }}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Metric
                  </button>
                </div>
              </div>

              {/* Challenge & Solution */}
              <div>
                <label className="block text-xs text-white/60 mb-1">The Challenge</label>
                <textarea
                  rows={2}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  placeholder="What difficulties or bottlenecks was the client experiencing?"
                />
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">The Solution</label>
                <textarea
                  rows={2}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  placeholder="How did NOSHLANE architect and execute the solution?"
                />
              </div>

              {/* Client Testimonial */}
              <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-3">
                <p className="text-xs font-semibold text-white/80">Client Testimonial (Optional)</p>
                <input
                  type="text"
                  placeholder="Client Quote..."
                  value={formData.testimonialQuote?.text || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    testimonialQuote: { ...(formData.testimonialQuote || { author: '', role: '' }), text: e.target.value }
                  })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Author Name"
                    value={formData.testimonialQuote?.author || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      testimonialQuote: { ...(formData.testimonialQuote || { text: '', role: '' }), author: e.target.value }
                    })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Role / Title"
                    value={formData.testimonialQuote?.role || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      testimonialQuote: { ...(formData.testimonialQuote || { text: '', author: '' }), role: e.target.value }
                    })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                  />
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!isDeletingId}
        title="Delete Portfolio Project"
        message="Are you sure you want to delete this case study? This action will remove it live from the website."
        confirmText="Delete Project"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setIsDeletingId(null)}
      />
    </div>
  );
};
