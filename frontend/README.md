# AI Article Summary Frontend

React + TypeScript + Vite を使用したAI記事サマリー生成アプリケーションのフロントエンド

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Vite** - 高速なビルドツール
- **Mantine** - UIコンポーネントライブラリ
- **Tabler Icons** - アイコンライブラリ

## 前提条件

- Node.js (v18以上)
- pnpm (推奨) または npm
- Cloudflare アカウント
- Wrangler CLI

## ローカル開発環境のセットアップ

### 1. 依存関係のインストール

```bash
# pnpmを使用する場合（推奨）
pnpm install

# npmを使用する場合
npm install
```

### 2. バックエンドの準備

フロントエンドを動作させるには、バックエンドAPIが必要です。
開発DBの立ち上げ方はバックエンドのREADMEを見てね。

### 3. フロントエンドの開発サーバー起動

```bash
# frontendディレクトリに戻る
cd ../frontend

# 開発サーバーを起動
pnpm dev
# または
npm run dev
```

フロントエンドは `http://localhost:3000` で起動します。

### 4. 開発時の設定

#### APIプロキシ設定

開発時は、Viteのプロキシ機能により `/api` へのリクエストが自動的にバックエンド（`http://localhost:8787`）に転送されます。

#### 環境変数

フロントエンドは以下の環境変数を自動的に設定します：

- **開発環境**: `http://localhost:8787`
- **本番環境**: `https://quita-ai-summary.ai-article-summary.workers.dev`

## 利用可能なスクリプト

```bash
# 開発サーバー起動
pnpm dev

# 本番ビルド
pnpm build

# ビルド結果のプレビュー
pnpm preview

# リント実行
pnpm lint

# 型チェック
pnpm type-check

# Cloudflare Pagesへのデプロイ
pnpm deploy

# Git操作（add, commit, push）
pnpm git
```

## 開発の流れ

### 1. 機能開発

```bash
# 開発サーバーを起動
pnpm dev

# ブラウザで http://localhost:3000 にアクセス
```

### 2. コード品質チェック

```bash
# リント実行
pnpm lint

# 型チェック
pnpm type-check
```

### 3. ビルドテスト

```bash
# 本番ビルド
pnpm build

# ビルド結果をプレビュー
pnpm preview
```

## Cloudflare Pagesへのデプロイ

### 1. Wrangler CLIのインストール

```bash
npm install -g wrangler
```

### 2. Cloudflareへのログイン

```bash
wrangler login
```

### 3. デプロイ設定の確認

`wrangler.toml` ファイルでデプロイ設定を確認：

```toml
name = "ai-article-summary-frontend"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"
```

### 4. デプロイ実行

```bash
# 自動デプロイ（ビルド + デプロイ）
pnpm deploy

# または手動で実行
pnpm build
wrangler pages deploy dist
```

### 5. デプロイ後の確認

デプロイが完了すると、以下のようなURLでアクセス可能になります：

```
https://ai-article-summary-frontend.pages.dev
```

## プロジェクト構造

```
frontend/
├── public/                 # 静的ファイル
│   └── images/
├── src/
│   ├── components/         # Reactコンポーネント
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   └── ArticleList.module.css
│   ├── config/            # 設定ファイル
│   │   └── api.ts
│   ├── services/          # APIサービス
│   │   └── api.ts
│   ├── App.tsx           # メインアプリケーション
│   ├── main.tsx          # エントリーポイント
│   └── index.css         # グローバルスタイル
├── package.json
├── vite.config.ts        # Vite設定
├── wrangler.toml         # Cloudflare Pages設定
└── tsconfig.json         # TypeScript設定
```

## 開発時の注意点

### 1. バックエンドとの連携

- フロントエンドは開発時にバックエンドAPI（`http://localhost:8787`）を使用
- 本番環境ではデプロイされたCloudflare Workersを使用
- APIキーはバックエンド側で管理され、フロントエンドからは直接送信されません

### 2. CORS設定

開発時のCORS設定は `vite.config.ts` のプロキシ設定で処理されます：

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8787',
      changeOrigin: true,
    }
  }
}
```

### 3. 環境変数

本番環境では、APIのベースURLが自動的に切り替わります：

```typescript
// src/config/api.ts
const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    return 'http://localhost:8787';
  }
  return 'https://quita-ai-summary.ai-article-summary.workers.dev';
};
```
