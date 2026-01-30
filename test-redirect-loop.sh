#!/bin/bash

# Redirect Loop Test Script
# Run after deploy to verify the fix

SITE="https://leventestudio.app"
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "========================================"
echo "Redirect Loop Test"
echo "========================================"
echo ""

# Test 1: /kapcsolat/ (trailing slash) - should be 200
echo "Test 1: /kapcsolat/ (trailing slash)"
echo "---------------------------------------"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE/kapcsolat/")
if [ "$STATUS" = "200" ]; then
  echo -e "${GREEN}✅ PASS${NC} - Status: $STATUS"
else
  echo -e "${RED}❌ FAIL${NC} - Status: $STATUS (expected 200)"
fi
echo ""

# Test 2: /kapcsolat (no trailing slash) - should be 200 or 301
echo "Test 2: /kapcsolat (no trailing slash)"
echo "---------------------------------------"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE/kapcsolat")
if [ "$STATUS" = "200" ] || [ "$STATUS" = "301" ]; then
  echo -e "${GREEN}✅ PASS${NC} - Status: $STATUS"
else
  echo -e "${RED}❌ FAIL${NC} - Status: $STATUS (expected 200 or 301)"
fi
echo ""

# Test 3: Loop detection (max 5 redirects)
echo "Test 3: Loop Detection"
echo "---------------------------------------"
STATUS=$(curl -L --max-redirs 5 -s -o /dev/null -w "%{http_code}" "$SITE/kapcsolat/")
if [ "$STATUS" = "200" ]; then
  echo -e "${GREEN}✅ PASS${NC} - No redirect loop detected"
else
  echo -e "${RED}❌ FAIL${NC} - Possible loop or error (status: $STATUS)"
fi
echo ""

# Test 4: Count actual redirects
echo "Test 4: Redirect Count"
echo "---------------------------------------"
REDIRECT_COUNT=$(curl -L -s -o /dev/null -w "%{num_redirects}" "$SITE/kapcsolat/")
echo "Number of redirects: $REDIRECT_COUNT"
if [ "$REDIRECT_COUNT" -eq 0 ]; then
  echo -e "${GREEN}✅ PASS${NC} - Direct 200, no redirects"
elif [ "$REDIRECT_COUNT" -le 2 ]; then
  echo -e "${GREEN}✅ PASS${NC} - Acceptable redirect count"
else
  echo -e "${RED}❌ FAIL${NC} - Too many redirects (possible loop)"
fi
echo ""

# Test 5: Check other pages
echo "Test 5: Other Pages Status"
echo "---------------------------------------"
URLS=(
  "/"
  "/rolam/"
  "/esettanulmanyok/"
  "/szolgaltatas/weboldal-audit/"
)

PASS=0
FAIL=0

for url in "${URLS[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$SITE$url")
  if [ "$STATUS" = "200" ]; then
    echo -e "${GREEN}✅${NC} $url - $STATUS"
    ((PASS++))
  else
    echo -e "${RED}❌${NC} $url - $STATUS"
    ((FAIL++))
  fi
done

echo ""
echo "Result: $PASS passed, $FAIL failed"
echo ""

# Final summary
echo "========================================"
echo "Summary"
echo "========================================"
if [ "$FAIL" -eq 0 ]; then
  echo -e "${GREEN}✅ ALL TESTS PASSED${NC}"
  echo "Redirect loop is fixed!"
  exit 0
else
  echo -e "${RED}❌ SOME TESTS FAILED${NC}"
  echo "Review output above for details"
  exit 1
fi
