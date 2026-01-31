#!/bin/bash

# Blog URL tesztelő szkript
# Használat: ./test-blog-urls.sh https://leventestudio.app

SITE_URL="${1:-https://leventestudio.app}"

echo "=========================================="
echo "Blog URL tesztelés: $SITE_URL"
echo "=========================================="
echo ""

# Tesztelt URL-ek
URLS=(
  "/blog/"
  "/blog/miert-lassu-a-wordpress-oldalam/"
  "/blog"
  "/blog/miert-lassu-a-wordpress-oldalam"
)

# Színkódok
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

test_url() {
  local url="$1"
  local full_url="${SITE_URL}${url}"

  echo -n "Tesztelem: $url ... "

  # HTTP státusz kód lekérése
  status_code=$(curl -o /dev/null -s -w "%{http_code}" -L "$full_url")
  redirect_url=$(curl -s -w "%{redirect_url}" -o /dev/null "$full_url")

  if [ "$status_code" = "200" ]; then
    echo -e "${GREEN}✓ OK ($status_code)${NC}"
    return 0
  elif [ "$status_code" = "301" ] || [ "$status_code" = "308" ]; then
    echo -e "${YELLOW}→ REDIRECT ($status_code)${NC}"
    if [ -n "$redirect_url" ]; then
      echo "  └─ Átirányítva: $redirect_url"
    fi
    return 0
  elif [ "$status_code" = "404" ]; then
    echo -e "${RED}✗ NOT FOUND ($status_code)${NC}"
    return 1
  else
    echo -e "${RED}✗ ERROR ($status_code)${NC}"
    return 1
  fi
}

echo "1. Blog index oldal tesztelése"
echo "────────────────────────────────"
test_url "/blog/"
test_url "/blog"
echo ""

echo "2. Blog cikk oldal tesztelése"
echo "────────────────────────────────"
test_url "/blog/miert-lassu-a-wordpress-oldalam/"
test_url "/blog/miert-lassu-a-wordpress-oldalam"
echo ""

echo "3. Sitemap ellenőrzése"
echo "────────────────────────────────"
echo -n "Sitemap elérhető ... "
status_code=$(curl -o /dev/null -s -w "%{http_code}" "${SITE_URL}/sitemap-0.xml")
if [ "$status_code" = "200" ]; then
  echo -e "${GREEN}✓ OK ($status_code)${NC}"

  # Blog URL-ek száma a sitemapben
  blog_urls=$(curl -s "${SITE_URL}/sitemap-0.xml" | grep -o "https://leventestudio.app/blog[^<]*" | wc -l)
  echo "  └─ Blog URL-ek száma: $blog_urls"
else
  echo -e "${RED}✗ ERROR ($status_code)${NC}"
fi
echo ""

echo "4. Robots.txt ellenőrzése"
echo "────────────────────────────────"
echo -n "Robots.txt elérhető ... "
status_code=$(curl -o /dev/null -s -w "%{http_code}" "${SITE_URL}/robots.txt")
if [ "$status_code" = "200" ]; then
  echo -e "${GREEN}✓ OK ($status_code)${NC}"

  # Sitemap hivatkozás a robots.txt-ben
  has_sitemap=$(curl -s "${SITE_URL}/robots.txt" | grep -i "sitemap" | wc -l)
  if [ "$has_sitemap" -gt 0 ]; then
    echo "  └─ Sitemap hivatkozás: ${GREEN}✓ Megtalálható${NC}"
  else
    echo "  └─ Sitemap hivatkozás: ${YELLOW}⚠ Hiányzik${NC}"
  fi
else
  echo -e "${RED}✗ ERROR ($status_code)${NC}"
fi
echo ""

echo "=========================================="
echo "Teszt befejezve"
echo "=========================================="
