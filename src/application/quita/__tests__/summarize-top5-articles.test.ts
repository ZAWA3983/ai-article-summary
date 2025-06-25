import { describe, expect, it, vi } from 'vitest';
import { SummarizeTop5ArticlesUseCase } from '../summarize-top5-articles';
import { SearchArticlesUseCase } from '../search-top5-articles';
import { SummarizeArticleUseCase } from '../../summarize-article';
import type { QuitaArticle, QuitaArticleSummary, ParsedSummary } from '../../../domain/quita-domain';
import { QuitaApi } from '../../../infra/clients/quita';
import { GeminiClient } from '../../../infra/clients/gemini';

const USE_REAL_API = process.env.USE_REAL_API === 'true';

describe('SummarizeTop5ArticlesUseCase', () => {
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
          versions: []
        }
      ],
      user: {
        id: 'user1',
        name: 'テストユーザー1'
      }
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
          versions: []
        }
      ],
      user: {
        id: 'user2',
        name: 'テストユーザー2'
      }
    }
  ];

  const mockSummaries: readonly QuitaArticleSummary[] = [
    {
      title: '生成AIの活用事例',
      url: 'https://example.com/article1',
      summary: {
        heading: '生成AIの活用事例と実践方法',
        catch: 'テスト記事1のキャッチコピーです。',
        summaryText: 'テスト記事1の要約文です。生成AIの活用について詳しく解説しています。',
        targetAudience: '生成AIに興味があるエンジニア'
      },
      originalArticle: mockArticles[0],
      disclaimer: 'この要約はAIによって生成されました。'
    },
    {
      title: '生成AIの最新動向',
      url: 'https://example.com/article2',
      summary: {
        heading: '生成AIの最新動向と今後の展望',
        catch: 'テスト記事2のキャッチコピーです。',
        summaryText: 'テスト記事2の要約文です。生成AIの最新動向について詳しく解説しています。',
        targetAudience: 'AI技術の最新動向を追いたいエンジニア'
      },
      originalArticle: mockArticles[1],
      disclaimer: 'この要約はAIによって生成されました。'
    }
  ];

  // モックの作成
  const mockSearchArticlesUseCase = {
    execute: vi.fn().mockResolvedValue(mockArticles)
  } as unknown as SearchArticlesUseCase;

  const mockSummarizeArticleUseCase = {
    execute: vi.fn().mockImplementation((article: QuitaArticle) => {
      const summary = mockSummaries.find(s => s.originalArticle.id === article.id);
      return Promise.resolve(summary!);
    })
  } as unknown as SummarizeArticleUseCase;

  // 実際のAPIを使用する場合のセットアップ
  const realQuitaRepository = new QuitaApi();
  const realGeminiClient = new GeminiClient(process.env.GEMINI_API_TOKEN || '');
  const realSearchArticlesUseCase = new SearchArticlesUseCase(realQuitaRepository);
  const realSummarizeArticleUseCase = new SummarizeArticleUseCase(realGeminiClient);

  describe('モックモードのテスト', () => {
    it('上位5件の記事を要約できる', async () => {
      const useCase = new SummarizeTop5ArticlesUseCase(
        mockSearchArticlesUseCase,
        mockSummarizeArticleUseCase
      );

      const summaries = await useCase.execute({
        keyword: '生成AI',
        created_at: {
          from: '2024-06-03',
          to: '2024-06-10',
        },
      });

      // 検索が呼ばれたことを確認
      expect(mockSearchArticlesUseCase.execute).toHaveBeenCalledWith({
        keyword: '生成AI',
        created_at: {
          from: '2024-06-03',
          to: '2024-06-10',
        },
      });

      // 要約が呼ばれたことを確認
      expect(mockSummarizeArticleUseCase.execute).toHaveBeenCalledTimes(mockArticles.length);

      // 結果の検証
      expect(summaries).toEqual(mockSummaries);
    });
  });

  // 実際のAPIを使用したテスト（USE_REAL_API=trueの場合のみ実行）
  (USE_REAL_API ? describe : describe.skip)('実際のAPIを使用したテスト', () => {
    it('実際のAPIを使用して記事を要約できる', async () => {
      const useCase = new SummarizeTop5ArticlesUseCase(
        realSearchArticlesUseCase,
        realSummarizeArticleUseCase
      );

      const summaries = await useCase.execute({
        keyword: '生成AI',
        created_at: {
          from: '2024-03-01',
          to: '2024-03-10',
        },
      });

      // 結果の詳細を出力
      console.log('取得された要約の数:', summaries.length);
      console.log('要約の詳細:', JSON.stringify(summaries, null, 2));

      // 結果の検証
      expect(summaries.length).toBeGreaterThan(0);
      summaries.forEach(summary => {
        expect(summary).toHaveProperty('title');
        expect(summary).toHaveProperty('url');
        expect(summary).toHaveProperty('summary');
        expect(summary).toHaveProperty('originalArticle');
        expect(summary).toHaveProperty('disclaimer');
        expect(summary.disclaimer).toBe('この要約はAIによって生成されました。');
      });
    }, 60000); // 60秒のタイムアウト geminiの応答を待つため
  });
}); 