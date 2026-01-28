# 🎯 ANALYTICS & TRACKING INFRASTRUCTURE DOCUMENTATION

**Domain:** leventestudio.app
**GA4 Measurement ID:** G-GVNFW555S3
**GTM Container:** GTM-XXXXXXX (REPLACE WITH YOUR ACTUAL GTM ID)
**Implementation Date:** 2026-01-28
**Status:** Production Ready (pending GTM container setup)

---

## 📊 EXECUTIVE SUMMARY

This document outlines the complete tracking infrastructure for leventestudio.app, a lead generation website for web audit services. The system is built for:

- **GDPR/EU Compliance** via Consent Mode v2
- **Scalable measurement** from organic SEO to paid campaigns
- **Actionable insights** to drive optimization decisions
- **No technical debt** - clean, maintainable architecture

---

## 🏗️ ARCHITECTURE OVERVIEW

### Technology Stack

1. **Google Tag Manager (GTM)** - Central tag management
2. **Google Analytics 4 (GA4)** - Primary analytics platform (G-GVNFW555S3)
3. **Google Consent Mode v2** - GDPR-compliant consent framework
4. **Plausible Analytics** - Privacy-first backup analytics (cookie-free)
5. **Custom dataLayer Events** - Standardized event tracking

### Why This Stack?

- **GTM:** Eliminates hardcoded scripts, enables rapid iteration without code deploys
- **GA4:** Industry standard, integrates with Google Ads, robust funnel analysis
- **Consent Mode v2:** EU-required, enables conversion modeling when consent denied
- **Plausible:** Privacy backup, always runs regardless of consent, no cookie banner needed

---

## 🔐 GDPR COMPLIANCE & CONSENT MODE V2

### Implementation Status: ✅ COMPLETE

#### Cookie Banner (`src/components/CookieBanner.tsx`)

**Design Principles:**
- Minimalist, non-intrusive UI
- No dark patterns
- Clear category descriptions
- Easy to dismiss

**Categories:**
1. **Szükséges (Necessary)** - Always on, cannot be disabled
2. **Analitika (Analytics)** - GA4 tracking, default: DENIED
3. **Marketing** - Remarketing/Ads tracking, default: DENIED

**Consent States:**
- Default: `analytics_storage: denied`, `ad_storage: denied`
- On Accept All: `analytics_storage: granted`, `ad_storage: granted`
- On Necessary Only: Everything denied except necessary cookies

#### Consent Mode Integration

Location: `index.html` + `src/utils/consent.ts`

```javascript
// Default consent (loaded BEFORE GTM)
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'wait_for_update': 500
});
```

When user accepts, consent is updated via:
```typescript
updateGoogleConsent(state: ConsentState)
```

**Storage:** `localStorage` with key `ls_consent_v1` (includes timestamp)

---

## 📈 TRACKED EVENTS

### Event Taxonomy

All events follow this structure:
```
{
  event: 'event_name',
  event_category: 'conversion' | 'engagement',
  event_label: 'source_context',
  value: number (optional)
}
```

---

### 🎯 CONVERSION EVENTS (Primary KPIs)

| Event Name | Description | Trigger Location | Label | Priority |
|------------|-------------|------------------|-------|----------|
| `click_phone` | Phone link clicked | Header, AuditCTA, Contact | `header`, `cta_main`, `contact` | 🔴 HIGH |
| `click_whatsapp` | WhatsApp link clicked | AuditCTA, Contact | `cta_main`, `contact` | 🔴 HIGH |
| `click_email` | Email link clicked | AuditCTA, Contact | `cta_main`, `contact` | 🟡 MEDIUM |
| `click_calendar` | Cal.com booking clicked | AuditCTA, Contact | `cta_main`, `contact` | 🟡 MEDIUM |

**Implementation:** `trackConversion(name, value, label)`
**Files:** All CTA components import from `src/utils/gtm.ts`

---

### 📊 ENGAGEMENT EVENTS

