"use client";

import { useState } from "react";
import { updateSiteSettings } from "@/app/actions/settings";
import SingleImageUploader from "./SingleImageUploader";
import { 
  Save, LayoutDashboard, Globe, Search, BarChart3, 
  Share2, Sparkles, ShieldAlert, Home, Loader2, CheckCircle2 
} from "lucide-react";

const TABS = [
  { id: 'general', label: 'General', icon: Globe },
  { id: 'branding', label: 'Branding', icon: LayoutDashboard },
  { id: 'seo', label: 'SEO Settings', icon: Search },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'ai', label: 'AI Advisor', icon: Sparkles },
  { id: 'maintenance', label: 'System', icon: ShieldAlert },
  { id: 'home', label: 'Homepage', icon: Home },
];

export default function SettingsForm({ initialSettings }: { initialSettings: any }) {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};

    // Helper for checkboxes (if not present in formData, set to false)
    const checkboxes = ['enable_ai_advisor', 'enable_analytics_collection', 'maintenance_mode', 'hide_search', 'hide_compare', 'hide_news_section'];

    formData.forEach((value, key) => {
      // Handle arrays
      if (key === 'featured_brands' || key === 'featured_phones') {
        data[key] = value ? (value as string).split(',').map(s => s.trim()) : [];
      } else {
        data[key] = value;
      }
    });

    checkboxes.forEach(cb => {
      data[cb] = formData.has(cb);
    });

    const res = await updateSiteSettings(data);
    
    if (res.success) {
      setMessage({ type: 'success', text: res.message });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: res.message });
    }
    
    setIsSaving(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 bg-white rounded-2xl border border-slate-200 p-2 shadow-sm shrink-0 sticky top-6">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold mb-1 last:mb-0 ${
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Form Area */}
      <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {TABS.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-slate-500 mt-1">Update configurations globally across the site.</p>
            </div>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${
                message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? <CheckCircle2 size={18} /> : <ShieldAlert size={18} />}
                {message.text}
              </div>
            )}

            {/* TAB: GENERAL */}
            <div className={activeTab === 'general' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Site Name</label>
                  <input type="text" name="site_name" defaultValue={initialSettings?.site_name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Website URL</label>
                  <input type="url" name="website_url" defaultValue={initialSettings?.website_url} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Contact Email</label>
                  <input type="email" name="contact_email" defaultValue={initialSettings?.contact_email} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Support Email</label>
                  <input type="email" name="support_email" defaultValue={initialSettings?.support_email} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Site Description</label>
                  <textarea name="site_description" defaultValue={initialSettings?.site_description} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium resize-none"></textarea>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Copyright Text</label>
                  <input type="text" name="copyright_text" defaultValue={initialSettings?.copyright_text} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
              </div>
            </div>

            {/* TAB: BRANDING */}
            <div className={activeTab === 'branding' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Main Logo (Light Mode)</label>
                  <SingleImageUploader name="logo_url" initialImage={initialSettings?.logo_url} folder="techtweak_settings" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Dark Logo (Dark Mode)</label>
                  <SingleImageUploader name="dark_logo_url" initialImage={initialSettings?.dark_logo_url} folder="techtweak_settings" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Favicon</label>
                  <SingleImageUploader name="favicon_url" initialImage={initialSettings?.favicon_url} folder="techtweak_settings" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">Default Open Graph Image</label>
                  <SingleImageUploader name="default_og_image" initialImage={initialSettings?.default_og_image} folder="techtweak_settings" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700">Default Author Name</label>
                  <input type="text" name="default_author_name" defaultValue={initialSettings?.default_author_name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
              </div>
            </div>

            {/* TAB: SEO */}
            <div className={activeTab === 'seo' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Global Meta Title Template</label>
                  <input type="text" name="global_meta_title_template" defaultValue={initialSettings?.global_meta_title_template} placeholder="%s | TechTweak" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                  <p className="text-xs text-slate-500">%s will be replaced by the page title.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Global Meta Description</label>
                  <textarea name="global_meta_description" defaultValue={initialSettings?.global_meta_description} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium resize-none"></textarea>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Default Keywords (comma separated)</label>
                  <input type="text" name="default_keywords" defaultValue={initialSettings?.default_keywords} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Google Verification Code</label>
                    <input type="text" name="google_verification_code" defaultValue={initialSettings?.google_verification_code} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Bing Verification Code</label>
                    <input type="text" name="bing_verification_code" defaultValue={initialSettings?.bing_verification_code} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium font-mono" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700">Canonical Domain</label>
                    <input type="url" name="canonical_domain" defaultValue={initialSettings?.canonical_domain} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                  </div>
                </div>
              </div>
            </div>

            {/* TAB: ANALYTICS */}
            <div className={activeTab === 'analytics' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Google Analytics ID (G-XXXXX)</label>
                  <input type="text" name="google_analytics_id" defaultValue={initialSettings?.google_analytics_id} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Google Tag Manager ID (GTM-XXXXX)</label>
                  <input type="text" name="google_tag_manager_id" defaultValue={initialSettings?.google_tag_manager_id} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Microsoft Clarity ID</label>
                  <input type="text" name="microsoft_clarity_id" defaultValue={initialSettings?.microsoft_clarity_id} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Facebook Pixel ID</label>
                  <input type="text" name="facebook_pixel_id" defaultValue={initialSettings?.facebook_pixel_id} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium font-mono" />
                </div>
              </div>
            </div>

            {/* TAB: SOCIAL */}
            <div className={activeTab === 'social' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Facebook URL</label>
                  <input type="url" name="social_facebook" defaultValue={initialSettings?.social_facebook} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">X / Twitter URL</label>
                  <input type="url" name="social_twitter" defaultValue={initialSettings?.social_twitter} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">YouTube URL</label>
                  <input type="url" name="social_youtube" defaultValue={initialSettings?.social_youtube} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Instagram URL</label>
                  <input type="url" name="social_instagram" defaultValue={initialSettings?.social_instagram} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">LinkedIn URL</label>
                  <input type="url" name="social_linkedin" defaultValue={initialSettings?.social_linkedin} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Telegram URL</label>
                  <input type="url" name="social_telegram" defaultValue={initialSettings?.social_telegram} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                </div>
              </div>
            </div>

            {/* TAB: AI ADVISOR */}
            <div className={activeTab === 'ai' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-900">Enable Premium AI Advisor</h4>
                    <p className="text-sm text-slate-500">Show the "Find My Perfect Phone" section on the homepage.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="enable_ai_advisor" defaultChecked={initialSettings?.enable_ai_advisor ?? true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-slate-900">Enable Analytics Collection</h4>
                    <p className="text-sm text-slate-500">Track user searches and preferences for the Admin Insights panel.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="enable_analytics_collection" defaultChecked={initialSettings?.enable_analytics_collection ?? true} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <label className="text-sm font-bold text-slate-700">Minimum Match Score Threshold</label>
                  <input type="number" name="min_match_score_threshold" defaultValue={initialSettings?.min_match_score_threshold ?? 40} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                  <p className="text-xs text-slate-500">Phones scoring below this value will not be recommended.</p>
                </div>
              </div>
            </div>

            {/* TAB: MAINTENANCE & SYSTEM */}
            <div className={activeTab === 'maintenance' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div>
                    <h4 className="font-bold text-red-900">Maintenance Mode</h4>
                    <p className="text-sm text-red-700">Restrict access to the public site and show maintenance screen.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="maintenance_mode" defaultChecked={initialSettings?.maintenance_mode ?? false} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Maintenance Message</label>
                  <textarea name="maintenance_message" defaultValue={initialSettings?.maintenance_message} rows={3} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium resize-none"></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <input type="checkbox" name="hide_search" id="hide_search" defaultChecked={initialSettings?.hide_search} className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" />
                    <label htmlFor="hide_search" className="font-bold text-slate-700 cursor-pointer">Hide Global Search</label>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <input type="checkbox" name="hide_compare" id="hide_compare" defaultChecked={initialSettings?.hide_compare} className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" />
                    <label htmlFor="hide_compare" className="font-bold text-slate-700 cursor-pointer">Hide Compare Section</label>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <input type="checkbox" name="hide_news_section" id="hide_news_section" defaultChecked={initialSettings?.hide_news_section} className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer" />
                    <label htmlFor="hide_news_section" className="font-bold text-slate-700 cursor-pointer">Hide News Section</label>
                  </div>
                </div>
              </div>
            </div>

            {/* TAB: HOMEPAGE CONTROLS */}
            <div className={activeTab === 'home' ? 'block' : 'hidden'}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Hero Title</label>
                    <input type="text" name="hero_title" defaultValue={initialSettings?.hero_title} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Hero Subtitle</label>
                    <input type="text" name="hero_subtitle" defaultValue={initialSettings?.hero_subtitle} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Featured Brands (Comma-separated Slugs)</label>
                  <input type="text" name="featured_brands" defaultValue={initialSettings?.featured_brands?.join(', ')} placeholder="apple, samsung, google" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                  <p className="text-xs text-slate-500">Overrides default brand grid sorting.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Featured Phones (Comma-separated Slugs)</label>
                  <input type="text" name="featured_phones" defaultValue={initialSettings?.featured_phones?.join(', ')} placeholder="iphone-17-pro-max, galaxy-s26-ultra" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium" />
                  <p className="text-xs text-slate-500">Used for explicit feature sections on the homepage.</p>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
