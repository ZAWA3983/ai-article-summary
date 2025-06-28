import { API_BASE_URL } from '../config/api';

export interface QuitaArticleSummaryListItem {
  id: string;
  url: string;
  summary: {
    heading: string;
    catch: string;
    summaryText: string;
    targetAudience: string;
  };
  disclaimer: string;
  created_at: string;
  keyword: string;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async fetchSummaries(): Promise<{ success: boolean; summaries: QuitaArticleSummaryListItem[] }> {
    const response = await fetch(`${this.baseUrl}/api/summaries`);
    if (!response.ok) {
      throw new Error('記事の取得に失敗しました');
    }
    return response.json();
  }

  async fetchSummaryById(id: string): Promise<{ success: boolean; summary: QuitaArticleSummaryListItem }> {
    const response = await fetch(`${this.baseUrl}/api/summaries/${id}`);
    if (!response.ok) {
      throw new Error('記事の取得に失敗しました');
    }
    return response.json();
  }
}

export const apiClient = new ApiClient(); 