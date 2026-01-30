#!/bin/bash

# Comprehensive Crawl Audit Script
# Tests: HTML structure, SEO elements, canonical, robots, sitemap

URL="https://leventestudio.app"
OUTPUT_FILE="crawl-audit-report.txt"
TEMP_HTML="/tmp/crawl-audit-html.txt"
SITEMAP_FILE="/tmp/sitemap.xml"

> "$OUTPUT_FILE"

echo "========================================" | tee -a "$OUTPUT_FILE"
echo "   CRAWL AUDIT REPORT" | tee -a "$OUTPUT_FILE"
echo "   Site: $URL" | tee -a "$OUTPUT_FILE"
echo "   Date: $(date)" | tee -a "$OUTPUT_FILE"
echo "========================================" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

# 1. Fetch homepage HTML as Googlebot
echo "1. FETCHING HOMEPAGE HTML (as Googlebot)" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"
HTTP_STATUS=$(curl -s -o "$TEMP_HTML" -w "%{http_code}" \
    -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
    "$URL")

echo "   HTTP Status: $HTTP_STATUS" | tee -a "$OUTPUT_FILE"
HTML_SIZE=$(wc -c < "$TEMP_HTML")
echo "   HTML Size: $HTML_SIZE bytes" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

if [ "$HTTP_STATUS" != "200" ]; then
    echo "   ❌ ERROR: Homepage not accessible (status: $HTTP_STATUS)" | tee -a "$OUTPUT_FILE"
    exit 1
fi

# 2. Check HTML Structure (H1, H2)
echo "2. HTML STRUCTURE" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"

H1_COUNT=$(grep -o "<h1" "$TEMP_HTML" | wc -l)
H1_TEXT=$(grep -o "<h1[^>]*>[^<]*" "$TEMP_HTML" | sed 's/<h1[^>]*>//' | head -1)
echo "   H1 tags found: $H1_COUNT" | tee -a "$OUTPUT_FILE"
if [ "$H1_COUNT" -eq 1 ]; then
    echo "   ✓ H1 count is correct (1)" | tee -a "$OUTPUT_FILE"
    echo "   H1 text: $H1_TEXT" | tee -a "$OUTPUT_FILE"
elif [ "$H1_COUNT" -eq 0 ]; then
    echo "   ❌ No H1 tag found!" | tee -a "$OUTPUT_FILE"
else
    echo "   ⚠️  Multiple H1 tags found ($H1_COUNT)" | tee -a "$OUTPUT_FILE"
fi

H2_COUNT=$(grep -o "<h2" "$TEMP_HTML" | wc -l)
echo "   H2 tags found: $H2_COUNT" | tee -a "$OUTPUT_FILE"
if [ "$H2_COUNT" -gt 0 ]; then
    echo "   ✓ H2 tags present" | tee -a "$OUTPUT_FILE"
    echo "   First 3 H2 headings:" | tee -a "$OUTPUT_FILE"
    grep -o "<h2[^>]*>[^<]*" "$TEMP_HTML" | sed 's/<h2[^>]*>//' | head -3 | sed 's/^/     - /' | tee -a "$OUTPUT_FILE"
else
    echo "   ⚠️  No H2 tags found" | tee -a "$OUTPUT_FILE"
fi
echo "" | tee -a "$OUTPUT_FILE"

# 3. Check main content in raw HTML
echo "3. MAIN CONTENT IN RAW HTML" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"

# Check for key content indicators
if grep -q "weboldal audit" "$TEMP_HTML"; then
    echo "   ✓ Main keyword 'weboldal audit' found in HTML" | tee -a "$OUTPUT_FILE"
else
    echo "   ❌ Main keyword 'weboldal audit' NOT found in HTML" | tee -a "$OUTPUT_FILE"
fi

# Check for substantial text content (not just scripts/styles)
CONTENT_WORDS=$(sed 's/<script[^>]*>.*<\/script>//g' "$TEMP_HTML" | \
                sed 's/<style[^>]*>.*<\/style>//g' | \
                sed 's/<[^>]*>//g' | \
                tr -s ' \n' ' ' | \
                wc -w)
