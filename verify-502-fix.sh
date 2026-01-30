#!/bin/bash

# LeventeStudio 502 Fix Verification Script
# Run this after deploy to verify Googlebot 502 errors are resolved

set -e

SITE="https://leventestudio.app"
GOOGLEBOT_UA="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

echo "========================================"
echo "LeventeStudio 502 Fix Verification"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Quick Smoke Test
echo "📋 Test 1: Quick Smoke Test (3 critical URLs)"
echo "----------------------------------------"

echo -n "Testing homepage... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -A "$GOOGLEBOT_UA" "$SITE/")
if [ "$STATUS" = "200" ]; then
  echo -e "${GREEN}✅ 200${NC}"
else
  echo -e "${RED}❌ $STATUS${NC}"
fi

echo -n "Testing /kapcsolat/ (problem endpoint)... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -A "$GOOGLEBOT_UA" "$SITE/kapcsolat/")
if [ "$STATUS" = "200" ]; then
  echo -e "${GREEN}✅ 200${NC}"
else
  echo -e "${RED}❌ $STATUS${NC}"
fi

echo -n "Testing /kapcsolat (redirect check)... "
RESPONSE=$(curl -s -I -A "$GOOGLEBOT_UA" "$SITE/kapcsolat")
STATUS=$(echo "$RESPONSE" | grep "HTTP" | head -1 | awk '{print $2}')
LOCATION=$(echo "$RESPONSE" | grep -i "^location:" | awk '{print $2}' | tr -d '\r')
if [ "$STATUS" = "301" ] && [ "$LOCATION" = "/kapcsolat/" ]; then
  echo -e "${GREEN}✅ 301 → /kapcsolat/${NC}"
else
  echo -e "${RED}❌ $STATUS → $LOCATION${NC}"
fi

echo ""

# Test 2: Full Sitemap URL Test
echo "📋 Test 2: Full Sitemap URL Test (10 URLs)"
echo "----------------------------------------"

URLS=(
  "/"
  "/rolam/"
  "/esettanulmanyok/"
  "/kapcsolat/"
  "/szolgaltatas/weboldal-audit/"
  "/szolgaltatas/seo-audit/"
  "/szolgaltatas/weboldal-gyorsitas/"
  "/privacy-policy/"
  "/cookie-policy/"
  "/legal/"
)

PASSED=0
FAILED=0

for url in "${URLS[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -A "$GOOGLEBOT_UA" "$SITE$url")
  
  if [ "$STATUS" = "200" ]; then
    echo -e "${GREEN}✅${NC} $url - $STATUS"
    ((PASSED++))
  else
    echo -e "${RED}❌${NC} $url - $STATUS"
    ((FAILED++))
  fi
  
  sleep 0.3
done

echo ""
echo "Result: $PASSED passed, $FAILED failed"

if [ "$FAILED" -eq 0 ]; then
  echo -e "${GREEN}✅ All URLs return 200 OK${NC}"
else
  echo -e "${RED}❌ Some URLs failed${NC}"
fi

echo ""

# Test 3: Trailing Slash Redirects
echo "📋 Test 3: Trailing Slash Redirect Test (9 URLs)"
echo "----------------------------------------"

SLASH_TESTS=(
  "/rolam"
  "/esettanulmanyok"
  "/kapcsolat"
  "/szolgaltatas/weboldal-audit"
  "/szolgaltatas/seo-audit"
  "/szolgaltatas/weboldal-gyorsitas"
  "/privacy-policy"
  "/cookie-policy"
  "/legal"
)

REDIRECT_PASSED=0
REDIRECT_FAILED=0

for url in "${SLASH_TESTS[@]}"; do
  RESPONSE=$(curl -s -I -A "$GOOGLEBOT_UA" "$SITE$url")
  STATUS=$(echo "$RESPONSE" | grep "HTTP" | head -1 | awk '{print $2}')
  LOCATION=$(echo "$RESPONSE" | grep -i "^location:" | awk '{print $2}' | tr -d '\r')
  
  if [ "$STATUS" = "301" ] && [ "$LOCATION" = "$url/" ]; then
    echo -e "${GREEN}✅${NC} $url → $LOCATION"
    ((REDIRECT_PASSED++))
  else
    echo -e "${RED}❌${NC} $url - Status: $STATUS, Location: $LOCATION"
    ((REDIRECT_FAILED++))
  fi
  
  sleep 0.3
done

echo ""
echo "Result: $REDIRECT_PASSED passed, $REDIRECT_FAILED failed"

if [ "$REDIRECT_FAILED" -eq 0 ]; then
  echo -e "${GREEN}✅ All redirects work correctly${NC}"
else
  echo -e "${RED}❌ Some redirects failed${NC}"
fi

echo ""

# Test 4: Cache Behavior
echo "📋 Test 4: Cache Behavior Test"
echo "----------------------------------------"

for i in {1..3}; do
  echo -n "Request $i: "
  CACHE=$(curl -s -I "$SITE/kapcsolat/" | grep -i "cache-status" | head -1)
  echo "$CACHE"
  sleep 1
done

echo ""

# Test 5: 502 Stress Test
echo "📋 Test 5: 502 Stress Test (50 requests to /kapcsolat/)"
echo "----------------------------------------"
echo "This will take about 5 seconds..."

ERROR_COUNT=0
ERRORS=""

for i in {1..50}; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -A "$GOOGLEBOT_UA" "$SITE/kapcsolat/")
  
  if [ "$STATUS" != "200" ]; then
    ERRORS="$ERRORS\nRequest $i: $STATUS"
    ((ERROR_COUNT++))
  fi
  
  # Show progress
  if [ $((i % 10)) -eq 0 ]; then
    echo -n "."
  fi
  
  sleep 0.1
done

echo ""
echo ""
echo "Results: $ERROR_COUNT errors out of 50 requests"

if [ "$ERROR_COUNT" -eq 0 ]; then
  echo -e "${GREEN}✅ SUCCESS - 0% error rate${NC}"
else
  ERROR_RATE=$((ERROR_COUNT * 100 / 50))
  echo -e "${RED}❌ FAIL - ${ERROR_RATE}% error rate${NC}"
  echo -e "$ERRORS"
fi

echo ""
echo "========================================"
echo "Verification Complete"
echo "========================================"

# Summary
echo ""
echo "Summary:"
echo "  Test 1 (Smoke test): Check output above"
echo "  Test 2 (Sitemap URLs): $PASSED/$((PASSED+FAILED)) passed"
echo "  Test 3 (Redirects): $REDIRECT_PASSED/$((REDIRECT_PASSED+REDIRECT_FAILED)) passed"
echo "  Test 4 (Cache): Check output above"
echo "  Test 5 (Stress test): $ERROR_COUNT/50 errors"

echo ""

if [ "$FAILED" -eq 0 ] && [ "$REDIRECT_FAILED" -eq 0 ] && [ "$ERROR_COUNT" -eq 0 ]; then
  echo -e "${GREEN}✅ ALL TESTS PASSED - Googlebot 502 fix is working!${NC}"
  exit 0
else
  echo -e "${RED}❌ SOME TESTS FAILED - Review output above${NC}"
  exit 1
fi
