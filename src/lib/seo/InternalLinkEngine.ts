import Phone from "@/lib/models/Phone";
import Brand from "@/lib/models/Brand";
import Post from "@/lib/models/Post";

export class InternalLinkEngine {
  /**
   * Dynamically fetch related phones based on context to maximize internal linking.
   * Prioritizes same brand, then similar price, then similar performance tier.
   */
  static async getRelatedPhones(currentPhone: any, limit: number = 4) {
    const query: any = { _id: { $ne: currentPhone._id } };

    // Find phones from the same brand
    if (currentPhone.brand_id) {
      const sameBrand = await Phone.find({ ...query, brand_id: currentPhone.brand_id })
        .select("name slug images price_bdt")
        .sort({ release_date_parsed: -1 })
        .limit(limit)
        .lean();
      
      if (sameBrand.length >= limit) return sameBrand;

      // If we need more, find phones in similar price range (+/- 20%)
      const price = currentPhone.price_bdt;
      if (price && price > 0) {
        const minPrice = price * 0.8;
        const maxPrice = price * 1.2;
        const samePrice = await Phone.find({
          ...query,
          _id: { $nin: sameBrand.map(p => p._id) },
          price_bdt: { $gte: minPrice, $lte: maxPrice }
        })
          .select("name slug images price_bdt")
          .limit(limit - sameBrand.length)
          .lean();
        
        return [...sameBrand, ...samePrice];
      }
      return sameBrand;
    }

    return await Phone.find(query).limit(limit).lean();
  }

  /**
   * Suggests competitor phones for comparison pages (e.g. VS pages).
   * Finds phones from DIFFERENT brands with similar specs/price.
   */
  static async getCompareSuggestions(currentPhone: any, limit: number = 4) {
    if (!currentPhone.price_bdt) return [];

    const minPrice = currentPhone.price_bdt * 0.8;
    const maxPrice = currentPhone.price_bdt * 1.2;

    const competitors = await Phone.find({
      _id: { $ne: currentPhone._id },
      brand_id: { $ne: currentPhone.brand_id },
      price_bdt: { $gte: minPrice, $lte: maxPrice }
    })
      .select("name slug images")
      .sort({ views: -1 }) // Prioritize popular competitors
      .limit(limit)
      .lean();

    return competitors;
  }

  /**
   * Fetches latest news related to the specific brand of the phone.
   */
  static async getBrandNews(brandId: string | undefined, limit: number = 3) {
    if (!brandId) return [];

    const brand = await Brand.findById(brandId).lean() as any;
    if (!brand) return [];

    // Search for posts mentioning the brand in the title or tags
    const news = await Post.find({
      $or: [
        { tags: { $regex: new RegExp(brand.name, "i") } },
        { title: { $regex: new RegExp(brand.name, "i") } }
      ]
    })
      .select("title slug featured_image published_at")
      .sort({ published_at: -1 })
      .limit(limit)
      .lean();

    return news;
  }

  /**
   * Calculate a dynamic internal link strength score based on known incoming/outgoing edges.
   */
  static calculateLinkScore(incomingCount: number, isOrphan: boolean): number {
    if (isOrphan) return 0;
    // Simple heuristic: 10 incoming links = 100 score. Cap at 100.
    return Math.min(100, incomingCount * 10);
  }
}
