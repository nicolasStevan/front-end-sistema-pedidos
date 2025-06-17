'use client';

import styles from './header.module.scss';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../app/contexts/AuthContext'; // ajuste o caminho conforme seu projeto

export function Header() {
  const { signOut } = useContext(AuthContext);

  async function handleLogout() {
    await signOut();
    // Opcional: redirecione o usuário após logout, se quiser
    // ex: router.push('/login');
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <span className={styles.amigo}>Amigo</span>{' '}
        <span className={styles.pizza}>Pizza</span>
      </h1>
      <nav>
        <ul className={styles.navList}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/menu">Menu</Link></li>
          <li><Link href="/about">Sobre nós</Link></li>
          <li><Link href="/contact">Contato</Link></li>
          <li>
            <button 
              onClick={handleLogout} 
              className={styles.logoutButton}
              type="button"
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
