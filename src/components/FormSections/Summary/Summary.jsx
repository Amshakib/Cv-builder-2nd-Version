import React from 'react';
import { Typography, Form, Input, Button } from 'antd';
import './Summary.css';

const { Title, Text } = Typography;

const Summary = ({ 
  summary, 
  setSummary, 
  onNext, 
  onPrev, 
  isFirstSection, 
  isLastSection 
}) => {
  return (
    <div className="summary-section">
      <Title level={3} className="section-title">Professional summary</Title>
      <Text type="secondary" className="section-subtitle">
        Write a short introduction for your resume or let the AI generate one from your entered data.
      </Text>
      <Form layout="vertical" className="summary-form">
        <Form.Item label={<span className="form-label">Professional Summary</span>}>
          <Input.TextArea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            placeholder="A brief, engaging text about yourself"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>
      </Form>
      <div className="form-navigation">
        <Button onClick={onPrev} disabled={isFirstSection}>Previous step</Button>
      </div>
    </div>
  );
};

export default Summary;
