import type { QuitaArticle, QuitaSearchParams } from '../../domain/quita/types';
import type { QuitaRepository } from '../../repo/quita';

export class QuitaApi implements QuitaRepository {
  private readonly baseUrl = 'https://qiita.com/api/v2';
  private readonly MAX_PAGES = 50; // 最大50ページまで
  private readonly PER_PAGE = 100; // 1ページあたり100件

  async searchArticles(params: QuitaSearchParams): Promise<readonly QuitaArticle[]> {
    const allArticles: QuitaArticle[] = [];
    let page = 1;
    
    while (page <= this.MAX_PAGES) {
      const queryParams = new URLSearchParams({
        query: `${params.query} created:>=${params.created_at.from} created:<=${params.created_at.to}`,
        per_page: this.PER_PAGE.toString(),
        page: page.toString(),
      });

      const response = await fetch(`${this.baseUrl}/items?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${process.env.QUITA_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Quita API error: ${response.statusText}`);
      }

      const articles = await response.json() as readonly QuitaArticle[];
      if (articles.length === 0) break; // 記事がなくなったら終了
      
      allArticles.push(...articles);
      page++;
    }

    return allArticles;
  }
}
