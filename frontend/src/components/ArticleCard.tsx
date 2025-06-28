import React from 'react';
import { Card, Text, Stack, Anchor, Box } from '@mantine/core';
import { IconExternalLink, IconTag } from '@tabler/icons-react';
import type { QuitaArticleSummaryListItem } from '../services/api';

// 定数定義
const LINK_COLOR = '#3b82f6';

interface ArticleCardProps {
  article: QuitaArticleSummaryListItem;
}

// セクションコンポーネント
function CardSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <Box mb="sm">
      {title && (
        <Text size="xs" fw={600} mb="xs">
          {title}
        </Text>
      )}
      {children}
    </Box>
  );
}

// フッターコンポーネント
function CardFooter({ keyword, url }: { keyword: string; url: string }) {
  return (
    <Box mt="auto" px="xs">
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {/* 左側：タグ＋キーワード */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconTag size={14} style={{ marginRight: 4 }} />
          <Text
            size="xs"
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            {keyword}
          </Text>
        </div>
        {/* 右側：元記事リンク */}
        <Anchor
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
          }}
        >
          <IconExternalLink size={14} color={LINK_COLOR} style={{ marginRight: 4 }} />
          <Text size="xs" fw={500} style={{ color: LINK_COLOR }}>
            元記事を読む
          </Text>
        </Anchor>
      </div>
    </Box>
  );
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card
      withBorder
      radius="md"
      padding="md"
      styles={{
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
      }}
    >
      <Stack gap="md">
        {/* タイトルと副題 */}
        <CardSection>
          <Text size="lg" fw={700} lineClamp={2} mb="xs" lh={1.3}>
            {article.summary.heading}
          </Text>
          <Text size="sm" lineClamp={2} fs="italic">
            {article.summary.catch}
          </Text>
        </CardSection>

        {/* 内容 */}
        <CardSection title="内容:">
          <Text size="xs" lineClamp={3} lh={1.5}>
            {article.summary.summaryText}
          </Text>
        </CardSection>

        {/* 対象読者 */}
        <CardSection title="対象読者:">
          <Text size="xs" lh={1.4}>
            {article.summary.targetAudience}
          </Text>
        </CardSection>

        {/* Disclaimer */}
        {article.disclaimer && (
          <Box ta="right" mb="sm">
            <Text size="xs" fs="italic">
              {article.disclaimer}
            </Text>
          </Box>
        )}

        {/* フッター */}
        <CardFooter keyword={article.keyword} url={article.url} />
      </Stack>
    </Card>
  );
} 