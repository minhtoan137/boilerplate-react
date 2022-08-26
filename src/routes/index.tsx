import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

import { useMe, UserResponse } from '@/features/auth';
import { Landing } from '@/features/misc';
import { queryClient } from '@/lib/react-query';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const data = useMe({ config: {} });

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = data.data?.error ? publicRoutes : protectedRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
