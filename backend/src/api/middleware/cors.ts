import type { Env } from '../index';

export function addCorsHeaders(response: Response, env: Env, requestOrigin?: string): Response {
  const allowedOrigins = env.CORS_ORIGIN ? env.CORS_ORIGIN.split(',') : ['*'];
  const origin = requestOrigin && allowedOrigins.includes(requestOrigin) 
    ? requestOrigin 
    : allowedOrigins.includes('*') 
      ? '*' 
      : allowedOrigins[0];
  
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Max-Age', '86400');
  
  return response;
}

export function handleCors(request: Request, env: Env): Response | null {
  if (request.method === 'OPTIONS') {
    const response = new Response(null, { status: 200 });
    const requestOrigin = request.headers.get('Origin') || undefined;
    return addCorsHeaders(response, env, requestOrigin);
  }
  return null;
} 