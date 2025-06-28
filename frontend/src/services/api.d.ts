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
declare class ApiClient {
    private baseUrl;
    constructor();
    fetchSummaries(): Promise<{
        success: boolean;
        summaries: QuitaArticleSummaryListItem[];
    }>;
    fetchSummaryById(id: string): Promise<{
        success: boolean;
        summary: QuitaArticleSummaryListItem;
    }>;
}
export declare const apiClient: ApiClient;
export {};
