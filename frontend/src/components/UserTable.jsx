import React from 'react';
import { Table } from 'antd';

const UserTable = ({ users, loading }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <a>Delete</a>, // Placeholder for future delete functionality
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey="_id"
            bordered
            className="shadow-lg"
        />
    );
};

export default UserTable;