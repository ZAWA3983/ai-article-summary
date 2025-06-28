#!/bin/bash

# ローカルDBをリセットしてdev-db-data.jsonのデータを再投入するスクリプト
# 使用方法: ./bin/reset-dev-db.sh

set -e

echo "🔄 ローカルDBをリセットしてdev-db-data.jsonのデータを再投入します..."

# プロジェクトルートに移動
cd "$(dirname "$0")/.."

# ローカルDBのテーブルをクリア
echo "🗑️  ローカルDBのデータをクリアしています..."
wrangler d1 execute ai-article-summary-db --local --command="DELETE FROM article_summaries;"
wrangler d1 execute ai-article-summary-db --local --command="DELETE FROM article_tags;"
wrangler d1 execute ai-article-summary-db --local --command="DELETE FROM articles;"
wrangler d1 execute ai-article-summary-db --local --command="DELETE FROM rate_limits;"

echo "✅ データベースがクリアされました"

# dev-db-data.jsonのデータを再投入
echo "📥 dev-db-data.jsonのデータを再投入しています..."
./bin/import-dev-data.sh

echo "🎉 ローカルDBのリセットが完了しました！" 