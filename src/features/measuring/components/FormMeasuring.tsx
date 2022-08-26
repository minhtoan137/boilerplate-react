/* eslint-disable */
import { queryClient } from '@/lib/react-query';
import { Button, Drawer, Form, Input, InputNumber, Space, Table } from 'antd';
import { useState } from 'react';
import { useCreateMeasuring } from '../api/createMeasuring';

import { useMeasuringList } from '../api/getMeasuring';

export const FormMeasuring = () => {
  const { mutate: mutateCreateMeasuring } = useCreateMeasuring({});

  const onFinish = (values: any) => {
    mutateCreateMeasuring(values, {
      onSuccess(data, variables, context) {
        console.log(data, 'data');
        queryClient.prefetchQuery(['measuringList']);
      },
      onError(error, variables, context) {
        console.error(error, 'error');
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const INIT_VALUES = {};

  return (
    <Form
      name="form_measuring"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={INIT_VALUES}
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
  );
};
