# AI Article Summary Backend

Cloudflare Workers + D1 を使用したAI記事サマリー生成API

## アーキテクチャ

- **Cloudflare Workers**: サーバーレス実行環境
- **D1 Database**: SQLiteベースのデータベース
- **Qiita API**: 記事検索
- **Gemini API**: AI要約生成

## 前提条件

- Node.js (v18以上)
- npm または yarn
- Cloudflare アカウント
- Wrangler CLI

## セットアップ手順

### 1. Wrangler CLI のインストール

```bash
npm install -g wrangler
```

### 2. Cloudflare へのログイン

```bash
wrangler login
```

### 3. 依存関係のインストール

```bash
npm install
```

### 4. 環境変数の設定

`.dev.vars` ファイルを作成し、必要な環境変数を設定します：

```bash
# .dev.vars
API_KEY=your-secret-api-key-here
QUITA_API_TOKEN=your-quita-token-here
GEMINI_API_KEY=your-gemini-api-key-here
CORS_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:5173 
```

### 5. データベースのセットアップ

ローカル開発用のD1データベースをセットアップします：

```bash
./bin/db-setup.sh local
```

このスクリプトは以下を実行します：
- Cloudflare ログイン状態の確認
- D1データベースの作成（存在しない場合）
- マイグレーションの適用

## 開発サーバーの起動

### ローカル開発サーバー

```bash
npm run dev
```

サーバーは `http://localhost:8787` で起動します。

### 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# 本番デプロイ
npm run deploy

# 型チェック
npm run typecheck

# コードフォーマット
npm run format

# リント
npm run lint

# テスト実行
npm run test
```

## API エンドポイント

### GET /api/summaries
保存されている記事サマリーの一覧を取得

```bash
curl -X GET http://localhost:8787/api/summaries
```

### POST /api/summarize
指定したキーワードで記事を検索し、サマリーを生成

```bash
curl -X POST http://localhost:8787/api/summarize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-api-key-here" \
  -d '{
    "keyword": "React",
    "created_at": {
      "from": "2024-06-21T00:00:00Z",
      "to": "2024-06-28T23:59:59Z"
    }
  }'
```

#### 本番環境
```bash
# 実際のURLはデプロイ後に確認してください
curl -X POST https://your-worker-name.your-subdomain.workers.dev/api/summarize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-api-key-here" \
  -d '{
    "keyword": "React",
    "created_at": {
      "from": "2024-06-21T00:00:00Z",
      "to": "2024-06-28T23:59:59Z"
    }
  }'
```

## テスト

### 基本的な動作確認

1. **サーバー起動確認**
```bash
curl -X GET http://localhost:8787/
# 期待されるレスポンス: "Not Found" (ルートパスは未定義)
```

2. **サマリー一覧取得**
```bash
curl -X GET http://localhost:8787/api/summaries
# 期待されるレスポンス: {"success":true,"count":0,"summaries":[]}
```

3. **記事サマリー生成**
```bash
curl -X POST http://localhost:8787/api/summarize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-secret-api-key-here" \
  -d '{"keyword":"React","created_at":{"from":"2024-06-21T00:00:00Z","to":"2024-06-28T23:59:59Z"}}'
```

### 自動テスト

```bash
# モックAPIを使用したテスト
npm run test:mock

# 実際のAPIを使用したテスト
npm run test:real

# 全テスト実行
npm run test
```

## デプロイ

### 本番環境へのデプロイ

```bash
# 本番デプロイスクリプトを使用
./bin/deploy.sh production

# または直接wranglerを使用
npm run deploy:production
```

### ステージング環境へのデプロイ

```bash
npm run deploy:staging
```
## 開発用スクリプト

`bin/` ディレクトリには以下の便利なスクリプトがあります：

- `db-setup.sh`: データベースセットアップ
- `deploy.sh`: デプロイスクリプト
- `reset-dev-db.sh`: 開発用DBリセット
- `import-dev-data.sh`: 開発用データインポート
- `test-api.sh`: APIテストスクリプト