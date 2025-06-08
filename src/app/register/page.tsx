"use client"

import { useState,useContext } from 'react';
import Head from 'next/head';
import styles from '../../../styles/home.module.scss';
import { Input } from '../../components/ui/input/index';
import { Button } from '../../components/ui/button/index';
import { toast } from 'react-toastify'; 


import Link from 'next/link';

import { AuthContext } from '../contexts/AuthContext';

export default function Register() {
  const { signUp } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSingUp(event) {
    event.preventDefault();
    if (name === '' || email === '' || password === '') {
      toast.warning('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    
    await signUp({
      name,
      email,
      password
    }).catch((error) => {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar. Verifique seus dados.');
    });

    setLoading(false);
    setName('');
    setEmail('');
    setPassword('');
    alert('Cadastro realizado com sucesso!');
    // Redirecionar para a página de login ou outra ação após o cadastro
    // router.push('/login');
    

  }

  return (
    <>
      <Head>
        <title>
          Amigo Pizza, Crie sua conta
        </title>
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.containerCenter}>
        <h1>
          <span className={styles.amigo}>Amigo</span>{' '}
          <span className={styles.pizza}>Pizza</span>
        </h1>
        <p>Preencha os campos para criar sua conta</p>
        <div>
          <form onSubmit={handleSingUp}>
            <Input 
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              placeholder='Digite seu e-mail'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' loading={loading}> 
              Cadastrar
            </Button>

            <Link href="/">
              <Button type='button'>
                Já tenho uma conta
              </Button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
