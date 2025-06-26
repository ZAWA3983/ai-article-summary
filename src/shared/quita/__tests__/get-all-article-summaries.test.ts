import { describe, expect, it, vi } from 'vitest';
import { QuitaArticleSummary } from '../../domain/quita-domain';
import { D1Repository } from '../../repo/d1-repo';
import { GetAllArticleSummariesUseCase } from '../get-all-article-summaries';

describe('GetAllArticleSummariesUseCase', () => {
  const mockSummaries: readonly QuitaArticleSummary[] = [
    {
      id: 'summary-1',
      title: 'テスト記事1',
      url: 'https://example.com/test1',
      summary: {
        heading: 'テスト記事1の要約',
        catch: 'テストキャッチコピー1',
        summaryText: 'テスト要約文1',
        targetAudience: 'テスト対象者1',
      },
      originalArticle: {
        id: 'article-1',
        title: 'テスト記事1',
        url: 'https://example.com/test1',
        likes_count: 10,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        body: 'テスト本文1',
        rendered_body: '<p>テスト本文1</p>',
        tags: [],
        user: {
          id: 'test-user-1',
          name: 'テストユーザー1',
        },
      },
      disclaimer: 'この要約はAIによって生成されました。',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      keyword: 'テスト',
    },
    {
      id: 'summary-2',
      title: 'テスト記事2',
      url: 'https://example.com/test2',
      summary: {
        heading: 'テスト記事2の要約',
        catch: 'テストキャッチコピー2',
        summaryText: 'テスト要約文2',
        targetAudience: 'テスト対象者2',
      },
      originalArticle: {
        id: 'article-2',
        title: 'テスト記事2',
        url: 'https://example.com/test2',
        likes_count: 20,
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
        body: 'テスト本文2',
        rendered_body: '<p>テスト本文2</p>',
        tags: [],
        user: {
          id: 'test-user-2',
          name: 'テストユーザー2',
        },
      },
      disclaimer: 'この要約はAIによって生成されました。',
      created_at: '2024-01-02T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
      keyword: 'テスト',
    },
  ];

  it('全ての記事要約を取得できる', async () => {
    const mockD1Repository = {
      getAllArticleSummaries: vi.fn().mockResolvedValue(mockSummaries),
    } as unknown as D1Repository;

    const useCase = new GetAllArticleSummariesUseCase(mockD1Repository);

    const result = await useCase.execute();

    expect(mockD1Repository.getAllArticleSummaries).toHaveBeenCalled();
    expect(result).toEqual(mockSummaries);
  });
});
