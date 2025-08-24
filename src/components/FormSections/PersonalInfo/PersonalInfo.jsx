import React from 'react';
import { Form, Input, Button, Upload, Avatar, Typography, Row, Col } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import './PersonalInfo.css';

const { Title, Text } = Typography;

const PersonalInfo = ({ 
  form, 
  personalInfo, 
  setPersonalInfo, 
  avatarUrl, 
  setAvatarUrl, 
  onNext, 
  onPrev, 
  isFirstSection, 
  isLastSection 
}) => {
  const handleUpload = (info) => {
    if (info.file?.status === 'removed') {
      setAvatarUrl(null);
      return;
    }
    const fileObj = info.file?.originFileObj || info.file;
    if (fileObj) {
      const reader = new FileReader();
      reader.onload = e => setAvatarUrl(e.target.result);
      reader.readAsDataURL(fileObj);
    }
  };

  return (
    <>
      <Title level={3}>Personal info</Title>
      <Text type="secondary">Tell us about yourself.</Text>
      <Form
        form={form}
        layout="vertical"
        className="personal-info-form"
        initialValues={personalInfo}
        onValuesChange={(changedValues, allValues) => setPersonalInfo(allValues)}
      >
        <Form.Item label="Your photo">
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            accept="image/*"
            maxCount={1}
            onChange={handleUpload}
            onRemove={() => setAvatarUrl(null)}
          >
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
          {avatarUrl && (
            <div className="avatar-preview">
              <Avatar src={avatarUrl} size={64} />
              <Button className="remove-avatar-btn" onClick={() => setAvatarUrl(null)}>
                Remove
              </Button>
            </div>
          )}
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First name" name="firstName">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" name="lastName">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Job title" name="jobTitle">
          <Input />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Country" name="country">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <div className="form-navigation">
          <Button onClick={onPrev} disabled={isFirstSection}>Previous step</Button>
          <Button type="primary" onClick={onNext} disabled={isLastSection}>Next step</Button>
        </div>
      </Form>
    </>
  );
};

export default PersonalInfo;
