# Cursor Coding


あなたは、明確で読みやすいコードをを作成することに特化した専門のAIプログラミングアシスタントです。
以下のルールに従う必要があります。 

──────────────────────────────────
## 0. Tech Stack
- TypeScript 5.x, ES2024 modules, `"strict": true`, `noUncheckedIndexedAccess: true`.
- React 19 + Remix v2 (App Router).
- Prisma ORM → Cloudflare D1 (SQLite).
- Mantine UI v7 ＋ TailwindCSS v3 （`class` strategy / mobile-first）。
- Day.js（`utc` / `timezone` プラグイン）, Zod, Biome（formatter & linter）。

──────────────────────────────────
## 1. Coding Style
### 1-A. 基本指針
1. **関数型 & 宣言型** を第一選択。クラスは Error Boundary 等に限定。  
2. 小さな純粋関数を優先し、重複よりも「明示的な反復」とモジュール化を選ぶ。  
3. 変数・関数は動詞＋名詞、bool は `is/has/should/can` 接頭辞。  
4. 列挙型は禁止。`as const` オブジェクト or 文字列リテラル union を使用。  
5. すべて named export。default export は Remix ルートと RSC だけ。  
6. 非同期処理は `async/await`。公開関数／定数には `readonly`。  
7. 例外は `throw` / `try-catch`。`Result<T,E>` 型は採用しない。  
8. Biome のルールは厳守（disable コメント禁止）。

### 1-B. ファイル構成

src/
├─ ui/ # Remix ルート & 汎用 UI コンポーネント
│ ├─ components/
│ └─ routes/
├─ batch/ # 定期実行ワーカー
├─ application/ # ユースケース (サービス) 層
├─ domain/ # ドメインモデル (純粋 TS, 依存 0)
├─ repo/ # interface のみ
├─ infra/ # 外部アクセス実装
│ ├─ d1/ # Cloudflare D1
│ ├─ clients/ # 外部 REST / GraphQL
│ └─ adapters/ # 3rd-party services
└─ adr/ # Architecture Decision Records

- **依存は必ず内向きのみ**。`domain` は誰にも依存しない。  
- DI はコンストラクタ注入。Remix の `createContext` で per-request bind。  
- `repo` は interface、実装は `infra/**` 。  
- Remix `loader` / `action` は application ユースケースを呼び出す薄いラッパー。  
- 認証（auth.js）は application 層で実装し、ユースケースに注入。

──────────────────────────────────
## 2. UI & Styling
1. Mantine UI コンポーネント + Tailwind utility。インライン style は禁止。  
2. コンポーネント階層  
   - **Public コンポーネント** → **サブコンポーネント** → **hooks** → **helpers** → **types** の順に記述。  
3. アクセシビリティ: Radix‐UI primitives を併用し、ARIA 属性を必ず付与。  
4. 画像は WebP/AVIF、`loading="lazy"`、`width/height` を必ず指定。  
5. ルートごとに **親 `<Suspense>`** を配置し、クライアント部品は `lazy()` ＋ fallback。  
6. Tailwind でレスポンシブ（`sm:` 以上を足す）。Dark Mode は `class` 切替。

──────────────────────────────────
## 3. パフォーマンス & 可観測性
- `use client` は最小限。データ取得・状態管理はサーバー側（loader / RSC）を優先。  
- `useEffect` と `setState` を減らし、RSC + `defer` + ストリーミングで描画。  
- 重い selector は `useMemo` / `memo()`。  
- Cloudflare Cache (KV) で読み取りをキャッシュ、mutation 時にタグ無効化。  

──────────────────────────────────
## 4. Testing
| レイヤ            | ツール              | 必須カバレッジ |
|-------------------|---------------------|----------------|
| domain            | Vitest + tsx        | 100 %          |
| application       | ^                   | 100 %          |
| ui/routes/loader  | Vitest (mock infra) | 80 %           |
| E2E               | Playwright          | 主要シナリオ   |

- テストは `__tests__/`。Snapshot は極力避け、意味のある assertion を書く。

──────────────────────────────────
## 5. CI / CD / Git
1. GitHub Actions: `lint → type-check → unit → e2e → build → deploy-preview`。  
2. コミットは **Conventional Commits**。例:  
   - `feat(ui): add ArticleCard`  
   - `fix(domain): price rounding error`  
3. PR はレビュー必須。main へのマージは **Squash merge** のみ。  
4. PR description に `Closes #issue` と **テスト結果** を貼る。

──────────────────────────────────
## 6. ドキュメント & 規約
- すべての public API に TSDoc (`@param`, `@returns`, `@example`) を付与。  
- 新しい設計判断は `/adr` に ADR として追加。  
- コード／README は基本日本語、public OSS 提供部分のみ英語。  

──────────────────────────────────
## 7. セキュリティ & Secrets
- Secrets は GitHub Actions と Cloudflare Secrets に保存。`.env` は commit 禁止。  
- Prisma schema 変更は必ず `migrate dev` → `migrate deploy`。  
