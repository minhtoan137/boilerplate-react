/* eslint-disable */
import { queryClient } from '@/lib/react-query';
import { Button, Drawer, Form, Input, InputNumber, Space, Table } from 'antd';
import { useState } from 'react';
import { useCreateMeasuring } from '../api/createMeasuring';

import { useMeasuringList } from '../api/getMeasuring';

export const MeasuringComponent = () => {
  const data = useMeasuringList({});
  const { mutate: mutateCreateMeasuring } = useCreateMeasuring({});
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
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
      render: () => {
        return (
          <div className="flex gap-2 justify-center items-center">
            <Button>Edit</Button>
            <Button>Delete</Button>
          </div>
        );
      },
    },
  ];

  const dataSource = data?.data?.data?.map((item: any, index: number) => {
    return {
      index: index + 1,
      key: item.key,
      name: item.name,
      unit: item.unit,
    };
  });

  const onFinish = (values: any) => {
    mutateCreateMeasuring(values, {
      onSuccess(data, variables, context) {
        console.log(data, 'data');
        queryClient.prefetchQuery(['measuringList']);
        onClose();
      },
      onError(error, variables, context) {
        console.error(error, 'error');
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-1xl font-bold">Measuring1 s1:</h3>
        <Button onClick={showDrawer}>Create +</Button>
      </div>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Code"
            name="key"
            rules={[{ required: true, message: 'Please input your code!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Unit" name="unit">
            <Input />
          </Form.Item>

          <Form.Item
            label="Numerical Order"
            name="numericalOrder"
            rules={[{ required: true, message: 'Please input your numerical order!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};
