#!/bin/bash

# dev-db-data.jsonのデータをローカルDBに投入するスクリプト
# 使用方法: ./bin/import-dev-data.sh

set -e

echo "🚀 dev-db-data.jsonのデータをローカルDBに投入します..."

# プロジェクトルートに移動
cd "$(dirname "$0")/.."

# データファイルの存在確認
DATA_FILE="test_data/dev-db-data.json"
if [ ! -f "$DATA_FILE" ]; then
    echo "❌ エラー: $DATA_FILE が見つかりません"
    exit 1
fi

echo "📁 データファイル: $DATA_FILE"

# ローカルDBのテーブルをクリア
echo "🗑️  既存のデータをクリアしています..."
wrangler d1 execute ai-article-summary-db --local --command="DELETE FROM article_summaries;"
wrangler d1 execute ai-article-summary-db --local --command="DELETE FROM article_tags;"
wrangler d1 execute ai-article-summary-db --local --command="DELETE FROM articles;"

# dev-db-data.jsonからデータを抽出してローカルDBに挿入
echo "📥 データをローカルDBに挿入しています..."

# Node.jsスクリプトを使用してデータを変換・挿入
node -e "
const fs = require('fs');
const { execSync } = require('child_process');

// dev-db-data.jsonを読み込み
const data = JSON.parse(fs.readFileSync('test_data/dev-db-data.json', 'utf8'));

if (!data.success || !data.summaries) {
    console.error('❌ データ形式が正しくありません');
    process.exit(1);
}

console.log(\`📊 \${data.summaries.length}件の記事サマリーを処理します...\`);

// 各サマリーを処理
data.summaries.forEach((summary, index) => {
    console.log(\`\${index + 1}/\${data.summaries.length}: \${summary.summary.heading}\`);
    
    // URLから記事IDを抽出
    const urlParts = summary.url.split('/');
    const articleId = urlParts[urlParts.length - 1];
    
    // articlesテーブルに挿入（必須フィールドのみ）
    const articleSql = \`
        INSERT INTO articles (
            id, title, url, likes_count, created_at, updated_at, 
            user_id, user_name, body, rendered_body
        )
        VALUES (
            '\${summary.id}', 
            '\${summary.summary.heading.replace(/'/g, \"''\")}', 
            '\${summary.url}', 
            0, 
            '\${summary.created_at}', 
            '\${summary.created_at}',
            'dev-user',
            '開発用ユーザー',
            '開発用の記事本文です。',
            '開発用のレンダリング済み本文です。'
        );
    \`;
    
    // article_tagsテーブルに挿入
    const tagSql = \`
        INSERT INTO article_tags (article_id, tag_name, tag_versions)
        VALUES ('\${summary.id}', '\${summary.keyword}', '[\"\${summary.keyword}\"]');
    \`;
    
    // article_summariesテーブルに挿入
    const summarySql = \`
        INSERT INTO article_summaries (
            id, title, url, summary_heading, summary_catch, summary_text, 
            target_audience, disclaimer, created_at, updated_at, 
            original_article_id, keyword
        )
        VALUES (
            '\${summary.id}', 
            '\${summary.summary.heading.replace(/'/g, \"''\")}', 
            '\${summary.url}', 
            '\${summary.summary.heading.replace(/'/g, \"''\")}', 
            '\${summary.summary.catch.replace(/'/g, \"''\")}', 
            '\${summary.summary.summaryText.replace(/'/g, \"''\")}', 
            '\${summary.summary.targetAudience.replace(/'/g, \"''\")}', 
            '\${summary.disclaimer.replace(/'/g, \"''\")}', 
            '\${summary.created_at}', 
            '\${summary.created_at}',
            '\${summary.id}',
            '\${summary.keyword}'
        );
    \`;
    
    try {
        execSync(\`wrangler d1 execute ai-article-summary-db --local --command=\"\${articleSql}\"\`, { stdio: 'pipe' });
        execSync(\`wrangler d1 execute ai-article-summary-db --local --command=\"\${tagSql}\"\`, { stdio: 'pipe' });
        execSync(\`wrangler d1 execute ai-article-summary-db --local --command=\"\${summarySql}\"\`, { stdio: 'pipe' });
    } catch (error) {
        console.error(\`❌ エラー: \${summary.summary.heading}\`);
        console.error(error.message);
    }
});

console.log('✅ データの挿入が完了しました');
"

# 挿入されたデータの確認
echo "📊 挿入されたデータを確認しています..."
echo "記事数:"
wrangler d1 execute ai-article-summary-db --local --command="SELECT COUNT(*) as count FROM articles;"
echo "タグ数:"
wrangler d1 execute ai-article-summary-db --local --command="SELECT COUNT(*) as count FROM article_tags;"
echo "サマリー数:"
wrangler d1 execute ai-article-summary-db --local --command="SELECT COUNT(*) as count FROM article_summaries;"

echo "🎉 dev-db-data.jsonのデータがローカルDBに正常に投入されました！"
echo ""
echo "📝 次のコマンドでローカル開発サーバーを起動できます："
echo "   wrangler dev"
echo ""
echo "🌐 ブラウザで http://localhost:8787 にアクセスして確認してください" 