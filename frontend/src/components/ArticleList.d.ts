import type { QuitaArticleSummaryListItem } from '../services/api';
interface ArticleListProps {
    articles: QuitaArticleSummaryListItem[];
    loading: boolean;
    error?: string;
}
export declare function ArticleList({ articles, loading, error }: ArticleListProps): import("react/jsx-runtime").JSX.Element;
export {};
