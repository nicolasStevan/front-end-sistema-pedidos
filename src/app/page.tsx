"use client"

import { useContext,useState } from 'react';

import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import { Input } from '../components/ui/input/index';
import { Button } from '../components/ui/button/index';

import { AuthContext } from './contexts/AuthContext';

import Link from 'next/link';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // let data = {
    //   email,
    //   password
    // };

    try {
      await signIn({ email, password });
      setLoading(true);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  }

  return (
    <>
      <Head>
        <title>
          Amigo Pizza, Faça o Seu Login
        </title>
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.containerCenter}>
        <h1>
          <span className={styles.amigo}>Amigo</span>{' '}
          <span className={styles.pizza}>Pizza</span>
        </h1>
        <p>Faça o seu login para continuar</p>
        <div>
          <form onSubmit={handleLogin}>
            <Input
              placeholder='Digite seu e-mail'
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='Digite sua senha'
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' loading={false}>
              Acessar
            </Button>

            <Link href="/register">
              <Button type='button'>
                Criar conta
              </Button>
            </Link>

            <Link href="/forgot">
              <Button type='button'>
                Esqueci minha senha
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
