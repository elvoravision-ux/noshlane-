import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/agency';
import { SERVICES_DATA } from '../data/services';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06040E] border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#140F2B] border border-cyan-500/30 p-1 flex items-center justify-center shadow-md">
                <img
                  src={AGENCY_DETAILS.logoUrl}
                  alt="NOSHLANE AGENCY Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Space_Grotesk'] font-extrabold text-xl tracking-tight text-white leading-tight">
                  NOSHLANE
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase leading-none">
                  AGENCY
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Strategic digital marketing, cinema-grade content production, paid media engineering, and custom web development rooted in Lahore, Pakistan.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={`https://wa.me/${AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
                  AGENCY_DETAILS.contact.whatsappDefaultMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Desk</span>
              </a>
              <Link
                to="/free-audit"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-colors shadow-sm shadow-cyan-500/20"
              >
                <span>Free Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Agency
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/portfolio" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Case Studies & Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  About NOSHLANE
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Team Profiles & Leads
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Growth Insights & Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Contact & Directions
                </Link>
              </li>
              <li>
                <Link to="/free-audit" className="text-slate-400 hover:text-cyan-300 transition-colors">
                  Request Free Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Headquarters Column */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Lahore Headquarters
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {AGENCY_DETAILS.location.address}, {AGENCY_DETAILS.location.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${AGENCY_DETAILS.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {AGENCY_DETAILS.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${AGENCY_DETAILS.contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {AGENCY_DETAILS.contact.phoneDisplay}
                </a>
              </div>
              <div className="pt-2 text-xs text-slate-500">
                {AGENCY_DETAILS.contact.hours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4 flex-wrap">
            <span>&copy; {currentYear} {AGENCY_DETAILS.fullName}. All rights reserved.</span>
            <span>·</span>
            <span>Gulberg II, Lahore, Pakistan</span>
            <span>·</span>
            <Link to="/admin" className="text-slate-400 hover:text-cyan-300 transition-colors">
              Admin Portal
            </Link>
          </div>

          <div className="flex items-center gap-5">
            {AGENCY_DETAILS.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-300 transition-colors"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
