# Vercel Fluid Active CPU Audit Report — TechTweak

**Date:** September 2026  
**Project:** TechTweak (Next.js 16.x App Router, MongoDB / Mongoose, Vercel)  
**Objective:** Identify root causes of high Fluid Active CPU usage on Vercel Hobby tier (75%+ quota consumption) and provide high-confidence optimization solutions without sacrificing SEO, Core Web Vitals, or functionality.

---

## 1. Executive Summary & Core Root Causes

TechTweak's elevated Vercel Fluid Active CPU consumption is driven by **six primary architectural bottlenecks**, rather than organic traffic alone:

1. **Client-Triggered Database Writes on Every Pageview (`/api/track`)**:
   - `AnalyticsTracker.tsx` in `RootLayout` dispatches a `POST` request to `/api/track` on *every single client-side route transition and page view*.
   - Each invocation spins up a Vercel Serverless Function, connects to MongoDB, hashes IP/User-Agent, and creates an `AnalyticsEvent` document.
   - TechTweak already runs Google Analytics, Vercel Web Analytics, and Vercel Speed Insights. This redundant endpoint single-handedly forces serverless execution on every public visit.

2. **Unprotected Cache Purge Route (`/api/revalidate`)**:
   - `GET /api/revalidate` lacks token authentication. When called without a `path` parameter, it executes `revalidatePath('/', 'layout')`, dumping the entire static cache across all pages and forcing subsequent requests to re-execute server computations and MongoDB queries.

3. **Force-Dynamic Sitemaps & RSS Feeds (`export const dynamic = 'force-dynamic'`)**:
   - `sitemap.xml`, `sitemap-phones.xml`, `sitemap-brands.xml`, `sitemap-news.xml`, `sitemap-static.xml`, `sitemap-images.xml`, and `rss.xml` all explicitly enforce dynamic execution.
   - Search engine crawlers (Googlebot, Bingbot, etc.) requesting sitemaps repeatedly trigger cold serverless functions, database queries, and heavy XML/CDATA string formatting on CPU.

4. **Navbar Categories Polling on Every Mount (`/api/categories`)**:
   - `CategoriesDropdown.tsx` in the root navbar executes `fetch("/api/categories")` on every page load with **zero CDN / cache-control headers**, incurring a dedicated Serverless Function invocation and database query per session.

5. **Duplicate Database Queries per Request (Missing `React.cache()`)**:
   - In `phones/[brand]/[model]`, `phones/[brand]`, `news/[slug]`, `upcoming/[brand]`, and `compare/[slugs]`, the `generateMetadata()` function and the Page Component execute identical database queries independently because they are not wrapped in React's request-lifecycle cache.

6. **Missing ISR Caching on High-Traffic Programmatic Routes**:
   - `/compare/[slugs]` and `/upcoming/[brand]` have no `revalidate` directive, meaning programmatic comparison pages (`-vs-`) and brand upcoming pages are dynamically computed on every single visitor and crawler hit.

7. **Dead & Unoptimized Queries on Phone Details Page**:
   - `PhoneDetailsPage` executed an unindexed price match query (`dbSamePricePhones`) whose result was completely unused in the UI.
   - Unconditional fallback queries ran even when relationships (`related_similar_ids`, `related_better_ids`) were already populated.

---

## 2. Route-by-Route High-CPU Audit Table

