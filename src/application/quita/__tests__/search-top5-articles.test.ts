import { describe, expect, it, vi } from 'vitest';
import type { QuitaArticle } from '../../../domain/quita-domain';
import { QuitaApi } from '../../../infra/clients/quita';
import type { QuitaRepository } from '../../../repo/quita-repo';
import { SearchArticlesUseCase } from '../search-top5-articles';

const USE_REAL_API = process.env.USE_REAL_API === 'true';

describe('SearchArticlesUseCase', () => {
  // モックデータの定義
  const mockArticles: readonly QuitaArticle[] = [
    {
      id: 'article1',
      title: '生成AIの活用事例',
      url: 'https://example.com/article1',
      likes_count: 100,
      created_at: '2024-06-05T10:00:00+09:00',
      updated_at: '2024-06-05T10:00:00+09:00',
      body: 'テスト記事の本文1',
      rendered_body: '<p>テスト記事の本文1</p>',
      tags: [
        {
          name: 'AI',
          versions: [],
        },
      ],
      user: {
        id: 'user1',
        name: 'テストユーザー1',
      },
    },
    {
      id: 'article2',
      title: '生成AIの最新動向',
      url: 'https://example.com/article2',
      likes_count: 80,
      created_at: '2024-06-06T15:30:00+09:00',
      updated_at: '2024-06-06T15:30:00+09:00',
      body: 'テスト記事の本文2',
      rendered_body: '<p>テスト記事の本文2</p>',
      tags: [
        {
          name: 'AI',
          versions: [],
        },
      ],
      user: {
        id: 'user2',
        name: 'テストユーザー2',
      },
    },
    {
      id: 'article3',
      title: '生成AIの実装方法',
      url: 'https://example.com/article3',
      likes_count: 120,
      created_at: '2024-06-07T09:15:00+09:00',
      updated_at: '2024-06-07T09:15:00+09:00',
      body: 'テスト記事の本文3',
      rendered_body: '<p>テスト記事の本文3</p>',
      tags: [
        {
          name: 'AI',
          versions: [],
        },
      ],
      user: {
        id: 'user3',
        name: 'テストユーザー3',
      },
    },
    {
      id: 'article4',
      title: '生成AIの課題と展望',
      url: 'https://example.com/article4',
      likes_count: 90,
      created_at: '2024-06-08T14:20:00+09:00',
      updated_at: '2024-06-08T14:20:00+09:00',
      body: 'テスト記事の本文4',
      rendered_body: '<p>テスト記事の本文4</p>',
      tags: [
        {
          name: 'AI',
          versions: [],
        },
      ],
      user: {
        id: 'user4',
        name: 'テストユーザー4',
      },
    },
    {
      id: 'article5',
      title: '生成AIの導入事例',
      url: 'https://example.com/article5',
      likes_count: 110,
      created_at: '2024-06-09T11:45:00+09:00',
      updated_at: '2024-06-09T11:45:00+09:00',
      body: 'テスト記事の本文5',
      rendered_body: '<p>テスト記事の本文5</p>',
      tags: [
        {
          name: 'AI',
          versions: [],
        },
      ],
      user: {
        id: 'user5',
        name: 'テストユーザー5',
      },
    },
  ];

  // モックリポジトリの作成
  const mockQuitaRepository: QuitaRepository = {
    searchArticles: vi.fn().mockResolvedValue(mockArticles),
  };

  // 実際のリポジトリの作成
  const realQuitaRepository = new QuitaApi();

  // テストで使用するリポジトリを環境変数に基づいて選択
  const repository = USE_REAL_API ? realQuitaRepository : mockQuitaRepository;

  it('いいね数でソートして上位5件を取得できる', async () => {
    const useCase = new SearchArticlesUseCase(repository);

    const articles = await useCase.execute({
      keyword: '生成AI',
      created_at: {
        from: '2024-06-03',
        to: '2024-06-10',
      },
    });

    // いいね数でソートされていることを確認
    const likesCounts = articles.map((article) => article.likes_count);
    const isSorted = likesCounts.every((count, index) => {
      if (index === 0) return true;
      return count <= likesCounts[index - 1];
    });
    expect(isSorted).toBe(true);

    // 5件のデータが返ってくることを確認
    expect(articles.length).toBe(5);

    //articleの5件のいいね数をconsole.logする
    for (const article of articles) {
      console.log(article.likes_count);
    }

    // いいね数が正しくソートされていることを確認
    if (!USE_REAL_API) {
      // モックデータの場合のみ、具体的な値を検証
      expect(articles[0].likes_count).toBe(120); // 最大値
      expect(articles[4].likes_count).toBe(80); // 最小値
    } else {
      // 実際のAPIの場合、最低限の検証
      expect(articles.length).toBeGreaterThan(0);
      expect(articles[0].likes_count).toBeGreaterThanOrEqual(
        articles[articles.length - 1].likes_count
      );
    }
  }, 30000); // 30秒のタイムアウトを設定
});
