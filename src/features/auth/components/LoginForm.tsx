/* eslint-disable */
import { Link } from 'react-router-dom';
import * as z from 'zod';

import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useAuth } from '@/features/auth/stores/auth';
import { LoginValues } from '../types';
import { useLogin } from '../api/login';
import { queryClient } from '@/lib/react-query';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { mutate: mutateLogin } = useLogin({});

  const [form] = Form.useForm();
  // useForceUpdate - custom hooks
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const handleFinish = async (values: LoginValues) => {
    mutateLogin(values, {
      onSuccess(data) {
        if (data?.error) form.setFields([{ name: 'password', errors: [data?.message || ''] }]);
        if (data?.success) {
          queryClient.setQueryData(['me'], data);
          onSuccess();
        }
      },
    });
  };

  return (
    <div>
      <Form form={form} name="horizontal_login" onFinish={handleFinish} layout="horizontal">
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Log in
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};
