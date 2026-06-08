import Phone from "@/lib/models/Phone";

export class MockGSCService {
  /**
   * Simulates fetching ranking data from the Google Search Console API.
   * In a real environment, this would use googleapis and a Service Account JSON.
   */
  static async fetchPerformanceData() {
    // We will generate realistic-looking mock data based on the phones in our DB
    const phones = await Phone.find({ is_published: true }).select("slug name").lean() as any[];
    
    const results = phones.map((phone) => {
      // Simulate random performance metrics
      const isWinner = Math.random() > 0.7; // 30% are winners
      const isLoser = Math.random() > 0.8;  // 20% are losers
      const isLowHanging = Math.random() > 0.85; // 15% are low hanging fruit

      let position = Math.floor(Math.random() * 50) + 1; // 1 to 50
      if (isWinner) position = Math.floor(Math.random() * 5) + 1; // 1 to 5
      if (isLowHanging) position = Math.floor(Math.random() * 10) + 11; // 11 to 20
      if (isLoser) position = Math.floor(Math.random() * 20) + 30; // 30 to 50

      // Better positions get exponentially more impressions and clicks
      const baseImpressions = Math.floor(Math.random() * 1000) + 100;
      const impressionsMultiplier = Math.max(1, 50 - position);
      const impressions = baseImpressions * impressionsMultiplier;
      
      const ctr = position < 10 ? (Math.random() * 0.15 + 0.05) : (Math.random() * 0.03); // 5-20% for top 10, <3% for rest
      const clicks = Math.floor(impressions * ctr);

      return {
        url: `https://www.techtweak.tech/phones/brand/${phone.slug}`, // Using dummy brand in URL
        slug: phone.slug,
        impressions,
        clicks,
        ctr: parseFloat((ctr * 100).toFixed(2)),
        position: parseFloat(position.toFixed(1)),
      };
    });

    return results;
  }
}
