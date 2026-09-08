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

Launch price hypothesis: **US$19 one-time**.

## Automated fulfillment
1. Buyer pays through the Stripe Payment Link.
2. Stripe sends a signed `checkout.session.completed` or `checkout.session.async_payment_succeeded` webhook.
3. `/api/stripe-webhook` validates the Stripe signature and exact product/payment details.
4. A paid entitlement is stored in Netlify Blobs.
5. Stripe redirects the buyer to `success.html?session_id={CHECKOUT_SESSION_ID}`.
6. `/api/verify-purchase` confirms the entitlement.
7. `/api/download-toolkit` serves the premium HTML only for an entitled Checkout Session.
8. The premium source file is excluded from the public static build.

## Current test infrastructure
- Netlify project: `service-profit-toolkit`
- Stripe product: `Service Profit Toolkit`
- Stripe price: **$19 one-time (test mode)**
- Stripe Payment Link: configured
- Stripe success redirect: configured
- Stripe webhook endpoint: configured for the two required Checkout events
- Netlify Blobs: entitlement storage code implemented

## Remaining one-time platform setup
- Connect `Cyberlevi/LeventeStudio`, branch `digital-asset-factory-mvp`, base directory `digital-asset-factory` to the Netlify project and deploy.
- In Netlify, create secret Function environment variable `STRIPE_WEBHOOK_SECRET` using the signing secret from the Stripe webhook endpoint.
- Run a Stripe test checkout and confirm automatic download.

## Operating rule
Do not mass-generate thin SEO pages. Expand only into calculator/tool pages that have a distinct use case, useful formulas, and genuinely different user intent.

## Initial validation target
Before expanding heavily, aim for one of these signals:
- first organic sale,
- at least 3% click-through from free tool to paid toolkit,
- repeat visits / saved direct traffic,
- a niche tool beginning to rank or earn impressions.

If no meaningful signal appears, pivot the niche or offer rather than producing hundreds of pages.
