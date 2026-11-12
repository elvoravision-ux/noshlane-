import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CTASection } from '../components/CTASection';
import { SERVICES_DATA } from '../data/services';
import { AGENCY_DETAILS } from '../data/agency';

import { useContent } from '../context/ContentContext';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { services, settings } = useContent();
  const allServices = services?.length ? services : SERVICES_DATA;
  const service = allServices.find((s) => s.slug === slug || s.id === slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber || AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hi NOSHLANE, I am interested in learning more about your ${service.title} service.`
  )}`;

  return (
    <>
      <SEOHead
        title={`${service.title} | NOSHLANE Digital Agency`}
        description={service.shortDescription}
        canonicalPath={`/services/${service.slug}`}
      />

      {/* Breadcrumb & Hero */}
      <section className="pt-12 pb-20 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
                {service.heroKicker}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {service.title}
              </h1>
              <p className="text-lg text-slate-200 font-medium leading-relaxed">
                {service.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/free-audit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-colors shadow-md shadow-cyan-500/20"
                >
                  <span>Request Free Audit for {service.title}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Discuss via WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#120E27] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Average Client Impact
                </span>
                <span className="text-3xl font-extrabold text-white font-mono tabular-nums block">
                  {service.statHighlight.value}
                </span>
                <span className="text-xs text-cyan-400 font-medium">
                  {service.statHighlight.label}
                </span>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                  Monthly Deliverables Guarantee
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {service.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Breakdown */}
      <section className="py-20 bg-[#070512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              Deliverables & Scope
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              What's Included in {service.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.whatsIncluded.map((section, idx) => (
              <div
                key={idx}
                className="bg-[#120E27] border border-white/5 rounded-xl p-7 flex flex-col justify-between hover:border-cyan-500/30 transition-colors"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-2.5">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {section.description}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-white/5">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="text-cyan-400 font-bold font-mono">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-[#0A0716] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              How We Work
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              The 4-Stage Execution Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-[#120E27] border border-white/5 rounded-xl p-6 relative group hover:border-cyan-500/40 transition-colors"
              >
                <span className="text-2xl font-mono font-bold text-slate-600 group-hover:text-cyan-400 transition-colors tabular-nums block mb-4">
                  {step.step}
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Specific FAQs */}
      <section className="py-20 bg-[#070512] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              Clear Expectations
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Frequently Asked Questions About {service.title}
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#120E27] border border-white/5 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 text-white hover:text-cyan-400 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="text-sm font-semibold">{faq.question}</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title={`Ready to elevate your ${service.title.toLowerCase()}?`}
        subtitle="Book a discovery call or request a free funnel audit tailored specifically to your business."
      />
    </>
  );
}
