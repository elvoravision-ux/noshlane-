import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/agency';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-[#0A0716]/95 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/40'
          : 'bg-[#0A0716]/85 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark with Real Logo Emblem */}
          <Link
            to="/"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#140F2B] border border-cyan-500/30 p-1 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 transition-colors">
              <img
                src={AGENCY_DETAILS.logoUrl}
                alt="NOSHLANE AGENCY Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] font-extrabold text-xl sm:text-2xl tracking-tight text-white leading-tight">
                NOSHLANE
              </span>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase leading-none">
                AGENCY
              </span>
            </div>
          </Link>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Admin Access */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link
              to="/admin"
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-400 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-all flex items-center gap-1.5"
              title="Admin Console"
            >
              <span>Admin</span>
            </Link>
            <Link
              to="/free-audit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap"
            >
              <span>Get a Free Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/admin"
              className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-cyan-400 bg-white/5 border border-white/10 rounded-md"
            >
              Admin
            </Link>
            <Link
              to="/free-audit"
              className="px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-md whitespace-nowrap shadow-sm"
            >
              Audit
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0F0C22] border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    active
                      ? 'bg-white/5 text-cyan-400 font-semibold'
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-5 pt-4 border-t border-white/10 flex flex-col gap-3">
            <Link
              to="/free-audit"
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md text-center transition-colors shadow-md shadow-cyan-500/20"
            >
              <span>Get a Free Marketing Audit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
                AGENCY_DETAILS.contact.whatsappDefaultMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 text-center text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors"
            >
              WhatsApp Desk: {AGENCY_DETAILS.contact.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
