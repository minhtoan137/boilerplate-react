import { useRoutes } from 'react-router-dom';

import { useGetMe } from '@/features/auth';
import { Landing } from '@/features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const data = useGetMe();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = data.data?.error ? publicRoutes : protectedRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
