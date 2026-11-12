import { Link } from 'react-router-dom';
import { ArrowRight, Share2, Video, TrendingUp, Palette, Code, Layers } from 'lucide-react';
import { ServiceItem } from '../data/services';

const ICON_MAP: Record<string, React.ElementType> = {
  Share2,
  Video,
  TrendingUp,
  Palette,
  Code,
};

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const IconComponent = ICON_MAP[service.iconName] || Layers;
  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div className="group relative bg-[#120E27] border border-white/5 hover:border-cyan-500/40 rounded-xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 flex flex-col justify-between">
      <div>
        {/* Header with human editorial numbering and icon */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <span className="text-xs font-mono font-medium text-slate-500 tabular-nums">
            {formattedIndex}
          </span>
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-indigo-500 group-hover:text-white transition-all">
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
          {service.title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {/* Highlight metric - unboxed metadata */}
        <div className="pt-4 border-t border-white/5 mb-6 flex items-baseline gap-2">
          <span className="text-lg font-bold text-white font-mono tabular-nums">
            {service.statHighlight.value}
          </span>
          <span className="text-xs text-cyan-400 font-medium">
            {service.statHighlight.label}
          </span>
        </div>
      </div>

      {/* Action link */}
      <div>
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 group-hover:text-cyan-300 transition-colors"
        >
          <span>Explore Capabilities & Process</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 text-cyan-400 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
