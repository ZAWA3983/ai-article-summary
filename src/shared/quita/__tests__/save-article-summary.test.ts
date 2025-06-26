import { describe, expect, it, vi } from 'vitest';
import { QuitaArticleSummary } from '../../domain/quita-domain';
import { D1Repository } from '../../repo/d1-repo';
import { SaveArticleSummaryUseCase } from '../save-article-summary';

describe('SaveArticleSummaryUseCase', () => {
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

  it('記事要約を保存できる', async () => {
    const mockD1Repository = {
      saveArticleSummary: vi.fn().mockResolvedValue(undefined),
    } as unknown as D1Repository;

    const useCase = new SaveArticleSummaryUseCase(mockD1Repository);

    await useCase.execute(mockSummary);

    expect(mockD1Repository.saveArticleSummary).toHaveBeenCalledWith(mockSummary);
  });
});
