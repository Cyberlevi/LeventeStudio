# 🚀 GTM SETUP - KÖVETKEZŐ LÉPÉSEK

**GTM Container ID:** `GTM-WZHLTWBD` ✅ TELEPÍTVE
**GA4 Measurement ID:** `G-GVNFW555S3`
**Status:** Kód kész, GTM konfiguráció szükséges

---

## ✅ AMIT MÁR MEGCSINÁLTAM

- [x] GTM container script telepítve (`index.html`)
- [x] GTM ID beállítva: `GTM-WZHLTWBD`
- [x] Consent Mode v2 konfiguráció
- [x] dataLayer események implementálva
- [x] Cookie banner működik
- [x] Build sikeres

---

## 📋 KÖVETKEZŐ LÉPÉSEK (GTM KONFIGURÁLÁS)

### 1. GA4 Configuration Tag (5 perc)

**Útvonal:** GTM → Tags → New

**Beállítások:**
- **Tag Type:** Google Analytics: GA4 Configuration
- **Measurement ID:** `G-GVNFW555S3`
- **Triggering:** All Pages

**Fields to Set (opcionális, de ajánlott):**
```
cookie_flags: max-age=7200;secure;samesite=none
```

**Send a page view event:** ✅ BE

---

### 2. GA4 Event Tag (5 perc)

**Tag Type:** Google Analytics: GA4 Event

**Beállítások:**
- **Configuration Tag:** (válaszd az előző GA4 Configuration taget)
- **Event Name:** `{{Event}}`
- **Triggering:** Custom Event (lásd alább)

**Event Parameters:**
- `event_category`: `{{DLV - event_category}}`
- `event_label`: `{{DLV - event_label}}`
- `value`: `{{DLV - value}}`

---

### 3. Data Layer Variables (10 perc)

**Útvonal:** GTM → Variables → User-Defined Variables → New

Hozd létre ezeket:

| Variable Name | Type | Data Layer Variable Name |
|---------------|------|--------------------------|
| `DLV - event_category` | Data Layer Variable | `event_category` |
| `DLV - event_label` | Data Layer Variable | `event_label` |
| `DLV - value` | Data Layer Variable | `value` |
| `DLV - page_path` | Data Layer Variable | `page_path` |
| `DLV - scroll_depth` | Data Layer Variable | `scroll_depth` |
| `DLV - time_seconds` | Data Layer Variable | `time_seconds` |

**Minden változónál:**
- **Data Layer Version:** Version 2
- **Data Layer Variable Name:** (lásd táblázat)

---

### 4. Trigger Létrehozása (5 perc)

**Trigger 1: All Custom Events**
- **Type:** Custom Event
- **Event name:** `.*` (regex)
- **Use regex matching:** ✅ BE

Ez fog megfogni MINDEN dataLayer eseményt.

**Trigger 2: Conversion Events (opcionális, pontosabb kontroll)**
- **Type:** Custom Event
- **Event name:** `^(click_phone|click_whatsapp|click_email|click_calendar)$`
- **Use regex matching:** ✅ BE

---

### 5. GTM Tesztelés (10 perc)

1. **Preview Mode:** GTM jobb felső sarok → Preview
2. **URL beírása:** `https://leventestudio.app` (vagy local: `http://localhost:5173`)
3. **Események tesztelése:**
   - Oldal betöltés → `page_view`
   - Header telefon gomb → `click_phone` (label: `header`)
   - Scroll 50% → `scroll_50`
   - 60mp várakozás → `time_on_page_60s`
   - Hero CTA kattintás → `cta_click`
   - FAQ kinyitás → `faq_expand_interaction`

4. **GTM Debug Console:** Ellenőrizd, hogy minden event pusholja a dataLayer-be
5. **GA4 DebugView:** Admin → DebugView → lásd valós időben az eseményeket

---

### 6. Konverziók Jelölése GA4-ben (3 perc)

**Útvonal:** GA4 → Admin → Events

**Jelöld konverziónak:**
- ✅ `click_phone`
- ✅ `click_whatsapp`
- ✅ `click_email`
- ✅ `click_calendar`

**FONTOS:** Előbb várj 24 órát, amíg az események megjelennek GA4-ben, UTÁNA jelöld konverziónak.

---

### 7. GTM Publish (2 perc)

Ha minden működik Preview Mode-ban:

1. **Submit** gomb (GTM jobb felső sarok)
2. **Version Name:** "Initial GA4 Setup with Consent Mode v2"
3. **Version Description:**
   ```
   - GA4 Configuration tag
   - GA4 Event tag with dataLayer variables
   - Consent Mode v2 integration
   - All conversion events tracked
   ```
4. **Publish**

---

## 🎯 ESEMÉNY REFERENCIA

### Konverziós események (PRIMARY KPI-k)

