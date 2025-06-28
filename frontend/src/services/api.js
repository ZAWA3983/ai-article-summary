import { API_BASE_URL } from '../config/api';
class ApiClient {
    constructor() {
        this.baseUrl = API_BASE_URL;
    }
    async fetchSummaries() {
        const response = await fetch(`${this.baseUrl}/api/summaries`);
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        return response.json();
    }
    async fetchSummaryById(id) {
        const response = await fetch(`${this.baseUrl}/api/summaries/${id}`);
        if (!response.ok) {
            throw new Error('記事の取得に失敗しました');
        }
        return response.json();
    }
}
export const apiClient = new ApiClient();
