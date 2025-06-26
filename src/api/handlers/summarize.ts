import { D1Database } from '@cloudflare/workers-types';
import { createD1Client, createD1Repository } from '../../shared/infra/clients/d1';
import { GeminiClient } from '../../shared/infra/clients/gemini';
import { QuitaApi } from '../../shared/infra/clients/quita';
import { SaveArticleSummaryUseCase } from '../../shared/quita/save-article-summary';
import { SearchArticlesUseCase } from '../../shared/quita/search-top5-articles';
import { SummarizeArticleUseCase } from '../../shared/quita/summarize-article';
import { SummarizeTop5ArticlesService } from '../../shared/services/summarize-top5-articles';

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
}

export async function handleSummarize(request: Request, env: Env): Promise<Response> {
  try {
    const { keyword, created_at } = await request.json();

    // 依存関係の注入
    const quitaApi = new QuitaApi(env.QUITA_API_TOKEN);
    const geminiApi = new GeminiClient(env.GEMINI_API_KEY);
    const d1Client = createD1Client(env.DB);
    const d1Repository = createD1Repository(d1Client);

    const searchArticlesUseCase = new SearchArticlesUseCase(quitaApi);
    const summarizeArticleUseCase = new SummarizeArticleUseCase(geminiApi);
    const saveArticleSummaryUseCase = new SaveArticleSummaryUseCase(d1Repository);

    const service = new SummarizeTop5ArticlesService(
      searchArticlesUseCase,
      summarizeArticleUseCase,
      saveArticleSummaryUseCase
    );

    const summaries = await service.execute({
      keyword,
      created_at,
    });

    return new Response(
      JSON.stringify({
        success: true,
        count: summaries.length,
        summaries,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Summarize endpoint error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
