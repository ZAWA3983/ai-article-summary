-- Cloudflare D1 データベーススキーマ
-- 記事テーブル
CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  likes_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  body TEXT NOT NULL,
  rendered_body TEXT NOT NULL
);

-- 記事タグテーブル
CREATE TABLE IF NOT EXISTS article_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  article_id TEXT NOT NULL,
  tag_name TEXT NOT NULL,
  tag_versions TEXT NOT NULL, -- JSON配列として保存
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- 記事サマリーテーブル
CREATE TABLE IF NOT EXISTS article_summaries (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  summary_heading TEXT NOT NULL,
  summary_catch TEXT NOT NULL,
  summary_text TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  disclaimer TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  original_article_id TEXT NOT NULL,
  FOREIGN KEY (original_article_id) REFERENCES articles(id) ON DELETE CASCADE
);

-- レート制限テーブル
CREATE TABLE IF NOT EXISTS rate_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- インデックスを作成してパフォーマンスを向上
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);
CREATE INDEX IF NOT EXISTS idx_articles_user_id ON articles(user_id);
CREATE INDEX IF NOT EXISTS idx_article_tags_article_id ON article_tags(article_id);
CREATE INDEX IF NOT EXISTS idx_article_summaries_created_at ON article_summaries(created_at);
CREATE INDEX IF NOT EXISTS idx_article_summaries_original_article_id ON article_summaries(original_article_id);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_created_at ON rate_limits(ip, created_at);

-- 古いレート制限レコードを自動削除するためのトリガー（24時間以上古いレコード）
CREATE TRIGGER IF NOT EXISTS cleanup_rate_limits
  AFTER INSERT ON rate_limits
  BEGIN
    DELETE FROM rate_limits WHERE created_at < datetime('now', '-24 hours');
  END; 