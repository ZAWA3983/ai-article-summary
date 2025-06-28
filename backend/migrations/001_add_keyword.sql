-- マイグレーション: article_summariesテーブルにkeywordカラムを追加
-- 作成日: 2024年
-- 目的: 記事サマリーの検索機能向上のため、検索キーワードを保存するカラムを追加

-- アップマイグレーション: keywordカラムを追加
ALTER TABLE article_summaries ADD COLUMN keyword TEXT NOT NULL DEFAULT '';

-- キーワード検索用のインデックスを作成
CREATE INDEX IF NOT EXISTS idx_article_summaries_keyword ON article_summaries(keyword);

-- 注意事項:
-- 1. 既存のレコードのkeywordフィールドは空文字列になります
-- 2. 必要に応じて、既存のレコードのkeywordを更新してください
-- 3. このマイグレーションは後方互換性があります

-- ダウンマイグレーション（必要に応じて）:
-- DROP INDEX IF EXISTS idx_article_summaries_keyword;
-- ALTER TABLE article_summaries DROP COLUMN keyword; 