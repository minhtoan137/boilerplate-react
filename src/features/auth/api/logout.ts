import { API_URL } from '@/config';
import { axios } from '@/lib/axios';

export const logoutAPI = (userId: string): Promise<boolean> => {
  return axios.post(`${API_URL}/auth/logout`, userId);
};

