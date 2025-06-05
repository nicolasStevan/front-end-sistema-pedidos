import axios, {AxiosError} from 'axios';
import {parseCookies} from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';

import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['nextauth.token']}`
        }
    });

    api.interceptors.response.use(
        response => {
            return response;
        },
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                // Unauthorized access, handle it by signing out and redirecting to login
                console.error('Unauthorized access - redirecting to login');
                if (typeof window !== 'undefined') {
                    // If in browser context, redirect to login page
                    signOut();
                    window.location.href = '/';
                } else {
                    // If in server context, you might want to throw an error or handle it differently
                    console.error('Unauthorized access on server side');
                    return Promise.reject(new AuthTokenError());
                }
            }
            return Promise.reject(error);
        }
    );
    return api;
}