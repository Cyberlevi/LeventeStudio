#!/bin/bash

echo "=========================================="
echo "Blog URL tesztelés (minden cikk)"
echo "=========================================="
echo ""

URLS=(
  "/blog/"
  "/blog/miert-lassu-a-wordpress-oldalam/"
  "/blog/google-search-console-hibak/"
  "/blog/weboldal-konverzio-optimalizalas/"
  "/blog/mikor-erdemes-weboldal-auditot-kerni/"
)

GREEN='\033[0;32m'
NC='\033[0m'

for url in "${URLS[@]}"; do
  file="/tmp/cc-agent/62673665/project/dist${url}index.html"
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $url → fájl létezik"
  else
    echo -e "✗ $url → fájl NEM létezik"
  fi
done

echo ""
echo "Sitemap ellenőrzés:"
blog_count=$(grep -c "leventestudio.app/blog/" /tmp/cc-agent/62673665/project/dist/sitemap-0.xml)
echo "Blog URL-ek száma a sitemapben: $blog_count"

echo ""
echo "=========================================="
