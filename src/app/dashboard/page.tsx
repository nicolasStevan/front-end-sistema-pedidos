'use client'

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Head from 'next/head';
import style from './style.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';

import { Header } from '../../components/Header';

import { setupAPIClient } from '../services/api';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Painel - Amigo Pizza</title>
      </Head>
      <div>
        <Header />
        
        <main className={style.container}>
          
          <div className={style.containerHeader}>
            <h1>Últimos Pedidos</h1>
          <button>
            <FiRefreshCcw size={25} color="#3fffa3" />
            <span></span>
          </button>
          </div>

          <article className={style.listOrders}>
              
              <section className={style.orderItem}>
                <button>
                  <div className={style.tag}></div>
                  <span>Mesa 21</span>
                </button>
              </section>
          
          </article>

        </main>
      </div>
    </>
  );
}
