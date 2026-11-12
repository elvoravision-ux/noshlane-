import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioProject } from '../data/portfolio';

interface PortfolioCardProps {
  project: PortfolioProject;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group relative bg-[#120E27] border border-white/5 hover:border-cyan-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between">
      <div>
        {/* Visual Media container */}
        <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
          {!imgError ? (
            <img
              src={project.coverImage}
              alt={`${project.title} - ${project.client}`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#120E27] to-[#0A0716] p-6 text-center">
              <span className="text-sm font-semibold text-white mb-1">{project.title}</span>
              <span className="text-xs text-slate-400">{project.client}</span>
            </div>
          )}

          {/* Measured overlay scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120E27] via-transparent to-transparent opacity-85" />

          {/* Quantified Metric Badge floating over image */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="inline-block px-3 py-1 bg-[#0A0716]/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold rounded-md shadow-lg">
              {project.keyMetric}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Metadata clean unboxed text */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
            <span className="text-cyan-400 font-medium">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums font-mono">{project.year}</span>
          </div>

          <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {project.heroSnippet}
          </p>
        </div>
      </div>

      {/* Card Action */}
      <div className="px-6 pb-6 pt-2">
        <Link
          to={`/portfolio/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white transition-colors"
        >
          <span>Read Case Study</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
