# Levente Studio conversion measurement

## Core funnel events

| Event | Meaning | Recommended GA4 role |
|---|---|---|
| `demand_landing_view` | Visitor viewed one of the commercial demand-capture routes | supporting event |
| `cta_click` | Tracked CTA click | supporting event |
| `diagnostic_start` | First interaction with the diagnostic form | funnel event |
| `diagnostic_context_expand` | Visitor opened optional context fields | diagnostic UX event |
| `diagnostic_submit` | Valid form submission attempt | funnel event, not final conversion |
| `generate_lead` | Thank-you page reached after a confirmed diagnostic submission | **Key event / primary lead conversion** |
| `phone_click` | Phone CTA click | secondary conversion |
| `whatsapp_click` | WhatsApp CTA click | secondary conversion |
| `whatsapp_after_lead` | WhatsApp click after confirmed form lead | post-lead action |

## Attribution parameters

Commercial funnel events include route context where applicable:

- `source_page`: page where the action happened
- `entry_page`: first page in the current session
- `diagnostic_source`: page where the diagnostic form was submitted
- `primary_goal`: selected business goal on submit
- `bottleneck`: selected bottleneck on submit
- existing UTM fields and `gclid` remain stored with the Netlify form submission

## GA4 setup

Mark `generate_lead` as the primary Key event. Keep `diagnostic_submit` as a funnel diagnostic rather than the main conversion so a submit attempt is not counted twice with the thank-you confirmation. Use `source_page`, `entry_page` and `diagnostic_source` as event-scoped custom dimensions if route-level reporting is needed.
