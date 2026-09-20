# Levente Studio – production audit hardening

Date: 2026-09-20  
Branch: `production-audit-hardening-2026-09-20`  
Base: `main@436ac117550440fa6187cc60b5784a554706d3d6`

## A. Executive summary

The current production system has a strong foundation: Astro static output, a focused inquiry path, Netlify Forms as the lead store, server-side Telegram notifications from the Netlify submission event, attribution fields, case studies and dedicated service / industry routes.

The Bolt audit reported a clean local build and identified several low-risk hardening items. A follow-up check against the actual GitHub `main` showed that some fixes Bolt believed were already present were not in fact committed to `main`. This branch therefore contains only changes that were independently verified against the real repository and are safe to review in isolation.

## B. Critical issues

### 1. Duplicate `gtag()` definition
`src/layouts/BaseLayout.astro` defined `gtag()` in two separate inline scripts. The second definition was redundant and could make analytics maintenance harder.

**Fix in this branch:** keep the initial dataLayer / gtag bootstrap once, then use only `gtag('config', ...)` in the second block.

### 2. Thank-you route in sitemap
`/koszonjuk/` is a post-conversion page and should not be promoted as an organic landing page.

**Fix in this branch:** exclude `/koszonjuk/` from Astro sitemap generation.

## C. High-impact opportunities

The following remain follow-up work and are intentionally not mixed into this hardening PR:

- tighten Content Security Policy after validating all required third-party origins;
- review CI trigger / runner policy separately;
- expand structured data where it materially improves service and industry pages;
- verify analytics event ownership between direct gtag and GTM to avoid duplicate reporting;
- review the remaining unused analytics exports and dependencies only after repository-wide import verification.

## D. Page-by-page / route audit

Bolt reported the local project builds **46 generated pages**: 31 static routes plus 15 industry landings. The earlier “47” figure was reported by Bolt as a counting error.

Bolt also reported:
- 4 service pages;
- 3 case studies;
- 5 blog articles;
- 15 industry landings;
- 3 legal pages;
- all major routes present.

These counts are recorded here as audit evidence from the local Bolt workspace and must be re-verified by the Netlify preview build before merge.

## E. CRO funnel

Target flow:

`traffic → landing → proof → offer → /kapcsolat/ → Netlify Forms → submission_created → Telegram → /koszonjuk/`

Current architecture keeps the form submission authoritative in Netlify Forms. Telegram is a secondary owner notification and must never determine whether a lead is considered successfully stored.

Regression gate for this PR:
- no changes to form field names;
- no changes to Netlify form submission mechanics;
- no changes to Telegram credentials or event binding;
- no changes to UTM / GCLID attribution;
- no changes to thank-you redirect logic.

## F. SEO map

Current SEO foundation includes dedicated service, problem, article, case-study and industry routes.

Hardening in this PR:
- remove the post-conversion `/koszonjuk/` route from the sitemap.

Follow-up:
- validate intent overlap / cannibalization before creating more landing pages;
- add or extend schema only where the page content supports it;
- maintain one clear search intent per landing page.

## G. Design audit

Bolt reported that the RelatedContent light-theme mismatch, SubpageHero Hungarian labels and the industry case-study reference had already been corrected in the working copy.

A direct GitHub check confirmed these specific fixes are already present on `main`, so this branch does not touch them again.

## H. Mobile audit

No mobile redesign is included in this PR.

Release checks should still cover:
- 320 / 375 / 390 / 430 px form usability;
- navigation open / close / focus behavior;
- sticky CTA overlap;
- website input behavior;
- form success and error states.

## I. Technical audit

Verified against GitHub `main` before creating this branch:

Already present:
- corrected RelatedContent light styling;
- corrected industry case-study reference;
- Hungarian SubpageHero status labels;
- cleaned Tailwind content pattern.

Not present on `main` at audit handoff:
- production audit document;
- thank-you sitemap exclusion;
- duplicate second `gtag()` cleanup.

Also observed: `src/utils/gtm.ts` and `package.json` still contain cleanup candidates that Bolt described as already removed. These are deliberately left unchanged here until usage is exhaustively verified.

## J. Prioritized backlog

### P0 – release safety
- verify Netlify preview is green;
- verify production lead path remains intact;
- verify Telegram still fires only after accepted form submission.

### P1 – high business / data quality impact
- analytics duplication audit: GTM versus direct gtag;
- CSP hardening without breaking fonts, analytics, Netlify or form flow;
- structured data review for service and industry routes.

### P2 – maintainability
- repository-wide verification of unused exports in `src/utils/gtm.ts`;
- verify and remove genuinely unused npm dependencies with lockfile regenerated;
- review old audit / migration documents for stale guidance.

### P3 – optimization
- additional design polish only where it improves clarity or conversion;
- deeper content pruning after real Search Console / GA4 evidence.

## Top 10 conversion risks to keep monitoring

1. unclear first-screen value proposition on high-intent landing pages;
2. insufficient proof close to the first strong CTA;
3. overlap between similar service / audit landing intents;
4. excessive form friction on mobile;
5. analytics duplication causing false conversion conclusions;
6. attribution loss between entry page and inquiry page;
7. Telegram notification failure being mistaken for lead failure;
8. thin or repetitive industry landing content;
9. weak internal linking from informational articles to commercial next steps;
10. technical SEO pages such as thank-you / utility routes leaking into indexable discovery surfaces.

## Validation reported by Bolt local workspace

The Bolt handoff reported:

- `npm ci`: success
- typecheck: 0 errors
- lint: 0 errors, 1 pre-existing CookieBannerDark warning
- build: success
- generated pages: 46
- sitemap URLs after local fix: 44

These are **reported local results**, not GitHub/Netlify CI evidence. The PR preview remains the release gate.

## PR scope

This PR intentionally contains only:
1. duplicate `gtag()` cleanup;
2. `/koszonjuk/` sitemap exclusion;
3. this audit record.

No merge should happen until the Netlify preview is green and the diff has been reviewed.
