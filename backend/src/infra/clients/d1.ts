import { D1Database } from '@cloudflare/workers-types';
import { QuitaArticleSummary, QuitaArticleSummaryListItem } from '../../domain/quita-domain';
import { D1Repository } from '../../repo/d1-repo';

export interface D1Client {
  query<T = unknown>(sql: string, params?: readonly unknown[]): Promise<D1Result<T>>;
  insert(sql: string, params?: readonly unknown[]): Promise<D1Result<unknown>>;
}

export interface D1Result<T> {
  results: T[];
  success: boolean;
  meta: {
    changes: number;
    last_row_id: number;
    duration: number;
  };
}

export class CloudflareD1Client implements D1Client {
  constructor(private db: D1Database) {}

  query<T = unknown>(sql: string, params?: readonly unknown[]): Promise<D1Result<T>> {
    return this.db
      .prepare(sql)
      .bind(...(params || []))
      .all<T>();
  }

  async insert(sql: string, params?: readonly unknown[]): Promise<D1Result<unknown>> {
    return this.db
      .prepare(sql)
      .bind(...(params || []))
      .run();
  }
}

// D1クライアントのファクトリー関数
export function createD1Client(db: D1Database): D1Client {
  return new CloudflareD1Client(db);
}

// D1リポジトリの実装
export class CloudflareD1Repository implements D1Repository {
  constructor(private d1Client: D1Client) {}

  async saveArticleSummary(summary: QuitaArticleSummary): Promise<void> {
    // まず元記事の情報を保存
    const articleSql = `
      INSERT OR REPLACE INTO articles (
        id, title, url, likes_count, created_at, updated_at, 
        user_id, user_name, body, rendered_body
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.d1Client.insert(articleSql, [
      summary.originalArticle.id,
      summary.originalArticle.title,
      summary.originalArticle.url,
      summary.originalArticle.likes_count,
      summary.originalArticle.created_at,
      summary.originalArticle.updated_at,
      summary.originalArticle.user.id,
      summary.originalArticle.user.name,
      summary.originalArticle.body,
      summary.originalArticle.rendered_body,
    ]);

    // タグ情報を保存
    for (const tag of summary.originalArticle.tags) {
      const tagSql = `
        INSERT OR REPLACE INTO article_tags (
          article_id, tag_name, tag_versions
        ) VALUES (?, ?, ?)
      `;

      await this.d1Client.insert(tagSql, [
        summary.originalArticle.id,
        tag.name,
        JSON.stringify(tag.versions),
      ]);
    }

    // 記事サマリーを保存
    const summarySql = `
      INSERT OR REPLACE INTO article_summaries (
        id, title, url, summary_heading, summary_catch, summary_text, 
        target_audience, disclaimer, created_at, updated_at, original_article_id, keyword
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.d1Client.insert(summarySql, [
      summary.id,
      summary.title,
      summary.url,
      summary.summary.heading,
      summary.summary.catch,
      summary.summary.summaryText,
      summary.summary.targetAudience,
      summary.disclaimer,
      summary.created_at,
      summary.updated_at,
      summary.originalArticle.id,
      summary.keyword,
    ]);
  }

  async getAllArticleSummaries(): Promise<QuitaArticleSummaryListItem[]> {
    const sql = `
      SELECT 
        s.id, s.url, s.summary_heading, s.summary_catch, s.summary_text, 
        s.target_audience, s.disclaimer, s.created_at, s.keyword
      FROM article_summaries s
      ORDER BY s.created_at DESC
    `;

    const result = await this.d1Client.query<{
      id: string;
      url: string;
      summary_heading: string;
      summary_catch: string;
      summary_text: string;
      target_audience: string;
      disclaimer: string;
      created_at: string;
      keyword: string;
    }>(sql);

    return result.results.map(row => ({
      id: row.id,
      url: row.url,
      summary: {
        heading: row.summary_heading,
        catch: row.summary_catch,
        summaryText: row.summary_text,
        targetAudience: row.target_audience,
      },
      disclaimer: row.disclaimer,
      created_at: row.created_at,
      keyword: row.keyword,
    }));
  }

  async getArticleSummaryById(id: string): Promise<QuitaArticleSummaryListItem | null> {
    const sql = `
      SELECT 
        s.id, s.url, s.summary_heading, s.summary_catch, s.summary_text, 
        s.target_audience, s.disclaimer, s.created_at, s.keyword
      FROM article_summaries s
      WHERE s.id = ?
    `;

    const result = await this.d1Client.query<{
      id: string;
      url: string;
      summary_heading: string;
      summary_catch: string;
      summary_text: string;
      target_audience: string;
      disclaimer: string;
      created_at: string;
      keyword: string;
    }>(sql, [id]);

    if (result.results.length === 0) {
      return null;
    }

    const summaryData = result.results[0];

    return {
      id: summaryData.id,
      url: summaryData.url,
      summary: {
        heading: summaryData.summary_heading,
        catch: summaryData.summary_catch,
        summaryText: summaryData.summary_text,
        targetAudience: summaryData.target_audience,
      },
      disclaimer: summaryData.disclaimer,
      created_at: summaryData.created_at,
      keyword: summaryData.keyword,
    };
  }
}

// D1リポジトリのファクトリー関数
export function createD1Repository(d1Client: D1Client): D1Repository {
  return new CloudflareD1Repository(d1Client);
}
