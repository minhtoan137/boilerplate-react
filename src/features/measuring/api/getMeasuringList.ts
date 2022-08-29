import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { MeasuringResponse } from '../types';

export const getMeasuringList = ({ page = 1, itemPerPage = 100 }): Promise<MeasuringResponse> => {
  return axios.get(`/measuring/?page=${page}&itemPerPage=${itemPerPage}`);
};

type QueryFnType = typeof getMeasuringList;

type UseMeasuringListOptions = {
  page?: number,
  itemPerPage?: number,
  config?: QueryConfig<QueryFnType>;
};

export const useGetMeasuringList = ({ page, itemPerPage, config }: UseMeasuringListOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['measuringList'],
    queryFn: () => getMeasuringList({ page, itemPerPage }),
    ...config,
  });
};
