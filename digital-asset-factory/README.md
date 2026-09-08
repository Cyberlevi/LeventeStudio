# Service Profit Toolkit — MVP

Branch: `digital-asset-factory-mvp`

## Goal
Build a subscription-free digital asset that can attract organic traffic with useful calculators and monetize with a one-time lifetime purchase.

## Free product
`index.html` contains four browser-only tools:
- quote price calculator
- labor rate calculator
- markup vs margin calculator
- job profit calculator

No user pricing data is sent to a server. Inputs are stored in localStorage only.

## Paid product
`premium/service-profit-toolkit-premium.html` is a standalone offline lifetime app with:
- full job pricing workspace
- saved jobs
- editable quote preview
- print/PDF output via browser print
- CSV export
- JSON backup/restore
- no cloud account and no subscription

Initial launch price hypothesis: **US$19 one-time**.

## Monetization funnel
1. Organic/search/social visitor lands on free calculator.
2. Free tool solves one immediate problem.
3. CTA offers the lifetime offline toolkit.
4. Stripe Payment Link handles checkout.
5. Buyer receives the premium HTML file/download package.

## Current status
- [x] Market scan
- [x] Free MVP
- [x] Premium lifetime MVP
- [x] Separate Netlify project created (`service-profit-toolkit`)
- [x] Netlify config
- [ ] Connect GitHub source to the Netlify project / first deploy
- [ ] Connect Stripe account
- [ ] Create Stripe product + payment link
- [ ] Insert live checkout URL into `index.html`
- [ ] Add analytics after live deployment
- [ ] Build first niche SEO landing pages based on validated demand

## Operating rule
Do not mass-generate thin SEO pages. Expand only into calculator/tool pages that have a distinct use case, useful formulas, and genuinely different user intent.

## Initial validation target
Before expanding heavily, aim for one of these signals:
- first organic sale,
- at least 3% click-through from free tool to paid toolkit,
- repeat visits / saved direct traffic,
- a niche tool beginning to rank or earn impressions.

If no meaningful signal appears, pivot the niche or offer rather than producing hundreds of pages.
