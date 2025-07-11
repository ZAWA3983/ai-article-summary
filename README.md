# AI記事サマリー

**🚀 本番環境のリンク**: [https://ai-article-summary.pages.dev/](https://ai-article-summary.pages.dev/)

## なにをしたいか

- 最新の技術記事のうち、人気のものに絞りたい。
- その記事の内容が一目でわかるように集約したい。


### 解決したい課題

- **情報過多**: 毎日大量の技術記事が投稿され、全てを読む時間がない
- **記事の質の見極め**: どの記事が自分にとって価値があるか判断が難しい
- **効率的な学習**: 重要なポイントを素早く把握したい

### 提供する価値

- **自動要約**: 毎週月曜日に最新の「生成AI」関連記事を自動収集・要約
- **質の高い記事**: その週に投稿された記事の中で人気度の高いものに絞る。
- **時間の節約**: 長い記事を数分で理解できる要約を提供

## 目的

### プライマリゴール
開発者(特に私)が技術トレンドを効率的にキャッチアップできるプラットフォームの構築

### セカンダリゴール
- AI技術の実践的な活用事例の検証
- サーバーレスアーキテクチャでの自動化システムの構築
- Cursorの上手な使い方の模索

## 全体のアーキテクチャ

### 設計思想
**完全分離型マイクロサービスアーキテクチャ**を採用し、各コンポーネントの独立性とスケーラビリティを重視しています。

### システム構成

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (React)       │◄──►│   (Workers)     │◄──►│   Services      │
│                 │    │                 │    │                 │
│ - Article List  │    │ - API Gateway   │    │ - Qiita API     │
│ - Summary View  │    │ - AI Processing │    │ - Gemini AI     │
│ - Modern UI     │    │ - Data Storage  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Database      │
                       │   (D1)          │
                       │                 │
                       │ - Summaries     │
                       │ - Metadata      │
                       └─────────────────┘
```

### 技術選択の理由

#### フロントエンド: React + Vite + Cloudflare Pages
- **React**: 業界標準で豊富なエコシステムと開発者体験
- **Vite**: 高速な開発環境とビルド
- **Mantine**: 豊富なUIコンポーネント
- **Cloudflare Pages**: 無料プランが充実、Workersとの統合が優れている

#### バックエンド: Cloudflare Workers + D1
- **Workers**: 無料枠が十分、高い性能を提供
- **D1**: 無料で利用可能、SQLiteベースで高速な分散データベース
- **Cron Triggers**: 定期実行による自動化

#### AI・外部サービス
- **Gemini AI**: 学生向け無料プランが利用可能、高精度な要約生成
- **Qiita API**: 日本語技術記事の豊富なソース

### データフロー

1. **定期収集** (毎週月曜日 7:00 JST)
   - Qiitaから「生成AI」関連記事を検索
   - 人気度で上位5件を選定

2. **AI要約**
   - Gemini AIで記事内容を要約
   - キーポイントと技術的価値を抽出

3. **データ保存**
   - D1データベースに要約とメタデータを保存

4. **ユーザー提供**
   - Reactフロントエンドで要約一覧を表示
   - 元記事へのリンクも提供

## プロジェクト構造

```
ai-article-summary/
├── frontend/                    # React + Vite フロントエンド
│   ├── src/
│   │   ├── components/         # UIコンポーネント
│   │   │   ├── ArticleCard.tsx # 記事カード表示
│   │   │   └── ArticleList.tsx # 記事一覧表示
│   │   ├── services/           # API通信層
│   │   └── config/             # 環境設定
│   └── package.json
├── backend/                     # Cloudflare Workers バックエンド
│   ├── src/
│   │   ├── api/                # APIエンドポイント
│   │   │   ├── summaries.ts    # 記事一覧API
│   │   │   └── scheduled.ts    # 定期実行API
│   │   ├── services/           # ビジネスロジック
│   │   │   └── article/        # 記事関連サービス
│   │   ├── infra/              # 外部サービス連携
│   │   │   ├── quita.ts        # Qiita API クライアント
│   │   │   └── gemini.ts       # Gemini AI クライアント
│   │   └── repo/               # データアクセス層
│   │       └── d1-repo.ts      # D1データベース操作
│   ├── migrations/             # データベーススキーマ
│   └── package.json
├── bin/                        # 開発・デプロイスクリプト
│   ├── db-setup.sh            # DB初期化
│   ├── deploy.sh              # デプロイ自動化
│   └── import-dev-data.sh     # 開発データ投入
└── README.md
```

### アーキテクチャパターン

#### バックエンド: クリーンアーキテクチャ
- **API層**: リクエスト/レスポンス処理
- **サービス層**: ビジネスロジック
- **インフラ層**: 外部サービス連携
- **リポジトリ層**: データアクセス

#### フロントエンド: コンポーネントベース
- **プレゼンテーション層**: UIコンポーネント
- **サービス層**: API通信
- **設定層**: 環境変数管理

## 開発・デプロイ

詳細なセットアップ手順は各ディレクトリのREADMEを参照してください

- [フロントエンド開発ガイド](./frontend/README.md)
- [バックエンド開発ガイド](./backend/README.md)
