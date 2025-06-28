import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Text, Stack, Anchor, Box } from '@mantine/core';
import { IconExternalLink, IconTag } from '@tabler/icons-react';
// 定数定義
const LINK_COLOR = '#3b82f6';
// セクションコンポーネント
function CardSection({ title, children }) {
    return (_jsxs(Box, { mb: "sm", children: [title && (_jsx(Text, { size: "xs", fw: 600, mb: "xs", children: title })), children] }));
}
// フッターコンポーネント
function CardFooter({ keyword, url }) {
    return (_jsx(Box, { mt: "auto", px: "xs", children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', width: '100%' }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx(IconTag, { size: 14, style: { marginRight: 4 } }), _jsx(Text, { size: "xs", style: {
                                whiteSpace: 'nowrap',
                            }, children: keyword })] }), _jsxs(Anchor, { href: url, target: "_blank", rel: "noopener noreferrer", style: {
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: 'auto',
                    }, children: [_jsx(IconExternalLink, { size: 14, color: LINK_COLOR, style: { marginRight: 4 } }), _jsx(Text, { size: "xs", fw: 500, style: { color: LINK_COLOR }, children: "\u5143\u8A18\u4E8B\u3092\u8AAD\u3080" })] })] }) }));
}
export function ArticleCard({ article }) {
    return (_jsx(Card, { withBorder: true, radius: "md", padding: "md", styles: {
            root: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(12px)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
                height: '100%',
                minHeight: '400px',
                width: '100%',
                boxSizing: 'border-box',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                },
            },
        }, children: _jsxs(Stack, { gap: "md", children: [_jsxs(CardSection, { children: [_jsx(Text, { size: "lg", fw: 700, lineClamp: 2, mb: "xs", lh: 1.3, children: article.summary.heading }), _jsx(Text, { size: "sm", lineClamp: 2, fs: "italic", children: article.summary.catch })] }), _jsx(CardSection, { title: "\u5185\u5BB9:", children: _jsx(Text, { size: "xs", lineClamp: 3, lh: 1.5, children: article.summary.summaryText }) }), _jsx(CardSection, { title: "\u5BFE\u8C61\u8AAD\u8005:", children: _jsx(Text, { size: "xs", lh: 1.4, children: article.summary.targetAudience }) }), article.disclaimer && (_jsx(Box, { ta: "right", mb: "sm", children: _jsx(Text, { size: "xs", fs: "italic", children: article.disclaimer }) })), _jsx(CardFooter, { keyword: article.keyword, url: article.url })] }) }));
}
