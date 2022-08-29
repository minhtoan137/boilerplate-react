import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

import { MeasuringInput, MeasuringResponse } from '../types';

type MeasuringUpdateInput = {
  _id: string
  params: MeasuringInput
}

export const updateMeasuring = ({ _id, params }: MeasuringUpdateInput): Promise<MeasuringResponse> => {
  return axios.put(`/measuring/${_id}`, params);
};

type UseUpdateMeasuringOptions = {
  config?: MutationConfig<typeof updateMeasuring>;
};

export const useUpdateMeasuring = ({ config }: UseUpdateMeasuringOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onSuccess: async ({ success, error, message, data }) => {
      if (success) {
        queryClient.refetchQueries(['measuring', data?._id])
        queryClient.refetchQueries(['measuringList'], { stale: true })
        addNotification({
          type: 'success',
          title: 'Update Success',
        });
      }
      if (error) {
        addNotification({
          type: 'error',
          title: 'Update Failed',
          message
        });
      }
    },
    onError: (err, variables, context) => {
      console.log(err, variables, context, 'onError login')
    },
    ...config,
    mutationFn: updateMeasuring,
  });
};