| Route / Function | Type | Database Queries | Q/Req | Cache Status | ISR Used | Projection (.select) | .lean() | CPU Cost | Frequency | Severity | Recommended Fix |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **`/api/track`** | API Route (POST) | `AnalyticsEvent.create()` | 1 | None (Dynamic) | No | N/A | N/A | High | High (Every page view & route change) | **CRITICAL** | Eliminate redundant database writes or batch/gate tracking to admin only. Rely on Vercel Analytics + GA. |
| **`/api/revalidate`** | API Route (GET) | None directly (`revalidatePath('/', 'layout')`) | 0 | `force-dynamic` | No | N/A | N/A | Extreme (Flushes entire cache) | Medium (Web scrapers / bots) | **CRITICAL** | Require secure `REVALIDATE_SECRET` query token; do not wipe whole layout on default. |
| **`sitemap-phones.xml`** | Route Handler | `Phone.find().populate('brand_id')` | 1 | `force-dynamic` | No | Yes | Yes | High | High (Crawlers) | **HIGH** | Replace `force-dynamic` with `export const revalidate = 86400`. |
| **`sitemap-images.xml`** | Route Handler | `Phone.find()` + heavy loop | 1 | `force-dynamic` | No | Yes | Yes | High | High (Crawlers) | **HIGH** | Replace `force-dynamic` with `export const revalidate = 86400`. |
| **`sitemap-brands.xml`** | Route Handler | `Brand.find()` | 1 | `force-dynamic` | No | Yes | Yes | Medium | High (Crawlers) | **HIGH** | Replace `force-dynamic` with `export const revalidate = 86400`. |
| **`sitemap-news.xml`** | Route Handler | `Post.find()` | 1 | `force-dynamic` | No | Yes | Yes | Medium | High (Crawlers) | **HIGH** | Replace `force-dynamic` with `export const revalidate = 86400`. |
| **`sitemap-static.xml`** | Route Handler | None (Static array) | 0 | `force-dynamic` | No | N/A | N/A | Low-Med | High (Crawlers) | **HIGH** | Replace `force-dynamic` with `export const revalidate = 86400`. |
| **`sitemap.xml`** | Route Handler | None (Index XML) | 0 | `force-dynamic` | No | N/A | N/A | Low-Med | High (Crawlers) | **HIGH** | Replace `force-dynamic` with `export const revalidate = 86400`. |
| **`rss.xml`** | Route Handler | `Post.find().populate()` | 1 | `force-dynamic` | No | Yes | Yes | Medium | Medium (Feed readers) | **HIGH** | Replace `force-dynamic` with `export const revalidate = 3600`. |
| **`/api/categories`** | API Route (GET) | `Category.find().sort()` | 1 | None | No | Partial | Yes | Medium | High (Every page mount) | **HIGH** | Add `Cache-Control: public, s-maxage=86400, stale-while-revalidate=604800`. |
| **`/phones/[brand]/[model]`** | Server Component | `Phone.findOne()` (Metadata) + `Phone.findOne().populate()` + 3 fallback queries | 3 - 6 | ISR (86400s) | Yes | Partial | Yes | High on cache miss/reval | High (Organic SEO traffic) | **HIGH** | Deduplicate with `React.cache()`, eliminate unused `dbSamePricePhones` query, conditionally query fallbacks only when relations missing. |
| **`/compare/[slugs]`** | Server Component | `Phone.findOne()` x 2 (Metadata) + `Phone.findOne()` x 2 (Page) | 4 | Dynamic | **NO** | Partial | Yes | High | High (Search traffic) | **HIGH** | Add `export const revalidate = 86400`, deduplicate queries with `React.cache()`. |
| **`/upcoming/[brand]`** | Server Component | `Brand.findOne()` x 2 + `Phone.find()` (all upcoming) + `Phone.find()` (brand) | 4 | Dynamic | **NO** | Partial | Yes | High | Medium | **HIGH** | Add `export const revalidate = 21600`, deduplicate brand query with `React.cache()`. |
| **`/upcoming-phones`** | Server Component | `Phone.find().populate('brand_id')` | 1 | Dynamic | **NO** | Yes | Yes | Medium | Medium | **MEDIUM** | Add `export const revalidate = 21600` (6h ISR). |
| **`/search`** | Server Component | `Brand.find()` + `Phone.find()` (all release dates for years) + `Phone.find()` search | 3 | Dynamic | No (searchParams) | Partial | Yes | High | High | **MEDIUM** | Cache static filter options (years & brands), enforce strict result limits, avoid full phone scan for years. |
| **`/api/search`** | API Route (GET) | `Phone.find($text)` + fallback regex | 1 - 2 | None | No | Yes | Yes | High | High (Live Navbar typing) | **MEDIUM** | Add `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`, add index on `{ is_published: 1, name: 1 }`. |
| **`/phones/[brand]`** | Server Component | `Brand.findOne()` (Metadata) + `Brand.findOne()` (Page) + `Phone.find()` | 3 | ISR (21600s) | Yes | Yes | Yes | Medium | High | **MEDIUM** | Deduplicate `Brand.findOne` with `React.cache()`. |
| **`/news/[slug]`** | Server Component | `Post.findOne()` (Metadata) + `Post.findOne()` (Page) | 2 | ISR (3600s) | Yes | Yes | Yes | Medium | Medium | **MEDIUM** | Deduplicate `Post.findOne` with `React.cache()`. |
| **`/phones`** | Server Component | `Phone.find()` + `Phone.countDocuments()` + `Brand.find()` + `Phone.aggregate()` + `Post.find()` | 5 | ISR (3600s) | Yes | Yes | Yes | High | Medium | **MEDIUM** | Replace `countDocuments` with `rawPhones.length`, cache brand aggregation. |
| **`src/proxy.ts`** | Middleware / Proxy | JWT verify on every path | 0 | Dynamic | No | N/A | N/A | Low-Med | Extreme (Every request) | **LOW** | Check `isAdminRoute || isLoginRoute` before inspecting or verifying JWT session token. |

