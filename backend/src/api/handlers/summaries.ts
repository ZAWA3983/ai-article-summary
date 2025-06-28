import { D1Database } from '@cloudflare/workers-types';
import { createD1Client, createD1Repository } from '../../infra/clients/d1';
import { GetAllArticleSummariesService } from '../../services';
import { addCorsHeaders } from '../middleware/cors';

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
  CORS_ORIGIN?: string;
}

export async function handleGetAllSummaries(request: Request, env: Env): Promise<Response> {
  try {
    const d1Client = createD1Client(env.DB);
    const d1Repository = createD1Repository(d1Client);

    const getAllArticleSummariesService = new GetAllArticleSummariesService(d1Repository);

    const summaries = await getAllArticleSummariesService.execute();

    const response = new Response(
      JSON.stringify({
        success: true,
        count: summaries.length,
        summaries,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const requestOrigin = request.headers.get('Origin') || undefined;
    return addCorsHeaders(response, env, requestOrigin);
  } catch (error) {
    console.error('Get all summaries endpoint error:', error);
    const response = new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    const requestOrigin = request.headers.get('Origin') || undefined;
    return addCorsHeaders(response, env, requestOrigin);
  }
}
