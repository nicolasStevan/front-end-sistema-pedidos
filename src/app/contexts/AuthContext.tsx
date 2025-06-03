"use client"

import { createContext, useContext, ReactNode, useState } from 'react';

import {destroyCookie} from 'nookies';
import Router from 'next/router';

type AuthContextType = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
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

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function signOut() {
    try {
        destroyCookie(undefined, 'nextauth.token');
        destroyCookie(undefined, 'nextauth.refreshToken');
        Router.push('/');
    }catch (error) {
        console.error('Error during sign out:', error);
        alert('Error during sign out. Please try again.');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | null>(null);
    const isAuthenticated = !!user;

    async function signIn({ email, password }: SignInProps) {
        console.log('Logado com:', email, password);
        alert('Login realizado com sucesso!');
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}
