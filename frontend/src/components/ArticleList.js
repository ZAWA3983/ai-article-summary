import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Loader, Center, Text, Container, Paper, Box } from '@mantine/core';
import { ArticleCard } from './ArticleCard';
import styles from './ArticleList.module.css';
// 定数定義
const GLASS_STYLES = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
};
// ステータス表示用の共通コンポーネント
function StatusCard({ icon, title, description, color = 'dark.7', maxWidth = 'auto', children }) {
    return (_jsx(Center, { py: "xl", children: _jsxs(Paper, { ta: "center", p: "xl", radius: "lg", withBorder: true, style: {
                ...GLASS_STYLES,
                maxWidth,
            }, children: [children, _jsxs(Text, { size: "xl", c: color, fw: 600, mb: "sm", children: [icon, " ", title] }), description && (_jsx(Text, { size: "md", c: color === 'red.7' ? 'red.6' : 'dark.5', children: description }))] }) }));
}
export function ArticleList({ articles, loading, error }) {
    if (loading) {
        return (_jsx(Center, { py: "xl", children: _jsxs(Paper, { ta: "center", p: "xl", radius: "lg", withBorder: true, style: GLASS_STYLES, children: [_jsx(Loader, { size: "xl", color: "blue", mb: "md" }), _jsx(Text, { size: "lg", c: "dark.7", fw: 500, children: "\u8A18\u4E8B\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D..." })] }) }));
    }
    if (error) {
        return (_jsx(StatusCard, { icon: "\u274C", title: "\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F", description: error, color: "red.7", maxWidth: "500px" }));
    }
    if (articles.length === 0) {
        return (_jsx(StatusCard, { icon: "\uD83D\uDCF0", title: "\u8A18\u4E8B\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F", description: "\u73FE\u5728\u3001\u8868\u793A\u3067\u304D\u308B\u8A18\u4E8B\u304C\u3042\u308A\u307E\u305B\u3093\u3002\\n\u3057\u3070\u3089\u304F\u6642\u9593\u3092\u304A\u3044\u3066\u304B\u3089\u518D\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002", color: "dark.6", maxWidth: "500px" }));
    }
    return (_jsx(Container, { size: "xl", py: "xl", children: _jsx(Box, { className: styles.articleGrid, children: articles.map((article) => (_jsx(Box, { className: styles.articleItem, children: _jsx(ArticleCard, { article: article }) }, article.id))) }) }));
}
