# Levente Studio – production audit status

Date: 2026-09-20  
Production branch: `main`  
Verified production commit: `204238551017bee5916c20ab44d91ecd0705ecec`  
Verified Netlify production deploy: `6aafea6b812cd80009c212a2` (`ready`)

## A. Executive summary

The Levente Studio production stack is now materially hardened compared with the original audit handoff.

Current production uses Astro static output, Netlify Forms as the authoritative lead store, a `submission_created` Netlify Function for Telegram owner notification, campaign attribution fields, service / industry landings, case studies, a knowledge base, and a conversion-oriented inquiry path.

The September hardening sequence was shipped incrementally through isolated pull requests and Netlify Deploy Preview gates. The main remaining measurement risk is not a known runtime failure: it is the still-unverified ownership overlap between direct GA4 calls and the published Google Tag Manager container.

## B. Shipped hardening

### Analytics bootstrap and sitemap
Completed in PR #17:
- removed the duplicate second `gtag()` definition;
- excluded `/koszonjuk/` from sitemap generation;
- added the first production audit record.

### CI trigger and Telegram message size
Completed in PR #22:
- CI workflow also triggers on `main` pushes;
- long Telegram lead notifications are safely split below Telegram's message limit.

GitHub Actions can still fail before any workflow step starts because of the account-level runner / billing lock observed during this audit. This is not evidence of an application build failure. Netlify remains the release build gate until that account issue is resolved.

### CSP and type safety
Completed in PR #23:
- removed generic script `unsafe-inline` from CSP;
- generated exact SHA-256 hashes for built inline scripts;
- removed the unused Supabase origin exception;
- blocked object embedding and unsafe base / inline-event behavior;
- fixed the StudioLab portfolio fallback type errors.

PR #23 validation reported:
- typecheck: success;
- build: success;
- lint: 0 errors, 1 pre-existing CookieBannerDark hook warning;
- 47 generated HTML pages;
- 373 inline script occurrences checked;
- 47 unique allowed script hashes.

### Lead payload hardening
Completed in PR #24:
- added server-side minimum lead validation before Telegram notification;
- normalized bare website domains such as `cegem.hu` to a valid HTTPS URL at submission time.

Netlify Forms remains authoritative. Telegram failure must not convert an already stored lead into a failed lead.

### Verified dead-code cleanup
Completed in PR #25:
- removed seven repository files proven to have no active consumers.

### Analytics helper cleanup
Completed in PR #26:
- repository-wide reference verification covered 67 active Astro / TS / TSX source files;
- `src/utils/gtm.ts` was reduced to the two helpers with real consumers:
  - `pushToDataLayer`;
  - `trackScroll`.
- 15 unused helper exports were removed.

### Dependency and package metadata cleanup
Completed in PR #27:
- removed unused direct declarations:
  - `@supabase/supabase-js`;
  - `astro-seo`;
  - `react-router-dom`;
  - root-level `@vitejs/plugin-react`.
- package-lock v3 graph was pruned from 736 to 647 reachable package entries;
- 89 entries that became unreachable from the remaining dependency graph were removed;
- `@vitejs/plugin-react` remains in the lockfile transitively because `@astrojs/react` still needs it;
- package metadata was renamed from the generic `vite-react-typescript-starter` to `levente-studio`.

The PR #27 Netlify Deploy Preview completed successfully, which validated dependency installation and the Astro production build after pruning.

## C. Current production release evidence

Netlify production deploy `6aafea6b812cd80009c212a2`:
- state: `ready`;
- context: `production`;
- branch: `main`;
- commit: `204238551017bee5916c20ab44d91ecd0705ecec`;
- Astro framework detected;
- 2 redirect rules processed without errors;
- 14 header rules processed without errors;
- 1 `telegram-lead` function deployed;
- function event binding: `submission_created`;
- no edge functions;
- no deploy error message.

## D. Lead path

Target production flow:

`traffic → landing → proof → offer → /kapcsolat/ → Netlify Forms → submission_created → Telegram → /koszonjuk/`