```javascript
// Header telefon
{ event: 'click_phone', event_category: 'conversion', event_label: 'header' }

// Audit CTA szekció telefon
{ event: 'click_phone', event_category: 'conversion', event_label: 'cta_main' }

// Contact szekció telefon
{ event: 'click_phone', event_category: 'conversion', event_label: 'contact' }

// WhatsApp
{ event: 'click_whatsapp', event_category: 'conversion', event_label: 'cta_main' }
{ event: 'click_whatsapp', event_category: 'conversion', event_label: 'contact' }

// Email
{ event: 'click_email', event_category: 'conversion', event_label: 'cta_main' }
{ event: 'click_email', event_category: 'conversion', event_label: 'contact' }

// Időpont foglalás
{ event: 'click_calendar', event_category: 'conversion', event_label: 'cta_main' }
{ event: 'click_calendar', event_category: 'conversion', event_label: 'contact' }
```

### Engagement események

```javascript
{ event: 'page_view', page_path: '/', page_title: 'Weboldal Audit...' }
{ event: 'scroll_50', scroll_depth: 50 }
{ event: 'scroll_90', scroll_depth: 90 }
{ event: 'time_on_page_60s', time_seconds: 60 }
{ event: 'time_on_page_120s', time_seconds: 120 }
{ event: 'cta_click', event_category: 'engagement', event_label: 'hero_audit' }
{ event: 'faq_expand_interaction', interaction_type: 'faq_expand', interaction_target: 'faq_0' }
{ event: 'case_study_view_interaction', interaction_type: 'case_study_view', interaction_target: 'bundavarazs' }
```

---

## 🧪 DEBUGGING TIPPEK

### Ha nem látod az eseményeket GA4-ben

1. **GTM Debug Console:** `dataLayer` változó ellenőrzése
   - Browser console → írj be: `dataLayer`
   - Látnod kell egy array-t az összes eseménnyel

2. **GTM Preview Mode:** Nézd meg, hogy a tagek "fire"-olnak-e
   - Ha nem: Ellenőrizd a triggereket
   - Ha igen, de GA4-ben nem látod: Ellenőrizd a Measurement ID-t

3. **Consent ellenőrzés:**
   - Cookie banner: Accept All
   - Browser console: `dataLayer` → keress "consent" "granted" értékekre

4. **GA4 DebugView:** Ha nem látod az eseményeket
   - Várj 5-10 percet (latency lehet)
   - Ellenőrizd, hogy Debug mode be van-e kapcsolva (Preview Mode-ban automatikus)

---

## 📊 MIT NÉZZÉL MEG 1 HÉT UTÁN

### GA4 Reports → Engagement → Events

**Top eventi:**
1. `page_view` (mindenki)
2. `scroll_50` (engaged users)
3. `scroll_90` (very engaged)
4. `click_phone` (konverzió)

**Ha nem látod a konverziós eseményeket:**
- Ellenőrizd: Cookie banner-t elfogadták-e?
- Console errors vannak?

### GA4 Reports → Acquisition → Traffic Acquisition

**Forgalom forrás:**
- Organic Search (SEO)
- Direct (direkt URL)
- Referral (linkek)

### GA4 Reports → Engagement → Conversions

**Konverziók száma CTA szerint:**
- Melyik label a legtöbb? (`header`, `cta_main`, `contact`)
- Melyik event típus? (phone, whatsapp, email, calendar)

**Ez alapján döntsd el:** Melyik CTA a nyerő?

---

## 🎯 DECISION POINTS (3 HÓNAP UTÁN)

### Ha Telefon > 60% konverzió

**Akció:**
- Sticky floating telefon gomb mobilon
- Header telefon NAGYOBB
- Hero-ban kiemelt telefon CTA

### Ha WhatsApp > 60% konverzió

**Akció:**
- WhatsApp floating widget (bottom right)
- Pre-filled message optimalizálás
- A/B test: WhatsApp vs Telefon headerben

### Ha Email / Calendar nyer (unlikely)

**Akció:**
- Email: egyszerűsített form
- Calendar: embedded calendar directly on page

---

## ✅ CHECKLIST

- [ ] GTM Container ID cserélve (`GTM-WZHLTWBD`) → ✅ KÉSZ
- [ ] GA4 Configuration tag létrehozva
- [ ] GA4 Event tag létrehozva
- [ ] Data Layer Variables létrehozva (6 db)
- [ ] Trigger létrehozva (Custom Event)
- [ ] Preview Mode tesztelés
- [ ] GA4 DebugView ellenőrzés
- [ ] GTM Published
- [ ] Cookie banner tesztelve (Accept All)
- [ ] Konverziók jelölve GA4-ben (24h után)

---

**KÖVETKEZŐ LÉPÉS:** GTM bejelentkezés és tag setup (25 perc összesen)

**Dokumentáció:** `ANALYTICS_DOCUMENTATION.md` (teljes referencia)
