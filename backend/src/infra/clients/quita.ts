import type { QuitaArticle, QuitaSearchParams } from '../../domain/quita-domain';
import type { QuitaRepository } from '../../repo/quita-repo';

export class QuitaApi implements QuitaRepository {
  private readonly baseUrl = 'https://qiita.com/api/v2';
  private readonly MAX_PAGES = 50; // 最大50ページまで
  private readonly PER_PAGE = 100; // 1ページあたり100件
  private readonly apiToken: string;

  constructor(apiToken: string) {
    if (!apiToken) {
      throw new Error('QUITA_API_TOKEN is required but not provided');
    }
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

      // Qiita APIの認証ヘッダー（Bearer形式のみ）
      const authHeader = `Bearer ${this.apiToken}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Quita API error: ${response.status} ${response.statusText}`);
      }

      const articles = (await response.json()) as readonly QuitaArticle[];

      if (articles.length === 0) break; // 記事がなくなったら終了

      allArticles.push(...articles);
      page++;
    }

    return allArticles;
  }
}
