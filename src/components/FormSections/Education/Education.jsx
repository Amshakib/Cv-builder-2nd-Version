import React from 'react';
import { Typography, Card, Form, Input, Button, Row, Col } from 'antd';
import './Education.css';

const { Title, Text } = Typography;

const Education = ({ 
  educations, 
  setEducations, 
  onNext, 
  onPrev, 
  isFirstSection, 
  isLastSection 
}) => {
  const handleEducationChange = (idx, field, value) => {
    setEducations(prev => prev.map((edu, i) => i === idx ? { ...edu, [field]: value } : edu));
  };

  const handleAddEducation = () => {
    setEducations(prev => [...prev, { degree: '', school: '', result: '', startDate: '', endDate: '' }]);
  };

  const handleRemoveEducation = (idx) => {
    setEducations(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="education-section">
      <Title level={3} className="section-title">Education</Title>
      <Text type="secondary" className="section-subtitle">
        Add as many educations as you like.
      </Text>
      {educations.map((edu, idx) => (
        <Card key={idx} className="education-card">
          <div className="card-header">
            <Title level={4} className="card-title">Education {idx + 1}</Title>
          </div>
          <Form layout="vertical">
            <Form.Item label={<span className="form-label">Degree</span>}>
              <Input value={edu.degree} onChange={e => handleEducationChange(idx, 'degree', e.target.value)} />
            </Form.Item>
            <Form.Item label={<span className="form-label">School</span>}>
              <Input value={edu.school} onChange={e => handleEducationChange(idx, 'school', e.target.value)} />
            </Form.Item>
            <Form.Item label={<span className="form-label">Result (e.g., GPA, Grade)</span>}>
              <Input value={edu.result} onChange={e => handleEducationChange(idx, 'result', e.target.value)} placeholder="e.g. GPA 3.8/4.0 or First Class" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={<span className="form-label">Start date</span>}>
                  <Input type="date" value={edu.startDate} onChange={e => handleEducationChange(idx, 'startDate', e.target.value)} placeholder="dd/mm/yyyy" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span className="form-label">End date</span>}>
                  <Input type="date" value={edu.endDate} onChange={e => handleEducationChange(idx, 'endDate', e.target.value)} placeholder="dd/mm/yyyy" />
                </Form.Item>
              </Col>
            </Row>
            <Button danger type="default" onClick={() => handleRemoveEducation(idx)} className="remove-button">
              Remove
            </Button>
          </Form>
        </Card>
      ))}
      <div className="add-education-section">
        <Button type="dashed" onClick={handleAddEducation} className="add-education-button">
          + Add education
        </Button>
      </div>
      <div className="form-navigation">
        <Button onClick={onPrev} disabled={isFirstSection}>Previous step</Button>
        <Button type="primary" onClick={onNext} disabled={isLastSection}>Next step</Button>
      </div>
    </div>
  );
};

export default Education;
