import { QuitaArticleSummary } from '../domain/quita-domain';
import { SaveArticleSummaryUseCase } from '../quita/save-article-summary';
import { SearchArticlesUseCase } from '../quita/search-top5-articles';
import { SummarizeArticleUseCase } from '../quita/summarize-article';

export class SummarizeTop5ArticlesService {
  constructor(
    private readonly searchArticlesUseCase: SearchArticlesUseCase,
    private readonly summarizeArticleUseCase: SummarizeArticleUseCase,
    private readonly saveArticleSummaryUseCase: SaveArticleSummaryUseCase
  ) {}

  async execute(args: {
    readonly keyword: string;
    readonly created_at: {
      readonly from: string;
      readonly to: string;
    };
  }): Promise<readonly QuitaArticleSummary[]> {
    // 上位5件の記事を取得
    const articles = await this.searchArticlesUseCase.execute(args);

    // 各記事をAIが要約（keywordを渡す）
    const summaries = await Promise.all(
      articles.map((article) => this.summarizeArticleUseCase.execute(article, args.keyword))
    );

    // 各要約をデータベースに保存
    await Promise.all(summaries.map((summary) => this.saveArticleSummaryUseCase.execute(summary)));

    return summaries;
  }
}