echo "   Content words in HTML: $CONTENT_WORDS" | tee -a "$OUTPUT_FILE"
if [ "$CONTENT_WORDS" -gt 300 ]; then
    echo "   ✓ Sufficient content in HTML ($CONTENT_WORDS words)" | tee -a "$OUTPUT_FILE"
else
    echo "   ⚠️  Low content in HTML ($CONTENT_WORDS words < 300)" | tee -a "$OUTPUT_FILE"
    echo "   ⚠️  This suggests heavy client-side rendering (CSR)" | tee -a "$OUTPUT_FILE"
fi
echo "" | tee -a "$OUTPUT_FILE"

# 4. SEO Meta Tags
echo "4. SEO META TAGS" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"

# Title
TITLE=$(grep -o "<title>[^<]*" "$TEMP_HTML" | sed 's/<title>//' | head -1)
if [ -n "$TITLE" ]; then
    echo "   ✓ Title: $TITLE" | tee -a "$OUTPUT_FILE"
else
    echo "   ❌ No <title> tag found" | tee -a "$OUTPUT_FILE"
fi

# Meta description
META_DESC=$(grep -o 'meta name="description" content="[^"]*"' "$TEMP_HTML" | sed 's/meta name="description" content="//' | sed 's/"$//')
if [ -n "$META_DESC" ]; then
    echo "   ✓ Meta description: ${META_DESC:0:80}..." | tee -a "$OUTPUT_FILE"
else
    echo "   ❌ No meta description found" | tee -a "$OUTPUT_FILE"
fi
echo "" | tee -a "$OUTPUT_FILE"

# 5. Canonical URL
echo "5. CANONICAL URL" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"

CANONICAL=$(grep -o 'link rel="canonical" href="[^"]*"' "$TEMP_HTML" | sed 's/link rel="canonical" href="//' | sed 's/"$//')
if [ -n "$CANONICAL" ]; then
    echo "   ✓ Canonical found: $CANONICAL" | tee -a "$OUTPUT_FILE"
    if [ "$CANONICAL" = "$URL" ] || [ "$CANONICAL" = "$URL/" ]; then
        echo "   ✓ Canonical matches current URL" | tee -a "$OUTPUT_FILE"
    else
        echo "   ⚠️  Canonical differs from current URL" | tee -a "$OUTPUT_FILE"
    fi
else
    echo "   ❌ No canonical URL found" | tee -a "$OUTPUT_FILE"
fi
echo "" | tee -a "$OUTPUT_FILE"

# 6. Robots Meta
echo "6. ROBOTS META TAG" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"

ROBOTS_META=$(grep -o 'meta name="robots" content="[^"]*"' "$TEMP_HTML" | sed 's/meta name="robots" content="//' | sed 's/"$//')
if [ -n "$ROBOTS_META" ]; then
    echo "   ⚠️  Robots meta found: $ROBOTS_META" | tee -a "$OUTPUT_FILE"
    if echo "$ROBOTS_META" | grep -q "noindex"; then
        echo "   ❌ WARNING: Page is set to NOINDEX!" | tee -a "$OUTPUT_FILE"
    fi
else
    echo "   ✓ No robots meta (defaults to index,follow)" | tee -a "$OUTPUT_FILE"
fi
echo "" | tee -a "$OUTPUT_FILE"

# 7. Check robots.txt
echo "7. ROBOTS.TXT" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"

ROBOTS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/robots.txt")
if [ "$ROBOTS_STATUS" = "200" ]; then
    echo "   ✓ robots.txt accessible (status: $ROBOTS_STATUS)" | tee -a "$OUTPUT_FILE"
    curl -s "$URL/robots.txt" | head -10 | sed 's/^/     /' | tee -a "$OUTPUT_FILE"
else
    echo "   ❌ robots.txt not accessible (status: $ROBOTS_STATUS)" | tee -a "$OUTPUT_FILE"
