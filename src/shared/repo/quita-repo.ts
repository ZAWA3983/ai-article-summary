import type { QuitaArticle, QuitaSearchParams } from '../domain/quita-domain';

export interface QuitaRepository {
  readonly searchArticles: (params: QuitaSearchParams) => Promise<readonly QuitaArticle[]>;
}
