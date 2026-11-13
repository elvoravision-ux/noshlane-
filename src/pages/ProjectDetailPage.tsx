import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Quote } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CTASection } from '../components/CTASection';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { useContent } from '../context/ContentContext';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { portfolio } = useContent();
  const projects = portfolio?.length ? portfolio : PORTFOLIO_PROJECTS;
  const [imgErrorIndex, setImgErrorIndex] = useState<Record<number, boolean>>({});

  const projectIndex = projects.findIndex((p) => p.slug === slug || p.id === slug);
  const project = projects[projectIndex];

  if (!project) {
    return <Navigate to="/portfolio" replace />;
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <>
      <SEOHead
        title={`${project.title} Case Study | NOSHLANE`}
        description={`${project.client} - ${project.heroSnippet} Key outcome: ${project.keyMetric}`}
        canonicalPath={`/portfolio/${project.slug}`}
      />

      {/* Header & Back navigation */}
      <section className="pt-12 pb-16 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Case Studies</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
            <span className="text-cyan-400 font-mono font-medium">{project.category}</span>
            <span>·</span>
            <span>{project.client}</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{project.year}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight max-w-4xl mb-6">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            {project.heroSnippet}
          </p>

          <div className="mt-8 inline-block px-4 py-2 bg-[#120E27] border border-cyan-500/40 rounded-lg shadow-md">
            <span className="text-xs font-mono text-slate-400 block">Primary Verified Outcome</span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-cyan-300 tabular-nums">
              {project.keyMetric}
            </span>
          </div>
        </div>
      </section>

      {/* Main Image Showcase */}
      <section className="py-12 bg-[#070512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full bg-slate-900 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl">
            {!imgErrorIndex[0] ? (
              <img
                src={project.coverImage}
                alt={`${project.title} Hero Shoot`}
                referrerPolicy="no-referrer"
                onError={() => setImgErrorIndex((prev) => ({ ...prev, 0: true }))}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#120E27] p-8 text-center text-slate-400">
                <span>{project.title} Visual Showcase</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Narrative Section: Challenge & Solution */}
      <section className="py-20 bg-[#0A0716]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Challenge and Solution narrative */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
                  The Problem
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  The Commercial Challenge
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
                  The Approach
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  The Strategic Solution
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Strategy Highlights */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <h3 className="text-lg font-bold text-white">
                  Execution Highlights
                </h3>
                <ul className="space-y-3">
                  {project.strategyHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client Quote if available */}
              {project.testimonialQuote && (
                <div className="bg-[#120E27] border border-cyan-500/20 rounded-2xl p-8 relative">
                  <Quote className="w-8 h-8 text-cyan-500/30 mb-4" />
                  <blockquote className="text-base text-slate-200 italic leading-relaxed mb-4">
                    "{project.testimonialQuote.text}"
                  </blockquote>
                  <div className="text-xs">
                    <p className="font-bold text-white">{project.testimonialQuote.author}</p>
                    <p className="text-slate-400">{project.testimonialQuote.role}, {project.client}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Quantified Results Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-[#120E27] border border-cyan-500/20 rounded-2xl p-8 space-y-8 shadow-xl">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                    Verified Outcomes
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    Performance Metrics
                  </h3>
                </div>

                <div className="space-y-6">
                  {project.results.map((res, idx) => (
                    <div key={idx} className="pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                      <span className="text-3xl font-extrabold text-white font-mono tabular-nums block">
                        {res.value}
                      </span>
                      <span className="text-xs text-slate-400 leading-snug">
                        {res.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to="/free-audit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-colors text-center shadow-md shadow-cyan-500/20"
                  >
                    <span>Request Audit for Your Brand</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Gallery */}
      {project.galleryImages.length > 1 && (
        <section className="py-16 bg-[#070512] border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-white mb-8">
              Visual Documentation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.galleryImages.slice(1).map((imgUrl, i) => {
                const imgKey = i + 1;
                return (
                  <div key={i} className="aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden border border-white/10">
                    {!imgErrorIndex[imgKey] ? (
                      <img
                        src={imgUrl}
                        alt={`${project.title} Asset ${i + 2}`}
                        referrerPolicy="no-referrer"
                        onError={() => setImgErrorIndex((prev) => ({ ...prev, [imgKey]: true }))}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#120E27] p-6 text-xs text-slate-500">
                        Visual Artifact
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Next Project Footer */}
      <section className="py-12 bg-[#0A0716] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            to="/portfolio"
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            ← View All Case Studies
          </Link>
          <Link
            to={`/portfolio/${nextProject.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>Next Case Study: {nextProject.title}</span>
            <span>→</span>
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
