import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);

  const headers: Record<string, string> = {};

  if (cookies['nextauth.token']) {
    headers['Authorization'] = `Bearer ${cookies['nextauth.token']}`;
  }

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
    headers: headers,
    // IMPORTANT: Do NOT set Content-Type here, especially if you send FormData
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized access - redirecting to login');
        if (typeof window !== 'undefined') {
          signOut();
          window.location.href = '/';
        } else {
          console.error('Unauthorized access on server side');
          return Promise.reject(new AuthTokenError());
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
