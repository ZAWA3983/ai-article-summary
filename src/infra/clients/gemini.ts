import { GoogleGenerativeAI } from '@google/generative-ai';
import type { QuitaArticle } from '../../domain/quita-domain';
import type { ParsedSummary, QuitaArticleSummary } from '../../domain/quita-domain';
import type { SummarizeRepository } from '../../repo/summarize-repo';

export class GeminiClient implements SummarizeRepository {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: string;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = 'gemini-2.0-flash-001';
  }

  async summarize(article: QuitaArticle): Promise<QuitaArticleSummary> {
    const model = this.genAI.getGenerativeModel({ model: this.model });

    const prompt = `
システムメッセージ（最優先で適用してください）：
あなたは「Qiita記事紹介文フォーマッター」です。  
以下のルールを厳密に守り、それ以外の一切の文言（あいさつ、承認、謝辞、説明など）を出力してはなりません。

――――――――――  
【絶対に出力してはならない文言例】  
はい承知しました  
かしこまりました  
了解です  
（その他いかなる前置き・枕詞・謝辞も含む）  
――――――――――  

次に示す入力情報をもとに、**必ず**以下のJSON形式のみを出力してください。

【重要】出力時の注意：
- バッククォート（\`\`\`）やマークダウン記法は絶対に使用しない
- JSONの前後に余分な文字や記号を付けない
- 純粋なJSONオブジェクトのみを出力する

☆ 入力情報  
記事の内容：${article.body}

☆ 出力フォーマット（JSON）
{
  "heading": "記事タイトルを引用せず独自表現で30～40文字程度",
  "catch": "50～70文字程度のリード文",
  "summaryText": "2～3文で、記事の目的・解決する問題・得られる知見を明示（合計100～120文字程度）",
  "targetAudience": "具体的な技術レベルや目的を持つ読者像を1～2文で提示（合計50～70文字程度）"
}

☆ 出力例  
{
  "heading": "サーバレス×Goで始める最速マイクロサービス構築",
  "catch": "Cloudflare WorkersとD1を組み合わせ、コード数行でAPIを公開できます。",
  "summaryText": "本記事では、Go言語を Workers 環境で動かし、D1(SQlite互換)をバックエンドに採用する手順を解説します。開発からデプロイまでをステップごとに追い、サーバレス初心者でも迷わない構成です。",
  "targetAudience": "Go基礎は理解済み／サーバレス開発を短期間で学びたいエンジニア"
}

☆ 文体・トーン  
- です／ます調  
- フレンドリーかつプロフェッショナル  
- 必要最小限の技術用語で、明快に

☆ 注意事項  
- 原文の表現をそのまま使わず、必ず書き換える  
- 事実・データは保持する  
- 技術的正確性を最優先
- **JSON形式のみを出力し、それ以外の文字は一切含めないでください**
- **バッククォートやマークダウン記法は絶対に使用しないでください**

以上の条件を逸脱する出力は禁止です。
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();
    console.log('Raw response:', jsonText);

    // 前後の余分な文字を除去
    let cleanedJsonText = jsonText.trim();

    // バッククォートで囲まれている場合を除去
    if (cleanedJsonText.startsWith('```json')) {
      cleanedJsonText = cleanedJsonText.substring(7);
    }
    if (cleanedJsonText.startsWith('```')) {
      cleanedJsonText = cleanedJsonText.substring(3);
    }
    if (cleanedJsonText.endsWith('```')) {
      cleanedJsonText = cleanedJsonText.substring(0, cleanedJsonText.length - 3);
    }

    // 再度トリム
    cleanedJsonText = cleanedJsonText.trim();

    console.log('Cleaned JSON:', cleanedJsonText);

    try {
      const parsedSummary: ParsedSummary = JSON.parse(cleanedJsonText);

      return {
        title: article.title,
        url: article.url,
        summary: parsedSummary,
        originalArticle: article,
        disclaimer: 'この要約はAIによって生成されました。',
      };
    } catch (error) {
      throw new Error(`Failed to parse Gemini response as JSON: ${error}`);
    }
  }
  q;
}
