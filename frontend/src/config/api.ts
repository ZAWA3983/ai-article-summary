const getApiBaseUrl = () => {
  if (import.meta.env.DEV) {
    // 開発環境: ローカルのCloudflare Workers
    return 'http://localhost:8787';
  }
  
  // 本番環境: デプロイされたCloudflare Workers
  return 'https://ai-article-summary-backend.ai-article-summary.workers.dev';
};

export const API_BASE_URL = getApiBaseUrl(); 