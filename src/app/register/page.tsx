import Head from 'next/head';
import styles from '../../../styles/home.module.scss';
import { Input } from '../../components/ui/input/index';
import { Button } from '../../components/ui/button/index';

import Link from 'next/link';

export default function Register() {
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
          <form action="">
            <Input 
              placeholder='Digite seu nome'
              type='text'
            />
            <Input 
              placeholder='Digite seu e-mail'
              type='text'
            />
            <Input 
              placeholder='Digite sua senha'
              type='password'
            />
            <Button type='submit' loading={false}> 
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
