import { QuitaArticleSummary } from '../domain/quita-domain';

export interface D1Repository {
  saveArticleSummary(summary: QuitaArticleSummary): Promise<void>;
  getAllArticleSummaries(): Promise<QuitaArticleSummary[]>;
  getArticleSummaryById(id: string): Promise<QuitaArticleSummary | null>;
}
