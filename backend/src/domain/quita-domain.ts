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
  readonly id: string;
  readonly title: string;
  readonly url: string;
  readonly summary: ParsedSummary;
  readonly originalArticle: QuitaArticle;
  readonly disclaimer: string;
  readonly created_at: string;
  readonly updated_at: string;
  readonly keyword: string;
}

// SELECT用の専用型 - 必要なフィールドのみを含む
export interface QuitaArticleSummaryListItem {
  readonly id: string;
  readonly url: string;
  readonly summary: ParsedSummary;
  readonly disclaimer: string;
  readonly created_at: string;
  readonly keyword: string;
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
