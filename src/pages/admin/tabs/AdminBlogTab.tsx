import React, { useState } from 'react';
import { useContent } from '../../../context/ContentContext';
import { BlogPost } from '../../../data/blog';
import { ConfirmModal } from '../../../components/admin/AdminComponents';
import { Plus, Edit2, Trash2, ExternalLink, BookOpen, Clock, Calendar } from 'lucide-react';

export const AdminBlogTab: React.FC = () => {
  const { blog, saveBlogPost, deleteBlogPost } = useContent();

  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [search, setSearch] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  const initialForm: BlogPost = {
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    category: 'Paid Media',
    readTime: '5 min read',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    author: {
      name: 'Daniyal Ahmed',
      role: 'Head of Performance Media',
      initials: 'DA'
    },
    keyTakeaways: [
      'Focus on high-converting creative hooks in the first 2 seconds.',
      'Server-side Conversions API restores 25%+ lost attribution signals.'
    ],
    contentParagraphs: [
      {
        heading: 'Strategic Foundation',
        body: 'Digital marketing in Pakistan requires understanding local buyer behavior, trust deficits in Cash-on-Delivery, and rapid visual engagement.',
        highlight: 'Creative testing is the single biggest multiplier for brand growth.'
      }
    ]
  };

  const [formData, setFormData] = useState<BlogPost>(initialForm);

  const handleOpenAdd = () => {
    setEditingPost(null);
    setFormData({
      ...initialForm,
      id: `post-${Date.now()}`,
      slug: `post-${Date.now()}`
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData(JSON.parse(JSON.stringify(post)));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt) {
      showToast('Title and Excerpt are required', 'error');
      return;
    }

    try {
      const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const toSave: BlogPost = {
        ...formData,
        id: formData.id || slug,
        slug: slug,
        author: {
          ...formData.author,
          initials: formData.author.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        }
      };

      await saveBlogPost(toSave, !editingPost);
      showToast(editingPost ? 'Article updated successfully!' : 'New article published!', 'success');
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save article', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!isDeletingId) return;
    try {
      await deleteBlogPost(isDeletingId);
      showToast('Article deleted successfully', 'success');
    } catch {
      showToast('Failed to delete article', 'error');
    } finally {
      setIsDeletingId(null);
    }
  };

  const filteredPosts = blog.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.author.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <h2 className="text-xl font-bold text-white">Blog & Insights ({blog.length})</h2>
          <p className="text-xs text-white/50 mt-1">Publish agency playbooks, media guides, and market teardowns</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium hover:opacity-90 transition shadow-lg shadow-cyan-500/20 text-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Write Article
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search articles by title, topic, or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#120D24] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
      />

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-[#120D24] border border-white/5 rounded-2xl p-6 hover:border-cyan-500/30 transition flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-white/40">
                <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition line-clamp-2">
                {post.title}
              </h3>

              <p className="text-xs text-white/60 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 pt-2 text-xs text-white/40">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">
                  {post.author?.initials || 'NL'}
                </div>
                <span>{post.author?.name}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
              <a
                href={`/blog/${post.slug || post.id}`}
                target="_blank"
                rel="noreferrer"
                className="text-white/50 hover:text-cyan-400 flex items-center gap-1 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View Post
              </a>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-white/70 hover:text-cyan-400 transition cursor-pointer"
                  title="Edit post"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsDeletingId(post.id)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition cursor-pointer"
                  title="Delete post"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-[#120D24] rounded-2xl border border-white/5 text-white/40">
          No articles match your search.
        </div>
      )}

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#120D24] border border-white/10 rounded-2xl max-w-3xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">
                {editingPost ? 'Edit Blog Post' : 'Write New Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white text-sm cursor-pointer">✕</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-white/60 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-medium"
                  placeholder="e.g. How to Scale Meta Ads in Pakistan Without Burning Cash"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="Paid Media / Branding"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="6 min read"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Publish Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                    placeholder="February 2026"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-black/20 rounded-xl border border-white/5">
                <div>
                  <label className="block text-xs text-white/60 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formData.author?.name || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      author: { ...formData.author, name: e.target.value }
                    })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                    placeholder="Zohair Khan"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">Author Role</label>
                  <input
                    type="text"
                    value={formData.author?.role || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      author: { ...formData.author, role: e.target.value }
                    })}
                    className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                    placeholder="Founder & Head of Strategy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-1">Excerpt / Summary *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  placeholder="Key takeaway synopsis for card display..."
                />
              </div>

              {/* Key Takeaways */}
              <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-white">Key Takeaways (Bullet summary)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        keyTakeaways: [...(formData.keyTakeaways || []), '']
                      });
                    }}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Point
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.keyTakeaways?.map((item, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...(formData.keyTakeaways || [])];
                          updated[idx] = e.target.value;
                          setFormData({ ...formData, keyTakeaways: updated });
                        }}
                        className="flex-1 bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white text-xs"
                        placeholder="Key insight..."
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = (formData.keyTakeaways || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, keyTakeaways: updated });
                        }}
                        className="text-red-400 hover:text-red-300 px-2 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Paragraphs */}
              <div className="p-4 bg-black/20 rounded-xl border border-white/5 space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-white">Article Sections / Paragraphs</label>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        contentParagraphs: [
                          ...(formData.contentParagraphs || []),
                          { heading: 'New Section', body: '', highlight: '' }
                        ]
                      });
                    }}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Section
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.contentParagraphs?.map((para, idx) => (
                    <div key={idx} className="bg-[#1A1433] p-3 rounded-xl border border-white/5 space-y-2">
                      <div className="flex justify-between items-center">
                        <input
                          type="text"
                          value={para.heading || ''}
                          onChange={(e) => {
                            const updated = [...(formData.contentParagraphs || [])];
                            updated[idx].heading = e.target.value;
                            setFormData({ ...formData, contentParagraphs: updated });
                          }}
                          placeholder="Section Heading (e.g. The Death of Manual Targeting)"
                          className="flex-1 bg-black/30 border border-white/10 rounded-lg px-2.5 py-1 text-white text-xs font-semibold"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (formData.contentParagraphs || []).filter((_, i) => i !== idx);
                            setFormData({ ...formData, contentParagraphs: updated });
                          }}
                          className="text-red-400 hover:text-red-300 px-2 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      <textarea
                        rows={3}
                        value={para.body}
                        onChange={(e) => {
                          const updated = [...(formData.contentParagraphs || [])];
                          updated[idx].body = e.target.value;
                          setFormData({ ...formData, contentParagraphs: updated });
                        }}
                        placeholder="Section body text..."
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-2.5 py-1.5 text-white/80 text-xs"
                      />

                      <input
                        type="text"
                        value={para.highlight || ''}
                        onChange={(e) => {
                          const updated = [...(formData.contentParagraphs || [])];
                          updated[idx].highlight = e.target.value;
                          setFormData({ ...formData, contentParagraphs: updated });
                        }}
                        placeholder="Optional callout quote / highlight banner text"
                        className="w-full bg-cyan-950/20 border border-cyan-500/20 rounded-lg px-2.5 py-1 text-cyan-300 text-xs italic"
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
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!isDeletingId}
        title="Delete Article"
        message="Are you sure you want to delete this article? It will be removed permanently from the blog."
        confirmText="Delete Article"
        isDestructive
        onConfirm={confirmDelete}
        onCancel={() => setIsDeletingId(null)}
      />
    </div>
  );
};
