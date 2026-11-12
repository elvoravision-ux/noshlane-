import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/agency';

export function WhatsAppFloatingButton() {
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const whatsappUrl = `https://wa.me/${AGENCY_DETAILS.contact.whatsappNumber}?text=${encodeURIComponent(
    AGENCY_DETAILS.contact.whatsappDefaultMessage
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Subtle Tooltip Card */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0F141C] border border-white/10 text-xs text-slate-200 px-3.5 py-2 rounded-lg shadow-xl shadow-black/40 animate-in fade-in slide-in-from-right-3 duration-200">
          <span className="font-medium">Have a project in mind? Chat with us</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTooltipDismissed(true);
            }}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NOHSLANE on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg shadow-[#25D366]/25 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#0B0F17]"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
      </a>
    </div>
  );
}
