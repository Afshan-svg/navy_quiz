import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, message, Typography, Card, Layout } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Content } = Layout;

const DivisionManagement = () => {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchDivisions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/divisions');
      setDivisions(response.data);
    } catch (error) {
      message.error('Failed to fetch divisions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDivision = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/divisions', values);
      message.success('Division created successfully');
      form.resetFields();
      fetchDivisions();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create division');
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const columns = [
    {
      title: '📌 Division Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span style={{ fontFamily: 'Hind, sans-serif' }}>{text}</span>,
    },
    {
      title: '🗓️ Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ margin: '20px auto', maxWidth: '800px' }}>
        <Title level={2} style={{ color: '#0d47a1', fontFamily: 'Hind, sans-serif' }}>
          🇮🇳 Division Management (विभाग प्रबंधन)
        </Title>

        <Card
          style={{
            marginBottom: 24,
            backgroundColor: '#fff8e1',
            border: '1px solid #ffe082',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
          title={<span style={{ fontFamily: 'Hind, sans-serif' }}>➕ Create New Division</span>}
          headStyle={{ backgroundColor: '#fff3e0', borderBottom: '1px solid #ffe082' }}
        >
          <Form form={form} onFinish={handleCreateDivision} layout="vertical">
            <Form.Item
              name="name"
              label={<span style={{ fontFamily: 'Hind, sans-serif' }}>Division Name</span>}
              rules={[{ required: true, message: 'Please enter a division name' }]}
            >
              <Input placeholder="e.g., सूचना प्रौद्योगिकी (IT)" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: '#2e7d32', borderColor: '#2e7d32' }}>
              Create Division
            </Button>
          </Form>
        </Card>

        <Card
          style={{
            backgroundColor: '#e3f2fd',
            border: '1px solid #90caf9',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
          title={<span style={{ fontFamily: 'Hind, sans-serif' }}>📋 Existing Divisions</span>}
          headStyle={{ backgroundColor: '#bbdefb', borderBottom: '1px solid #90caf9' }}
        >
          <Table
            columns={columns}
            dataSource={divisions}
            rowKey="_id"
            loading={loading}
            pagination={false}
            bordered
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default DivisionManagement;
