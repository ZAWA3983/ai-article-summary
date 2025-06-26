#!/bin/bash

# APIテスト用スクリプト
WORKER_URL="https://ai-article-summary-staging.your-subdomain.workers.dev"
API_KEY="YOUR_API_KEY_HERE"

echo "🧪 APIテストを開始します..."
echo "Worker URL: $WORKER_URL"
echo ""

# 1. GETリクエストテスト
echo "1️⃣ GET /api/summaries テスト"
echo "----------------------------------------"
curl -s "$WORKER_URL/api/summaries" | jq '.' 2>/dev/null || curl -s "$WORKER_URL/api/summaries"
echo ""
echo ""

# 2. POSTリクエストテスト（APIキーなし）
echo "2️⃣ POST /api/summarize テスト（APIキーなし）"
echo "----------------------------------------"
curl -s -X POST "$WORKER_URL/api/summarize" \
  -H "Content-Type: application/json" \
  -d '{"keyword": "生成AI"}' | jq '.' 2>/dev/null || curl -s -X POST "$WORKER_URL/api/summarize" \
  -H "Content-Type: application/json" \
  -d '{"keyword": "生成AI"}'
echo ""
echo ""

# 3. POSTリクエストテスト（APIキーあり）
if [ "$API_KEY" != "YOUR_API_KEY_HERE" ]; then
    echo "3️⃣ POST /api/summarize テスト（APIキーあり）"
    echo "----------------------------------------"
    curl -s -X POST "$WORKER_URL/api/summarize" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $API_KEY" \
      -d '{"keyword": "生成AI"}' | jq '.' 2>/dev/null || curl -s -X POST "$WORKER_URL/api/summarize" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $API_KEY" \
      -d '{"keyword": "生成AI"}'
else
    echo "3️⃣ POST /api/summarize テスト（APIキーあり）"
    echo "----------------------------------------"
    echo "⚠️  API_KEYを設定してください"
fi

echo ""
echo "✅ テスト完了！" 