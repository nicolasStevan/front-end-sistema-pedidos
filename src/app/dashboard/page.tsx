'use client'

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Head from 'next/head';
import style from './style.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';

import { Header } from '../../components/Header';

import { setupAPIClient } from '../services/api';
import { toast } from 'react-toastify';

import { ModalOrder } from '../../components/ModalOrder';

import Modal from 'react-modal';

interface OrderProps {
  id: string;
  table: number;
  status: boolean;
  draft: boolean;
  name?: string;
}

export type OrderItemProps = {
  id: string;
  amount: number;
  orderId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    file: string;
  }
  order: {
    id: string;
    table: number;
    status: boolean;
    name?: string;
    draft: boolean;
  };
}

export default function Dashboard() {
  const { signOut, user } = useContext(AuthContext);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalIsOpen, setModalIsOpen] = useState(false);


  async function loadOrders() {
    try {
      setLoading(true);
      const apiClient = setupAPIClient();
      const response = await apiClient.get('/orders');
      setOrders(response.data);
    } catch (err) {
      toast.error('Erro ao carregar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function handleCloseModal() {
    setModalIsOpen(false);
    setModalItem(undefined);
  }

 async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient();

    const response = apiClient.get('/order/detail',{
      params: {
        orderId: id,
      }
    })
    setModalItem((await response).data);
    setModalIsOpen(true);
  }

   useEffect(() => {
    Modal.setAppElement('#modal-root');
  }, []);
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
            <button onClick={loadOrders} disabled={loading}>
              <FiRefreshCcw size={25} color="#3fffa3" />
              <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
            </button>
          </div>

          <article className={style.listOrders}>
            {orders.length === 0 && (
              <span className={style.empty}>Nenhum pedido aberto...</span>
            )}

            {orders.map((order) => (
              <section key={order.id} className={style.orderItem}>
                <button onClick={() => handleOpenModalView(order.id)}>
                  <div className={style.tag}></div>
                  <span>Mesa {order.table}</span>
                </button>
              </section>
            ))}
          </article>

          {modalIsOpen && (
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal}
              overlayClassName="react-modal-overlay"
              className="react-modal-content"
            >
              <button
                type="button"
                onClick={handleCloseModal}
                className="react-modal-close"
              >
                <FiRefreshCcw size={25} color="#f34748" />
              </button>

              <ModalOrder modalItem={modalItem} />
            </Modal>
          )}

        </main>
      </div>
    </>
  );
}
