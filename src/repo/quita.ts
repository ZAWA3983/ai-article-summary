import type { QuitaArticle, QuitaSearchParams } from '../domain/quita/types';

export interface QuitaRepository {
  readonly searchArticles: (params: QuitaSearchParams) => Promise<readonly QuitaArticle[]>;
}
