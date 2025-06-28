import dayjs from 'dayjs';
import type { QuitaArticle } from '../../domain/quita-domain';
import type { QuitaRepository } from '../../repo/quita-repo';

export class SearchArticlesService {
  constructor(private readonly quitaRepository: QuitaRepository) {}

  async execute(args: {
    readonly keyword: string;
    readonly created_at: {
      readonly from: string;
      readonly to: string;
    };
  }): Promise<readonly QuitaArticle[]> {
    const articles = await this.quitaRepository.searchArticles({
      query: args.keyword,
      created_at: args.created_at,
    });

    // いいね数でソートして上位5件を取得
    return [...articles].sort((a, b) => b.likes_count - a.likes_count).slice(0, 5);
  }
} 