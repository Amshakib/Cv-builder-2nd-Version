import React from 'react';
import { Typography, Form, Input, Button } from 'antd';
import './Skills.css';

const { Title, Text } = Typography;

const Skills = ({ 
  skills, 
  setSkills, 
  onNext, 
  onPrev, 
  isFirstSection, 
  isLastSection 
}) => {
  return (
    <div className="skills-section">
      <Title level={3} className="section-title">Skills</Title>
      <Text type="secondary" className="section-subtitle">
        What are you good at?
      </Text>
      <Form layout="vertical" className="skills-form">
        <Form.Item>
          <Input.TextArea
            value={skills}
            onChange={e => setSkills(e.target.value)}
            placeholder="e.g. React.js, Node.js, graphic design"
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
        </Form.Item>
        <Text type="secondary" className="skills-hint">
          Separate each skill with a comma.
        </Text>
      </Form>
      <div className="form-navigation">
        <Button onClick={onPrev} disabled={isFirstSection}>Previous step</Button>
        <Button type="primary" onClick={onNext} disabled={isLastSection}>Next step</Button>
      </div>
    </div>
  );
};

export default Skills;
