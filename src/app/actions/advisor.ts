"use server";

import connectToDatabase from "@/lib/mongodb/mongoose";
import Phone from "@/lib/models/Phone";
import AdvisorAnalytic from "@/lib/models/AdvisorAnalytic";

import Brand from "@/lib/models/Brand";

export type QuizAnswers = {
  priority: string;
  budget: string;
  customBudget?: number;
  brand: string;
  screenSize: string;
  upgradeCycle: string;
  searchQuery?: string;
  isSurpriseMe?: boolean;
};

export type RecommendedPhone = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  brandSlug: string;
  price: string;
  image: string;
  score: number;
  confidence: "High" | "Medium" | "Low";
  reason: string;
  comparisonReason?: string;
  role: "Best Match" | "Alternative Choice" | "Best Value Choice" | "Direct Search" | "Surprise Recommendation";
};

// Fetch dynamic brands
export async function getAdvisorBrands() {
  await connectToDatabase();
  const brands = await Brand.find({}).select("name slug").lean();
  return JSON.parse(JSON.stringify(brands));
}

// Helper to extract numbers from strings (e.g., "5000 mAh" -> 5000)
function extractNumber(str?: string): number {
  if (!str) return 0;
  const match = str.match(/\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
}

export async function getAdvisorRecommendations(answers: QuizAnswers) {
  await connectToDatabase();

  let results: RecommendedPhone[] = [];

  // --- DEDICATED PHONE SEARCH ---
  if (answers.searchQuery && answers.searchQuery.trim().length > 0) {
    const searchRegex = new RegExp(answers.searchQuery.trim(), "i");
    const matchedPhones = await Phone.find({ is_published: true, name: searchRegex })
      .populate("brand_id", "name slug").lean();
    
    if (matchedPhones.length > 0) {
      // Just pick the closest match or first
      const p: any = matchedPhones[0];
      results.push({
        id: p._id.toString(),
        name: p.name,
        slug: p.slug,
        brand: p.brand_id?.name || "Unknown",
        brandSlug: p.brand_id?.slug || "unknown",
        price: p.price_usd ? `$${p.price_usd}` : "N/A",
        image: p.images && p.images.length > 0 ? p.images[0] : "",
        score: 99,
        confidence: "High",
        reason: `Direct match for your search "${answers.searchQuery}".`,
        role: "Direct Search"
      });
      // Save Analytics and return early
      await AdvisorAnalytic.create({
        priority: "search", budget: "any", brand: "any", screen_size: "any", upgrade_cycle: "any",
        search_query: answers.searchQuery, best_match_id: p._id
      }).catch(()=>{});
      return { results };
    }
  }

  // --- SURPRISE ME (RANDOMIZED PREMIUM) ---
  if (answers.isSurpriseMe) {
    // Fetch top tier phones (e.g., AnTuTu > 800k or Price > 600)
    const topPhones = await Phone.find({ is_published: true, antutu_score: { $gt: 800000 } })
      .populate("brand_id", "name slug").lean();
    
    if (topPhones.length >= 3) {
      // Shuffle array
      const shuffled = topPhones.sort(() => 0.5 - Math.random());
      results = shuffled.slice(0, 3).map((p: any, idx) => ({
        id: p._id.toString(),
        name: p.name,
        slug: p.slug,
        brand: p.brand_id?.name || "Unknown",
        brandSlug: p.brand_id?.slug || "unknown",
        price: p.price_usd ? `$${p.price_usd}` : "N/A",
        image: p.images && p.images.length > 0 ? p.images[0] : "",
        score: Math.floor(Math.random() * (99 - 90 + 1) + 90), // Random high score
        confidence: "High",
        reason: "Chosen purely for its exceptional overall power and premium features.",
        role: "Surprise Recommendation"
      }));
      // Save Analytics
      await AdvisorAnalytic.create({
        priority: "surprise", budget: "any", brand: "any", screen_size: "any", upgrade_cycle: "any",
        is_surprise_me: true, best_match_id: results[0].id
      }).catch(()=>{});
      return { results };
    }
  }

  // --- NORMAL QUIZ SCORING FLOW ---
  const query: any = { is_published: true }; 
  // Add release_date_parsed validity check to ensure it's officially released or has a date
  query.release_date_parsed = { $ne: null };

  if (answers.budget === "under_300") query.price_usd = { $lte: 300 };
  else if (answers.budget === "300_600") query.price_usd = { $gt: 300, $lte: 600 };
  else if (answers.budget === "600_1000") query.price_usd = { $gt: 600, $lte: 1000 };
  else if (answers.budget === "custom" && answers.customBudget) query.price_usd = { $lte: answers.customBudget };

  const candidates = await Phone.find(query).populate("brand_id", "name slug").lean();

  if (!candidates || candidates.length === 0) {
    return { error: "No phones found matching your strict criteria. Try increasing your budget or changing brand." };
  }

  const scoredCandidates = candidates.map((p: any) => {
    let score = 50; 
    let reasons: string[] = [];

    const price = p.price_usd || 0;
    const antutu = p.antutu_score || 0;
    const battery = extractNumber(p.battery_capacity) || extractNumber(p.battery);
    const screen = extractNumber(p.screen_size);
    const refreshRate = extractNumber(p.refresh_rate);
    const brandName = p.brand_id?.name || "Unknown";

    if (answers.priority === "gaming") {
      if (antutu > 1000000) { score += 20; reasons.push("flagship performance"); }
      else if (antutu > 600000) { score += 10; reasons.push("solid gaming power"); }
      if (refreshRate >= 120) { score += 10; reasons.push("120Hz+ display"); }
    } else if (answers.priority === "camera") {
      const mainCam = extractNumber(p.cam_main_sensor) || extractNumber(p.camera_main);
      if (mainCam >= 50) { score += 15; reasons.push("high-res camera setup"); }
      if (p.cam_ois && p.cam_ois.toLowerCase().includes("ois")) { score += 10; reasons.push("optical image stabilization"); }
    } else if (answers.priority === "battery") {
      if (battery >= 5000) { score += 20; reasons.push("massive battery"); }
      const charging = extractNumber(p.charging_wired) || extractNumber(p.charging);
      if (charging >= 65) { score += 10; reasons.push("super-fast charging"); }
    } else {
      if (antutu > 500000) score += 10;
      if (battery >= 4500) score += 10;
      reasons.push("great all-round balance");
    }

    if (answers.brand && answers.brand !== "any") {
      if (brandName.toLowerCase() === answers.brand.toLowerCase()) {
        score += 15;
        reasons.push(`your preferred brand (${brandName})`);
      } else {
        score -= 20;
      }
    }

    if (answers.screenSize === "compact" && screen > 0) {
      if (screen <= 6.2) { score += 10; reasons.push("compact form factor"); }
      else score -= 10;
    } else if (answers.screenSize === "large" && screen > 0) {
      if (screen >= 6.5) { score += 10; reasons.push("large immersive display"); }
      else score -= 5;
    }

    if (answers.upgradeCycle === "keep") {
      score += 5; 
      reasons.push("future-proof specs");
    }

    score = Math.min(99, Math.max(10, score));

    return { phone: p, score, reasons, price };
  });

  scoredCandidates.sort((a, b) => b.score - a.score);

  let bestMatch = scoredCandidates[0];
  let altMatch = scoredCandidates.find(c => c.phone.brand_id?.name !== bestMatch.phone.brand_id?.name && c.phone._id.toString() !== bestMatch.phone._id.toString()) || scoredCandidates[1];
  
  let top20 = scoredCandidates.slice(0, 20);
  let bestValue = top20.reduce((prev, curr) => {
    const prevRatio = prev.price > 0 ? (prev.score / prev.price) : 0;
    const currRatio = curr.price > 0 ? (curr.score / curr.price) : 0;
    return currRatio > prevRatio && curr.phone._id.toString() !== bestMatch.phone._id.toString() ? curr : prev;
  }, top20[1] || top20[0]);

  const formatPhone = (data: any, role: string): RecommendedPhone => {
    if (!data) return null as any;
    
    let confidence: "High" | "Medium" | "Low" = "Low";
    if (data.score >= 85) confidence = "High";
    else if (data.score >= 70) confidence = "Medium";

    const uniqueReasons = Array.from(new Set(data.reasons)).slice(0, 3);
    let reasonText = "Recommended because of its solid specs.";
    if (uniqueReasons.length > 0) {
      reasonText = `Recommended because of its ${uniqueReasons.join(", and ")}.`;
    }

    let comparisonReason = "";
    if (role === "Alternative Choice") {
      comparisonReason = "Ranked highly as an alternative because it offers a different brand experience with similar performance.";
    } else if (role === "Best Value Choice") {
      comparisonReason = "Ranked above others in value because it delivers flagship-level specs at a significantly lower price point.";
    } else if (role === "Best Match") {
      comparisonReason = "Scored highest across all your strict criteria.";
    }

    return {
      id: data.phone._id.toString(),
      name: data.phone.name,
      slug: data.phone.slug,
      brand: data.phone.brand_id?.name || "Unknown",
      brandSlug: data.phone.brand_id?.slug || "unknown",
      price: data.phone.price_usd ? `$${data.phone.price_usd}` : "N/A",
      image: data.phone.images && data.phone.images.length > 0 ? data.phone.images[0] : "",
      score: data.score,
      confidence,
      reason: reasonText,
      comparisonReason,
      role: role as any
    };
  };

  results = [
    formatPhone(bestMatch, "Best Match"),
    formatPhone(altMatch, "Alternative Choice"),
    formatPhone(bestValue, "Best Value Choice")
  ].filter(Boolean);

  // 4. Save Analytics
  try {
    await AdvisorAnalytic.create({
      priority: answers.priority,
      budget: answers.budget,
      brand: answers.brand,
      screen_size: answers.screenSize,
      upgrade_cycle: answers.upgradeCycle,
      best_match_id: bestMatch?.phone._id,
      alternative_id: altMatch?.phone._id,
      best_value_id: bestValue?.phone._id,
      // session_id could be passed from client if needed
    });
  } catch (err) {
    console.error("Failed to save advisor analytic", err);
  }

  return { results };
}
