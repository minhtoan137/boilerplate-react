/* eslint-disable */
import { queryClient } from '@/lib/react-query';
import { Button, Drawer, Form, Input, InputNumber, Space, Table } from 'antd';
import { useState } from 'react';
import { useCreateMeasuring } from '../api/createMeasuring';

import { useMeasuringList } from '../api/getMeasuring';
import { FormMeasuring } from './FormMeasuring';

export const DrawerMeasuring = () => {
  const data = useMeasuringList({});
  const { mutate: mutateCreateMeasuring } = useCreateMeasuring({});
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
      <FormMeasuring />
    </Drawer>
  );
};
