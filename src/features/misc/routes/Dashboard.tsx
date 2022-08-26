import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ContentLayout } from '@/components/Layout';

export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <ContentLayout title="Dashboard">
      <Button onClick={() => navigate('/app/measuring')}>Go to measuring</Button>
      {/* <div>
        {userInfo?.firstName} {userInfo?.lastName}
      </div>
      <div>{userInfo?.email}</div> */}
    </ContentLayout>
  );
};
