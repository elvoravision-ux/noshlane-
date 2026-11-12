import React, { useState, useEffect } from 'react';
import { useContent, AgencySettings } from '../../../context/ContentContext';
import { Save, Phone, Mail, MapPin, MessageSquare, Globe, Sparkles, Sliders } from 'lucide-react';

export const AdminSettingsTab: React.FC = () => {
  const { settings, saveSettings } = useContent();

  const [toastMsg, setToastMsg] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMsg({ message, type });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [formData, setFormData] = useState<AgencySettings>(settings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await saveSettings(formData);
      showToast('Agency settings updated and live across website!', 'success');
    } catch {
      showToast('Failed to save settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Toast Alert */}
      {toastMsg && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl text-sm font-medium flex items-center gap-2 ${
          toastMsg.type === 'success' ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
        }`}>
          {toastMsg.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-[#120D24] p-5 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Agency & Global Settings</h2>
          <p className="text-xs text-white/50 mt-1">Configure contact info, WhatsApp click-to-chat, hero copy, and SEO meta tags</p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-medium hover:opacity-90 transition shadow-lg shadow-cyan-500/20 text-sm disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-sm">
        {/* Contact & WhatsApp */}
        <div className="bg-[#120D24] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm border-b border-white/5 pb-3">
            <Phone className="w-4 h-4" /> Direct Contact & WhatsApp Direct Channels
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">WhatsApp Number (International without +)</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
                placeholder="923001234567"
              />
              <p className="text-[10px] text-white/40 mt-1">Used for floating WhatsApp button & Lead direct replies</p>
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">Default WhatsApp Message Prompt</label>
              <input
                type="text"
                value={formData.whatsappDefaultMessage}
                onChange={(e) => setFormData({ ...formData, whatsappDefaultMessage: e.target.value })}
                className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                placeholder="Hi NOSHLANE team, I would like to schedule a strategy call..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">General Contact Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                placeholder="hello@noshlane.com"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">New Business / Growth Inquiries Email</label>
              <input
                type="email"
                value={formData.inquiriesEmail}
                onChange={(e) => setFormData({ ...formData, inquiriesEmail: e.target.value })}
                className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                placeholder="growth@noshlane.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">Phone Number (Display Format)</label>
              <input
                type="text"
                value={formData.phoneDisplay}
                onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                placeholder="+92 (300) 123-4567"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">Operating Hours</label>
              <input
                type="text"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                placeholder="Monday – Friday: 10:00 AM – 7:00 PM PKT"
              />
            </div>
          </div>
        </div>

        {/* Physical Lahore Address & Google Map */}
        <div className="bg-[#120D24] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm border-b border-white/5 pb-3">
            <MapPin className="w-4 h-4" /> Physical Lahore Office & Maps Embed
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Full Postal Address (Footer & Contact Page)</label>
            <input
              type="text"
              value={formData.fullAddress}
              onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
              className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
              placeholder="Floor 4, Tricon Corporate Centre, Main Boulevard, Gulberg II, Lahore"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Google Maps Embed URL</label>
            <input
              type="text"
              value={formData.mapsEmbedUrl}
              onChange={(e) => setFormData({ ...formData, mapsEmbedUrl: e.target.value })}
              className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs font-mono"
            />
            <p className="text-[10px] text-white/40 mt-1">Embed link used on the Contact page interactive map</p>
          </div>
        </div>

        {/* Hero Section Copy & Positioning */}
        <div className="bg-[#120D24] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm border-b border-white/5 pb-3">
            <Sparkles className="w-4 h-4" /> Home Page Hero & Agency Tagline
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Agency Brand Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs font-medium"
              placeholder="High-Velocity Digital Marketing, Content & Brand Architecture"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Hero Main Headline</label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-sm font-semibold"
              placeholder="WE SCALE HIGH-IMPACT BRANDS IN LAHORE & BEYOND"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Hero Subtitle Paragraph</label>
            <textarea
              rows={2}
              value={formData.heroSnippet}
              onChange={(e) => setFormData({ ...formData, heroSnippet: e.target.value })}
              className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
              placeholder="A premier creative performance agency engineered for high-growth brands in Lahore, Pakistan and global markets."
            />
          </div>
        </div>

        {/* Stats Numbers */}
        <div className="bg-[#120D24] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm border-b border-white/5 pb-3">
            <Sliders className="w-4 h-4" /> Proven Track Record & Stats
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.stats?.map((stat, idx) => (
              <div key={idx} className="p-3 bg-[#1A1433] rounded-xl border border-white/5 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updated = [...(formData.stats || [])];
                      updated[idx].value = e.target.value;
                      setFormData({ ...formData, stats: updated });
                    }}
                    className="w-24 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-cyan-400 font-bold text-sm"
                    placeholder="65+"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updated = [...(formData.stats || [])];
                      updated[idx].label = e.target.value;
                      setFormData({ ...formData, stats: updated });
                    }}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-white font-medium text-xs"
                    placeholder="Brands Scaled"
                  />
                </div>
                <input
                  type="text"
                  value={stat.description}
                  onChange={(e) => {
                    const updated = [...(formData.stats || [])];
                    updated[idx].description = e.target.value;
                    setFormData({ ...formData, stats: updated });
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-2.5 py-1 text-white/60 text-[11px]"
                  placeholder="Short description..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* SEO Meta Titles & Descriptions */}
        <div className="bg-[#120D24] border border-white/5 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm border-b border-white/5 pb-3">
            <Globe className="w-4 h-4" /> Global SEO Metadata
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">SEO Title Tag</label>
            <input
              type="text"
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
              placeholder="NOHSLANE | Premier Digital Marketing & Content Agency Lahore"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">SEO Meta Description</label>
            <textarea
              rows={2}
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              className="w-full bg-[#1A1433] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
              placeholder="High-velocity digital marketing, cinema-grade content production, paid ads scaling, and custom web development in Lahore, Pakistan."
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition shadow-lg shadow-cyan-500/20 text-sm disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Saving Changes...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
