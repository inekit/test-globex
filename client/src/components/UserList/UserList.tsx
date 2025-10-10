import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../../types/user';
import { userApi } from '../../services/api';
import SearchBar from '../SearchBar/SearchBar';
import UserCard from '../UserCard/UserCard';
import UserModal from '../UserModal/UserModal';
import styles from './UserList.module.scss';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузка всех пользователей при монтировании
  useEffect(() => {
    loadAllUsers();
  }, []);

  // Поиск пользователей с debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchUsers(searchTerm.trim());
      } else {
        setFilteredUsers(users);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, users]);

  const loadAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const allUsers = await userApi.getAllUsers();
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (err) {
      setError('Ошибка при загрузке пользователей');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const searchResults = await userApi.searchUsers(term);
      setFilteredUsers(searchResults);
    } catch (err) {
      setError('Ошибка при поиске пользователей');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = useCallback((user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className={styles.userListContainer}>
      <div className={styles.userListHeader}>
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Введите имя пользователя..."
        />
      </div>

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Загрузка...</p>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={loadAllUsers} className={styles.retryButton}>
            Попробовать снова
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className={styles.userListContent}>
          {filteredUsers.length === 0 ? (
            <div className={styles.noResults}>
              <p>
                {searchTerm.trim()
                  ? `Пользователи по запросу "${searchTerm}" не найдены`
                  : 'Пользователи не найдены'}
              </p>
            </div>
          ) : (
            <div className={styles.userGrid}>
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} onClick={handleUserClick} />
              ))}
            </div>
          )}
        </div>
      )}

      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default UserList;
