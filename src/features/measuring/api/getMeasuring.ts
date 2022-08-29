import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { MeasuringResponse } from '../types';

export const getMeasuring = (_id: string): Promise<MeasuringResponse> => {
  return axios.get(`/measuring/${_id}`);
};

type QueryFnType = typeof getMeasuring;

type UseMeasuringListOptions = {
  _id: string,
  config?: QueryConfig<QueryFnType>;
};

export const useGetMeasuring = ({ _id, config }: UseMeasuringListOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['measuring', _id],
    queryFn: () => getMeasuring(_id),
    onSuccess(data) {
      // console.log(data, '-asdasd')
      // queryClient.clear()
    },
  });
};
