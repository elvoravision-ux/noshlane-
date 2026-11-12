import { useEffect } from 'react';
import { X, Mail, Linkedin, Award, Briefcase, GraduationCap, Wrench, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TeamMember } from '../data/team';

interface TeamProfileModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export function TeamProfileModal({ member, onClose }: TeamProfileModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (member) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [member, onClose]);

  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#120E27] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0716]/80">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span>LEADERSHIP PROFILE</span>
            <span>·</span>
            <span className="text-slate-400">{member.department}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
            {/* Portrait Image Column */}
            <div className="sm:col-span-5">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-900 shadow-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-[#0A0716]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-center">
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    {member.experience} Domain Experience
                  </span>
                </div>
              </div>

              {/* Direct Connect Buttons */}
              <div className="mt-4 flex items-center gap-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#1B143A] hover:bg-[#251C4F] border border-cyan-500/30 rounded-lg text-xs font-semibold text-white transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#1B143A] hover:bg-[#251C4F] border border-cyan-500/30 rounded-lg text-xs font-semibold text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Email</span>
                  </a>
                )}
              </div>
            </div>

            {/* Profile Narrative & Info */}
            <div className="sm:col-span-7 space-y-4">
              <div>
                <h3 className="text-2xl font-extrabold text-white">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-cyan-400">
                  {member.role}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                  <span>{member.education}</span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {member.bio}
              </p>

              {/* Notable Impact */}
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-start gap-3">
                <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold block">
                    Verified Campaign Milestone
                  </span>
                  <p className="text-xs text-slate-200 mt-0.5">
                    {member.notableAchievement}
                  </p>
                </div>
              </div>

              {/* Core Tools Stack */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Daily Production & Growth Stack</span>
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {member.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#1B143A] border border-white/10 text-slate-300 text-[11px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Specialties */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Core Growth Specialties</span>
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {member.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-white/5 border border-cyan-500/20 text-cyan-300 text-[11px]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Direct Consultation Link */}
        <div className="px-6 sm:px-8 py-4 bg-[#0A0716] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            Want <span className="text-white font-medium">{member.name}</span> to audit your brand's growth?
          </span>
          <Link
            to="/free-audit"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-lg transition-colors shadow-sm"
          >
            <span>Request Strategy Review</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
