'use client';

import { OrderItemProps } from '@/app/dashboard/page';

interface ModalOrderProps {
  modalItem?: OrderItemProps[];
}

export function ModalOrder({ modalItem }: ModalOrderProps) {
  return (
    <div>
      <h1>Detalhes do Pedido</h1>
      {modalItem?.map((item) => (
        <div key={item.id}>
          <p><strong>Produto:</strong> {item.product.name}</p>
          <p><strong>Qtd:</strong> {item.amount}</p>
          <p><strong>Descrição:</strong> {item.product.description}</p>
        </div>
      ))}
    </div>
  );
}
