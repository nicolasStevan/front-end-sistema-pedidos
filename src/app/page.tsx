import Head from 'next/head';
import styles from '../../styles/home.module.scss';
import { Input } from '../components/ui/input/index'
import { Button } from '../components/ui/button/index';

import Link from 'next/link';

export default function Home() {
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
            <form action="">
              <Input 
              placeholder='Digite seu e-mail'
              type='text'
              />
              <Input 
              placeholder='Digite sua senha'
              type='password'
              />
              <Button type='submit' loading={false}> 
              Acessar
              </Button>

              <Link href="/register">
                <Button type='button' >
                  Criar conta
                </Button>
              </Link>
            
              <Link href="/forgot">
                <Button type='button' >
                  Esqueci minha senha
                </Button>
              </Link>

            </form>
        </div>
      </div>
    </>
  );
}