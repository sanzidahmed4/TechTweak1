import fs from "fs";
import path from "path";

function replaceInFile(filePath: string, searchRegex: RegExp, replaceValue: string | ((substring: string, ...args: any[]) => string)) {
  const fullPath = path.resolve(filePath);
  let content = fs.readFileSync(fullPath, "utf-8");
  if (typeof replaceValue === "string") {
    content = content.replace(searchRegex, replaceValue);
  } else {
    content = content.replace(searchRegex, replaceValue as any);
  }
  fs.writeFileSync(fullPath, content, "utf-8");
  console.log(`Updated ${filePath}`);
}

async function removeDummyData() {
  // 1. src/app/phones/[brand]/[model]/page.tsx
  replaceInFile(
    "src/app/phones/[brand]/[model]/page.tsx",
    /\/\/ Fallback demo object if not found in db\s*if \(!rawPhone\) \{[\s\S]*?faqs: \[[\s\S]*?\]\s*\}\s*;\s*\}/,
    `if (!rawPhone) {
    notFound();
  }`
  );

  // 2. src/app/phones/[brand]/page.tsx
  replaceInFile(
    "src/app/phones/[brand]/page.tsx",
    /\/\/ Fallback for demonstration\s*if \(!brandData\) \{[\s\S]*?\}\s*\}\s*/,
    `if (!brandData) {
    notFound();
  }\n`
  );
  // Ensure notFound is imported in [brand]/page.tsx
  let brandPageContent = fs.readFileSync("src/app/phones/[brand]/page.tsx", "utf-8");
  if (!brandPageContent.includes("notFound")) {
    brandPageContent = `import { notFound } from "next/navigation";\n` + brandPageContent;
    fs.writeFileSync("src/app/phones/[brand]/page.tsx", brandPageContent, "utf-8");
  }

  // 3. src/app/phones/page.tsx
  replaceInFile(
    "src/app/phones/page.tsx",
    /\/\/ Fallback demo data if DB is empty\s*if \(phones\.length === 0\) \{[\s\S]*?totalCount = 1250;\s*\}/,
    ``
  );
  replaceInFile(
    "src/app/phones/page.tsx",
    /if \(brands\.length === 0\) \{[\s\S]*?\}\s*\)/,
    ``
  );
  // Manual fix for the brands block if regex misses
  replaceInFile(
    "src/app/phones/page.tsx",
    /if \(brands\.length === 0\) \{\s*brands = \["Samsung",[\s\S]*?\);\s*\}/,
    ``
  );

  // 4. src/components/phones/BrandGrid.tsx
  replaceInFile(
    "src/components/phones/BrandGrid.tsx",
    /const FALLBACK_BRANDS = \[[\s\S]*?\];\s*/,
    ``
  );
  replaceInFile(
    "src/components/phones/BrandGrid.tsx",
    /const displayBrands = brands\.length > 0 \? brands : FALLBACK_BRANDS;/,
    `const displayBrands = brands;`
  );

  // 5. src/components/phones/AIRecommendation.tsx
  replaceInFile(
    "src/components/phones/AIRecommendation.tsx",
    /const DEMO_PHONES: Record<string, \{ name: string; tag: string; price: string \}\[\]> = \{[\s\S]*?^\};\s*$/m,
    ``
  );
  replaceInFile(
    "src/components/phones/AIRecommendation.tsx",
    /const displayPhones =[\s\S]*?DEMO_PHONES\[activeCategory\].*?\);/,
    `const displayPhones = filtered;\n  if (displayPhones.length === 0) return null;`
  );

  console.log("All dummy data removed successfully.");
}

removeDummyData();
