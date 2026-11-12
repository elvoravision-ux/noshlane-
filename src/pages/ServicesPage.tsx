import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CTASection } from '../components/CTASection';
import { SERVICES_DATA } from '../data/services';
import { AGENCY_DETAILS } from '../data/agency';

import { useContent } from '../context/ContentContext';

export function ServicesPage() {
  const { services } = useContent();
  const displayServices = services?.length ? services : SERVICES_DATA;
  return (
    <>
      <SEOHead
        title="Services & Capabilities | NOSHLANE Lahore"
        description="Explore NOSHLANE's specialized digital marketing services: Social Media Management, Content Creation, Paid Ads, Brand Strategy, and Web Development."
      />

      {/* Header Banner */}
      <section className="pt-16 pb-20 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            Core Service Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
            Integrated digital capabilities built for sustainable scale.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            We don't offer generic 50-service menus. We master the five growth engines that directly govern how consumer and B2B brands generate awareness, trust, and profitable revenue.
          </p>
        </div>
      </section>

      {/* Detailed Services Overview Cards */}
      <section className="py-20 bg-[#070512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {displayServices.map((service, index) => {
            const formattedIndex = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id}
                id={service.slug}
                className="bg-[#120E27] border border-white/5 rounded-2xl p-8 sm:p-12 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Title & Overview */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500 font-semibold tabular-nums">
                        {formattedIndex}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                        {service.heroKicker}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {service.fullDescription}
                    </p>

                    <div className="pt-2">
                      <div className="inline-block p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <span className="text-2xl font-bold text-white font-mono tabular-nums block">
                          {service.statHighlight.value}
                        </span>
                        <span className="text-xs text-cyan-300">
                          {service.statHighlight.label}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-colors shadow-md shadow-cyan-500/20"
                      >
                        <span>Full Service Details & Process</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Inclusions & Ideal For */}
                  <div className="lg:col-span-7 bg-[#0A0716] border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Key Inclusions
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.whatsIncluded.map((inc, i) => (
                        <div key={i} className="space-y-1.5">
                          <h4 className="text-xs font-semibold text-slate-200">
                            {inc.title}
                          </h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {inc.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/5">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Ideal For
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                        {service.idealFor.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded">
                            <CheckCircle className="w-3 h-3 text-cyan-400" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* General FAQ Section */}
      <section className="py-20 bg-[#0A0716] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
              Agency Operations
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {AGENCY_DETAILS.faqs.map((faq, i) => (
              <div key={i} className="bg-[#120E27] border border-white/5 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
