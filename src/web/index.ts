import { D1Database } from '@cloudflare/workers-types';

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
}

// 将来的なWebページハンドラー
export async function handleWebRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  // 例: 記事一覧ページ
  if (url.pathname === '/') {
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>AI記事要約サービス</title>
        </head>
        <body>
          <h1>AI記事要約サービス</h1>
          <p>記事一覧がここに表示されます</p>
        </body>
      </html>
    `,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  // 例: 静的ファイル配信
  if (url.pathname.startsWith('/static/')) {
    // 静的ファイルの配信ロジック
    return new Response('Static file', { status: 404 });
  }

  return new Response('Not Found', { status: 404 });
}

// 将来的な静的ファイルハンドラー
export async function handleStaticFiles(request: Request, env: Env): Promise<Response> {
  // CSS、JavaScript、画像などの静的ファイル配信
  return new Response('Static files not implemented yet', { status: 501 });
}
