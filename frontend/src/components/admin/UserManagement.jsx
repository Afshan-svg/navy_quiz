import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Typography, Layout, Card, theme } from 'antd';
import CreateUserForm from '../CreateUserForm';
import UserTable from '../UserTable';

const { Title } = Typography;
const { Content } = Layout;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://navy-quiz.onrender.com/api/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (values) => {
    try {
      const response = await axios.post('https://navy-quiz.onrender.com/api/create-user', values);
      message.success(response.data.message);
      fetchUsers();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Content style={{ margin: '20px auto', maxWidth: '1000px' }}>
        <Title level={2} style={{ color: '#0d47a1', fontFamily: 'Hind, sans-serif' }}>
          🇮🇳 User Management (प्रयोक्ता प्रबंधन)
        </Title>

        <Card
          style={{
            marginBottom: 24,
            backgroundColor: '#fff8e1',
            border: '1px solid #ffe082',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
          title={<span style={{ fontFamily: 'Hind, sans-serif' }}>➕ Create New User</span>}
          headStyle={{ backgroundColor: '#fff3e0', borderBottom: '1px solid #ffe082' }}
        >
          <CreateUserForm onCreate={handleCreateUser} />
        </Card>

        <Card
          style={{
            backgroundColor: '#e3f2fd',
            border: '1px solid #90caf9',
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
          title={<span style={{ fontFamily: 'Hind, sans-serif' }}>📋 Registered Users</span>}
          headStyle={{ backgroundColor: '#bbdefb', borderBottom: '1px solid #90caf9' }}
        >
          <UserTable users={users} loading={loading} />
        </Card>
      </Content>
    </Layout>
  );
};

export default UserManagement;
