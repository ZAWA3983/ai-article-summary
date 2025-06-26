import { QuitaArticleSummary } from '../domain/quita-domain';
import { D1Repository } from '../repo/d1-repo';

export class GetArticleSummaryByIdUseCase {
  constructor(private readonly d1Repository: D1Repository) {}

  async execute(id: string): Promise<QuitaArticleSummary | null> {
    return await this.d1Repository.getArticleSummaryById(id);
  }
}
