import create from 'zustand';
import { persist } from 'zustand/middleware';

import storage from '@/utils/storage';

import { getMe } from '../api/getMe';
import { loginAPI } from '../api/login';
import { AuthUser, LoginValues, UserResponse } from '../types';

// interface LoginResponseError {
//   error: boolean,
//   message: string
// }

interface AuthStore {
  user: AuthUser | null;
  login: (values: LoginValues) => UserResponse | any;
  logout: (userId: string) => any;
}

export const useAuth = create<AuthStore>(
  persist(
    (set) => ({
      user: null,
      login: async (values) => {
        const response = await loginAPI(values);
        if (response.success) {
          storage.setToken(response.token);
          if (response.token) {
            if (storage.getToken()) {
              const resData = await getMe();
              set((state) => ({ ...state, user: resData.data }));
            }
          }
        }

        return response;
      },
      logout: async (userId: string) => {
        // await logoutAPI(userId);
        storage.clearToken();
        window.location.assign(window.location.origin as unknown as string);
      },
    }),
    {
      name: 'token-store',
    }
  )
);
