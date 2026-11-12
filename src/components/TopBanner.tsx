import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';

export function TopBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-[#181135] via-[#0E2033] to-[#181135] border-b border-cyan-500/20 text-slate-200 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2.5 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-[10px] uppercase tracking-wider font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Spring 2026 Intake
          </span>
          <span className="text-slate-300 font-medium">
            Now onboarding select brand partners in Lahore, GCC & Global markets.
          </span>
          <Link
            to="/free-audit"
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-white font-semibold underline decoration-cyan-400/50 hover:decoration-white transition-colors"
          >
            <span>Claim Free 24h Funnel Audit</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setClosed(true)}
          className="text-slate-400 hover:text-white p-1 rounded hover:bg-white/5 transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
