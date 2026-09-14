# Levente Studio social preview system

## Brand assets
- High-contrast graphite + signal-lime LS favicon system
- 16x16, 32x32, 48x48 browser icons
- favicon.ico fallback
- Apple touch icon
- Android/PWA 192x192 and 512x512 icons
- dedicated maskable icon
- dark PWA theme/background colors

## Default social card
The homepage and routes without a dedicated card use `/og-levente-studio-2026.png`.

## Route-specific cards
Dedicated SVG source cards are used for:
- `/esettanulmanyok/`
- Klima18ker case study
- FuratMester case study
- Bundavarazs case study
- `/blog/`
- all five current Tudastar articles

`BaseLayout.astro` maps the current pathname to its card centrally.

## Netlify Image CDN
The SVG master is transformed at request time through Netlify Image CDN to a 1200x630 JPEG:

`/.netlify/images?url=<encoded-source>&w=1200&h=630&fit=cover&fm=jpg&q=90`

This keeps source assets editable and versionable while giving Facebook, Messenger, LinkedIn, WhatsApp and X a raster image URL.

## Metadata
The base layout includes:
- `og:site_name`
- `og:locale=hu_HU`
- `og:image`, secure URL, type, width, height and alt
- `twitter:card=summary_large_image`
- Twitter image and alt metadata
- article Open Graph type for blog and case-study detail routes

## Validation
The latest Netlify Deploy Preview build passed successfully after the route-specific mapping was enabled.
