import { D1Database } from '@cloudflare/workers-types';
import { handleApiRequest } from './api';
import { handleStaticFiles, handleWebRequest } from './web';

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
}

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  // APIエンドポイント
  if (url.pathname.startsWith('/api/')) {
    return handleApiRequest(request, env);
  }

  // 静的ファイル配信
  if (url.pathname.startsWith('/static/')) {
    return handleStaticFiles(request, env);
  }

  // Webページエンドポイント（ルートパスなど）
  if (url.pathname === '/' || url.pathname === '/index.html') {
    return handleWebRequest(request, env);
  }

  // その他のWebページ
  if (!url.pathname.startsWith('/api/')) {
    return handleWebRequest(request, env);
  }

  // デフォルトは404
  return new Response('Not Found', { status: 404 });
}
