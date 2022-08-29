import { Button, Modal, Table } from 'antd';
import { useMemo, useRef } from 'react';

import { useDeleteMeasuring } from '../api/deleteMeasuring';
import { useGetMeasuringList } from '../api/getMeasuringList';

import { DrawerMeasuring } from './DrawerMeasuring';

export const MeasuringComponent = () => {
  const drawerRef = useRef<any>();
  const data = useGetMeasuringList();
  const deleteMeasuringMutation = useDeleteMeasuring();

  const handleShowDrawer = () => {
    drawerRef.current?.showDrawer();
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Code',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: function _renderButtonAction(_: any, record: any) {
        const handleShowDrawerEdit = (_id: string) => {
          drawerRef.current?.showDrawer(_id);
        };

        const handleDeleteMeasuring = (_id: string) => {
          Modal.confirm({
            content: 'Ban co chac muon xoa',
            title: 'Xac nhan xoa',
            onOk: () => {
              deleteMeasuringMutation.mutate(_id);
            },
          });
        };

        return (
          <div className="flex gap-2 justify-center items-center">
            <Button onClick={() => handleShowDrawerEdit(record?._id)}>Edit</Button>
            <Button onClick={() => handleDeleteMeasuring(record?._id)}>Delete</Button>
          </div>
        );
      },
    },
  ];

  const dataSource = useMemo(
    () =>
      data?.data?.data?.map((item: any, index: number) => {
        return {
          _id: item._id,
          index: index + 1,
          key: item.key,
          name: item.name,
          unit: item.unit,
        };
      }),
    [data]
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-1xl font-bold">Measuring1 s1:</h3>
        <Button onClick={handleShowDrawer}>Create +</Button>
      </div>
      <DrawerMeasuring ref={drawerRef} />
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};
