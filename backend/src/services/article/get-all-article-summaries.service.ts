import { QuitaArticleSummaryListItem } from '../../domain/quita-domain';
import { D1Repository } from '../../repo/d1-repo';

export class GetAllArticleSummariesService {
  constructor(private readonly d1Repository: D1Repository) {}

  async execute(): Promise<readonly QuitaArticleSummaryListItem[]> {
    return await this.d1Repository.getAllArticleSummaries();
  }
} 