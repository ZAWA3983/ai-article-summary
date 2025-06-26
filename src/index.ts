import { D1Database, ExecutionContext, ScheduledEvent } from '@cloudflare/workers-types';
import { handleScheduled } from './api/handlers/scheduled';
import { handleRequest } from './router';

export interface Env {
  DB: D1Database;
  QUITA_API_TOKEN: string;
  GEMINI_API_KEY: string;
  API_KEY: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return handleRequest(request, env);
  },

  // 定期実行用のスケジュール
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    await handleScheduled(event, env);
  },
};
