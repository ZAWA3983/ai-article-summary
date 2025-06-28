import { QuitaArticleSummaryListItem } from '../../domain/quita-domain';
import { D1Repository } from '../../repo/d1-repo';

export class GetArticleSummaryByIdService {
  constructor(private readonly d1Repository: D1Repository) {}

  async execute(id: string): Promise<QuitaArticleSummaryListItem | null> {
    return await this.d1Repository.getArticleSummaryById(id);
  }
} 