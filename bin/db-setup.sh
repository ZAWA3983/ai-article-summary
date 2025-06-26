#!/bin/bash

# AI Article Summary データベースセットアップスクリプト
set -e

# 色付きのログ関数
log_info() {
    echo -e "\033[34m[INFO]\033[0m $1"
}

log_success() {
    echo -e "\033[32m[SUCCESS]\033[0m $1"
}

log_warning() {
    echo -e "\033[33m[WARNING]\033[0m $1"
}

log_error() {
    echo -e "\033[31m[ERROR]\033[0m $1"
}

# 引数の解析
ENVIRONMENT=${1:-"local"}
DATABASE_NAME="ai-article-summary-db"

log_info "データベースセットアップを開始します: $ENVIRONMENT"

# Wrangler CLI チェック
if ! command -v wrangler &> /dev/null; then
    log_error "Wrangler CLI がインストールされていません"
    exit 1
fi

# Cloudflare ログインチェック
log_info "Cloudflare ログイン状態をチェック中..."
if ! wrangler whoami &> /dev/null; then
    log_warning "Cloudflare にログインしていません。ログインしてください。"
    wrangler login
fi

# データベース作成（存在しない場合）
log_info "D1データベースを作成中..."
if ! wrangler d1 list | grep -q "$DATABASE_NAME"; then
    log_info "データベース '$DATABASE_NAME' を作成中..."
    wrangler d1 create "$DATABASE_NAME"
    log_success "データベースが作成されました"
else
    log_success "データベース '$DATABASE_NAME' は既に存在します"
fi

# スキーマの適用
log_info "スキーマを適用中..."
if [ "$ENVIRONMENT" = "local" ]; then
    wrangler d1 execute "$DATABASE_NAME" --file=./schema.sql
else
    wrangler d1 execute "$DATABASE_NAME" --file=./schema.sql --remote
fi

# マイグレーションの適用（存在する場合）
if [ -f "./migration_add_keyword.sql" ]; then
    log_info "マイグレーションを適用中..."
    if [ "$ENVIRONMENT" = "local" ]; then
        wrangler d1 execute "$DATABASE_NAME" --file=./migration_add_keyword.sql
    else
        wrangler d1 execute "$DATABASE_NAME" --file=./migration_add_keyword.sql --remote
    fi
fi

# データベース情報の表示
log_info "データベース情報を取得中..."
wrangler d1 list

log_success "データベースセットアップが完了しました！"

echo ""
echo "📋 次のステップ:"
echo "1. wrangler.toml の database_id を更新（必要に応じて）"
echo "2. 環境変数を設定: wrangler secret put API_KEY"
echo "3. ローカル開発: wrangler dev"
echo "4. 本番デプロイ: ./bin/deploy.sh production" 