| Event Name | Description | Trigger | Priority |
|------------|-------------|---------|----------|
| `page_view` | Initial page load | App mount | 🔴 HIGH |
| `scroll_50` | User scrolled 50% | Scroll tracking hook | 🟢 LOW |
| `scroll_90` | User scrolled 90% | Scroll tracking hook | 🟢 LOW |
| `time_on_page_60s` | User stayed 60s | Time tracking hook | 🟡 MEDIUM |
| `time_on_page_120s` | User stayed 120s | Time tracking hook | 🟡 MEDIUM |
| `cta_click` | Hero CTA clicked | Hero section | 🟡 MEDIUM |
| `faq_expand_interaction` | FAQ item expanded | FAQ accordion | 🟢 LOW |
| `case_study_view_interaction` | Case study viewed | Intersection observer | 🟢 LOW |

**Implementation:**
- Scroll: `useScrollTracking()` hook
- Time: `useTimeTracking()` hook
- Interactions: `trackInteraction(type, target, value)`

---

## 🚀 GTM SETUP INSTRUCTIONS

### Step 1: Create GTM Container

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Create new container for `leventestudio.app`
3. Type: **Web**
4. Copy your GTM ID (format: `GTM-XXXXXXX`)

### Step 2: Replace Placeholder in Code

**File:** `/index.html`
**Line 47:** Replace `GTM-XXXXXXX` with your actual GTM ID

```html
<!-- BEFORE -->
'https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX'

<!-- AFTER -->
'https://www.googletagmanager.com/gtm.js?id=GTM-ABC1234'
```

### Step 3: Configure GA4 in GTM

#### Tag 1: GA4 Configuration

**Type:** Google Analytics: GA4 Configuration
**Measurement ID:** G-GVNFW555S3
**Trigger:** All Pages

**Settings:**
- Enable "Send a page view event when this configuration loads"
- Fields to Set:
  - `cookie_flags: 'max-age=7200;secure;samesite=none'`

#### Tag 2: GA4 Event Tag

**Type:** Google Analytics: GA4 Event
**Configuration Tag:** Select GA4 Configuration tag
**Event Name:** `{{Event}}`
**Trigger:** Custom Event - All Events

**Event Parameters:**
- `event_category: {{DLV - event_category}}`
- `event_label: {{DLV - event_label}}`
- `value: {{DLV - value}}`

### Step 4: Create Data Layer Variables

In GTM Variables section, create:

| Variable Name | Type | Data Layer Variable Name |
|--------------|------|-------------------------|
| `DLV - event_category` | Data Layer Variable | `event_category` |
| `DLV - event_label` | Data Layer Variable | `event_label` |
| `DLV - value` | Data Layer Variable | `value` |
| `DLV - page_path` | Data Layer Variable | `page_path` |
| `DLV - scroll_depth` | Data Layer Variable | `scroll_depth` |
| `DLV - time_seconds` | Data Layer Variable | `time_seconds` |

### Step 5: Create Triggers

| Trigger Name | Type | Event Name |
|--------------|------|-----------|
| All Pages | Page View | All Pages |
| All Custom Events | Custom Event | `.*` (regex) |
| Conversion Events | Custom Event | Matches regex: `^click_(phone\|whatsapp\|email\|calendar)$` |

### Step 6: Verify Installation

1. Enable Preview Mode in GTM
2. Visit your site
3. Check dataLayer pushes in GTM Debug panel
4. Verify events fire in GA4 DebugView

---

## 📊 GA4 CONFIGURATION

### Mark as Conversions

Navigate to: **Admin → Events → Mark as Conversion**

Mark these events:
- ✅ `click_phone`
- ✅ `click_whatsapp`
- ✅ `click_email`
- ✅ `click_calendar`

### Custom Dimensions (Optional but Recommended)

| Dimension Name | Scope | Event Parameter |
|---------------|-------|----------------|
| Conversion Source | Event | `event_label` |
| Scroll Depth | Event | `scroll_depth` |
| Time on Page | Event | `time_seconds` |

---

## 🎯 SUCCESS METRICS & KPIs

### Primary Conversion Metrics

