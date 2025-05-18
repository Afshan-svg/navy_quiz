import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Select, message, Typography, Card, Layout } from 'antd';
import axios from 'axios';

const { Option } = Select;
const { Title } = Typography;
const { Content } = Layout;

const QuestionManagement = () => {
  const [divisions, setDivisions] = useState([]);
  const [questions, setQuestions] = useState([]);
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

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://navy-quiz.onrender.com/api/questions');
      setQuestions(response.data);
    } catch (error) {
      message.error('Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQuestion = async (values) => {
    try {
      const payload = {
        ...values,
        options: values.options.split(',').map((opt) => opt.trim()),
      };

      const response = await axios.post('https://navy-quiz.onrender.com/api/questions', payload);
      message.success('Question created successfully');
      form.resetFields();
      fetchQuestions();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create question');
    }
  };

  useEffect(() => {
    fetchDivisions();
    fetchQuestions();
  }, []);

  const columns = [
    {
      title: '❓ Question',
      dataIndex: 'question',
      key: 'question',
      render: (text) => <span style={{ fontFamily: 'Hind, sans-serif' }}>{text}</span>,
    },
    {
      title: '📂 Division',
      dataIndex: 'division',
      key: 'division',
      render: (division) => division?.name || 'Unknown',
    },
    {
      title: '🔢 Options',
      dataIndex: 'options',
      key: 'options',
      render: (options) => options.join(', '),
    },
    {
      title: '✅ Correct Answer',
      dataIndex: 'answer',
      key: 'answer',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ margin: '20px auto', maxWidth: '900px' }}>
        <Title level={2} style={{ color: '#0d47a1', fontFamily: 'Hind, sans-serif' }}>
          🇮🇳 Question Management (प्रश्न प्रबंधन)
        </Title>

        <Card
          style={{
            marginBottom: 24,
            backgroundColor: '#fff8e1',
            border: '1px solid #ffe082',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
          title={<span style={{ fontFamily: 'Hind, sans-serif' }}>➕ Add New Question</span>}
          headStyle={{ backgroundColor: '#fff3e0', borderBottom: '1px solid #ffe082' }}
        >
          <Form form={form} onFinish={handleCreateQuestion} layout="vertical">
            <Form.Item
              name="division"
              label={<span style={{ fontFamily: 'Hind, sans-serif' }}>Division</span>}
              rules={[{ required: true, message: 'Please select a division' }]}
            >
              <Select placeholder="Select a division">
                {divisions.map((division) => (
                  <Option key={division._id} value={division._id}>
                    {division.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="question"
              label={<span style={{ fontFamily: 'Hind, sans-serif' }}>Question</span>}
              rules={[{ required: true, message: 'Please enter a question' }]}
            >
              <Input placeholder="e.g., What does CPU stand for?" />
            </Form.Item>

            <Form.Item
              name="options"
              label={<span style={{ fontFamily: 'Hind, sans-serif' }}>Options (comma-separated, exactly 4)</span>}
              rules={[
                { required: true, message: 'Please enter 4 options' },
                {
                  validator: (_, value) => {
                    const options = value?.split(',').map((opt) => opt.trim());
                    if (options?.length !== 4) {
                      return Promise.reject('Please provide exactly 4 options');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="e.g., Option1, Option2, Option3, Option4" />
            </Form.Item>

            <Form.Item
              name="answer"
              label={<span style={{ fontFamily: 'Hind, sans-serif' }}>Correct Answer</span>}
              rules={[{ required: true, message: 'Please enter the correct answer' }]}
            >
              <Input placeholder="e.g., Option1" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: '#2e7d32', borderColor: '#2e7d32' }}
            >
              Create Question
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
          title={<span style={{ fontFamily: 'Hind, sans-serif' }}>📋 Existing Questions</span>}
          headStyle={{ backgroundColor: '#bbdefb', borderBottom: '1px solid #90caf9' }}
        >
          <Table
            columns={columns}
            dataSource={questions}
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

export default QuestionManagement;
