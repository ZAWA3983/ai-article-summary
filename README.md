# AI Article Summary

Qiitaの記事を自動で要約し、D1データベースに保存するCloudflare Workersアプリケーション

## 🚀 セットアップ

### 1. 必要なツールのインストール

```bash
# Node.js v20以上が必要
node --version

# Wrangler CLIのインストール
npm install -g wrangler
```

### 2. Cloudflareアカウントの準備

1. [Cloudflare](https://cloudflare.com)でアカウントを作成
2. Wranglerでログイン
```bash
wrangler login
```

### 3. D1データベースの作成

```bash
# D1データベースを作成
wrangler d1 create ai-article-summary-db

# 作成されたデータベースIDをwrangler.tomlに設定
# database_id = "your-database-id-here"

# スキーマを適用
wrangler d1 execute ai-article-summary-db --file=./schema.sql --remote
```

### 4. 環境変数の設定

### 1. ローカル開発用

```bash
# .envファイルを作成（env.exampleをコピー）
cp env.example .env

# .envファイルを編集して実際の値を設定
# API_KEY=your-actual-secret-key
# QUITA_API_TOKEN=your-actual-quita-token
# GEMINI_API_KEY=your-actual-gemini-key
```

### 2. 本番環境用（Cloudflare Workers）

```bash
# APIキーを設定
npx wrangler secret put API_KEY

# Qiita APIトークンを設定
npx wrangler secret put QUITA_API_TOKEN

# Gemini APIキーを設定
npx wrangler secret put GEMINI_API_KEY
```

**注意：** これらのコマンドを実行すると、対話的に値を入力するようになります。

### 5. デプロイ

```bash
# 本番環境にデプロイ
wrangler deploy

# ローカル開発
wrangler dev
```

## 📋 API仕様

### ベースURL
```
https://quita-ai-summary.ai-article-summary.workers.dev
```

### エンドポイント一覧

#### 1. 記事要約の実行
**POST** `/api/summarize`

記事の検索と要約を実行します。

**リクエスト例：**
```bash
curl -X POST https://quita-ai-summary.ai-article-summary.workers.dev/api/summarize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "keyword": "生成AI",
    "created_at": {
      "from": "2024-01-01T00:00:00Z",
      "to": "2024-01-31T23:59:59Z"
    }
  }'
```

**レスポンス例：**
```json
{
  "success": true,
  "message": "記事の要約が完了しました",
  "summaries": [
    {
      "id": "1",
      "title": "記事タイトル",
      "url": "https://qiita.com/...",
      "summary": "要約内容...",
      "keyword": "生成AI",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### 2. 要約記事一覧の取得
**GET** `/api/summaries`

保存されている要約記事の一覧を取得します。

**リクエスト例：**
```bash
curl https://quita-ai-summary.ai-article-summary.workers.dev/api/summaries
```

**レスポンス例：**
```json
{
  "success": true,
  "summaries": [
    {
      "id": "1",
      "title": "記事タイトル",
      "url": "https://qiita.com/...",
      "summary": "要約内容...",
      "keyword": "生成AI",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### 3. 特定記事の詳細取得
**GET** `/api/summaries/{id}`

指定されたIDの要約記事の詳細を取得します。

**リクエスト例：**
```bash
curl https://quita-ai-summary.ai-article-summary.workers.dev/api/summaries/1
```

#### 4. 記事検索
**GET** `/api/summaries/search?q={keyword}`

キーワードで要約記事を検索します。

**リクエスト例：**
```bash
curl "https://quita-ai-summary.ai-article-summary.workers.dev/api/summaries/search?q=生成AI"
```

### 認証と制限

**認証：**
- 要約実行エンドポイント（`/api/summarize`）にはAPIキー認証が必要
- `Authorization: Bearer YOUR_API_KEY`ヘッダーを設定

**レート制限：**
- 1分間に最大3回まで
- 不正なアクセスは401エラーで拒否
- レート制限超過時は429エラーが返される

**エラーレスポンス：**
```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

## 🏗️ アーキテクチャ

```
src/
├── application/     # ユースケース層
├── domain/         # ドメインモデル
├── infra/          # インフラ層（D1、外部API）
├── repo/           # リポジトリインターフェース
└── services/       # サービス層
```

## 💰 料金

- **Cloudflare Workers**: 無料プランで1日100,000リクエスト
- **D1 Database**: 無料プランで512MB、1日100,000読み書き
- **定期実行**: 無料プランで1日100,000回まで

## 🔧 開発

```bash
# 依存関係のインストール
pnpm install

# テスト実行
pnpm test

# ローカル開発
wrangler dev

# 本番デプロイ
wrangler deploy
```