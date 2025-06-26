import { QuitaArticleSummary } from '../domain/quita-domain';
import { D1Repository } from '../repo/d1-repo';

export class GetAllArticleSummariesUseCase {
  constructor(private readonly d1Repository: D1Repository) {}

  async execute(): Promise<readonly QuitaArticleSummary[]> {
    return await this.d1Repository.getAllArticleSummaries();
  }
}
