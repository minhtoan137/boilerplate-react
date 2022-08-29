import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { MeasuringResponse } from '../types';

export const deleteMeasuring = (_id: string): Promise<MeasuringResponse> => {
  return axios.delete(`/measuring/${_id}`);
};

type UseDeleteMeasuringOptions = {
  config?: MutationConfig<typeof deleteMeasuring>;
};

export const useDeleteMeasuring = ({ config }: UseDeleteMeasuringOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: deleteMeasuring,
    onSuccess: async ({ success, error, message, data }) => {
      queryClient.refetchQueries(['measuringList'], { stale: true })
      if (success) {
        addNotification({
          type: 'success',
          title: 'Delete Success',
        });
      }
      if (error) {
        addNotification({
          type: 'error',
          title: 'Delete Failed',
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
