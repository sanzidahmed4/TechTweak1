import { google } from "googleapis";

export class GSCService {
  private static async getAuthClient() {
    const clientEmail = process.env.GSC_CLIENT_EMAIL;
    // Replace \n with actual newlines in case it was loaded as a literal string
    const privateKey = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      throw new Error("Missing Google Search Console API credentials in environment variables.");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
    });

    return auth.getClient();
  }

  /**
   * Fetch performance data from Google Search Console
   */
  static async fetchPerformanceData() {
    try {
      const siteUrl = process.env.GSC_SITE_URL;
      if (!siteUrl) {
        throw new Error("Missing GSC_SITE_URL in environment variables.");
      }

      const authClient = await this.getAuthClient();
      const webmasters = google.webmasters({ version: "v3", auth: authClient as never });

      // Fetch data for the last 30 days
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);

      const response = await webmasters.searchanalytics.query({
        siteUrl: siteUrl,
        requestBody: {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
          dimensions: ["page"],
          rowLimit: 1000,
        },
      });

      const rows = response.data.rows || [];

      // Format the results to match our dashboard's expected format
      const results = rows.map((row) => {
        const url = row.keys?.[0] || "";
        
        // Extract slug from URL (assuming URL format is https://www.techtweak.tech/phones/brand/slug)
        // Adjust regex or extraction logic based on actual URL structure
        const urlParts = url.split("/");
        const slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2] || "unknown";

        return {
          url,
          slug,
          impressions: row.impressions || 0,
          clicks: row.clicks || 0,
          ctr: parseFloat(((row.ctr || 0) * 100).toFixed(2)),
          position: parseFloat((row.position || 0).toFixed(1)),
        };
      });

      return results;

    } catch (error) {
      console.error("GSC API Error:", error);
      throw error;
    }
  }
}
