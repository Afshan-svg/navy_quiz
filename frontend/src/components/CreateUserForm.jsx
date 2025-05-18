import React from 'react';
import { Form, Input, Select, Button, Card } from 'antd';

const { Option } = Select;

const CreateUserForm = ({ onCreate }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onCreate(values);
    form.resetFields(); // Clear form after submission
  };

  return (
    <Card title="Create New User" className="shadow-lg">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ role: 'user' }}
      >
        <Form.Item
          name="name"
          label="Username"
          rules={[{ required: true, message: 'Please enter a username' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please enter a password' }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Create User
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateUserForm;