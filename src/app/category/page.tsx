'use client';

import Head from 'next/head';
import React from 'react';
import style from './style.module.scss'; // ajuste o caminho conforme seu projeto
import { useState, formEvent } from 'react';
import { setupAPIClient } from '../services/api';
import { toast } from 'react-toastify';

import { Header } from '../../components/Header'; // ajuste o caminho conforme seu projeto

export default function CategoryPage() {
  const [name, setName] = useState('');
    
  async function handleSubmit(event: formEvent) {
    event.preventDefault();

    if (name === '') {
      alert('Por favor, preencha o nome da categoria.');
      return;
    }

    const apiClient = setupAPIClient();
    await apiClient.post('/category', {
      name,
        // description: description, // Descomente se você adicionar o campo de descrição
    });
    toast.success('Categoria cadastrada com sucesso!');
    setName(''); // Limpa o campo após o envio
   
  }
  
    return (
    <>
      <Head>
        <title>Categoria</title>
      </Head>
        <Header />
      <main className={style.container}>
        <h1>Cadastrar Categorias</h1>
        <form  onSubmit={handleSubmit} className={style.form}>
          <div className={style.formGroup}>
            <label htmlFor="name">Nome da Categoria</label>
            <input 
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
          </div>
          {/* <div className={style.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea id="description" name="description" required></textarea>
          </div> */}
          <button type="submit">Cadastrar</button>
        </form>
      </main>
    </>
  );
}