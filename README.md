# AI Article Summary

Qiita記事をAIで要約するアプリケーション

## 機能

- Qiita APIから記事を検索
- Gemini AIを使用して記事を要約
- 構造化された要約データの生成

## 技術スタック

- TypeScript 5.x
- Vitest (テスト)
- Biome (lint/formatter)
- Google Generative AI (Gemini)
- Qiita API

## 開発環境のセットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# テストの実行
pnpm test

# モックモードでのテスト
pnpm test:mock

# 実際のAPIを使用したテスト
pnpm test:real
```

## 環境変数

```bash
# Gemini API トークン
GEMINI_API_TOKEN=your_gemini_api_token

# 実際のAPIを使用するかどうか
USE_REAL_API=true
```

## CI/CD

GitHub Actionsでプルリクエスト時に以下のワークフローが実行されます：

- リンター実行 (`pnpm run lint`)
- 型チェック (`pnpm run type-check`)
- モックモードでのテスト (`USE_REAL_API=false`)

## アーキテクチャ

```
src/
├── application/  # ユースケース層
├── domain/      # ドメインモデル層
├── repo/        # リポジトリインターフェース層
└── infra/       # インフラストラクチャ層
```

## テスト

- **モックモード**: 外部APIを使用せず、モックデータでテスト（CIで使用）
- **実際のAPIモード**: 実際のGemini APIとQiita APIを使用してテスト（ローカル開発時）

プルリクエスト時はモックモードで高速にテストを実行し、コードの品質を保証します。 