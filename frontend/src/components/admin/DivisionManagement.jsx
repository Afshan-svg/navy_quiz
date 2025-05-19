import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, message, Typography, Card, Layout, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
      const response = await axios.get('https://navy-quiz.onrender.com/api/divisions');
      setDivisions(response.data);
    } catch (error) {
      message.error('Failed to fetch divisions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDivision = async (values) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      if (values.image && values.image[0]) {
        formData.append('image', values.image[0].originFileObj);
      }

      const response = await axios.post('https://navy-quiz.onrender.com/api/divisions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
      title: '🖼️ Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) =>
        image ? (
          <img src={image} alt="division" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
        ) : (
          <span>No Image</span>
        ),
    },
    {
      title: '🗓️ Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
  ];

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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
            <Form.Item
              name="image"
              label={<span style={{ fontFamily: 'Hind, sans-serif' }}>Division Image</span>}
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: false }]}
            >
              <Upload name="image" listType="picture" maxCount={1} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Upload Image (JPEG/PNG/GIF, max 5MB)</Button>
              </Upload>
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: '#2e7d32', borderColor: '#2e7d32' }}
            >
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