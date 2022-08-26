import { useQuery } from 'react-query';

import { API_URL } from '@/config';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { UserResponse } from '../types';

export const getMe = (): Promise<UserResponse> => {
  return axios.get(`${API_URL}/auth/me`);
};

type QueryFnType = typeof getMe;

type UseMeOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMe = ({ config }: UseMeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['me'],
    queryFn: () => getMe(),
    onError: (err) => {
      console.log(err, 'onError')
    },
    onSettled: (data, err) => {
      // console.log(err, data, '-onSettled')
    },
    ...config,
  });
};
