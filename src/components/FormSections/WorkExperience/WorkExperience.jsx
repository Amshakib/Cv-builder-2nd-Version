import React from 'react';
import { Typography, Card, Form, Input, Button, Row, Col } from 'antd';
import { BoldOutlined, UnorderedListOutlined, LinkOutlined } from '@ant-design/icons';
import { formatText } from '../../../utils/textFormatting';
import './WorkExperience.css';

const { Title, Text } = Typography;

const WorkExperience = ({ 
  workExperiences, 
  setWorkExperiences, 
  onNext, 
  onPrev, 
  isFirstSection, 
  isLastSection 
}) => {
  const handleWorkChange = (idx, field, value) => {
    setWorkExperiences(prev => prev.map((exp, i) => i === idx ? { ...exp, [field]: value } : exp));
  };

  const handleAddWork = () => {
    setWorkExperiences(prev => [...prev, { jobTitle: '', company: '', startDate: '', endDate: '', description: '' }]);
  };

  const handleRemoveWork = (idx) => {
    setWorkExperiences(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="work-experience-section">
      <Title level={3} className="section-title">Work experience</Title>
      <Text type="secondary" className="section-subtitle">
        Add as many work experiences as you like.
      </Text>
      {workExperiences.map((exp, idx) => (
        <Card key={idx} className="work-experience-card">
          <div className="card-header">
            <Title level={4} className="card-title">Work experience {idx + 1}</Title>
          </div>
          <Form layout="vertical">
            <Form.Item label={<span className="form-label">Job title</span>}>
              <Input value={exp.jobTitle} onChange={e => handleWorkChange(idx, 'jobTitle', e.target.value)} />
            </Form.Item>
            <Form.Item label={<span className="form-label">Company</span>}>
              <Input value={exp.company} onChange={e => handleWorkChange(idx, 'company', e.target.value)} />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={<span className="form-label">Start date</span>}>
                  <Input type="month" value={exp.startDate} onChange={e => handleWorkChange(idx, 'startDate', e.target.value)} placeholder="YYYY-MM" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={<span className="form-label">End date</span>}>
                  <Input type="month" value={exp.endDate} onChange={e => handleWorkChange(idx, 'endDate', e.target.value)} placeholder="YYYY-MM" />
                </Form.Item>
              </Col>
            </Row>
            <Text type="secondary" className="date-hint">
              Leave <b>end date</b> empty if you are currently working here.
            </Text>
            <Form.Item label={<span className="form-label">Description</span>}>
              <div className="rich-text-editor">
                <div className="editor-toolbar">
                  <Button
                    size="small"
                    icon={<BoldOutlined />}
                    onClick={() => formatText({ current: { resizableTextArea: { textArea: document.getElementById(`desc-${idx}`) } } }, 'bold')}
                    className="toolbar-button"
                    title="Bold text"
                  />
                  <Button
                    size="small"
                    icon={<UnorderedListOutlined />}
                    onClick={() => formatText({ current: { resizableTextArea: { textArea: document.getElementById(`desc-${idx}`) } } }, 'bullet')}
                    className="toolbar-button"
                    title="Add bullet point"
                  />
                  <Button
                    size="small"
                    icon={<LinkOutlined />}
                    onClick={() => formatText({ current: { resizableTextArea: { textArea: document.getElementById(`desc-${idx}`) } } }, 'link')}
                    className="toolbar-button"
                    title="Add link"
                  />
                </div>
                <Input.TextArea 
                  id={`desc-${idx}`}
                  value={exp.description} 
                  onChange={e => handleWorkChange(idx, 'description', e.target.value)} 
                  placeholder="Describe your role and achievements. Use the toolbar above to format text with bold, bullets, and links."
                  autoSize={{ minRows: 4, maxRows: 8 }}
                  className="description-textarea"
                />
              </div>
              <Text type="secondary" className="formatting-hint">
                Use <strong>**text**</strong> for bold, <strong>• text</strong> for bullets, and <strong>[text](url)</strong> for links
              </Text>
            </Form.Item>
            <Button danger type="default" onClick={() => handleRemoveWork(idx)} className="remove-button">
              Remove
            </Button>
          </Form>
        </Card>
      ))}
      <div className="add-work-section">
        <Button type="dashed" onClick={handleAddWork} className="add-work-button">
          + Add work experience
        </Button>
      </div>
      <div className="form-navigation">
        <Button onClick={onPrev} disabled={isFirstSection}>Previous step</Button>
        <Button type="primary" onClick={onNext} disabled={isLastSection}>Next step</Button>
      </div>
    </div>
  );
};

export default WorkExperience;
