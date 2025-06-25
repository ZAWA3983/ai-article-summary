export interface QuitaArticle {
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly likes_count: number;
  readonly created_at: string;
  readonly user: {
    readonly id: string;
    readonly name: string;
  };
  readonly tags: readonly {
    readonly name: string;
    readonly versions: readonly string[];
  }[];
  readonly body: string;
  readonly rendered_body: string;
  readonly updated_at: string;
}

export interface QuitaArticleSummary {
  title: string;
  url: string;
  summary: ParsedSummary;
  originalArticle: QuitaArticle;
  disclaimer: string;
}

export interface ParsedSummary {
  heading: string;
  catch: string;
  summaryText: string;
  targetAudience: string;
}

export interface QuitaSearchParams {
  readonly query: string;
  readonly created_at: {
    readonly from: string;
    readonly to: string;
  };
} 