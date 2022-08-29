import { Button, Form, Input, InputNumber } from 'antd';
import { memo, useEffect, useMemo } from 'react';

type FormMeasuringProps = {
  data?: any;
  onFinish: (values: any) => void;
};

export const FormMeasuring = memo(({ data, onFinish }: FormMeasuringProps) => {
  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const INIT_VALUES = useMemo(
    () => ({
      key: data?.data?.data?.key,
      name: data?.data?.data?.name,
      numericalOrder: data?.data?.data?.numericalOrder,
      unit: data?.data?.data?.unit,
    }),
    [data]
  );

  useEffect(() => {
    form.setFieldsValue(INIT_VALUES);

    return () => {
      form.resetFields();
    };
  }, [form, INIT_VALUES]);

  return (
    <Form
      name="form_measuring"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={INIT_VALUES}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
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
});

FormMeasuring.displayName = 'FormMeasuring';
