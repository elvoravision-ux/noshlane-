import { useState } from 'react';
import { X } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/agency';
import { useContent } from '../context/ContentContext';

export function WhatsAppFloatingButton() {
  const { settings } = useContent();
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  const whatsappNumber = settings.whatsappNumber || AGENCY_DETAILS.contact.whatsappNumber;
  const whatsappMessage = settings.whatsappDefaultMessage || AGENCY_DETAILS.contact.whatsappDefaultMessage;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NOSHLANE on WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-lg shadow-[#25D366]/35 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#0B0F17]"
      >
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
          aria-hidden="true"
        >
          <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16.004c0 2.353.615 4.651 1.784 6.678L2.667 29.333l6.827-1.791a13.28 13.28 0 0 0 6.51 1.703h.005c7.362 0 13.324-5.973 13.324-13.337 0-3.562-1.387-6.912-3.905-9.431a13.255 13.255 0 0 0-9.424-3.81zm0 24.337h-.004a11.06 11.06 0 0 1-5.637-1.544l-.404-.24-4.051 1.062 1.081-3.95-.263-.419a11.035 11.035 0 0 1-1.693-5.909c0-6.113 4.974-11.087 11.091-11.087 2.962 0 5.747 1.155 7.84 3.25a11.015 11.015 0 0 1 3.241 7.839c0 6.115-4.975 11.098-11.201 11.098zm6.082-8.308c-.333-.167-1.972-.973-2.278-1.085-.305-.111-.528-.167-.75.167-.222.333-.861 1.084-1.055 1.307-.195.222-.389.25-.722.083-.333-.167-1.407-.519-2.681-1.655-.991-.884-1.66-1.976-1.855-2.309-.194-.333-.021-.513.146-.68.15-.149.333-.389.5-.583.167-.195.222-.333.333-.556.111-.222.056-.417-.028-.583-.083-.167-.75-1.807-1.028-2.474-.27-.649-.545-.561-.75-.571l-.639-.011c-.222 0-.583.083-.889.417-.305.333-1.167 1.14-1.167 2.779s1.194 3.224 1.361 3.446c.167.222 2.35 3.588 5.693 5.032.795.343 1.416.548 1.9.702.799.254 1.526.218 2.101.132.641-.096 1.972-.806 2.25-1.584.278-.778.278-1.445.194-1.584-.083-.139-.305-.222-.639-.389z" />
        </svg>
      </a>

      {/* Subtle Tooltip Card */}
      {!tooltipDismissed && (
        <div className="hidden sm:flex items-center gap-2 bg-[#0F141C] border border-white/10 text-xs text-slate-200 px-3.5 py-2 rounded-lg shadow-xl shadow-black/40 animate-in fade-in slide-in-from-left-3 duration-200">
          <span className="font-medium">Have a project in mind? Chat with us</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setTooltipDismissed(true);
            }}
            className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
