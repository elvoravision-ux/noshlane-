import { Link } from 'react-router-dom';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/agency';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
}

export function CTASection({
  title = "Ready to scale your brand in Pakistan and global markets?",
  subtitle = "Claim your free, zero-obligation digital marketing audit. Our senior strategists in Lahore will analyze your ad accounts, creative retention, and conversion funnels within 24 business hours.",
}: CTASectionProps) {
  const whatsappUrl = `https://wa.me/${AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
    AGENCY_DETAILS.contact.whatsappDefaultMessage
  )}`;

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#070512] border-t border-b border-white/5">
      {/* Subtle ambient cyan/indigo background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-4">
          High-Performance Growth Partnership
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance mb-6 max-w-3xl mx-auto leading-tight">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/free-audit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-all duration-200 shadow-lg shadow-cyan-500/25"
          >
            <span>Claim Your Free Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#15102E] hover:bg-[#1C163D] border border-cyan-500/30 rounded-md transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Chat on WhatsApp Directly</span>
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span>· Response within 24 Hours</span>
          <span>· No Pushy Sales Pitches</span>
          <span>· Executive Strategy Team Review</span>
        </div>
      </div>
    </section>
  );
}
