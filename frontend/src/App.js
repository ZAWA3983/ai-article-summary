import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { MantineProvider, Container, Title, Text, Stack, Box, Paper, Group } from '@mantine/core';
import { ArticleList } from './components/ArticleList';
import { apiClient } from './services/api';
// 定数定義
const BACKGROUND_STYLES = {
    minHeight: '100vh',
    background: `url('/images/background.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
};
const OVERLAY_STYLES = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
};
const GLASS_STYLES = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(12px)',
};
const TITLE_STYLES = {
    letterSpacing: '-0.02em',
    color: 'white',
    fontSize: 'clamp(36px, 5vw, 48px)',
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
};
const SUBTITLE_STYLES = {
    lineHeight: 1.6,
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    margin: 0,
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    opacity: 0.9,
    color: 'white',
};
export function App() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const data = await apiClient.fetchSummaries();
                if (data.success && Array.isArray(data.summaries)) {
                    setArticles(data.summaries);
                }
                else {
                    setArticles([]);
                }
            }
            catch (err) {
                setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
            }
            finally {
                setLoading(false);
            }
        };
        fetchArticles();
    }, []);
    return (_jsx(MantineProvider, { theme: {
            fontFamily: "'Inter', sans-serif",
            headings: {
                fontFamily: "'Poppins', sans-serif",
            },
        }, children: _jsxs(Box, { style: BACKGROUND_STYLES, children: [_jsx(Box, { style: OVERLAY_STYLES }), _jsx(Stack, { gap: 0, style: { position: 'relative', zIndex: 2 }, children: _jsxs(Container, { size: "xl", py: "xl", children: [_jsx(Paper, { withBorder: true, radius: "xl", p: "xl", mb: "xl", style: GLASS_STYLES, children: _jsxs(Group, { justify: "center", align: "center", gap: "2rem", wrap: "wrap", children: [_jsx(Title, { order: 1, fw: 900, style: TITLE_STYLES, children: "AI\u6280\u8853\u8A18\u4E8B\u30B5\u30DE\u30EA\u30FC" }), _jsx(Text, { size: "lg", c: "white", fw: 500, style: SUBTITLE_STYLES, children: "\u6700\u65B0\u306E\u6280\u8853\u8A18\u4E8B\u3092AI\u304C\u51DD\u7E2E\u3057\u3066\u304A\u5C4A\u3051" })] }) }), _jsx(ArticleList, { articles: articles, loading: loading, error: error })] }) })] }) }));
}
