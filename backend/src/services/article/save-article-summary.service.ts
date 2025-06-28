import { QuitaArticleSummary } from '../../domain/quita-domain';
import { D1Repository } from '../../repo/d1-repo';

export class SaveArticleSummaryService {
  constructor(private readonly d1Repository: D1Repository) {}

  async execute(summary: QuitaArticleSummary): Promise<void> {
    await this.d1Repository.saveArticleSummary(summary);
  }
} 