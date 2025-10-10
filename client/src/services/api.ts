import axios from 'axios';
import { User, ApiResponse } from '../types/user';

const API_BASE_URL = 'http://localhost:3000';

export const userApi = {
  // Получить всех пользователей
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get<ApiResponse>(API_BASE_URL);
      return response.data.data;
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error);
      throw error;
    }
  },

  // Поиск пользователей по имени
  searchUsers: async (term: string): Promise<User[]> => {
    try {
      const response = await axios.get<ApiResponse>(
        `${API_BASE_URL}?term=${encodeURIComponent(term)}`,
      );
      return response.data.data;
    } catch (error) {
      console.error('Ошибка при поиске пользователей:', error);
      throw error;
    }
  },
};
