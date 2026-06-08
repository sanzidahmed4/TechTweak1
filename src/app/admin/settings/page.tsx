import { getSiteSettings } from "@/app/actions/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = {
  title: 'Global Settings | TechTweak Admin',
  description: 'Manage global configuration for TechTweak.',
};

export default async function AdminSettingsPage() {
  const initialSettings = await getSiteSettings();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Settings</h1>
        <p className="text-slate-500 mt-2">Manage all website configurations, SEO, and social integrations from one place.</p>
      </div>

      <SettingsForm initialSettings={initialSettings || {}} />
    </div>
  );
}
