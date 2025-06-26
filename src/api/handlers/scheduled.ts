import { D1Database, ScheduledEvent } from '@cloudflare/workers-types';
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
}

export async function handleScheduled(event: ScheduledEvent, env: Env): Promise<void> {
  try {
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

    // 過去7日間の「生成AI」関連記事を要約
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    await service.execute({
      keyword: '生成AI',
      created_at: {
        from: sevenDaysAgo.toISOString(),
        to: now.toISOString(),
      },
    });

    console.log('定期実行が完了しました');
  } catch (error) {
    console.error('定期実行でエラーが発生しました:', error);
  }
}
