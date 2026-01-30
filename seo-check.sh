#!/bin/bash

echo "=================================="
echo "SEO VERIFICATION - LeventeStudio"
echo "=================================="
echo ""

# Service pages to check
PAGES=(
  "szolgaltatas/weboldal-audit"
  "szolgaltatas/seo-audit"
  "szolgaltatas/weboldal-gyorsitas"
)

# Build the site first
echo "Building the site..."
npm run build > /dev/null 2>&1

if [ $? -ne 0 ]; then
  echo "❌ Build failed! Fix build errors first."
  exit 1
fi

echo "✓ Build successful"
echo ""

# Function to check a specific page
check_page() {
  local page=$1
  local file="dist/${page}.html"

  if [ ! -f "$file" ]; then
    file="dist/${page}/index.html"
  fi

  if [ ! -f "$file" ]; then
    echo "❌ File not found: $file"
    return
  fi

  echo "Checking: /${page}"
  echo "----------------------------------------"

  # H1 check
  h1_count=$(grep -o "<h1[^>]*>" "$file" | wc -l)
  if [ $h1_count -eq 1 ]; then
    h1_text=$(grep -oP '(?<=<h1[^>]*>).*?(?=</h1>)' "$file" | head -1 | sed 's/<[^>]*>//g')
    echo "✓ H1 found (1): ${h1_text:0:60}..."
  else
    echo "❌ H1 count: $h1_count (should be exactly 1)"
  fi

  # H2 check
  h2_count=$(grep -o "<h2[^>]*>" "$file" | wc -l)
  if [ $h2_count -ge 3 ]; then
    echo "✓ H2 tags found: $h2_count"
  else
    echo "⚠️  H2 count: $h2_count (recommended: 3+)"
  fi

  # Title check
  if grep -q "<title>" "$file"; then
    title_text=$(grep -oP '(?<=<title>).*?(?=</title>)' "$file" | head -1)
    echo "✓ Title tag: ${title_text:0:60}..."
  else
    echo "❌ Title tag missing"
  fi

  # Meta description check
  if grep -q 'name="description"' "$file"; then
    desc_text=$(grep -oP 'name="description" content="\K[^"]+' "$file" | head -1)
    echo "✓ Meta description: ${desc_text:0:60}..."
  else
    echo "❌ Meta description missing"
  fi

  # Canonical check
  if grep -q 'rel="canonical"' "$file"; then
    canonical_url=$(grep -oP 'rel="canonical" href="\K[^"]+' "$file" | head -1)
    echo "✓ Canonical URL: $canonical_url"
  else
    echo "❌ Canonical URL missing"
  fi

  # OG tags check
  og_title=$(grep -c 'property="og:title"' "$file")
  og_desc=$(grep -c 'property="og:description"' "$file")
  og_image=$(grep -c 'property="og:image"' "$file")
  og_url=$(grep -c 'property="og:url"' "$file")

  if [ $og_title -gt 0 ] && [ $og_desc -gt 0 ] && [ $og_image -gt 0 ] && [ $og_url -gt 0 ]; then
    echo "✓ OG tags complete (title, description, image, url)"
  else
    echo "⚠️  OG tags incomplete (title:$og_title, desc:$og_desc, image:$og_image, url:$og_url)"
  fi

  # JSON-LD Structured Data check
  jsonld_count=$(grep -c 'application/ld+json' "$file")
  if [ $jsonld_count -gt 0 ]; then
    echo "✓ JSON-LD structured data found: $jsonld_count block(s)"

    # Check for specific schema types
    if grep -q '"@type":"ProfessionalService"' "$file" || grep -q '"@type": "ProfessionalService"' "$file"; then
      echo "  ✓ ProfessionalService schema found"
    fi
    if grep -q '"@type":"FAQPage"' "$file" || grep -q '"@type": "FAQPage"' "$file"; then
      echo "  ✓ FAQPage schema found"
    fi
  else
    echo "❌ JSON-LD structured data missing"
  fi

  # Internal links check
  internal_links=$(grep -o 'href="/' "$file" | wc -l)
  if [ $internal_links -ge 5 ]; then
    echo "✓ Internal links found: $internal_links"
  else
    echo "⚠️  Internal links count: $internal_links (recommended: 5+)"
  fi

  # Word count estimate (rough)
  word_count=$(grep -oP '(?<=<main|<article|<section)[^>]*>.*?(?=</main>|</article>|</section>)' "$file" | sed 's/<[^>]*>//g' | wc -w)
  if [ $word_count -ge 1000 ]; then
    echo "✓ Content word count: ~$word_count words"
  else
    echo "⚠️  Content word count: ~$word_count words (recommended: 1200+)"
  fi

  echo ""
}

# Check all service pages
for page in "${PAGES[@]}"; do
  check_page "$page"
done

echo "=================================="
echo "SITEMAP VERIFICATION"
echo "=================================="
echo ""

# Check sitemap
if [ -f "public/sitemap.xml" ]; then
  echo "✓ Sitemap file exists: public/sitemap.xml"

  # Check if service pages are in sitemap
  for page in "${PAGES[@]}"; do
    if grep -q "leventestudio.app/${page}" "public/sitemap.xml"; then
      echo "✓ /${page} is in sitemap"
    else
      echo "❌ /${page} missing from sitemap"
    fi
  done
else
  echo "❌ Sitemap file not found"
fi

echo ""
echo "=================================="
echo "VERIFICATION COMPLETE"
echo "=================================="
