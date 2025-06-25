import { Badge, Card, Divider, Stack, Text } from '@mantine/core';
import type { ParsedSummary } from '../../domain/quita-domain';

interface ArticleSummaryCardProps {
  summary: ParsedSummary;
  title: string;
  url: string;
  disclaimer?: string;
}

export function ArticleSummaryCard({ summary, title, url, disclaimer }: ArticleSummaryCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        {/* 見出し */}
        <Text size="xl" fw={700} c="blue.7" lineClamp={2}>
          {summary.heading}
        </Text>

        {/* キャッチ */}
        <Text size="md" c="dimmed" lineClamp={2}>
          {summary.catch}
        </Text>

        <Divider />

        {/* 要約 */}
        <div>
          <Text size="sm" fw={600} mb="xs" c="gray.7">
            要約
          </Text>
          <Text size="sm" lineClamp={4}>
            {summary.summary}
          </Text>
        </div>

        {/* 読むべき読者像 */}
        <div>
          <Text size="sm" fw={600} mb="xs" c="gray.7">
            対象読者
          </Text>
          <Text size="sm" c="dimmed">
            {summary.targetAudience}
          </Text>
        </div>

        {/* 元記事情報 */}
        <div>
          <Text size="xs" c="dimmed" mb="xs">
            元記事: {title}
          </Text>
          <Text size="xs" c="blue.6" style={{ wordBreak: 'break-all' }}>
            {url}
          </Text>
        </div>

        {/* 免責事項 */}
        {disclaimer && (
          <Text size="xs" c="red.6" style={{ fontStyle: 'italic' }}>
            {disclaimer}
          </Text>
        )}
      </Stack>
    </Card>
  );
}
