import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, MessageCircle, CheckCircle2, Sparkles, TrendingUp, ShieldCheck, Play, Video } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ServiceCard } from '../components/ServiceCard';
import { PortfolioCard } from '../components/PortfolioCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { TeamMemberCard } from '../components/TeamMemberCard';
import { TeamProfileModal } from '../components/TeamProfileModal';
import { CTASection } from '../components/CTASection';
import { AGENCY_DETAILS } from '../data/agency';
import { SERVICES_DATA } from '../data/services';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { TeamMember } from '../data/team';
import { useContent } from '../context/ContentContext';

export function HomePage() {
  const { services, portfolio, team, testimonials, settings } = useContent();
  const [heroImgError, setHeroImgError] = useState(false);
  const [heroBannerError, setHeroBannerError] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);

  const featuredProjects = portfolio.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : portfolio.slice(0, 3);
  const heroImageSrc = "/assets/images/hero_nohslane_studio_1794498361737.jpg";
  const heroBannerSrc = "/assets/images/hero_agency_banner_1794553307168.jpg";

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber || AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
    settings.whatsappDefaultMessage || AGENCY_DETAILS.contact.whatsappDefaultMessage
  )}`;

  return (
    <>
      <SEOHead
        title="NOSHLANE AGENCY | Premier Digital Marketing & Content in Lahore"
        description="Scaling high-growth brands through cinema-grade content creation, disciplined paid performance advertising, bespoke web development, and timeless brand identity in Lahore."
      />

      {/* Hero Section with Full-Bleed Architectural Studio Backdrop Banner */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-[#0A0716]">
        {/* Background Banner Image + Contrast Scrims */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {!heroBannerError ? (
            <img
              src={heroBannerSrc}
              alt="NOSHLANE Modern Digital Marketing & Cinema Studio Lahore"
              referrerPolicy="no-referrer"
              onError={() => setHeroBannerError(true)}
              className="w-full h-full object-cover object-center opacity-85 brightness-95 contrast-105 scale-[1.01]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0F0B24] via-[#0A0716] to-[#0D192B]" />
          )}
          {/* Balanced readability scrim letting the studio architecture shine through */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0716]/80 via-[#0A0716]/45 to-[#0A0716]/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0716]/90 via-transparent to-[#0A0716]/35" />
          {/* Ambient teal & indigo architectural light accents */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full" />
          <div className="absolute top-20 right-1/4 w-[550px] h-[400px] bg-indigo-600/15 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Brand Badge */}
          <div className="flex justify-center sm:justify-start mb-6">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#161033]/90 backdrop-blur-md border border-cyan-500/30 shadow-inner">
              <img
                src={AGENCY_DETAILS.logoUrl}
                alt="NOSHLANE Icon"
                className="w-4 h-4 object-contain"
              />
              <span className="text-xs font-mono font-semibold tracking-wider text-cyan-300">
                NOSHLANE AGENCY
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs font-medium text-slate-300">
                Lahore Studio & Performance Lab
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Headline and Value Proposition */}
            <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance drop-shadow-[0_2px_18px_rgba(0,0,0,0.9)]">
                {settings.heroHeadline || (
                  <>
                    Digital marketing engineered for{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                      ruthless commercial growth.
                    </span>
                  </>
                )}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto sm:mx-0 leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.9)]">
                {settings.heroSnippet || 'NOSHLANE unites cinema-grade visual storytelling with high-precision paid advertising and custom web engineering. We scale consumer and B2B brands across Pakistan, the GCC, and global markets.'}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-4">
                <Link
                  to="/free-audit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                >
                  <span>Claim a Free 24h Audit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#15102E] hover:bg-[#1C153E] border border-cyan-500/30 hover:border-cyan-400/60 rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Strategic Desk</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>In-House Cinema Studio in Gulberg</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Verified 4.4x Average Paid ROAS</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>100% Client Account Ownership</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Modern Showcase Banner */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#120D28] shadow-2xl shadow-indigo-950/60 group">
                {/* Glowing top rim */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-teal-300" />

                <div className="relative aspect-[16/11] bg-slate-900 overflow-hidden">
                  {!heroImgError ? (
                    <img
                      src={heroImageSrc}
                      alt="NOSHLANE Creative Agency Studio Lahore"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#140F2D] p-6 text-center">
                      <span className="text-sm font-semibold text-white mb-2">NOSHLANE Studio</span>
                      <span className="text-xs text-cyan-400">Gulberg II, Lahore</span>
                    </div>
                  )}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0716] via-[#0A0716]/30 to-transparent" />

                  {/* Top-Right Badge: Live Agency Status */}
                  <div className="absolute top-3 right-3 bg-[#0A0716]/85 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 text-[11px] text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono font-medium">Studio Live · 4K Active</span>
                  </div>

                  {/* Center Interactive Reel Pill */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 fill-white translate-x-0.5 text-cyan-400" />
                    </div>
                  </div>

                  {/* Floating Telemetry Strip on Bottom */}
                  <div className="absolute bottom-3 left-3 right-3 bg-[#110C27]/90 backdrop-blur-md border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Client Pipeline Delivered</p>
                        <p className="text-sm font-extrabold text-white font-mono tabular-nums">+PKR 450M+ In 2025/26</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold block">99.2% CAPI</span>
                      <span className="text-[10px] text-slate-400">Match Accuracy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Front Modern Professional Banner Strip */}
      <section className="relative py-8 bg-gradient-to-r from-[#140F2F] via-[#0E1B2D] to-[#140F2F] border-y border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">In-House Cinema Production</h3>
                <p className="text-xs text-slate-400">Gulberg studio equipped with 4K cinema cameras & lighting</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Algorithmic Performance Media</h3>
                <p className="text-xs text-slate-400">Disciplined Meta, TikTok & Google media buying with 4.4x average ROAS</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Rapid 24-Hour Funnel Audit</h3>
                <p className="text-xs text-slate-400">Free video teardown of your ad accounts & mobile checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="border-b border-white/5 bg-[#080612] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {(settings.stats?.length ? settings.stats : AGENCY_DETAILS.stats).map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-24 bg-[#0A0716]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
                What We Build & Run
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Specialized Growth Capabilities
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>View All Specialized Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}

            {/* Custom Audit Card */}
            <div className="bg-gradient-to-br from-[#181135] via-[#10142A] to-[#0E0B1F] border border-cyan-500/40 rounded-xl p-7 flex flex-col justify-between shadow-xl">
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Not sure where your funnel is leaking?
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Get our senior team to inspect your ad accounts, reel hooks, and mobile checkout. Free, 100% confidential, and delivered in 24 hours.
                </p>
              </div>
              <Link
                to="/free-audit"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-colors shadow-md shadow-cyan-500/20"
              >
                <span>Request Free Audit Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Showcase */}
      <section className="py-24 bg-[#070510] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
                Proven Client Results
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Case Studies
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Explore Complete Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Team Profiles Preview Section */}
      <section className="py-24 bg-[#0A0716] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
                The Architects of Your Growth
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                Leadership Team & Domain Leads
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Experienced strategists and directors from LUMS, NCA, and FAST running your campaigns with zero outsourced dilution.
              </p>
            </div>
            <Link
              to="/about#team"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Meet All Team Members & Read Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.slice(0, 3).map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onOpenProfile={(m) => setSelectedTeamMember(m)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Profile Modal */}
      <TeamProfileModal
        member={selectedTeamMember}
        onClose={() => setSelectedTeamMember(null)}
      />

      {/* Testimonials Section */}
      <section className="py-24 bg-[#0A0716]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              Founder Endorsements
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Trusted by Pakistan's Most Ambitious Founders
            </h2>
            <p className="text-sm text-slate-400">
              Read how our multidisciplinary team delivered measurable bottom-line revenue for consumer, lifestyle, and tech brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <CTASection />
    </>
  );
}
