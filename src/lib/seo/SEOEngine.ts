export interface SEODoc {
  meta_title?: string;
  meta_description?: string;
  canonical_url?: string;
  primary_keyword?: string;
  secondary_keywords?: string[];
  question_keywords?: string[];
  og_image?: string;
  og_title?: string;
  twitter_title?: string;
  verdict?: string;
  faqs?: unknown[];
  logo_url?: string;
  description?: string;
  content?: string;
  featured_image?: string;
  name?: string;
  slug?: string;
  images?: string[];
}

export class SEOEngine {
  /**
   * Calculates a dynamic SEO score (0-100) based on populated fields.
   */
  static calculateScore(doc: SEODoc, type: 'phone' | 'brand' | 'post'): number {
    let score = 0;
    
    // Core Metadata (Critical - 40 points)
    if (doc.meta_title) score += 15;
    if (doc.meta_description) score += 15;
    if (doc.canonical_url) score += 10;

    // Keyword Targeting (High - 20 points)
    if (doc.primary_keyword) score += 10;
    if (doc.secondary_keywords && doc.secondary_keywords.length > 0) score += 5;
    if (doc.question_keywords && doc.question_keywords.length > 0) score += 5;

    // Social Graph (High - 20 points)
    if (doc.og_image) score += 10;
    if (doc.og_title) score += 5;
    if (doc.twitter_title) score += 5;

    // Type-specific Content (Medium - 20 points)
    if (type === 'phone') {
      if (doc.verdict) score += 10;
      if (doc.faqs && doc.faqs.length > 0) score += 10;
    } else if (type === 'brand') {
      if (doc.logo_url) score += 10;
      if (doc.description) score += 10;
    } else if (type === 'post') {
      if (doc.content && doc.content.length > 300) score += 10;
      if (doc.featured_image) score += 10;
    }

    return Math.min(100, score);
  }

  /**
   * Determines the SEO status Traffic Light based on score.
   */
  static getStatus(score: number): 'Red' | 'Yellow' | 'Green' {
    if (score >= 85) return 'Green';
    if (score >= 50) return 'Yellow';
    return 'Red';
  }

  /**
   * Generates programmatic fallbacks for empty SEO fields on a Phone.
   * Does NOT overwrite existing manual data.
   */
  static generatePhoneFallbacks(phone: SEODoc, brandName: string) {
    const fallbacks: Partial<SEODoc> = {};

    // Generate Meta Title Fallback
    if (!phone.meta_title) {
      fallbacks.meta_title = `${phone.name} Price in Bangladesh, Specs, and Review | TechTweak`;
    }

    // Generate Meta Description Fallback
    if (!phone.meta_description) {
      fallbacks.meta_description = `Check out the full specifications, features, price in Bangladesh, and expert review of the ${phone.name}. Compare and decide if it's worth buying.`;
    }

    // Primary Keyword Fallback
    if (!phone.primary_keyword) {
      fallbacks.primary_keyword = `${phone.name} price in bd`;
    }

    // Canonical Fallback
    if (!phone.canonical_url) {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.techtweak.tech';
      fallbacks.canonical_url = `${baseUrl}/phones/${brandName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${phone.slug}`;
    }

    // OG Image Fallback
    if (!phone.og_image && phone.images && phone.images.length > 0) {
      fallbacks.og_image = phone.images[0];
    }

    return fallbacks;
  }
}
