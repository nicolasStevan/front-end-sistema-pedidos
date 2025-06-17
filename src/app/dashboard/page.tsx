'use client'

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Head from 'next/head';

import { Header } from '../../components/Header';

export default function Dashboard() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Painel - Amigo Pizza</title>
      </Head>
      <div>
        <Header />
        <h2>Bem-vindo, {user?.name}!</h2>
        <h1>Painel</h1>
      </div>
    </>
  );
}
