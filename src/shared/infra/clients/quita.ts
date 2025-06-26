import type { QuitaArticle, QuitaSearchParams } from '../../domain/quita-domain';
import type { QuitaRepository } from '../../repo/quita-repo';

export class QuitaApi implements QuitaRepository {
  private readonly baseUrl = 'https://qiita.com/api/v2';
  private readonly MAX_PAGES = 50; // 最大50ページまで
  private readonly PER_PAGE = 100; // 1ページあたり100件
  private readonly apiToken: string;

  constructor(apiToken: string) {
    this.apiToken = apiToken;
  }

  async searchArticles(params: QuitaSearchParams): Promise<readonly QuitaArticle[]> {
    const allArticles: QuitaArticle[] = [];
    let page = 1;

    while (page <= this.MAX_PAGES) {
      // 日付をYYYY-MM-DD形式に変換
      const fromDate = new Date(params.created_at.from).toISOString().split('T')[0];
      const toDate = new Date(params.created_at.to).toISOString().split('T')[0];

      // Qiita APIの検索クエリを構築
      // キーワード検索と日付範囲フィルタリング
      const searchQuery = `${params.query} created:>=${fromDate} created:<=${toDate}`;

      const queryParams = new URLSearchParams({
        query: searchQuery,
        per_page: this.PER_PAGE.toString(),
        page: page.toString(),
      });

      const apiUrl = `${this.baseUrl}/items?${queryParams.toString()}`;
      console.log('Qiita API Request:', apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Qiita API Error:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          errorText,
        });
        throw new Error(`Quita API error: ${response.status} ${response.statusText}`);
      }

      const articles = (await response.json()) as readonly QuitaArticle[];
      console.log(`Page ${page}: Found ${articles.length} articles`);

      if (articles.length === 0) break; // 記事がなくなったら終了

      allArticles.push(...articles);
      page++;
    }

    console.log(`Total articles found: ${allArticles.length}`);
    return allArticles;
  }
}