Verified structurally:
- form submission remains the authoritative persistence step;
- Telegram runs from the Netlify submission event;
- Telegram credentials are server-side;
- UTM / GCLID attribution remains in the inquiry flow;
- website input normalization is live in the current code;
- minimum Telegram-notification payload validation is server-side.

Still worth doing as an explicit manual production smoke test:
- submit one clearly labelled synthetic inquiry;
- confirm it appears in Netlify Forms;
- confirm the Telegram notification arrives once;
- confirm the browser reaches the thank-you state;
- then remove / archive the synthetic submission as appropriate.

This audit did not generate a fake customer lead, so the manual end-to-end smoke test is not claimed as completed here.

## E. Measurement status

Current code intentionally contains both:
- direct GA4 setup for measurement ID `G-LNDL3K56Q2`;
- Google Tag Manager container `GTM-WZHLTWBD`.

The source also uses a helper that can push an event to `dataLayer` and call direct `gtag('event', ...)`.

What is known:
- duplicate bootstrap code was removed;
- event helper usage was reduced to active consumers;
- the current Supermetrics team does not expose a Levente Studio GA4 property;
- the public GTM container's exact published tag ownership could not be independently verified from the available connectors.

Therefore the following remains open:

**Do not remove either GA4 or GTM by assumption.**  
Use GTM admin / Preview plus GA4 DebugView or an equivalent real-event inspection to determine whether the same business event is sent twice to the same property.

## F. Structured data status

Current source already uses content-supported structured data instead of broad schema inflation:
- home: `ProfessionalService`;
- core commercial pages: `Service`;
- industry audit routes: `Service`;
- knowledge-base articles: `Article`;
- case studies: `Article`.

No blanket schema expansion is recommended without page content that supports it. Future additions should be tied to a real search-result or entity-clarity use case.

## G. SEO and route status

Current foundation includes:
- service pages;
- problem-aware landings;
- industry-specific audit routes;
- case studies;
- knowledge-base articles;
- legal pages;
- post-conversion thank-you route excluded from sitemap generation.

Before adding more SEO landings:
- verify search-intent separation;
- avoid cannibalizing existing commercial pages;
- prefer stronger content and internal linking over route count.

## H. Mobile / CRO release checks

The September design-system work unified the public customer path. Continue to protect these behaviors during future changes:
- mobile navigation open / close / focus handling;
- sticky CTA not covering controls;
- usable inquiry form at 320 / 375 / 390 / 430 px;
- package / goal preselection from query parameters;
- campaign attribution surviving navigation to the inquiry page;
- clear proof near commercial CTAs;
- no fake KPI claims in case studies.

## I. Current prioritized backlog

### P0 – manual production verification
- one labelled synthetic end-to-end inquiry smoke test;
- verify one stored Netlify submission produces one Telegram notification.

### P1 – measurement correctness
- inspect the published GTM container in GTM admin / Preview;
- inspect Levente Studio GA4 DebugView;
- decide one owner for each business event and eliminate any proven duplicate delivery.

### P2 – repository maintenance
- continue reviewing historical top-level audit / migration documents for stale guidance;
- keep new technical decisions in the current `docs/` records rather than creating parallel contradictory handoffs.

### P3 – data-led optimization
- use Search Console and GA4 evidence before pruning or expanding landing-page content;
- publish case-study KPI values only when the source, time period and definition are verifiable.

## J. Risks to keep monitoring

1. analytics duplication producing false conversion conclusions;
2. landing-page intent overlap / SEO cannibalization;
3. mobile form friction;
4. attribution loss between entry page and inquiry page;
5. Telegram notification failure being mistaken for lead persistence failure;
6. weak proof near the first strong CTA;
7. repetitive industry landing content;
8. utility / post-conversion routes leaking into search discovery;
9. stale audit documents contradicting current production architecture;
10. publishing business KPI claims without a verified measurement source.

## K. Release discipline

For code or dependency changes:
1. isolate the change on a branch;
2. open a focused PR;
3. require a green Netlify Deploy Preview;
4. merge only after the preview matches the intended commit;
5. verify the resulting production deploy reaches `ready`.

This sequence was followed for the September P1/P2 hardening work through PR #27.
