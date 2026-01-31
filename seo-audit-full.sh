#!/bin/bash

DOMAIN="https://leventestudio.app"
PAGES=(
  "/"
  "/blog/"
  "/blog/google-search-console-hibak/"
  "/blog/miert-lassu-a-wordpress-oldalam/"
  "/blog/weboldal-konverzio-optimalizalas/"
  "/szolgaltatas/weboldal-audit/"
  "/szolgaltatas/seo-audit/"
  "/szolgaltatas/ux-audit/"
  "/esettanulmanyok/"
  "/esettanulmanyok/bundavarazs-kutyakozmetika-audit/"
  "/kapcsolat/"
  "/rolam/"
)

echo "=========================================="
echo "LeventeStudio.app - Teljes SEO Audit"
echo "=========================================="
echo ""

# 1. Robots.txt és Sitemap
echo "📋 1. Robots.txt és Sitemap ellenőrzés"
echo "=========================================="
echo ""

echo "Robots.txt:"
robots_status=$(curl -I -s "$DOMAIN/robots.txt" | head -n 1 | awk '{print $2}')
echo "   Státusz: $robots_status"
echo ""

echo "Sitemap Index:"
sitemap_index_status=$(curl -I -s "$DOMAIN/sitemap-index.xml" | head -n 1 | awk '{print $2}')
echo "   Státusz: $sitemap_index_status"
echo ""

echo "Sitemap-0:"
sitemap_0_status=$(curl -I -s "$DOMAIN/sitemap-0.xml" | head -n 1 | awk '{print $2}')
echo "   Státusz: $sitemap_0_status"
sitemap_count=$(curl -s "$DOMAIN/sitemap-0.xml" | grep -o "<loc>" | wc -l)
echo "   URL-ek száma: $sitemap_count"
echo ""

# 2. Minden oldal ellenőrzése
echo "📄 2. Oldalak ellenőrzése"
echo "=========================================="
echo ""

for page in "${PAGES[@]}"; do
  echo "🔍 $page"

  # Státuszkód
  status=$(curl -I -s "$DOMAIN$page" 2>/dev/null | head -n 1 | awk '{print $2}')
  if [ "$status" = "200" ]; then
    echo "   ├─ Státusz: ✅ $status"
  else
    echo "   ├─ Státusz: ❌ $status"
  fi

  # Canonical
  canonical=$(curl -s "$DOMAIN$page" 2>/dev/null | grep -i "rel=\"canonical\"" | sed -n 's/.*href="\([^"]*\)".*/\1/p' | head -n 1)
  expected_canonical="$DOMAIN$page"
  if [ "$canonical" = "$expected_canonical" ]; then
    echo "   ├─ Canonical: ✅ $canonical"
  else
    echo "   ├─ Canonical: ⚠️  $canonical (várva: $expected_canonical)"
  fi

  # Noindex ellenőrzés
  noindex=$(curl -s "$DOMAIN$page" 2>/dev/null | grep -i "noindex" | head -n 1)
  if [ -z "$noindex" ]; then
    echo "   ├─ Noindex: ✅ Nincs (indexelhető)"
  else
    echo "   ├─ Noindex: ❌ VAN (nem indexelhető)"
  fi

  # OG Image
  og_image=$(curl -s "$DOMAIN$page" 2>/dev/null | grep -i "property=\"og:image\"" | sed -n 's/.*content="\([^"]*\)".*/\1/p' | head -n 1)
  if [ -n "$og_image" ]; then
    echo "   ├─ OG Image: ✅ $og_image"
  else
    echo "   ├─ OG Image: ⚠️  Nincs beállítva"
  fi

  # OG Title
  og_title=$(curl -s "$DOMAIN$page" 2>/dev/null | grep -i "property=\"og:title\"" | sed -n 's/.*content="\([^"]*\)".*/\1/p' | head -n 1)
  if [ -n "$og_title" ]; then
    echo "   ├─ OG Title: ✅ $og_title"
  else
    echo "   ├─ OG Title: ⚠️  Nincs beállítva"
  fi

  # Meta Description
  description=$(curl -s "$DOMAIN$page" 2>/dev/null | grep -i "name=\"description\"" | sed -n 's/.*content="\([^"]*\)".*/\1/p' | head -n 1)
  if [ -n "$description" ]; then
    desc_length=${#description}
    if [ $desc_length -ge 120 ] && [ $desc_length -le 160 ]; then
      echo "   └─ Description: ✅ $desc_length karakter"
    else
      echo "   └─ Description: ⚠️  $desc_length karakter (ideális: 120-160)"
    fi
  else
    echo "   └─ Description: ❌ Nincs beállítva"
  fi

  echo ""
done

# 3. Asset fájlok
echo "🖼️  3. Asset fájlok"
echo "=========================================="
echo ""

assets=(
  "/favicon.ico"
  "/favicon.svg"
  "/apple-touch-icon.png"
  "/og-image.jpg"
  "/site.webmanifest"
)

for asset in "${assets[@]}"; do
  asset_status=$(curl -I -s "$DOMAIN$asset" 2>/dev/null | head -n 1 | awk '{print $2}')
  if [ "$asset_status" = "200" ]; then
    echo "   ✅ $asset - $asset_status"
  else
    echo "   ❌ $asset - $asset_status"
  fi
done

echo ""

# 4. Security Headers
echo "🔒 4. Security Headers"
echo "=========================================="
echo ""

security_check=$(curl -I -s "$DOMAIN/" 2>/dev/null)

if echo "$security_check" | grep -qi "X-Frame-Options"; then
  echo "   ✅ X-Frame-Options"
else
  echo "   ❌ X-Frame-Options hiányzik"
fi

if echo "$security_check" | grep -qi "X-Content-Type-Options"; then
  echo "   ✅ X-Content-Type-Options"
else
  echo "   ❌ X-Content-Type-Options hiányzik"
fi

if echo "$security_check" | grep -qi "Content-Security-Policy"; then
  echo "   ✅ Content-Security-Policy"
else
  echo "   ❌ Content-Security-Policy hiányzik"
fi

if echo "$security_check" | grep -qi "Strict-Transport-Security"; then
  echo "   ✅ Strict-Transport-Security"
else
  echo "   ⚠️  Strict-Transport-Security hiányzik (Netlify automata HTTPS)"
fi

echo ""

# 5. 404 teszt
echo "🚫 5. 404 oldal teszt"
echo "=========================================="
echo ""

notfound_status=$(curl -I -s "$DOMAIN/nem-letezik-ez-az-oldal-sehol/" 2>/dev/null | head -n 1 | awk '{print $2}')
if [ "$notfound_status" = "404" ]; then
  echo "   ✅ 404 oldal működik - $notfound_status"
else
  echo "   ❌ 404 oldal nem működik megfelelően - $notfound_status"
fi

echo ""

# 6. Összegzés
echo "=========================================="
echo "📊 Összegzés"
echo "=========================================="
echo ""
echo "Sitemap URL-ek: $sitemap_count / 16 (elvárt)"
echo "Ellenőrzött oldalak: ${#PAGES[@]}"
echo ""
echo "✅ Audit befejezve!"
echo ""
echo "Következő lépések:"
echo "1. Search Console-ban add hozzá a sitemap-index.xml-t"
echo "2. URL Inspection a főoldalon és 3 szolgáltatás oldalon"
echo "3. Várj 3-7 napot az indexelésre"
echo ""
