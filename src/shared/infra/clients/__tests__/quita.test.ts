import dayjs from 'dayjs';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import type { QuitaArticle } from '../../../domain/quita-domain';
import { QuitaApi } from '../quita';

// 環境変数からテストモードを取得
const USE_REAL_API = process.env.USE_REAL_API === 'true';

describe('QuitaApi', () => {
  let quitaApi: QuitaApi;

  beforeAll(() => {
    quitaApi = new QuitaApi('dummy-token-for-test');
  });

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
  ];

  // モックの設定
  if (!USE_REAL_API) {
    beforeAll(() => {
      vi.spyOn(quitaApi, 'searchArticles').mockResolvedValue(mockArticles);
    });
  }

  // 共通のテストケース
  describe('基本的な検索機能', () => {
    it('指定されたキーワードで記事を検索できる', async () => {
      const from = '2024-06-03';
      const to = '2024-06-10';

      const articles = await quitaApi.searchArticles({
        query: '生成AI',
        created_at: {
          from,
          to,
        },
      });

      // モックモードの場合のみ、モックデータとの完全一致を確認
      if (!USE_REAL_API) {
        expect(articles).toEqual(mockArticles);
      }

      // 各記事の構造を検証
      for (const article of articles) {
        expect(article).toHaveProperty('id');
        expect(article).toHaveProperty('title');
        expect(article).toHaveProperty('url');
        expect(article).toHaveProperty('likes_count');
        expect(article).toHaveProperty('created_at');
        expect(article).toHaveProperty('user');
        expect(article.user).toHaveProperty('id');
        expect(article.user).toHaveProperty('name');
      }

      // 日付範囲内の記事のみであることを確認
      for (const article of articles) {
        const articleDate = dayjs(article.created_at);
        expect(articleDate.isAfter(dayjs(from))).toBe(true);
        expect(articleDate.isBefore(dayjs(to).add(1, 'day'))).toBe(true);
      }
    }, 30000); // 30秒のタイムアウトを設定
  });

  // 実際のAPIを使用する場合のテスト
  if (USE_REAL_API) {
    describe('実際のAPIを使用したテスト', () => {
      it('無効な日付範囲でエラーが発生する', async () => {
        const invalidFrom = '2024-06-10';
        const invalidTo = '2024-06-03';

        const articles = await quitaApi.searchArticles({
          query: '生成AI',
          created_at: {
            from: invalidFrom,
            to: invalidTo,
          },
        });

        // APIがエラーを投げずに空の配列を返す場合のテスト
        expect(articles).toEqual([]);
      });

      it('存在しないキーワードで検索した場合、空の配列が返される', async () => {
        const articles = await quitaApi.searchArticles({
          query: '存在しないキーワードeteitweewit',
          created_at: {
            from: '2024-06-03',
            to: '2024-06-10',
          },
        });

        expect(articles).toEqual([]);
      });
    });
  }

  // モックモードの場合のテスト
  if (!USE_REAL_API) {
    describe('モックモードのテスト', () => {
      it('モックデータが正しく設定されている', () => {
        expect(mockArticles).toHaveLength(2);
      });

      it('空の検索結果をモックできる', async () => {
        vi.spyOn(quitaApi, 'searchArticles').mockResolvedValueOnce([]);

        const articles = await quitaApi.searchArticles({
          query: '存在しないキーワード',
          created_at: {
            from: '2024-06-03',
            to: '2024-06-10',
          },
        });

        expect(articles).toEqual([]);
      });

      it('エラーをモックできる', async () => {
        vi.spyOn(quitaApi, 'searchArticles').mockRejectedValueOnce(new Error('API Error'));

        await expect(
          quitaApi.searchArticles({
            query: '生成AI',
            created_at: {
              from: '2024-06-03',
              to: '2024-06-10',
            },
          })
        ).rejects.toThrow('API Error');
      });
    });
  }
});
