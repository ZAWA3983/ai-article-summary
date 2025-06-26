-- 既存のarticle_summariesテーブルにkeywordカラムを追加するマイグレーション
-- このファイルは既存のデータベースに対して実行してください

-- keywordカラムを追加
ALTER TABLE article_summaries ADD COLUMN keyword TEXT NOT NULL DEFAULT '';

-- キーワード検索用のインデックスを作成
CREATE INDEX IF NOT EXISTS idx_article_summaries_keyword ON article_summaries(keyword);

-- 注意: 既存のレコードのkeywordフィールドは空文字列になります
-- 必要に応じて、既存のレコードのkeywordを更新してください 