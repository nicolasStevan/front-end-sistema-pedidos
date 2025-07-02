"use client";

import Head from 'next/head';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Header } from '../../components/Header';
import styles from './style.module.scss';
import { FiUpload } from 'react-icons/fi';
import { setupAPIClient } from '../services/api';
import { toast } from 'react-toastify';

export default function Product() {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageAvatar, setImageAvatar] = useState<File | null>(null);

  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState<string>('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function loadCategories() {
      const apiClient = setupAPIClient();
      try {
        const response = await apiClient.get('/category');
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
          setCategorySelected(data[0].id); // primeira categoria como padrão
        } else {
          setCategories([]);
          setCategorySelected('');
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        setCategories([]);
        setCategorySelected('');
      }
    }

    loadCategories();
  }, []);

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const image = event.target.files[0];

    if (!image) {
      setAvatarUrl('');
      return;
    }

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    } else {
      alert('Apenas imagens JPEG ou PNG são permitidas.');
      setAvatarUrl('');
    }
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (!name || !price || !description || !imageAvatar || !categorySelected) {
      toast.error('Preencha todos os campos!');
      return;
    }

    try {
      const apiClient = setupAPIClient();
      const data = new FormData();

      data.append('name', name);
      data.append('price', price);
      data.append('description', description);
      data.append('category_id', categorySelected);
      data.append('file', imageAvatar);

      // Debug para ver o que está sendo enviado
      for (let pair of data.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await apiClient.post('/product', data);
      toast.success('Produto cadastrado com sucesso!');

      // Limpa o formulário
      setName('');
      setPrice('');
      setDescription('');
      setAvatarUrl('');
      setImageAvatar(null);
      setCategorySelected(categories[0]?.id || '');
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      toast.error('Erro ao cadastrar produto. Tente novamente.');
    }
  }

  return (
    <>
      <Head>
        <title>Novo Produto - Amigo Pizza</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h1>Cadastro de Novo Produto</h1>
        <form className={styles.form} onSubmit={handleRegister}>
          <label className={styles.labelAvatar}>
            <span>
              <FiUpload size={25} color="#000" />
            </span>
            <input type="file" accept="image/*" onChange={handleFile} />
            {avatarUrl && (
              <img
                className={styles.preview}
                src={avatarUrl}
                alt="Foto do Produto"
                width="250"
                height="250"
              />
            )}
          </label>

          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do Produto</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Preço</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              value={categorySelected}
              onChange={(e) => setCategorySelected(e.target.value)}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
            />
          </div>

          <button className={styles.buttonSubmit} type="submit">
            Cadastrar Produto
          </button>
        </form>
      </main>
    </>
  );
}
