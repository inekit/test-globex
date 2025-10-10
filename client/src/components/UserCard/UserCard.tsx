import React from 'react';
import { User } from '../../types/user';
import styles from './UserCard.module.scss';

interface UserCardProps {
  user: User;
  onClick: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <div className={styles.userCard} onClick={() => onClick(user)}>
      <h3 className={styles.name}>{user.name}</h3>
      <div className={styles.info}>
        <p className={styles.phone}>{user.phone}</p>
        <p className={styles.email}>{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
