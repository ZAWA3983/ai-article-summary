import { QuitaArticleSummary } from '../../domain/quita-domain';
import { SummarizeArticleUseCase } from '../summarize-article';
import { SearchArticlesUseCase } from './search-top5-articles';

export class SummarizeTop5ArticlesUseCase {
  constructor(
    private readonly searchArticlesUseCase: SearchArticlesUseCase,
    private readonly summarizeArticleUseCase: SummarizeArticleUseCase
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

    // 各記事をAIが要約
    const summaries = await Promise.all(
      articles.map((article) => this.summarizeArticleUseCase.execute(article))
    );

    return summaries;
  }
}
