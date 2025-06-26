import { D1Database } from '@cloudflare/workers-types';
import { createD1Client, createD1Repository } from '../../shared/infra/clients/d1';
import { GetAllArticleSummariesUseCase } from '../../shared/quita/get-all-article-summaries';

export interface Env {
  DB: D1Database;
  API_KEY: string;
}

export async function handleGetSummaries(request: Request, env: Env): Promise<Response> {
  try {
    const d1Client = createD1Client(env.DB);
    const d1Repository = createD1Repository(d1Client);
    const getAllArticleSummariesUseCase = new GetAllArticleSummariesUseCase(d1Repository);

    const summaries = await getAllArticleSummariesUseCase.execute();

    return new Response(
      JSON.stringify({
        success: true,
        summaries,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Get summaries endpoint error:', error);
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
