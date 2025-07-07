'use client';

import { OrderItemProps } from '@/app/dashboard/page';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import styles from './style.module.scss';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order?: OrderItemProps[];
  handleFinishOrder?: (orderId: string) => void;
}

export function ModalOrder({
  isOpen,
  onRequestClose,
  order,
  handleFinishOrder,
}: ModalOrderProps) {
  const mesa = order?.[0]?.order.table || 'N/A';
  const orderId = order?.[0]?.orderId;

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '600px',
      width: '100%',
      padding: '2rem',
      backgroundColor: '#1e1b2e',
      border: 'none',
      borderRadius: '12px',
      animation: `${styles.fadeIn} 0.3s ease-in-out`,
    },
  };

  const calcularTotal = () => {
    return (
      order?.reduce(
        (acc, item) => acc + item.amount * item.product.price,
        0
      ) || 0
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName={styles.overlay}
      style={customStyles}
      appElement={document.getElementById('modal-root')!}
    >
      <button
        type="button"
        onClick={onRequestClose}
        className={styles.closeButton}
      >
        <FiX size={35} />
      </button>

      <div className={styles.modalOrder}>
        <h1 className={styles.heading}>Detalhes do Pedido</h1>
        <h2 className={styles.title}>Mesa {mesa}</h2>

        <div className={styles.itemList}>
          {order?.map((item) => (
            <span key={item.id}>
              {item.amount}x {item.product.name}
            </span>
          ))}
        </div>

        <div className={styles.totalSection}>
          <span>Total</span>
          <strong>
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(calcularTotal())}
          </strong>
        </div>

        <button
          className={styles.concludeButton}
          onClick={() => {
            if (handleFinishOrder && orderId) {
              handleFinishOrder(orderId);
            }
          }}
        >
          Concluir Pedido
        </button>
      </div>
    </Modal>
  );
}
