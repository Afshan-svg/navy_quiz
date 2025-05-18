import React, { useState, useEffect } from 'react';
import { Layout, message } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import UserManagement from '../components/admin/UserManagement';
import DivisionManagement from '../components/admin/DivisionManagement';
import QuestionManagement from '../components/admin/QuestionManagement';
import 'antd/dist/reset.css';

const { Content } = Layout;

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Check if user is admin on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      message.error('Access denied. Admins only.');
      navigate('/');
    }
  }, [navigate]);

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Content className="bg-gradient-to-br from-blue-100 to-blue-300">
          <div className="max-w-4xl mx-auto">
            <Routes>
              <Route path="users" element={<UserManagement />} />
              <Route path="divisions" element={<DivisionManagement />} />
              <Route path="questions" element={<QuestionManagement />} />
              <Route path="/" element={<UserManagement />} /> {/* Default route */}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;