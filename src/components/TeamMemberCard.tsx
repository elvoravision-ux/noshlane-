import { useState } from 'react';
import { ArrowUpRight, GraduationCap, Award, ExternalLink } from 'lucide-react';
import { TeamMember } from '../data/team';

interface TeamMemberCardProps {
  member: TeamMember;
  onOpenProfile: (member: TeamMember) => void;
}

export function TeamMemberCard({ member, onOpenProfile }: TeamMemberCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group relative bg-[#120E27] border border-white/5 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between">
      <div>
        {/* Real Portrait Visual with Experience Badge */}
        <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer" onClick={() => onOpenProfile(member)}>
          {!imgError ? (
            <img
              src={member.image}
              alt={member.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1C163B] to-[#0A0716] p-6 text-center">
              <span className="text-xl font-bold text-white mb-1">{member.avatarInitials}</span>
              <span className="text-xs text-cyan-400">{member.name}</span>
            </div>
          )}

          {/* Measured overlay scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120E27] via-transparent to-transparent opacity-80" />

          {/* Experience tag */}
          <div className="absolute top-3 left-3 bg-[#0A0716]/85 backdrop-blur-md border border-cyan-500/30 px-2.5 py-1 rounded-md text-[11px] font-mono text-cyan-300 font-semibold shadow-md">
            {member.experience}
          </div>

          {/* Department badge */}
          <div className="absolute top-3 right-3 bg-[#0A0716]/85 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[11px] text-slate-300">
            {member.department}
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
              {member.name}
            </h3>
            <button
              type="button"
              onClick={() => onOpenProfile(member)}
              className="p-1 rounded text-slate-400 group-hover:text-cyan-400 hover:bg-white/5 transition-colors cursor-pointer"
              title="View full profile"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-semibold text-cyan-400 mb-2">
            {member.role}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{member.education}</span>
          </div>

          <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
            {member.bio}
          </p>

          {/* Milestone Strip */}
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <div className="flex items-start gap-2">
              <Award className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-200 leading-snug">
                {member.notableAchievement}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Specialties & Profile Modal Button */}
      <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {member.specialties.slice(0, 2).map((s, i) => (
            <span key={i} className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
              {s}
            </span>
          ))}
          {member.specialties.length > 2 && (
            <span className="text-[10px] text-cyan-400 font-mono">
              +{member.specialties.length - 2}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onOpenProfile(member)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-white transition-colors cursor-pointer shrink-0"
        >
          <span>View Profile</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
