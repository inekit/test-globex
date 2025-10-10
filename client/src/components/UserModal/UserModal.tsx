import React, { useEffect } from 'react';
import { User } from '../../types/user';
import styles from './UserModal.module.scss';

interface UserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}></button>

        <div className={styles.modalBody}>
          <h2 className={styles.name}>{user.name}</h2>

          <div className={styles.infoSection}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Телефон:</span>
              <span className={styles.infoValue}>{user.phone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Почта:</span>
              <span className={styles.infoValue}>{user.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Дата приема:</span>
              <span className={styles.infoValue}>{user.hire_date}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Должность:</span>
              <span className={styles.infoValue}>{user.position_name}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Подразделение:</span>
              <span className={styles.infoValue}>{user.department}</span>
            </div>
          </div>

          <div className={styles.infoSection}>
            <h3>Дополнительная информация</h3>
            <span className={styles.infoValue}>{user.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
