import type { QuitaArticle } from '../domain/quita-domain';
import type { QuitaArticleSummary } from '../domain/quita-domain';
import type { SummarizeRepository } from '../repo/summarize-repo';

export class SummarizeArticleUseCase {
  constructor(private readonly summarizeRepository: SummarizeRepository) {}

  async execute(article: QuitaArticle): Promise<QuitaArticleSummary> {
    return this.summarizeRepository.summarize(article);
  }
} 