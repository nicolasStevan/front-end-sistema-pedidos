import styles from './style.module.scss';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export function Button({ children, loading, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} disabled={loading} {...rest}>
      {loading ? (
        <FaSpinner className={styles.spinner} color="#fff" size={18} />
      ) : (
        children
      )}
    </button>
  );
}
