import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, Calendar } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CTASection } from '../components/CTASection';
import { BLOG_POSTS } from '../data/blog';

const CATEGORIES = ['All', 'Paid Media', 'Content Creation', 'Web & E-Commerce', 'Branding'] as const;

export function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <SEOHead
        title="Marketing & Growth Blog | NOSHLANE Lahore"
        description="Actionable digital marketing strategies, Meta ads breakdowns, short-form video retention frameworks, and e-commerce optimization from our Lahore studio."
      />

      {/* Header Banner */}
      <section className="pt-16 pb-16 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            Strategy & Field Notes
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
            Practical growth thinking, zero generic marketing platitudes.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Written by our practicing media buyers, creative directors, and full-stack developers directly from client campaigns in Pakistan and global markets.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#120E27] border border-cyan-500/20 rounded-lg shadow-md">
              {CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-[#120E27] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-[#070512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-[#120E27] border border-white/5 hover:border-cyan-500/30 rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 group shadow-lg"
                >
                  <div>
                    {/* Metadata clean text */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <span className="text-cyan-400 font-medium">{post.category}</span>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{post.readTime}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 leading-snug">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#1C163B] text-[10px] font-bold text-cyan-300 flex items-center justify-center border border-cyan-500/20">
                        {post.author.initials}
                      </div>
                      <span className="text-xs text-slate-400">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors"
                    >
                      <span>Read Strategy</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#120E27] border border-white/5 rounded-2xl max-w-md mx-auto p-8">
              <p className="text-white font-semibold mb-2">No articles matched your search.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-md"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
