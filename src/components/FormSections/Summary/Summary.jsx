import React from 'react';
import { Typography, Form, Input, Button } from 'antd';
import { BoldOutlined, UnorderedListOutlined, LinkOutlined } from '@ant-design/icons';
import { formatText } from '../../../utils/textFormatting';
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
          <div className="rich-text-editor">
            <div className="editor-toolbar">
              <Button
                size="small"
                icon={<BoldOutlined />}
                onClick={() => formatText({ current: { resizableTextArea: { textArea: document.getElementById('summary-textarea') } } }, 'bold')}
                className="toolbar-button"
                title="Bold text"
              />
              <Button
                size="small"
                icon={<UnorderedListOutlined />}
                onClick={() => formatText({ current: { resizableTextArea: { textArea: document.getElementById('summary-textarea') } } }, 'bullet')}
                className="toolbar-button"
                title="Add bullet point"
              />
              <Button
                size="small"
                icon={<LinkOutlined />}
                onClick={() => formatText({ current: { resizableTextArea: { textArea: document.getElementById('summary-textarea') } } }, 'link')}
                className="toolbar-button"
                title="Add link"
              />
            </div>
            <Input.TextArea
              id="summary-textarea"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              placeholder="A brief, engaging text about yourself. Use the toolbar above to format text with bold, bullets, and links."
              autoSize={{ minRows: 2, maxRows: 4 }}
              className="description-textarea"
            />
          </div>
          <Text type="secondary" className="formatting-hint">
            Use <strong>**text**</strong> for bold, <strong>• text</strong> for bullets, and <strong>[text](url)</strong> for links
          </Text>
        </Form.Item>
      </Form>
      <div className="form-navigation">
        <Button onClick={onPrev} disabled={isFirstSection}>Previous step</Button>
      </div>
    </div>
  );
};

export default Summary;
