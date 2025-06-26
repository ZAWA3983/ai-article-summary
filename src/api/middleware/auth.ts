export interface Env {
  API_KEY: string;
}

export function authenticate(request: Request, env: Env): Response | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || authHeader !== `Bearer ${env.API_KEY}`) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Unauthorized',
      }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  return null; // 認証成功
}
