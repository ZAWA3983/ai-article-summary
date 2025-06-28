import type { QuitaArticle } from '../../domain/quita-domain';
import type { QuitaArticleSummary } from '../../domain/quita-domain';
import type { SummarizeRepository } from '../../repo/gemini-repo';

export class SummarizeArticleService {
  constructor(private readonly summarizeRepository: SummarizeRepository) {}

  async execute(article: QuitaArticle, keyword: string): Promise<QuitaArticleSummary> {
    return this.summarizeRepository.summarize(article, keyword);
  }
} 