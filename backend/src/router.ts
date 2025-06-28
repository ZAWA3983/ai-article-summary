import { D1Database } from '@cloudflare/workers-types';
import { handleGetAllSummaries } from './api/handlers/summaries';
import { handleSummarize } from './api/handlers/summarize';
import { handleScheduled } from './api/handlers/scheduled';
import { addCorsHeaders, handleCors } from './api/middleware/cors';

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
  CORS_ORIGIN?: string;
}

export async function handleRequest(request: Request, env: Env): Promise<Response> {
  // CORSプリフライトリクエストの処理
  const corsResponse = handleCors(request, env);
  if (corsResponse) {
    return corsResponse;
  }

  const url = new URL(request.url);
  const path = url.pathname;
  const requestOrigin = request.headers.get('Origin') || undefined;

  try {
    let response: Response;

    // APIルート
    if (path.startsWith('/api/')) {
      if (path === '/api/summaries' && request.method === 'GET') {
        response = await handleGetAllSummaries(request, env);
      } else if (path === '/api/summarize' && request.method === 'POST') {
        response = await handleSummarize(request, env);
      } else {
        response = new Response('Not Found', { status: 404 });
      }
    } else {
      response = new Response('Not Found', { status: 404 });
    }

    // CORSヘッダーを追加
    return addCorsHeaders(response, env, requestOrigin);
  } catch (error) {
    console.error('Request handling error:', error);
    const errorResponse = new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return addCorsHeaders(errorResponse, env, requestOrigin);
  }
}
