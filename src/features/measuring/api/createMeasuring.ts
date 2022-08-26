import { useMutation, useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, queryClient, QueryConfig } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { CreateMeasuringInput, MeasuringType } from '../types';

export const createMeasuringList = (params: CreateMeasuringInput): Promise<MeasuringType> => {
  return axios.post(`/measuring`, params);
};


type UseCreateMeasuringOptions = {
  config?: QueryConfig<typeof createMeasuringList>;
};

export const useCreateMeasuring = ({ config }: UseCreateMeasuringOptions) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: createMeasuringList,
    onSuccess: async ({ success, error, message }) => {
      if (success) {
        // queryClient.invalidateQueries(['measuringList']);
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