---

## 3. Database Connection Analysis

- Mongoose connection caching in `src/lib/mongodb/mongoose.ts` utilizes global caching (`global.mongoose = { conn: null, promise: null }`).
- However, top-level evaluation threw an error during build time if `MONGODB_URI` was absent, rather than deferring the validation to runtime connection invocation.
- Reusing the global connection object across serverless lambda warm starts is properly structured, but the sheer volume of separate serverless invocations per user visit (tracking, categories, search, dynamic sitemaps) caused repeated lambda initializations.

---

## 4. Prioritized Action Plan

1. **Fix Critical Active Triggers**:
   - Secure `/api/revalidate` with `REVALIDATE_SECRET` to prevent unauthorized layout flushes.
   - Optimize or disable serverless `/api/track` MongoDB event writes on public client navigations, leveraging client-side Google Analytics and Vercel Analytics.
2. **Convert Sitemaps and Feeds to Cached ISR**:
   - Remove `force-dynamic` from `sitemap.xml`, `sitemap-phones.xml`, `sitemap-brands.xml`, `sitemap-news.xml`, `sitemap-static.xml`, `sitemap-images.xml`, and `rss.xml`. Set `revalidate = 86400` (or `3600` for news/rss).
3. **Cache Category and Search Responses**:
   - Add Edge `Cache-Control` to `/api/categories` (`s-maxage=86400`).
   - Add Edge `Cache-Control` to `/api/search` (`s-maxage=300`).
4. **Implement React Request-Memoization (`React.cache()`)**:
   - Wrap DB fetch functions in `phones/[brand]/[model]`, `phones/[brand]`, `news/[slug]`, `upcoming/[brand]`, and `compare/[slugs]` to prevent duplicate queries between metadata and page components.
5. **Enable ISR on Missing Dynamic Routes**:
   - Add `revalidate = 86400` to `/compare/[slugs]`.
   - Add `revalidate = 21600` to `/upcoming/[brand]` and `/upcoming-phones`.
6. **Eliminate Redundant & Dead Queries**:
   - Remove `dbSamePricePhones` dead query in `PhoneDetailsPage`.
   - Condition recommendation fallbacks on actual absence of related items.
   - Avoid redundant `Phone.countDocuments()` in `phones/page.tsx`.
   - Add missing compound index on `{ is_published: 1, name: 1 }` for regex search.
