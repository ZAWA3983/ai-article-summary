Mantine コンポーネント優先
画面要素は必ず Mantine のプリミティブ (Box, Flex, Stack, Group, Center, Paper, など) を使用する。
生の <div>, <span> は 禁止。レイアウト調整が難しい場合は Box を使う。
例外は以下のみ許可: <thead> / <tbody>（Table 内部）、<svg>（アイコン用）、アクセシビリティに必要なネイティブ要素。
宣言的レイアウト
行方向は Flex, 列方向は Stack or Grid を使用し、margin や padding のハードコード禁止。
余白は theme.spacing.*、幅・高さは rem()・px() ヘルパで表現。
テーマ一貫性
色は theme.colors.* から取得。直接 HEX / RGB を書かない。
ダークモード対応は useMantineTheme と colorScheme で分岐。
フォントサイズ・フォントウェイトは theme.fontSizes, theme.headings を使用。
スタイリング方法
原則として sx prop か createStyles を用いる。
CSS‑in‑JS 内でグローバルセレクタ（*, #root など）は使用しない。
style prop（インラインスタイル）はデバッグ用の一時利用に留め、PR には残さない。
コンポーネント設計
1 つのファイルに 1 つのコンポーネント。
プレゼンテーショナル / コンテナ分離: UI とロジックは分け、hooks に副作用を閉じ込める。
Props は camelCase、論理値は is, has プレフィックスを推奨。
アクセシビリティ
クリックできる要素には role と aria-label を付与。
キーボード操作を保証 (onKeyDown, tabIndex={0} 等)。
色のみで情報を伝えない。<Text color="red.6"> → 併記アイコンやメッセージを追加。
アイコンの扱い
アイコンは @tabler/icons-react + Mantine の ThemeIcon, ActionIcon を併用。直接 <svg> をコピペしない。
サイズは rem() で可変に。
レスポンシブ
Breakpoints は theme.fn.smallerThan('md') などのヘルパで。
複雑なレスポンシブは use-media-query フックより @mantine/core の Breakpoint ユーティリティを優先。
