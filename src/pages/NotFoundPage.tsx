import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 – Page Not Found | NOSHLANE"
        description="The page you are looking for does not exist or has been relocated."
      />

      <section className="min-h-[70vh] flex items-center justify-center py-20 bg-[#0A0716] px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <span className="text-6xl font-black font-mono text-cyan-400 tabular-nums block">
            404
          </span>

          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Page Not Found
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed">
            The link you followed may be broken or the page has moved to another address. Use the links below to find your way back.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 rounded-md transition-colors shadow-sm shadow-cyan-500/20"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return Home</span>
            </Link>

            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
