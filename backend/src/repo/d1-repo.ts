import { QuitaArticleSummary, QuitaArticleSummaryListItem } from '../domain/quita-domain';

export interface D1Repository {
  saveArticleSummary(summary: QuitaArticleSummary): Promise<void>;
  getAllArticleSummaries(): Promise<QuitaArticleSummaryListItem[]>;
  getArticleSummaryById(id: string): Promise<QuitaArticleSummaryListItem | null>;
}
