import { QuitaArticle, QuitaArticleSummary } from '../domain/quita-domain';

// 要約機能のリポジトリインターフェース
export interface SummarizeRepository {
  summarize(article: QuitaArticle, keyword: string): Promise<QuitaArticleSummary>;
}
