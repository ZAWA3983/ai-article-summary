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

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
}

export async function handleScheduled(env: Env): Promise<Response> {
  try {
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

    // 現在の日付から1週間前の範囲で「AI」キーワードで検索
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const summaries = await service.execute({
      keyword: 'AI',
      created_at: {
        from: oneWeekAgo.toISOString(),
        to: now.toISOString(),
      },
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
    console.error('Scheduled endpoint error:', error);
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
