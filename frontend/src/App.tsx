import { useEffect, useState } from 'react';
import { MantineProvider, Container, Title, Text, Stack, Box, Paper, Group } from '@mantine/core';
import { ArticleList } from './components/ArticleList';
import { apiClient, type QuitaArticleSummaryListItem } from './services/api';

// 定数定義
const BACKGROUND_STYLES = {
  minHeight: '100vh',
  background: `url('/images/background.jpg')`,
  backgroundSize: 'cover' as const,
  backgroundPosition: 'center' as const,
  backgroundRepeat: 'no-repeat' as const,
  position: 'relative' as const,
} as const;

const OVERLAY_STYLES = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0, 0, 0, 0.4)',
  zIndex: 1,
} as const;

const GLASS_STYLES = {
  background: 'rgba(255, 255, 255, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
  backdropFilter: 'blur(12px)',
} as const;

const TITLE_STYLES = {
  letterSpacing: '-0.02em',
  color: 'white',
  fontSize: 'clamp(36px, 5vw, 48px)',
  margin: 0,
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 800,
} as const;

const SUBTITLE_STYLES = {
  lineHeight: 1.6,
  fontSize: 'clamp(16px, 2.5vw, 18px)',
  margin: 0,
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 600,
  letterSpacing: '0.02em',
  textTransform: 'uppercase' as const,
  opacity: 0.9,
} as const;

export function App() {
  const [articles, setArticles] = useState<QuitaArticleSummaryListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const data = await apiClient.fetchSummaries();
        if (data.success && Array.isArray(data.summaries)) {
          setArticles(data.summaries);
        } else {
          setArticles([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <MantineProvider
      theme={{
        fontFamily: "'Inter', sans-serif",
        headings: {
          fontFamily: "'Poppins', sans-serif",
        },
      }}
    >
      <Box style={BACKGROUND_STYLES}>
        {/* オーバーレイ */}
        <Box style={OVERLAY_STYLES} />
        
        <Stack gap={0} style={{ position: 'relative', zIndex: 2 }}>
          <Container size="xl" py="xl">
            <Paper
              withBorder
              radius="xl"
              p="xl"
              mb="xl"
              style={GLASS_STYLES}
            >
              <Group justify="center" align="center" gap="2rem" wrap="wrap">
                <Title
                  order={1}
                  fw={900}
                  style={TITLE_STYLES}
                >
                  AI技術記事サマリー
                </Title>
                <Text
                  size="lg"
                  c="white"
                  fw={500}
                  style={SUBTITLE_STYLES}
                >
                  最新の技術記事をAIが凝縮してお届け
                </Text>
              </Group>
            </Paper>
            <ArticleList articles={articles} loading={loading} error={error} />
          </Container>
        </Stack>
      </Box>
    </MantineProvider>
  );
}
