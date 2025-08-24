import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import TemplateThumbnail from '../TemplateThumbnail/TemplateThumbnail';
import './HomePage.css';

const { Title, Text } = Typography;

const HomePage = ({ templates, onTemplateSelect, hoveredTemplateId, setHoveredTemplateId }) => {
  return (
    <div className="home-page">
      <Title level={2} className="home-title">Choose a template</Title>
      <Text className="home-subtitle">
        Choose one of our most liked templates. Change it anytime.
      </Text>
      <Row gutter={[32, 32]} justify="center">
        {templates.map((tpl) => (
          <Col xs={24} sm={12} lg={8} key={tpl.id}>
            <div 
              className="template-card"
              onClick={() => onTemplateSelect(tpl.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)';
                e.currentTarget.style.background = '#ffffff';
                setHoveredTemplateId(tpl.id);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)';
                e.currentTarget.style.background = '#fafafa';
                setHoveredTemplateId(null);
              }}
            >
              <div className="template-content">
                <div className="template-badge">
                  <span className="badge-text">Popular</span>
                </div>
                <TemplateThumbnail templateId={tpl.id} />
              </div>
              <div className="template-footer">
                <Title level={4} className="template-name">{tpl.name}</Title>
                <Button 
                  size="large"
                  className="template-button"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(107, 114, 128, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.2)';
                  }}
                  onClick={() => onTemplateSelect(tpl.id)}
                >
                  Choose template
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
