import { useMutation } from 'react-query';

import { API_URL } from '@/config';
import { axios } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';



export const logout = (userId: string): Promise<boolean> => {
  return axios.post(`${API_URL}/auth/logout`, userId);
};


type MutationFnType = typeof logout;

type UseLogOutOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useLogout = ({ config }: UseLogOutOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: async (data) => {
      if (data) {
        localStorage.removeItem('authToken')
        addNotification({
          type: 'success',
          title: 'Logout Success',
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Logout Failed',
        });
      }

    },
    onError: (err, variables, context) => {
      console.log(err, variables, context, 'onError login')
    },
    ...config,
  });
};

