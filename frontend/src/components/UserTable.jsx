import React from 'react';
import { Table, Button } from 'antd';
import { Modal } from 'antd';

const UserTable = ({ users, loading, onDelete }) => {
    const showDeleteConfirm = (userId, userName) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this user?',
            content: `This will permanently delete ${userName}. This action cannot be undone.`,
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk() {
                onDelete(userId);
            },
        });
    };
    

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
            render: (_, record) => (
                <Button 
                    type="link" 
                    danger
                    onClick={() => showDeleteConfirm(record._id, record.name)}
                >
                    Delete
                </Button>
            ),
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