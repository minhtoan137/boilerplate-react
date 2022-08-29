import { Drawer } from 'antd';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import { useCreateMeasuring } from '../api/createMeasuring';
import { useGetMeasuring } from '../api/getMeasuring';
import { useUpdateMeasuring } from '../api/updateMeasuring';

import { FormMeasuring } from './FormMeasuring';

type DrawerMeasuringProps = {
  children?: React.ReactNode;
};

type DrawerMeasuringRef = Record<string, unknown>; // @typescript-eslint/ban-types

export const DrawerMeasuring = forwardRef<DrawerMeasuringRef, DrawerMeasuringProps>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [measuringId, setMeasuringId] = useState<string>('');

  const data = useGetMeasuring({
    _id: measuringId,
    config: {
      enabled: !!measuringId,
      // suspense: true, // loading status
    },
  });
  const { mutate: mutateCreateMeasuring } = useCreateMeasuring();
  const { mutate: mutateUpdateMeasuring } = useUpdateMeasuring();

  useImperativeHandle(ref, () => ({
    showDrawer,
  }));

  const showDrawer = useCallback((_id: string) => {
    if (_id) {
      setMeasuringId(_id);
    }
    setVisible(true);
  }, []);

  const onClose = useCallback(() => {
    if (measuringId) {
      setMeasuringId('');
    }
    setVisible(false);
  }, [measuringId]);

  const handleCreateMeasuring = useCallback(
    (values: any) => {
      mutateCreateMeasuring(values, {
        onSuccess(data, variables, context) {
          onClose();
        },
        onError(error, variables, context) {
          console.error(error, 'error');
        },
      });
    },
    [mutateCreateMeasuring, onClose]
  );

  const handleUpdateMeasuring = useCallback(
    (_id: string, values: any) => {
      mutateUpdateMeasuring(
        { _id, params: values },
        {
          onSuccess(data, variables, context) {
            onClose();
          },
          onError(error, variables, context) {
            console.error(error, 'error');
          },
        }
      );
    },
    [mutateUpdateMeasuring, onClose]
  );

  const handleFinish = useCallback(
    (values: any) => {
      if (measuringId) {
        handleUpdateMeasuring(measuringId, values);
      } else {
        handleCreateMeasuring(values);
      }
    },
    [measuringId, handleUpdateMeasuring, handleCreateMeasuring]
  );

  if (!visible) return null;

  const title = data?.data ? data?.data?.data?.name || '' : 'Create measuring';

  return (
    <Drawer title={title} placement="right" onClose={onClose} visible={visible}>
      <FormMeasuring onFinish={handleFinish} data={data} />
    </Drawer>
  );
});
