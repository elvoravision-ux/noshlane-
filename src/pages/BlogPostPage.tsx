import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CTASection } from '../components/CTASection';
import { BLOG_POSTS } from '../data/blog';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = BLOG_POSTS[postIndex];

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(`${post.title} - ${currentUrl}`)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(currentUrl)}`;

  return (
    <>
      <SEOHead
        title={`${post.title} | NOSHLANE`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
      />

      {/* Article Header */}
      <article className="pt-12 pb-20 bg-[#0A0716] border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Field Notes</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
            <span className="text-cyan-400 font-medium">{post.category}</span>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.readTime}</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>{post.date}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-8">
            {post.title}
          </h1>

          {/* Author Block & Share Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1C163B] border border-cyan-500/20 text-xs font-bold text-cyan-300 flex items-center justify-center">
                {post.author.initials}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{post.author.name}</p>
                <p className="text-[11px] text-slate-400">{post.author.role}, NOSHLANE</p>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
                title="Copy article link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>

              <a
                href={shareWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-[#25D366] transition-colors"
                title="Share on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={shareTwitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                title="Share on X"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Key Takeaways Box */}
          <div className="mt-10 bg-[#120E27] border border-cyan-500/30 rounded-xl p-6 sm:p-8 shadow-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-3">
              Executive Summary & Takeaways
            </span>
            <ul className="space-y-3">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content Body */}
          <div className="mt-12 space-y-10 text-slate-300 leading-relaxed text-base sm:text-lg">
            {post.contentParagraphs.map((section, idx) => (
              <div key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="text-2xl font-bold text-white tracking-tight pt-4">
                    {section.heading}
                  </h2>
                )}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {section.body}
                </p>
                {section.highlight && (
                  <div className="bg-[#181135] border border-cyan-500/30 rounded-lg p-5 my-6 text-sm font-medium text-cyan-200 italic">
                    "{section.highlight}"
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Article Footer Note */}
          <div className="mt-16 pt-8 border-t border-white/10 bg-[#120E27] rounded-xl p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
            <div>
              <h3 className="text-base font-bold text-white mb-1">
                Want this strategy executed for your brand?
              </h3>
              <p className="text-xs text-slate-400">
                Our senior strategists in Lahore can analyze your current setup and build a tailored implementation plan.
              </p>
            </div>
            <Link
              to="/free-audit"
              className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-md shrink-0 shadow-sm"
            >
              Request Free Audit
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-20 bg-[#070512]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-white mb-8">
            Continue Reading
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                to={`/blog/${rel.slug}`}
                className="bg-[#120E27] border border-white/5 hover:border-cyan-500/30 rounded-xl p-6 transition-colors group block"
              >
                <span className="text-[11px] font-mono text-cyan-400 block mb-2">{rel.category}</span>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {rel.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
