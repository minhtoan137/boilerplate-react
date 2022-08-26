import { useMutation } from 'react-query';

import { API_URL } from '@/config';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { LoginValues, UserResponse } from '../types';

export const loginAPI = (params: LoginValues): Promise<UserResponse> => {
  return axios.post(`${API_URL}/auth/login`, params);
};

type UseLoginOptions = {
  config?: MutationConfig<typeof loginAPI>;
};

export const useLogin = ({ config }: UseLoginOptions) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async ({ success, error, data, token }) => {
      if (success) {
        localStorage.setItem('authToken', token)
        addNotification({
          type: 'success',
          title: 'Login Success',
        });
      }
      if (error) {
        addNotification({
          type: 'error',
          title: 'Login Failed',
        });
      }
    },
    onError: (err, variables, context) => {
      console.log(err, variables, context, 'onError login')
    },
    ...config,
  });
};