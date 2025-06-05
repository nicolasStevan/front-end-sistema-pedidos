"use client"

import { createContext, ReactNode, useState } from 'react';
import { destroyCookie, setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { api } from '../services/apiClient';

type AuthContextType = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (data: SignUpProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const isAuthenticated = !!user;
    const router = useRouter();

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/login', { email, password });
            const { token, refreshToken, user: userData } = response.data;

            // ✅ Set cookie com segurança
            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,  // 30 dias
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production'
            });

            setUser({
                id: userData.id,
                name: userData.name,
                email: userData.email
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            console.log('Before push to dashboard');
            router.push('/dashboard');
            console.log('After push to dashboard');

        } catch (error: any) {
            console.error('Error during sign in:', error);
            alert(error.response?.data?.message || 'Error during sign in. Please try again.');
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', { name, email, password });
            console.log('User created:', response.data);
            alert('User created successfully!');
            router.push('/');
        } catch (error: any) {
            console.error('Error during sign up:', error);
            alert(error.response?.data?.message || 'Error during sign up. Please try again.');
        }
    }

    function signOut() {
        try {
            destroyCookie(undefined, 'nextauth.token', { path: '/' });
            destroyCookie(undefined, 'nextauth.refreshToken', { path: '/' });
            setUser(null);
            router.push('/');
        } catch (error) {
            console.error('Error during sign out:', error);
            alert('Error during sign out. Please try again.');
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
