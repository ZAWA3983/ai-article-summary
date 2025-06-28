# Cursor Coding

あなたは、明確で読みやすいコードを作成することに特化した専門のAIプログラミングアシスタントです。
以下のルールに従う必要があります。

──────────────────────────────────
## 0. Tech Stack
- TypeScript 5.x, ES2024 modules, "strict": true, noUncheckedIndexedAccess: true。
- Cloudflare Workers（D1/Secrets/定期実行）。
- React 18 + Mantine UI v7（SPA構成）。
- Day.js（utc/timezoneプラグイン）, Zod, Biome（formatter & linter）。

──────────────────────────────────
## 1. Coding Style
### 1-A. 基本指針
1. 関数型＆宣言型を第一選択。クラスは Error Boundary 等に限定。
2. 小さな純粋関数を優先し、重複よりも「明示的な反復」とモジュール化を選ぶ。
3. 変数・関数は動詞＋名詞、boolは is/has/should/can 接頭辞。
4. 列挙型は禁止。as const オブジェクト or 文字列リテラル union を使用。
5. すべて named export。default export は React コンポーネントのみ。
6. 非同期処理は async/await。公開関数／定数には readonly。
7. 例外は throw/try-catch。Result<T,E> 型は採用しない。
8. Biome のルールは厳守（disable コメント禁止）。

### 1-B. ファイル構成

src/
├─ api/         # APIエンドポイント・ハンドラー・ミドルウェア
│  ├─ handlers/
│  ├─ middleware/
│  └─ index.ts
├─ web/         # Webページ機能（React SPA）
│  ├─ components/
│  ├─ client.tsx
│  ├─ index.html
│  └─ index.ts
├─ shared/      # API・Webで共通利用するドメイン/ユースケース/サービス/リポジトリ/インフラ
│  ├─ domain/
│  ├─ quita/
│  ├─ services/
│  ├─ repo/
│  └─ infra/
├─ router.ts    # fetchリクエストのルーティング（API/Web/静的ファイル等を分岐）
└─ index.ts     # Cloudflare Workersのエントリーポイント（ルーターに委譲）

- Cloudflare Workersでは src/index.ts が唯一のエントリーポイントとなる。
- ルーティングは router.ts で一元管理し、API/Web/静的ファイル等の分岐を行う。
- API機能は api/、Web機能は web/、共通ロジックは shared/ に集約する。
- 依存は必ず内向きのみ。shared/domain は誰にも依存しない。
- DIはコンストラクタ注入。API/Webの各ハンドラーでユースケースを呼び出す。
- 認証は api/middleware で実装し、必要なAPIハンドラーに注入する。
- 静的ファイル配信やWebページ機能は web/ 配下で管理する。
- React SPAは web/ 配下に実装し、esbuildでバンドルして配信する。

──────────────────────────────────
## 2. UI & Styling
1. Mantine UIコンポーネント。インライン style は禁止。
2. コンポーネント階層
   - Publicコンポーネント → サブコンポーネント → hooks → helpers → types の順に記述。
3. アクセシビリティ: ARIA属性を必ず付与。
4. 画像は WebP/AVIF、loading="lazy"、width/height を必ず指定。
5. クライアント部品は lazy()＋fallback。
6. レスポンシブ（sm: 以上を足す）。Dark Mode は class 切替。

──────────────────────────────────
## 3. パフォーマンス & 可観測性
- useEffect と setState を最小限に。
- 重い selector は useMemo / memo()。
- Cloudflare Cache (KV) で読み取りをキャッシュ、mutation 時にタグ無効化。

──────────────────────────────────
## 4. Testing
| レイヤ            | ツール              | 必須カバレッジ |
|-------------------|---------------------|----------------|
| shared/domain     | Vitest + tsx        | 100 %          |
| shared/application| ^                   | 100 %          |
| api/handlers      | Vitest (mock infra) | 80 %           |
| E2E               | Playwright          | 主要シナリオ   |

- テストは __tests__/。Snapshot は極力避け、意味のある assertion を書く。

──────────────────────────────────
## 5. CI / CD / Git
1. GitHub Actions: lint → type-check → unit → e2e → build → deploy-preview。
2. コミットは Conventional Commits。例:
   - feat(api): add summarize endpoint
   - fix(shared/domain): price rounding error
3. PR はレビュー必須。main へのマージは Squash merge のみ。

──────────────────────────────────
## 6. ドキュメント & 規約
- すべての public API に TSDoc (@param, @returns, @example) を付与。
- 新しい設計判断は /adr に ADR として追加。
- コード／README は基本日本語、public OSS 提供部分のみ英語。

──────────────────────────────────
## 7. セキュリティ & Secrets
- Secrets は GitHub Actions と Cloudflare Secrets に保存。.env は commit 禁止。
- Prisma schema 変更は必ず migrate dev → migrate deploy。
