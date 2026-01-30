#!/bin/bash

# Googlebot 502 Reproduction Test
# Tests 50 requests with different User-Agents to identify 502 issues

URL="https://leventestudio.app"
OUTPUT_FILE="googlebot-test-results.txt"
CSV_FILE="googlebot-test-results.csv"

# User agents to test
UA_GOOGLEBOT_DESKTOP="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
UA_GOOGLEBOT_MOBILE="Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
UA_CHROME="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

# Clear previous results
> "$OUTPUT_FILE"
> "$CSV_FILE"

# CSV header
echo "Request,UA_Type,Status,Time_Total,Cache_Status,X_NF_Request_ID,Server,Content_Type,Transfer_Encoding" >> "$CSV_FILE"

echo "=== Googlebot 502 Test - $(date) ===" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

test_request() {
    local REQUEST_NUM=$1
    local UA=$2
    local UA_TYPE=$3

    echo -n "[$REQUEST_NUM/50] Testing with $UA_TYPE... " | tee -a "$OUTPUT_FILE"

    # Make request and capture all headers + metrics
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}|%{time_total}|%{header_json}" \
        -A "$UA" \
        -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
        -H "Accept-Language: hu-HU,hu;q=0.9,en-US;q=0.8,en;q=0.7" \
        --max-time 30 \
        "$URL" 2>&1)

    # Parse response
    STATUS=$(echo "$RESPONSE" | cut -d'|' -f1)
    TIME=$(echo "$RESPONSE" | cut -d'|' -f2)
    HEADERS=$(echo "$RESPONSE" | cut -d'|' -f3-)

    # Extract specific headers from JSON
    CACHE_STATUS=$(echo "$HEADERS" | grep -o '"cache-status":\s*\["[^"]*"' | sed 's/"cache-status":\s*\["\([^"]*\)"/\1/' || echo "N/A")
    X_NF_REQUEST_ID=$(echo "$HEADERS" | grep -o '"x-nf-request-id":\s*\["[^"]*"' | sed 's/"x-nf-request-id":\s*\["\([^"]*\)"/\1/' || echo "N/A")
    SERVER=$(echo "$HEADERS" | grep -o '"server":\s*\["[^"]*"' | sed 's/"server":\s*\["\([^"]*\)"/\1/' || echo "N/A")
    CONTENT_TYPE=$(echo "$HEADERS" | grep -o '"content-type":\s*\["[^"]*"' | sed 's/"content-type":\s*\["\([^"]*\)"/\1/' || echo "N/A")
    TRANSFER_ENCODING=$(echo "$HEADERS" | grep -o '"transfer-encoding":\s*\["[^"]*"' | sed 's/"transfer-encoding":\s*\["\([^"]*\)"/\1/' || echo "N/A")

    # Color output for status
    if [ "$STATUS" = "200" ]; then
        echo -e "\033[0;32m$STATUS\033[0m (${TIME}s)" | tee -a "$OUTPUT_FILE"
    elif [ "$STATUS" = "502" ]; then
        echo -e "\033[0;31m$STATUS - BAD GATEWAY!\033[0m (${TIME}s)" | tee -a "$OUTPUT_FILE"
    else
        echo -e "\033[0;33m$STATUS\033[0m (${TIME}s)" | tee -a "$OUTPUT_FILE"
    fi

    # Log to CSV
    echo "$REQUEST_NUM,$UA_TYPE,$STATUS,$TIME,$CACHE_STATUS,$X_NF_REQUEST_ID,$SERVER,$CONTENT_TYPE,$TRANSFER_ENCODING" >> "$CSV_FILE"

    # Brief pause to avoid rate limiting
    sleep 0.5
}

# Test 20x Googlebot Desktop
for i in {1..20}; do
    test_request $i "$UA_GOOGLEBOT_DESKTOP" "Googlebot-Desktop"
done

# Test 20x Googlebot Smartphone
for i in {21..40}; do
    test_request $i "$UA_GOOGLEBOT_MOBILE" "Googlebot-Mobile"
done

# Test 10x Chrome (control group)
for i in {41..50}; do
    test_request $i "$UA_CHROME" "Chrome-Desktop"
done

echo "" | tee -a "$OUTPUT_FILE"
echo "=== Test Summary ===" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

# Count results
TOTAL_200=$(grep -c ",200," "$CSV_FILE" || echo 0)
TOTAL_502=$(grep -c ",502," "$CSV_FILE" || echo 0)
TOTAL_OTHER=$(grep -Ec ",([0-9]{3})," "$CSV_FILE" | awk -v t200="$TOTAL_200" -v t502="$TOTAL_502" '{print $1-t200-t502}')

GOOGLEBOT_DESKTOP_502=$(grep "Googlebot-Desktop,502" "$CSV_FILE" | wc -l)
GOOGLEBOT_MOBILE_502=$(grep "Googlebot-Mobile,502" "$CSV_FILE" | wc -l)
CHROME_502=$(grep "Chrome-Desktop,502" "$CSV_FILE" | wc -l)

echo "Total Requests: 50" | tee -a "$OUTPUT_FILE"
echo "  - 200 OK: $TOTAL_200" | tee -a "$OUTPUT_FILE"
echo "  - 502 Bad Gateway: $TOTAL_502" | tee -a "$OUTPUT_FILE"
echo "  - Other: $TOTAL_OTHER" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"
echo "502 by User-Agent:" | tee -a "$OUTPUT_FILE"
echo "  - Googlebot Desktop: $GOOGLEBOT_DESKTOP_502/20" | tee -a "$OUTPUT_FILE"
echo "  - Googlebot Mobile: $GOOGLEBOT_MOBILE_502/20" | tee -a "$OUTPUT_FILE"
echo "  - Chrome Desktop: $CHROME_502/10" | tee -a "$OUTPUT_FILE"
echo "" | tee -a "$OUTPUT_FILE"

if [ "$TOTAL_502" -gt 0 ]; then
    echo -e "\033[0;31m⚠️  502 ERRORS DETECTED!\033[0m" | tee -a "$OUTPUT_FILE"
    echo "" | tee -a "$OUTPUT_FILE"
    echo "Failed requests:" | tee -a "$OUTPUT_FILE"
    grep ",502," "$CSV_FILE" | tee -a "$OUTPUT_FILE"
else
    echo -e "\033[0;32m✓ No 502 errors detected\033[0m" | tee -a "$OUTPUT_FILE"
fi

echo "" | tee -a "$OUTPUT_FILE"
echo "Full results saved to: $CSV_FILE" | tee -a "$OUTPUT_FILE"
echo "Test log saved to: $OUTPUT_FILE" | tee -a "$OUTPUT_FILE"
