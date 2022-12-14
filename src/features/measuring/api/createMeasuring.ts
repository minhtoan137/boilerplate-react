import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { MeasuringInput, MeasuringResponse } from '../types';

export const createMeasuring = (params: MeasuringInput): Promise<MeasuringResponse> => {
  return axios.post(`/measuring`, params);
};

type UseCreateMeasuringOptions = {
  config?: MutationConfig<typeof createMeasuring>;
};

export const useCreateMeasuring = ({ config }: UseCreateMeasuringOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: createMeasuring,
    onSuccess: async ({ success, error, message, data, pagination }) => {
      if (success) {
        queryClient.refetchQueries(['measuringList'], { stale: true })

        addNotification({
          type: 'success',
          title: 'Create Success',
        });
      }
      if (error) {
        addNotification({
          type: 'error',
          title: 'Create Failed',
          message
        });
      }
    },
    onError: (err, variables, context) => {
      console.log(err, variables, context, 'onError login')
    },
    ...config,
  });
};
