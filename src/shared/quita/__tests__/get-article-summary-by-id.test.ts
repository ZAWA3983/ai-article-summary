import { describe, expect, it, vi } from 'vitest';
import { QuitaArticleSummary } from '../../domain/quita-domain';
import { D1Repository } from '../../repo/d1-repo';
import { GetArticleSummaryByIdUseCase } from '../get-article-summary-by-id';

describe('GetArticleSummaryByIdUseCase', () => {
  const mockSummary: QuitaArticleSummary = {
    id: 'test-summary-id',
    title: 'テスト記事',
    url: 'https://example.com/test',
    summary: {
      heading: 'テスト記事の要約',
      catch: 'テストキャッチコピー',
      summaryText: 'テスト要約文',
      targetAudience: 'テスト対象者',
    },
    originalArticle: {
      id: 'test-article-id',
      title: 'テスト記事',
      url: 'https://example.com/test',
      likes_count: 10,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
      body: 'テスト本文',
      rendered_body: '<p>テスト本文</p>',
      tags: [],
      user: {
        id: 'test-user',
        name: 'テストユーザー',
      },
    },
    disclaimer: 'この要約はAIによって生成されました。',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    keyword: 'テスト',
  };

  it('指定されたIDの記事要約を取得できる', async () => {
    const mockD1Repository = {
      getArticleSummaryById: vi.fn().mockResolvedValue(mockSummary),
    } as unknown as D1Repository;

    const useCase = new GetArticleSummaryByIdUseCase(mockD1Repository);

    const result = await useCase.execute('test-summary-id');

    expect(mockD1Repository.getArticleSummaryById).toHaveBeenCalledWith('test-summary-id');
    expect(result).toEqual(mockSummary);
  });

  it('存在しないIDの場合はnullを返す', async () => {
    const mockD1Repository = {
      getArticleSummaryById: vi.fn().mockResolvedValue(null),
    } as unknown as D1Repository;

    const useCase = new GetArticleSummaryByIdUseCase(mockD1Repository);

    const result = await useCase.execute('non-existent-id');

    expect(mockD1Repository.getArticleSummaryById).toHaveBeenCalledWith('non-existent-id');
    expect(result).toBeNull();
  });
});