fi
echo "" | tee -a "$OUTPUT_FILE"

# 8. Check sitemap.xml
echo "8. SITEMAP.XML" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"

SITEMAP_STATUS=$(curl -s -o "$SITEMAP_FILE" -w "%{http_code}" "$URL/sitemap.xml")
if [ "$SITEMAP_STATUS" = "200" ]; then
    echo "   ✓ sitemap.xml accessible (status: $SITEMAP_STATUS)" | tee -a "$OUTPUT_FILE"

    # Count URLs in sitemap
    URL_COUNT=$(grep -c "<loc>" "$SITEMAP_FILE")
    echo "   URLs in sitemap: $URL_COUNT" | tee -a "$OUTPUT_FILE"

    # Extract and test each URL
    echo "" | tee -a "$OUTPUT_FILE"
    echo "   Testing sitemap URLs:" | tee -a "$OUTPUT_FILE"
    grep -o "<loc>[^<]*" "$SITEMAP_FILE" | sed 's/<loc>//' | while read -r SITEMAP_URL; do
        STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
            -A "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
            "$SITEMAP_URL")
        if [ "$STATUS" = "200" ]; then
            echo "     ✓ $SITEMAP_URL ($STATUS)" | tee -a "$OUTPUT_FILE"
        else
            echo "     ❌ $SITEMAP_URL ($STATUS)" | tee -a "$OUTPUT_FILE"
        fi
        sleep 0.3
    done
else
    echo "   ❌ sitemap.xml not accessible (status: $SITEMAP_STATUS)" | tee -a "$OUTPUT_FILE"
fi
echo "" | tee -a "$OUTPUT_FILE"

# 9. Check for CSR indicators
echo "9. CLIENT-SIDE RENDERING INDICATORS" | tee -a "$OUTPUT_FILE"
echo "----------------------------------------" | tee -a "$OUTPUT_FILE"

if grep -q "client:load" "$TEMP_HTML"; then
    echo "   ⚠️  'client:load' directive found (Astro hydration)" | tee -a "$OUTPUT_FILE"
fi

if grep -q "type=\"module\"" "$TEMP_HTML"; then
    MODULE_COUNT=$(grep -c "type=\"module\"" "$TEMP_HTML")
    echo "   ⚠️  ES modules found: $MODULE_COUNT" | tee -a "$OUTPUT_FILE"
fi

SCRIPT_COUNT=$(grep -c "<script" "$TEMP_HTML")
echo "   Total <script> tags: $SCRIPT_COUNT" | tee -a "$OUTPUT_FILE"

if [ "$SCRIPT_COUNT" -gt 10 ]; then
    echo "   ⚠️  High number of scripts may impact rendering" | tee -a "$OUTPUT_FILE"
fi
echo "" | tee -a "$OUTPUT_FILE"

# 10. Summary & Recommendations
echo "========================================" | tee -a "$OUTPUT_FILE"
echo "   SUMMARY" | tee -a "$OUTPUT_FILE"
echo "========================================" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

if [ "$HTTP_STATUS" = "200" ] && [ "$H1_COUNT" -eq 1 ] && [ -n "$CANONICAL" ] && [ "$SITEMAP_STATUS" = "200" ]; then
    echo "✓ Basic SEO elements in place" | tee -a "$OUTPUT_FILE"
else
    echo "❌ Some SEO issues detected - see details above" | tee -a "$OUTPUT_FILE"
fi

if [ "$CONTENT_WORDS" -lt 300 ]; then
    echo "" | tee -a "$OUTPUT_FILE"
    echo "⚠️  CRITICAL: Low content in raw HTML suggests heavy CSR" | tee -a "$OUTPUT_FILE"
    echo "   This may cause Googlebot to not see full content!" | tee -a "$OUTPUT_FILE"
fi

echo "" | tee -a "$OUTPUT_FILE"
echo "Report saved to: $OUTPUT_FILE" | tee -a "$OUTPUT_FILE"

# Cleanup
rm -f "$TEMP_HTML" "$SITEMAP_FILE"
