#!/bin/bash

# AI Article Summary 開発環境セットアップスクリプト
set -e

echo "🚀 AI Article Summary 開発環境セットアップを開始します..."

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

# Node.js バージョンチェック
log_info "Node.js バージョンをチェック中..."
if ! command -v node &> /dev/null; then
    log_error "Node.js がインストールされていません。Node.js v20以上をインストールしてください。"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    log_error "Node.js v20以上が必要です。現在のバージョン: $(node --version)"
    exit 1
fi

log_success "Node.js バージョン: $(node --version)"

# pnpm チェック
log_info "pnpm をチェック中..."
if ! command -v pnpm &> /dev/null; then
    log_warning "pnpm がインストールされていません。npm を使用します。"
    PACKAGE_MANAGER="npm"
else
    log_success "pnpm が見つかりました"
    PACKAGE_MANAGER="pnpm"
fi

# Wrangler CLI チェック
log_info "Wrangler CLI をチェック中..."
if ! command -v wrangler &> /dev/null; then
    log_warning "Wrangler CLI がインストールされていません。グローバルにインストールします。"
    $PACKAGE_MANAGER install -g wrangler
else
    log_success "Wrangler CLI が見つかりました"
fi

# 依存関係のインストール
log_info "依存関係をインストール中..."
$PACKAGE_MANAGER install

# 環境変数ファイルの設定
log_info "環境変数ファイルを設定中..."
if [ ! -f .env ]; then
    if [ -f env.example ]; then
        cp env.example .env
        log_success ".env ファイルを作成しました"
        log_warning "実際のAPIキーを .env ファイルに設定してください"
    else
        log_warning "env.example ファイルが見つかりません"
    fi
else
    log_success ".env ファイルは既に存在します"
fi

# TypeScript の型チェック
log_info "TypeScript の型チェックを実行中..."
$PACKAGE_MANAGER run type-check

# テストの実行
log_info "テストを実行中..."
$PACKAGE_MANAGER test

log_success "セットアップが完了しました！"
echo ""
echo "📋 次のステップ:"
echo "1. .env ファイルに実際のAPIキーを設定"
echo "2. 'wrangler login' でCloudflareにログイン"
echo "3. 'wrangler d1 create ai-article-summary-db' でD1データベースを作成"
echo "4. 'wrangler d1 execute ai-article-summary-db --file=./schema.sql --remote' でスキーマを適用"
echo "5. 'wrangler secret put API_KEY' などで本番環境のシークレットを設定"
echo "6. 'wrangler dev' でローカル開発を開始"
echo ""
echo "詳細は README.md を参照してください。" 