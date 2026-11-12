import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, CheckCircle2, Send, ExternalLink } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { AGENCY_DETAILS } from '../data/agency';
import { SERVICES_DATA } from '../data/services';

import { useContent } from '../context/ContentContext';

export function ContactPage() {
  const { addLead, settings } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    business: '',
    serviceNeeded: SERVICES_DATA[0].title,
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone or WhatsApp number.';
    } else if (formData.phone.trim().length < 9) {
      errs.phone = 'Please enter a valid phone number with city/country code.';
    }
    if (!formData.business.trim()) errs.business = 'Please provide your business or brand name.';
    if (!formData.message.trim()) errs.message = 'Please briefly describe your requirements or challenge.';
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
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        business: formData.business.trim(),
        service: formData.serviceNeeded,
        message: formData.message.trim(),
        type: 'contact',
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Lead submission error:', err);
      // Even if network or Firestore has an issue, provide feedback
      setSubmitError('Failed to record submission. Please reach us directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${settings.whatsappNumber || AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello NOSHLANE! My name is ${formData.name || 'a prospective client'} from ${
      formData.business || 'my brand'
    }. I am interested in discussing ${formData.serviceNeeded}.`
  )}`;

  return (
    <>
      <SEOHead
        title="Contact & Studio Directions | NOSHLANE Lahore"
        description="Connect with NOSHLANE in Gulberg II, Lahore. Reach us via phone, email, WhatsApp, or schedule a strategy meeting at our studio."
      />

      {/* Header Banner */}
      <section className="pt-16 pb-16 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
            Initiate Conversation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 max-w-3xl">
            Let's discuss how we can scale your brand.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Whether you need a full creative production overhaul in Lahore or high-scale paid acquisition across international markets, our team is ready to unpack your objectives.
          </p>
        </div>
      </section>

      {/* Form and Contact Information Split */}
      <section className="py-20 bg-[#070512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-[#120E27] border border-cyan-500/20 rounded-2xl p-8 sm:p-10 shadow-2xl">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        Send Project Brief
                      </h2>
                      <p className="text-xs text-slate-400">
                        Fill out the details below. We review all incoming briefs within 12 hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Bilal Ahmed"
                          className={`w-full bg-[#0A0716] border ${
                            errors.name ? 'border-red-500' : 'border-white/10'
                          } rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                        />
                        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Phone / WhatsApp Number *
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Business or Brand Name *
                        </label>
                        <input
                          type="text"
                          value={formData.business}
                          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                          placeholder="e.g. Artisan Living PK"
                          className={`w-full bg-[#0A0716] border ${
                            errors.business ? 'border-red-500' : 'border-white/10'
                          } rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                        />
                        {errors.business && <p className="text-xs text-red-400 mt-1">{errors.business}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. founder@brand.com"
                          className="w-full bg-[#0A0716] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Primary Service Needed *
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full bg-[#0A0716] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Full Omni-Channel Growth Retainer">
                          Full Omni-Channel Growth Retainer
                        </option>
                        <option value="Custom Project / Other">
                          Custom Project / Other
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                        Tell Us About Your Project & Goals *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Current monthly revenue, target objectives, pain points, or timeline..."
                        className={`w-full bg-[#0A0716] border ${
                          errors.message ? 'border-red-500' : 'border-white/10'
                        } rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400`}
                      />
                      {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 rounded-md transition-all cursor-pointer shadow-lg shadow-cyan-500/25"
                    >
                      {submitting ? (
                        <span>Transmitting Brief...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Project Brief</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-400/30">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Brief Received Successfully
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-medium">{formData.name}</span>. Our growth strategy lead in Lahore has been alerted. We will review <span className="text-white font-medium">{formData.business}</span> and contact you via phone/WhatsApp within 24 hours.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                      <a
                        href={whatsappDirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-md transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Fast-Track on WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            phone: '',
                            email: '',
                            business: '',
                            serviceNeeded: SERVICES_DATA[0].title,
                            message: '',
                          });
                        }}
                        className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                      >
                        Send another inquiry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Direct Contact & Details Column */}
            <div className="lg:col-span-5 space-y-8">
              {/* WhatsApp Quick Chat Highlight */}
              <div className="bg-[#120E27] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 fill-[#25D366] stroke-none" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Need a Fast Response?
                    </h3>
                    <p className="text-xs text-slate-400">
                      Chat directly with our Lahore client desk.
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  We frequently answer instant questions regarding our retainer slots, pricing ranges, and studio booking dates directly over WhatsApp.
                </p>

                <a
                  href={`https://wa.me/${AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
                    AGENCY_DETAILS.contact.whatsappDefaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-md transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white stroke-none" />
                  <span>Open WhatsApp (+92 300 1234567)</span>
                </a>
              </div>

              {/* Office & Coordinates */}
              <div className="bg-[#120E27] border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6">
                <h3 className="text-base font-bold text-white">
                  Studio & Headquarters
                </h3>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <p className="font-semibold text-white">NOSHLANE Lahore Studio</p>
                      <p>{AGENCY_DETAILS.location.fullAddress}</p>
                      <p className="text-slate-500">{AGENCY_DETAILS.location.landmark}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <p className="text-slate-400">Inquiries:</p>
                      <a href={`mailto:${AGENCY_DETAILS.contact.email}`} className="text-white hover:text-cyan-300 transition-colors">
                        {AGENCY_DETAILS.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <p className="text-slate-400">Direct Desk:</p>
                      <a href={`tel:${AGENCY_DETAILS.contact.phone.replace(/\s+/g, '')}`} className="text-white hover:text-cyan-300 transition-colors">
                        {AGENCY_DETAILS.contact.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div>
                      <p className="text-slate-400">Operating Hours:</p>
                      <p className="text-white">{AGENCY_DETAILS.contact.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">
                    Official Social Channels
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {AGENCY_DETAILS.socials.map((s) => (
                      <a
                        key={s.platform}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded text-slate-300 hover:text-cyan-300 transition-colors"
                      >
                        {s.platform}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Embed Section */}
      <section className="py-12 bg-[#0A0716] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
                Studio Location
              </span>
              <h2 className="text-xl font-bold text-white">
                Visit Us in Gulberg II, Lahore
              </h2>
            </div>
            <a
              href="https://maps.google.com/?q=Tricon+Corporate+Centre+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-cyan-500/20 shadow-2xl relative bg-slate-900">
            <iframe
              src={AGENCY_DETAILS.location.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.8) contrast(1.2) invert(0.92)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NOSHLANE Lahore Office Google Map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
