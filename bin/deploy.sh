#!/bin/bash

# AI Article Summary デプロイスクリプト
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
ENVIRONMENT=${1:-"staging"}
PACKAGE_MANAGER=${2:-"pnpm"}

if [ "$ENVIRONMENT" != "staging" ] && [ "$ENVIRONMENT" != "production" ]; then
    log_error "環境は 'staging' または 'production' を指定してください"
    echo "使用方法: $0 [staging|production] [pnpm|npm]"
    exit 1
fi

log_info "デプロイを開始します: $ENVIRONMENT"

# 型チェック
log_info "TypeScript の型チェックを実行中..."
$PACKAGE_MANAGER run type-check

# テスト実行
log_info "テストを実行中..."
$PACKAGE_MANAGER test

# リンター実行
log_info "リンターを実行中..."
$PACKAGE_MANAGER run lint

# フォーマットチェック
log_info "コードフォーマットをチェック中..."
$PACKAGE_MANAGER run format

# デプロイ実行
log_info "$ENVIRONMENT 環境にデプロイ中..."
if [ "$ENVIRONMENT" = "production" ]; then
    wrangler deploy --env production
else
    wrangler deploy --env staging
fi

log_success "$ENVIRONMENT 環境へのデプロイが完了しました！"

# デプロイ後の確認
log_info "デプロイ後の確認中..."
if [ "$ENVIRONMENT" = "production" ]; then
    WORKER_URL="https://ai-article-summary-production.your-subdomain.workers.dev"
else
    WORKER_URL="https://ai-article-summary-staging.your-subdomain.workers.dev"
fi

echo "デプロイされたWorkerのURL: $WORKER_URL"
echo "ヘルスチェック: curl $WORKER_URL/api/summaries" 