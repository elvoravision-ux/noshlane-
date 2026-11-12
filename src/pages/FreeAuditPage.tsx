import { useState, FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, ShieldCheck, Video, FileText, BarChart3, MessageCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { AGENCY_DETAILS } from '../data/agency';

import { useContent } from '../context/ContentContext';

export function FreeAuditPage() {
  const { addLead, settings } = useContent();

  const [formData, setFormData] = useState({
    businessName: '',
    websiteOrSocial: '',
    contactName: '',
    phone: '',
    email: '',
    spendBracket: 'PKR 300k – PKR 1M / mo ($1k – $3.5k)',
    primaryGoal: 'Scale Paid Ad ROAS & Lower CAC',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.businessName.trim()) errs.businessName = 'Please enter your business or brand name.';
    if (!formData.websiteOrSocial.trim()) {
      errs.websiteOrSocial = 'Please enter your website URL or main Instagram/TikTok handle.';
    }
    if (!formData.contactName.trim()) errs.contactName = 'Please provide your name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone or WhatsApp number.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number.';
    }
    return errs;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      await addLead({
        name: formData.contactName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        business: formData.businessName.trim(),
        websiteOrSocial: formData.websiteOrSocial.trim(),
        adSpend: formData.spendBracket,
        primaryGoal: formData.primaryGoal,
        type: 'audit',
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Audit lead error:', err);
      setSubmitError('Failed to record submission. Please reach us directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappFastTrack = `https://wa.me/${settings.whatsappNumber || AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hi NOSHLANE! I just requested a Free Audit for ${formData.businessName} (${formData.websiteOrSocial}). My name is ${formData.contactName}.`
  )}`;

  return (
    <>
      <SEOHead
        title="Get a Free Digital Marketing & Funnel Audit | NOSHLANE Lahore"
        description="Submit your website or social media handles for a free, comprehensive growth audit. Delivered in 24 business hours by senior strategists in Lahore."
      />

      <section className="pt-16 pb-24 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
              Confidential Growth Teardown
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Get an executive teardown of your marketing funnel.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              We audit your ad accounts, creative retention curves, mobile checkout friction, and brand positioning. 100% free. Delivered within 24 business hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-[#120E27] border border-cyan-500/20 rounded-2xl p-8 sm:p-10 shadow-2xl">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      Audit Request Form
                    </h2>
                    <p className="text-xs text-slate-400">
                      Takes 60 seconds to fill. No passwords or account access required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Brand or Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Lahore Roast Co."
                        className={`w-full bg-[#0A0716] border ${
                          errors.businessName ? 'border-red-500' : 'border-white/10'
                        } rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                      />
                      {errors.businessName && <p className="text-xs text-red-400 mt-1">{errors.businessName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Website Link or @Handle *
                      </label>
                      <input
                        type="text"
                        value={formData.websiteOrSocial}
                        onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                        placeholder="e.g. @yourbrand or brand.com"
                        className={`w-full bg-[#0A0716] border ${
                          errors.websiteOrSocial ? 'border-red-500' : 'border-white/10'
                        } rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                      />
                      {errors.websiteOrSocial && (
                        <p className="text-xs text-red-400 mt-1">{errors.websiteOrSocial}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="e.g. Sarah Mansoor"
                        className={`w-full bg-[#0A0716] border ${
                          errors.contactName ? 'border-red-500' : 'border-white/10'
                        } rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                      />
                      {errors.contactName && <p className="text-xs text-red-400 mt-1">{errors.contactName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +92 300 1234567"
                        className={`w-full bg-[#0A0716] border ${
                          errors.phone ? 'border-red-500' : 'border-white/10'
                        } rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                      />
                      {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Work Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. founder@yourcompany.com"
                      className="w-full bg-[#0A0716] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Monthly Ad Spend or Scale
                      </label>
                      <select
                        value={formData.spendBracket}
                        onChange={(e) => setFormData({ ...formData, spendBracket: e.target.value })}
                        className="w-full bg-[#0A0716] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Under PKR 300k / mo (Early Stage)">Under PKR 300k / mo (Early Stage)</option>
                        <option value="PKR 300k – PKR 1M / mo ($1k – $3.5k)">PKR 300k – PKR 1M / mo ($1k – $3.5k)</option>
                        <option value="PKR 1M – PKR 3M / mo ($3.5k – $10k)">PKR 1M – PKR 3M / mo ($3.5k – $10k)</option>
                        <option value="PKR 3M+ / mo ($10k+ / Enterprise)">PKR 3M+ / mo ($10k+ / Enterprise)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Primary Bottleneck
                      </label>
                      <select
                        value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        className="w-full bg-[#0A0716] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Scale Paid Ad ROAS & Lower CAC">Scale Paid Ad ROAS & Lower CAC</option>
                        <option value="Fix Stagnant Short-Form Video & Reels">Fix Stagnant Short-Form Video & Reels</option>
                        <option value="Improve Website Checkout Conversion Rate">Improve Website Checkout Conversion Rate</option>
                        <option value="Complete Premium Brand Modernization">Complete Premium Brand Modernization</option>
                        <option value="All of the above (Full Funnel Audit)">All of the above (Full Funnel Audit)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 rounded-md transition-all cursor-pointer shadow-lg shadow-cyan-500/25"
                  >
                    {submitting ? (
                      <span>Queueing Audit Request...</span>
                    ) : (
                      <>
                        <span>Claim My Free Marketing Audit</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    We respect your privacy. No spam. You will receive an unlisted video link and confidential PDF.
                  </p>
                </form>
              ) : (
                <div className="py-12 text-center space-y-5">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-400/30">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Audit Queued for {formData.businessName}!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Our lead strategist in Lahore has added <span className="text-cyan-300 font-medium">{formData.websiteOrSocial}</span> to our review docket. We will prepare your video teardown and roadmap and send it to your WhatsApp/Email within 24 business hours.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href={whatsappFastTrack}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Notify Us on WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* What's Included in the Audit */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#120E27] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block">
                  The Audit Deliverable
                </span>
                <h3 className="text-xl font-bold text-white">
                  What You Receive Within 24 Hours
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        10-Minute Video Teardown
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        A senior strategist walks through your live storefront, ad creative library, and reel hooks on screen.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        Conversion Bottleneck PDF
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        A concise 5-point checklist detailing exact leakages in your mobile UX, copy hooks, and checkout process.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        Competitor Benchmark Matrix
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        An objective analysis of what the top 3 competitors in your niche in Pakistan are doing right now.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Turnaround: Strictly within 24 business hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Zero sales pressure or mandatory follow-up calls</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
