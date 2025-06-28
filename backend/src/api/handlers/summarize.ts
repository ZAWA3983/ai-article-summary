import { D1Database } from '@cloudflare/workers-types';
import { createD1Client, createD1Repository } from '../../infra/clients/d1';
import { GeminiClient } from '../../infra/clients/gemini';
import { QuitaApi } from '../../infra/clients/quita';
import { 
  SaveArticleSummaryService,
  SearchArticlesService,
  SummarizeArticleService,
  SummarizeTop5ArticlesService
} from '../../services';
import { addCorsHeaders } from '../middleware/cors';

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
  CORS_ORIGIN?: string;
}

interface SummarizeRequest {
  keyword: string;
  created_at: {
    from: string;
    to: string;
  };
}

export async function handleSummarize(request: Request, env: Env): Promise<Response> {
  try {
    const { keyword, created_at } = await request.json() as SummarizeRequest;

    // 依存関係の注入
    const quitaApi = new QuitaApi(env.QUITA_API_TOKEN);
    const geminiApi = new GeminiClient(env.GEMINI_API_KEY);
    const d1Client = createD1Client(env.DB);
    const d1Repository = createD1Repository(d1Client);

    const searchArticlesService = new SearchArticlesService(quitaApi);
    const summarizeArticleService = new SummarizeArticleService(geminiApi);
    const saveArticleSummaryService = new SaveArticleSummaryService(d1Repository);

    const service = new SummarizeTop5ArticlesService(
      searchArticlesService,
      summarizeArticleService,
      saveArticleSummaryService
    );

    const summaries = await service.execute({
      keyword,
      created_at,
    });

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
    console.error('Summarize endpoint error:', error);
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
