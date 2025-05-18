import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, AppstoreOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => navigate('/admin/users'),
    },
    {
      key: 'divisions',
      icon: <AppstoreOutlined />,
      label: 'Divisions',
      onClick: () => navigate('/admin/divisions'),
    },
    {
      key: 'questions',
      icon: <QuestionCircleOutlined />,
      label: 'Questions',
      onClick: () => navigate('/admin/questions'),
    },
  ];

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className="min-h-screen">
      <div className="h-16 flex items-center justify-center bg-blue-900 text-white text-xl font-bold">
        {collapsed ? 'AD' : 'Admin Dashboard'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['users']}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;