"use client";

import Head from 'next/head';
import React from 'react';
import { Header } from '../../components/Header'; // ajuste o caminho conforme seu projeto
import styles from './style.module.scss'; // ajuste o caminho conforme seu projeto
import { FiUpload } from 'react-icons/fi';
import { useState,ChangeEvent } from 'react';

export default function Product() {

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState(null);

    function handleFile(event: ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) {
            return;
        }

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
            return;
        }
    }

    return (
        <>
        <Head>
            <title>Novo Produto - Amigo Pizza</title>
        </Head>
        <Header />
        <main className={styles.container}>
            <h1>Pagina Cadastro de Novo Produto</h1>
            <form className={styles.form}>

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
                />)}
                
            </label>

                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome do Produto</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="price">Preço</label>
                    <input type="number" id="price" name="price" required />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="category">Categoria</label>
                    <select id="category" name="category" required>
                        <option value="">Selecione uma categoria</option>
                        {/* Adicione opções de categorias aqui */}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description">Descrição</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                <button className={styles.buttonSubmit} type="submit">Cadastrar Produto</button>
            </form>
        </main>
        </>
    );
}