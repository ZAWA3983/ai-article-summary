import { QuitaArticleSummary } from '../../domain/quita-domain';
import { SaveArticleSummaryService } from './save-article-summary.service';
import { SearchArticlesService } from './search-articles.service';
import { SummarizeArticleService } from './summarize-article.service';

export class SummarizeTop5ArticlesService {
  constructor(
    private readonly searchArticlesService: SearchArticlesService,
    private readonly summarizeArticleService: SummarizeArticleService,
    private readonly saveArticleSummaryService: SaveArticleSummaryService
  ) {}

  async execute(args: {
    readonly keyword: string;
    readonly created_at: {
      readonly from: string;
      readonly to: string;
    };
  }): Promise<readonly QuitaArticleSummary[]> {
    // 上位5件の記事を取得
    const articles = await this.searchArticlesService.execute(args);

    // 各記事をAIが要約（keywordを渡す）
    const summaries = await Promise.all(
      articles.map((article) => this.summarizeArticleService.execute(article, args.keyword))
    );

    // 各要約をデータベースに保存
    await Promise.all(summaries.map((summary) => this.saveArticleSummaryService.execute(summary)));

    return summaries;
  }
} 