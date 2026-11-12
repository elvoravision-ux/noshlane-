import { Quote } from 'lucide-react';
import { Testimonial } from '../data/agency';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-[#120E27] border border-white/5 rounded-xl p-8 flex flex-col justify-between relative group hover:border-cyan-500/30 transition-colors">
      <div>
        <div className="flex items-center justify-between mb-6">
          <Quote className="w-8 h-8 text-cyan-500/30" />
          <span className="text-xs font-mono font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 rounded">
            {testimonial.metric}
          </span>
        </div>

        <blockquote className="text-slate-300 text-sm leading-relaxed mb-6 italic">
          "{testimonial.quote}"
        </blockquote>
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#1C163B] border border-cyan-500/30 flex items-center justify-center font-bold text-xs text-cyan-300">
          {testimonial.initials}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">
            {testimonial.name}
          </h4>
          <p className="text-xs text-slate-400">
            {testimonial.role}, <span className="text-slate-300">{testimonial.company}</span>
          </p>
          <p className="text-[11px] text-slate-500">
            {testimonial.location}
          </p>
        </div>
      </div>
    </div>
  );
}
