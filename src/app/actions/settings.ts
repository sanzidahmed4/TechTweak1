"use server";

import connectToDatabase from "@/lib/mongodb/mongoose";
import Setting from "@/lib/models/Setting";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

const fetchSettingsFromDB = async () => {
  await connectToDatabase();
  let settings = await Setting.findOne().lean();
  if (!settings) {
    const defaultSettings = new Setting({});
    await defaultSettings.save();
    settings = await Setting.findOne().lean();
  }
  return {
    ...settings,
    _id: settings._id.toString(),
    updated_at: settings.updated_at?.toISOString()
  };
};

export const getSiteSettings = unstable_cache(
  async () => {
    try {
      const data = await fetchSettingsFromDB();
      return {
        // Core Fallbacks
        site_name: data.site_name || "TechTweak",
        site_description: data.site_description || "The Ultimate Smartphone Resource",
        contact_email: data.contact_email || "support@techtweak.tech",
        website_url: data.website_url || "https://www.techtweak.tech",
        copyright_text: data.copyright_text || `© ${new Date().getFullYear()} TechTweak. All rights reserved.`,
        
        // Branding Fallbacks
        logo_url: data.logo_url || "/sitelogo.svg",
        dark_logo_url: data.dark_logo_url || "/sitelogo.svg",
        favicon_url: data.favicon_url || "/favicon.ico",
        default_og_image: data.default_og_image || "/sitelogo.svg",
        
        // SEO Fallbacks
        global_meta_title_template: data.global_meta_title_template || "%s | TechTweak",
        global_meta_description: data.global_meta_description || "Discover the ultimate tech resource for smartphone reviews and side-by-side comparisons.",
        google_verification_code: data.google_verification_code || "",
        bing_verification_code: data.bing_verification_code || "",
        
        // Settings Data
        ...data
      };
    } catch (error) {
      console.error("Failed to fetch settings:", error);
      return null;
    }
  },
  ['site-settings'],
  { tags: ['settings-cache'], revalidate: 3600 }
);

export async function updateSiteSettings(formData: any) {
  await connectToDatabase();
  try {
    const settings = await Setting.findOne();
    if (!settings) {
      const newSettings = new Setting(formData);
      await newSettings.save();
    } else {
      Object.assign(settings, formData);
      settings.updated_at = new Date();
      settings.updated_by = "admin"; // Future-ready field
      await settings.save();
    }

    // Revalidate paths to reflect updated settings
    revalidatePath("/", "layout");
    revalidatePath("/admin/settings", "page");
    
    return { success: true, message: "Settings updated successfully!" };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { success: false, message: "Failed to update settings. Please try again." };
  }
}
