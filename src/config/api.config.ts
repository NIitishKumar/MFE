/**
 * API Configuration
 * Centralized resolution of the API Base URL.
 * Automatically guarantees the '/api/v1' prefix is included.
 */
function resolveApiBaseUrl(): string {
  const envUrl = (process.env.NEXT_PUBLIC_API_URL || '').trim();

  // If no environment variable is provided, default to http://localhost:3001/api/v1
  if (!envUrl) {
    return 'http://localhost:3001/api/v1';
  }

  // Remove trailing slashes
  const cleanUrl = envUrl.replace(/\/+$/, '');

  // If it already ends with '/api/v1', return it; otherwise append '/api/v1'
  return cleanUrl.endsWith('/api/v1') ? cleanUrl : `${cleanUrl}/api/v1`;
}

export const NEXT_PUBLIC_API_BASE_URL = resolveApiBaseUrl();

