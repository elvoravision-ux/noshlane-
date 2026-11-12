import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Award, CheckCircle2, Users } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CTASection } from '../components/CTASection';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { TeamProfileModal } from '../components/TeamProfileModal';
import { TEAM_MEMBERS, AGENCY_VALUES, TeamMember } from '../data/team';
import { AGENCY_DETAILS } from '../data/agency';

export function AboutPage() {
  const [cultureImgError, setCultureImgError] = useState(false);
  const [activeProfile, setActiveProfile] = useState<TeamMember | null>(null);
  const cultureImageSrc = "/src/assets/images/about_agency_culture_1794498364495.jpg";

  return (
    <>
      <SEOHead
        title="About Us & Leadership Team | NOSHLANE Lahore"
        description="Learn the story of NOSHLANE: a Lahore-based digital marketing and content agency blending cinema-grade storytelling with performance growth math."
      />

      {/* Hero Header */}
      <section className="pt-16 pb-20 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            Our Heritage & Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl">
            Born in Lahore. Engineered for global market dominance.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            NOSHLANE was established to shatter the outdated agency binary: the creative shops whose art looks beautiful but doesn't sell, versus the media buyers who treat brand equity like disposable spreadsheet noise. We do both.
          </p>
        </div>
      </section>

      {/* Story & Culture Photo Split */}
      <section className="py-20 bg-[#070512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
                The Agency Origin
              </span>
              <h2 className="text-3xl font-extrabold text-white">
                Merging Lahore's Artistic Soul with Rigorous Performance Math
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  Lahore has always been the creative heart of Pakistan—a city where centuries of rich architectural craft, literary tradition, and visual design meet a hyper-dynamic modern entrepreneurship boom.
                </p>
                <p>
                  When we founded NOSHLANE in 2020, we noticed a frustrating gap in the market: Pakistani consumer brands, fashion labels, and tech startups had world-class products, but were being held back by lackluster social content, broken mobile checkout funnels, and uninspired media buying.
                </p>
                <p>
                  We assembled a specialized squad from top institutions like LUMS, NCA, and FAST. By investing in our own cinema camera packages, lighting rigs, and sound stages in Gulberg, we gave ambitious brands access to commercial production standards that turn casual scrollers into lifelong brand believers.
                </p>
              </div>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Headquarters: Tricon Corporate Centre, Gulberg II, Lahore</span>
              </div>
            </div>

            {/* Studio / Culture Image */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl bg-slate-900 aspect-[16/10]">
                {!cultureImgError ? (
                  <img
                    src={cultureImageSrc}
                    alt="NOSHLANE Creative Team in Lahore Studio"
                    referrerPolicy="no-referrer"
                    onError={() => setCultureImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#120E27] p-6 text-center text-slate-400">
                    <span className="font-semibold text-white mb-1">NOSHLANE Creative Loft</span>
                    <span className="text-xs">Lahore Design Studio</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0716] via-transparent to-transparent opacity-65" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#120E27]/90 backdrop-blur-md border border-cyan-500/20 p-3 rounded-lg text-xs text-slate-300">
                  <span className="font-semibold text-white">Collaborative Sprint Workflow:</span> Multi-disciplinary ideation sessions uniting video directors with data analysts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values / 4 Pillars */}
      <section className="py-20 bg-[#0A0716] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              Our Operating Constitution
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The Principles That Drive Our Output
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {AGENCY_VALUES.map((val) => (
              <div
                key={val.number}
                className="bg-[#120E27] border border-white/5 hover:border-cyan-500/30 rounded-xl p-8 transition-colors"
              >
                <span className="text-xs font-mono font-bold text-cyan-400 tabular-nums block mb-3">
                  PILLAR {val.number}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Profiles Section with Modal */}
      <section id="team" className="py-20 bg-[#070512] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
                <Users className="w-4 h-4" />
                <span>The Core Leadership</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Team Profiles & Domain Leads
              </h2>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Click on any team member's card to inspect their verified campaign milestones, core software stack, education credentials, and portfolio contributions.
              </p>
            </div>
            <div className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-lg shrink-0">
              5 Dedicated Domain Directors
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onOpenProfile={(m) => setActiveProfile(m)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <TeamProfileModal
        member={activeProfile}
        onClose={() => setActiveProfile(null)}
      />

      <CTASection />
    </>
  );
}
