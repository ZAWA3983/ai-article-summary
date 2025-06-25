import { QuitaArticle } from '../domain/quita-domain';
import { QuitaArticleSummary } from '../domain/quita-domain';

export interface SummarizeRepository {
  summarize(article: QuitaArticle): Promise<QuitaArticleSummary>;
}
