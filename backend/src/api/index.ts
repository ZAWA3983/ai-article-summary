import { D1Database } from '@cloudflare/workers-types';
import { handleGetAllSummaries } from './handlers/summaries';
import { handleSummarize } from './handlers/summarize';
import { authenticate } from './middleware/auth';

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
  CORS_ORIGIN?: string;
}

export async function handleApiRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  // 記事要約エンドポイント
  if (url.pathname === '/api/summarize' && request.method === 'POST') {
    // 認証チェック
    const authResponse = authenticate(request, env);
    if (authResponse) {
      return authResponse;
    }

    return handleSummarize(request, env);
  }

  // 記事一覧取得エンドポイント
  if (url.pathname === '/api/summaries' && request.method === 'GET') {
    return handleGetAllSummaries(request, env);
  }

  return new Response('Not Found', { status: 404 });
}
