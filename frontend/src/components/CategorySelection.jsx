import React, { useState, useEffect } from 'react';
import { Card, message, Spin, Typography, Layout } from 'antd';
import axios from 'axios';

const { Title } = Typography;
const { Content } = Layout;

const CategorySelection = ({ onCategorySelect }) => {
  const [divisions, setDivisions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch divisions from backend
  const fetchDivisions = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://navy-quiz.onrender.com/api/divisions');
      setDivisions(response.data);
    } catch (error) {
      message.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #bbdefb 0%, #e3f2fd 100%)',
        padding: '40px 20px',
      }}
    >
      <Content style={{ maxWidth: 900, margin: '0 auto' }}>
        <Title
          level={1}
          style={{
            color: '#0d47a1',
            fontFamily: 'Hind, sans-serif',
            textAlign: 'center',
            marginBottom: 40,
            userSelect: 'none',
          }}
        >
          🇮🇳 Select a Quiz Category (श्रेणी चुनें)
        </Title>

        {loading ? (
          <div style={{ textAlign: 'center', paddingTop: 60 }}>
            <Spin tip="Loading categories..." size="large" />
          </div>
        ) : divisions.length === 0 ? (
          <p
            style={{
              fontSize: 18,
              color: '#1565c0',
              fontFamily: 'Hind, sans-serif',
              textAlign: 'center',
              marginTop: 40,
            }}
          >
            No categories available.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {divisions.map((division) => (
              <Card
                key={division._id}
                hoverable
                onClick={() => onCategorySelect(division._id)}
                style={{
                  borderRadius: 12,
                  boxShadow:
                    '0 4px 12px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(255, 193, 7, 0.3)',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  backgroundColor: '#fffde7',
                  textAlign: 'center',
                  padding: '20px',
                  userSelect: 'none',
                }}
                onMouseEnter={( bespre2e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow =
                    '0 8px 24px rgba(0, 0, 0, 0.15), 0 10px 28px rgba(255, 193, 7, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow =
                    '0 4px 12px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(255, 193, 7, 0.3)';
                }}
              >
                {division.image ? (
                  <img
                    src={division.image}
                    alt={division.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '16px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      marginBottom: '16px',
                      color: '#888',
                      fontFamily: 'Hind, sans-serif',
                    }}
                  >
                    No Image
                  </div>
                )}
                <Title
                  level={3}
                  style={{ fontFamily: 'Hind, sans-serif', color: '#ef6c00', marginBottom: 0 }}
                >
                  {division.name}
                </Title>
              </Card>
            ))}
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default CategorySelection;