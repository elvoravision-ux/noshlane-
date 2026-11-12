import { useState, useMemo } from 'react';
import { SEOHead } from '../components/SEOHead';
import { PortfolioCard } from '../components/PortfolioCard';
import { CTASection } from '../components/CTASection';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';

import { useContent } from '../context/ContentContext';

const CATEGORIES = [
  'All',
  'Social Media',
  'Content Creation',
  'Paid Ads',
  'Branding',
  'Web Development',
] as const;

export function PortfolioPage() {
  const { portfolio } = useContent();
  const allProjects = portfolio?.length ? portfolio : PORTFOLIO_PROJECTS;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return allProjects;
    }
    return allProjects.filter((p) =>
      p.category === selectedCategory || (p.categories && p.categories.includes(selectedCategory))
    );
  }, [allProjects, selectedCategory]);

  return (
    <>
      <SEOHead
        title="Portfolio & Case Studies | NOSHLANE Lahore"
        description="Explore our proven track record: real metrics, creative campaigns, branding, and digital growth engines engineered for brands in Pakistan and abroad."
      />

      {/* Header Banner */}
      <section className="pt-16 pb-16 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            Selected Works & Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
            Commercial outcomes, documented with transparent data.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Every case study below represents a real challenge solved with disciplined creative thinking, precision media buying, or custom web architecture.
          </p>

          {/* Interactive Filter Bar */}
          <div className="mt-10 flex flex-wrap items-center gap-1.5 p-1.5 bg-[#120E27] border border-cyan-500/20 rounded-lg max-w-fit shadow-md">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
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

          <div className="mt-4 text-xs text-slate-500 font-mono">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} in {selectedCategory}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-[#070512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <PortfolioCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-[#120E27] border border-white/5 rounded-2xl max-w-xl mx-auto p-8">
              <p className="text-white font-semibold mb-2">No projects found in this category.</p>
              <p className="text-xs text-slate-400 mb-6">Try selecting another filter or view all case studies.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-md"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