**What to measure:**
1. **Conversion Rate** = (Total Conversions / Sessions) × 100
2. **Cost per Conversion** (when running ads)
3. **Conversion by Source** (Organic Search, Direct, Social, Ads)
4. **Time to Conversion** (avg session duration before converting)

**Targets (baseline, adjust quarterly):**
- Conversion Rate: **2-5%** (industry benchmark for B2B services)
- Phone Clicks: **PRIMARY** conversion (immediate intent)
- WhatsApp Clicks: **SECONDARY** (lower friction)
- Calendar Bookings: **TERTIARY** (lower commitment)

### Engagement Metrics

**Leading Indicators:**
- **Scroll Depth 90%:** Indicates content quality
- **Time on Page >60s:** Engaged, reading content
- **FAQ Expansion Rate:** Addressing objections
- **Case Study Views:** Proof consumption

**Thresholds:**
- If >50% scroll to 90%: Content is engaging ✅
- If <30% scroll to 90%: Content may be too long ⚠️
- If avg time <30s: Bounce problem 🔴

---

## 🔍 MARKETING ANALYSIS & RECOMMENDATIONS

### Current Funnel Structure

```
Landing (Hero) → Problem Awareness → Solution (Deliverables) →
CTA (Primary) → Social Proof → Process → Case Study →
FAQ → CTA (Secondary) → Contact
```

### Friction Points to Monitor

1. **Hero → First CTA:**
   - Watch bounce rate
   - If high: Headline/value prop unclear

2. **Primary CTA (audit-cta section):**
   - This is THE conversion point
   - Monitor ALL 4 CTAs (phone/whatsapp/email/calendar)
   - Identify winner

3. **FAQ Section:**
   - If low expansion rate: Questions don't address real objections
   - Track which questions get most clicks

### Optimization Roadmap

#### Phase 1: Validate Conversion Points (0-3 months)

**Goal:** Identify highest-converting CTA

**Actions:**
1. Run site with current setup
2. Collect 1000+ sessions
3. Analyze conversion by:
   - CTA type (phone vs whatsapp vs email vs calendar)
   - CTA location (header vs main CTA vs contact)
4. **Decision point:** Which CTA gets 60%+ of conversions?

**Hypothesis:**
- Phone will be #1 (immediate, personal)
- WhatsApp will be #2 (async, lower friction)
- Email/Calendar will be lowest (requires more commitment)

#### Phase 2: Streamline Funnel (3-6 months)

**If Phone is winner:**
- Promote phone CTA to hero
- Make it sticky/floating on mobile
- Add "Call Now" urgency copy

**If WhatsApp is winner:**
- Consider WhatsApp widget (bottom right)
- Pre-fill message for faster conversion
- A/B test WhatsApp vs Phone in header

**If Calendar is winner (unlikely but possible):**
- Embed calendar directly on page
- Reduce friction (fewer form fields)
- Add social proof near calendar

#### Phase 3: Paid Acquisition (6+ months)

**ONLY start ads when:**
1. Organic conversion rate >2%
2. Clear winner CTA identified
3. FAQ objections documented
4. Cost of audit < Customer LTV established

**Recommended channels:**
1. **Google Search Ads**
   - Target: "weboldal audit budapest", "seo audit magyarország"
   - Send to: Dedicated landing page (NOT homepage)
   - Budget: Start €10-20/day

2. **LinkedIn Ads**
   - Target: Kisvállalkozás tulajdonosok, Marketing vezetők
   - Format: Sponsored content + InMail
   - Budget: €15-25/day

**DO NOT RUN ADS IF:**
- Website conversion rate <1.5%
- Cost per conversion >50,000 Ft
- No clear conversion tracking

---

## 🚨 RED FLAGS & WHEN TO ITERATE

### Scenario 1: High Traffic, Low Conversions

**Symptoms:**
- 1000+ sessions/month
- <1% conversion rate
- High scroll depth but no clicks

**Diagnosis:** CTA clarity or trust issue

