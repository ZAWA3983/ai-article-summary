import React from 'react';
import { Loader, Center, Text, Container, Paper, Box } from '@mantine/core';
import type { QuitaArticleSummaryListItem } from '../services/api';
import { ArticleCard } from './ArticleCard';
import styles from './ArticleList.module.css';

// 定数定義
const GLASS_STYLES = {
  background: 'rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
} as const;

interface ArticleListProps {
  articles: QuitaArticleSummaryListItem[];
  loading: boolean;
  error?: string;
}

// ステータス表示用の共通コンポーネント
function StatusCard({ 
  icon, 
  title, 
  description, 
  color = 'dark.7',
  maxWidth = 'auto',
  children
}: {
  icon: string;
  title: string;
  description?: string;
  color?: string;
  maxWidth?: string | number;
  children?: React.ReactNode;
}) {
  return (
    <Center py="xl">
      <Paper
        ta="center"
        p="xl"
        radius="lg"
        withBorder
        style={{
          ...GLASS_STYLES,
          maxWidth,
        }}
      >
        {children}
        <Text size="xl" c={color} fw={600} mb="sm">
          {icon} {title}
        </Text>
        {description && (
          <Text size="md" c={color === 'red.7' ? 'red.6' : 'dark.5'}>
            {description}
          </Text>
        )}
      </Paper>
    </Center>
  );
}

export function ArticleList({ articles, loading, error }: ArticleListProps) {
  if (loading) {
    return (
      <Center py="xl">
        <Paper
          ta="center"
          p="xl"
          radius="lg"
          withBorder
          style={GLASS_STYLES}
        >
          <Loader size="xl" color="blue" mb="md" />
          <Text size="lg" c="dark.7" fw={500}>
            記事を読み込み中...
          </Text>
        </Paper>
      </Center>
    );
  }

  if (error) {
    return (
      <StatusCard
        icon="❌"
        title="エラーが発生しました"
        description={error}
        color="red.7"
        maxWidth="500px"
      />
    );
  }

  if (articles.length === 0) {
    return (
      <StatusCard
        icon="📰"
        title="記事が見つかりませんでした"
        description="現在、表示できる記事がありません。\nしばらく時間をおいてから再度お試しください。"
        color="dark.6"
        maxWidth="500px"
      />
    );
  }

  return (
    <Container size="xl" py="xl">
      <Box className={styles.articleGrid}>
        {articles.map((article) => (
          <Box key={article.id} className={styles.articleItem}>
            <ArticleCard article={article} />
          </Box>
        ))}
      </Box>
    </Container>
  );
} 