**Fix:**
1. Make phone number BIGGER and more prominent
2. Add urgency ("Ingyenes konzultáció ma")
3. Add trust signals (reviews, logos, certifications)

### Scenario 2: No Scroll Past Hero

**Symptoms:**
- <30% scroll to 50%
- Avg time <15s
- High bounce rate

**Diagnosis:** Headline/value prop mismatch or traffic quality issue

**Fix:**
1. Review traffic source (if paid, check keyword relevance)
2. A/B test hero headline
3. Simplify hero copy (remove jargon)

### Scenario 3: FAQ Ignored

**Symptoms:**
- <10% FAQ expansion rate
- Users reach FAQ but don't engage

**Diagnosis:** Questions don't match real objections

**Fix:**
1. Analyze user recordings (Hotjar/Clarity)
2. Ask phone leads "what almost stopped you?"
3. Replace FAQ with REAL objections

---

## 🔄 ONGOING OPTIMIZATION CHECKLIST

### Weekly
- [ ] Check GA4 Realtime for broken tracking
- [ ] Review conversion sources (Organic, Direct, etc)
- [ ] Note any anomalies (sudden drop/spike)

### Monthly
- [ ] Review conversion rate trends
- [ ] Analyze CTA performance (which one converts best?)
- [ ] Document user behavior patterns
- [ ] Update FAQ based on phone call objections

### Quarterly
- [ ] A/B test primary CTA
- [ ] Review scroll depth and content engagement
- [ ] Evaluate case study effectiveness
- [ ] Decide: Ready for paid ads?

---

## 📞 TECHNICAL CONTACT & SUPPORT

### Tracking Issues

**Symptoms:**
- Events not firing in GA4
- GTM Preview mode errors
- Consent banner not showing

**Debug Steps:**
1. Open browser console (F12)
2. Check for errors
3. Type: `dataLayer` in console to inspect events
4. Verify GTM container ID in network tab

**Files to Check:**
- `/index.html` (GTM container ID)
- `src/utils/gtm.ts` (event tracking functions)
- `src/utils/consent.ts` (consent logic)
- `src/components/CookieBanner.tsx` (banner UI)

### Common Issues

**Issue:** GA4 not receiving events
**Fix:** Verify GTM container published (not just saved)

**Issue:** Consent banner shows every time
**Fix:** Check localStorage is enabled, verify `ls_consent_v1` key exists

**Issue:** Duplicate events firing
**Fix:** Check for hardcoded gtag.js scripts (should only use GTM)

---

## 📚 APPENDIX: EVENT REFERENCE

### All Event Names (Complete List)

```javascript
// Conversions
'click_phone'
'click_whatsapp'
'click_email'
'click_calendar'

// Engagement
'page_view'
'cta_click'
'scroll_50'
'scroll_90'
'time_on_page_60s'
'time_on_page_120s'

// Interactions
'faq_expand_interaction'
'case_study_view_interaction'
```

### Event Label Values

```javascript
// Conversion labels
'header'         // Header phone CTA
'cta_main'       // Main audit CTA section
'contact'        // Contact section
'hero_audit'     // Hero audit CTA
'hero_learn'     // Hero learn more CTA

// Interaction labels
'faq_0' ... 'faq_5'     // FAQ items by index
'bundavarazs'           // Case study identifier
```

---

## ✅ IMPLEMENTATION CHECKLIST

- [x] Consent Mode v2 configured
- [x] Cookie banner implemented
- [x] GTM script installed (placeholder)
- [x] dataLayer events configured
- [x] Conversion tracking active
- [x] Scroll tracking active
- [x] Time tracking active
- [x] FAQ interaction tracking active
- [x] Case study view tracking active
- [ ] GTM Container ID replaced (MANUAL STEP)
- [ ] GA4 tag configured in GTM (MANUAL STEP)
- [ ] Conversions marked in GA4 (MANUAL STEP)
- [ ] Testing in Preview Mode (MANUAL STEP)

---

**END OF DOCUMENTATION**

Generated: 2026-01-28
Version: 1.0
Maintainer: Levente Stúdió Development Team
