import React, { useState } from 'react';
import { Layout, Row, Col, Breadcrumb, Typography, Dropdown, Tooltip, Button, Menu, Input, Modal, Form, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import PersonalInfo from '../FormSections/PersonalInfo/PersonalInfo';
import WorkExperience from '../FormSections/WorkExperience/WorkExperience';
import Education from '../FormSections/Education/Education';
import Skills from '../FormSections/Skills/Skills';
import Summary from '../FormSections/Summary/Summary';
import TemplatePreview from '../TemplatePreview/TemplatePreview';
import PDFGenerator from '../PDFGenerator/PDFGenerator';
import './BuilderPage.css';

const { Content } = Layout;
const { Title } = Typography;

const BuilderPage = ({
  form,
  personalInfo,
  setPersonalInfo,
  workExperiences,
  setWorkExperiences,
  educations,
  setEducations,
  skills,
  setSkills,
  summary,
  setSummary,
  avatarUrl,
  setAvatarUrl,
  activeSection,
  setActiveSection,
  hoveredNav,
  setHoveredNav,
  selectedTemplate,
  currentColor,
  colorOptions,
  handleColorChange,
  previewRef
}) => {
  const [customSections, setCustomSections] = useState([]);
  const [isAddSectionModalVisible, setIsAddSectionModalVisible] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [sectionForm] = Form.useForm();

  const sectionOrder = ['personal', 'work', 'education', 'skills', 'summary', ...customSections.map(s => s.id)];
  const currentIndex = sectionOrder.indexOf(activeSection);
  const isFirstSection = currentIndex === 0;
  const isLastSection = currentIndex === sectionOrder.length - 1;
  
  const goNextSection = () => {
    if (!isLastSection) setActiveSection(sectionOrder[currentIndex + 1]);
  };
  
  const goPrevSection = () => {
    if (!isFirstSection) setActiveSection(sectionOrder[currentIndex - 1]);
  };

  // Color palette menu
  const colorMenu = (
    <Menu>
      {colorOptions.map((color) => (
        <Menu.Item 
          key={color.value} 
          onClick={() => handleColorChange(color.value)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: color.value === '#ffffff' ? '#000' : color.value
          }}
        >
          <div 
            style={{ 
              width: '16px', 
              height: '16px', 
              backgroundColor: color.value, 
              border: color.value === '#ffffff' ? '1px solid #ddd' : 'none',
              borderRadius: '2px'
            }} 
          />
          {color.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleAddSection = () => {
    const newSection = {
      id: `custom-${Date.now()}`,
      name: newSectionName,
      items: [{
        id: `item-${Date.now()}`,
        title: '',
        link: '',
        description: ''
      }]
    };
    setCustomSections([...customSections, newSection]);
    setNewSectionName('');
    setIsAddSectionModalVisible(false);
  };

  const handleDeleteSection = (sectionId) => {
    setCustomSections(customSections.filter(section => section.id !== sectionId));
    if (activeSection === sectionId) {
      setActiveSection('personal');
    }
  };

  const handleSectionItemChange = (sectionId, itemId, field, value) => {
    setCustomSections(customSections.map(section => {
      if (section.id !== sectionId) return section;
      
      const updatedItems = section.items.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      );
      
      return { ...section, items: updatedItems };
    }));
  };

  const addNewItem = (sectionId) => {
    setCustomSections(customSections.map(section => {
      if (section.id !== sectionId) return section;
      
      return {
        ...section,
        items: [
          ...section.items,
          {
            id: `item-${Date.now()}`,
            title: '',
            link: '',
            description: ''
          }
        ]
      };
    }));
  };

  const removeItem = (sectionId, itemId) => {
    setCustomSections(customSections.map(section => {
      if (section.id !== sectionId) return section;
      
      return {
        ...section,
        items: section.items.filter(item => item.id !== itemId)
      };
    }));
  };

  const renderFormSection = () => {
    const customSection = customSections.find(section => section.id === activeSection);
    
    if (customSection) {
      return (
        <div className="custom-section-form">
          <div className="section-title">
            <Title level={4}>{customSection.name}</Title>
            <Button 
              type="primary" 
              onClick={() => addNewItem(customSection.id)}
              icon={<PlusOutlined />}
            >
              Add Item
            </Button>
          </div>
          
          {customSection.items.map((item) => (
            <Card key={item.id} className="custom-item-card" style={{ marginBottom: 16 }}>
              <Form layout="vertical">
                <Form.Item label="Title">
                  <Input
                    value={item.title}
                    onChange={(e) => handleSectionItemChange(customSection.id, item.id, 'title', e.target.value)}
                    placeholder="e.g., Project Name, Certificate Name"
                  />
                </Form.Item>
                <Form.Item label="Link (optional)">
                  <Input
                    value={item.link}
                    onChange={(e) => handleSectionItemChange(customSection.id, item.id, 'link', e.target.value)}
                    placeholder="https://example.com"
                    type="url"
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input.TextArea
                    rows={3}
                    value={item.description}
                    onChange={(e) => handleSectionItemChange(customSection.id, item.id, 'description', e.target.value)}
                    placeholder="Enter details about this item..."
                  />
                </Form.Item>
                {customSection.items.length > 1 && (
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(customSection.id, item.id)}
                    style={{ marginTop: 8 }}
                  >
                    Remove Item
                  </Button>
                )}
              </Form>
            </Card>
          ))}
          
          <div className="form-navigation" style={{ marginTop: 24 }}>
            <Button onClick={goPrevSection} disabled={isFirstSection}>
              Previous
            </Button>
            <Button type="primary" onClick={goNextSection} disabled={isLastSection}>
              Next
            </Button>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfo
            form={form}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
            onNext={goNextSection}
            onPrev={goPrevSection}
          />
        );
      case 'work':
        return (
          <WorkExperience
            workExperiences={workExperiences}
            setWorkExperiences={setWorkExperiences}
            onNext={goNextSection}
            onPrev={goPrevSection}
            isFirstSection={isFirstSection}
            isLastSection={isLastSection}
          />
        );
      case 'education':
        return (
          <Education
            educations={educations}
            setEducations={setEducations}
            onNext={goNextSection}
            onPrev={goPrevSection}
            isFirstSection={isFirstSection}
            isLastSection={isLastSection}
          />
        );
      case 'skills':
        return (
          <Skills
            skills={skills}
            setSkills={setSkills}
            onNext={goNextSection}
            onPrev={goPrevSection}
            isFirstSection={isFirstSection}
            isLastSection={isLastSection}
          />
        );
      case 'summary':
        return (
          <Summary
            summary={summary}
            setSummary={setSummary}
            onNext={goNextSection}
            onPrev={goPrevSection}
            isFirstSection={isFirstSection}
            isLastSection={isLastSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Content className="builder-page">
      <div className="builder-container">
        <Row gutter={[48, 32]} justify="center" align="top">
          <Col xs={24} lg={11} xl={10}>
            <div className="form-section">
              <Breadcrumb className="section-breadcrumb">
                <Breadcrumb.Item 
                  onClick={() => setActiveSection('personal')} 
                  onMouseEnter={() => setHoveredNav('personal')} 
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`breadcrumb-item ${(activeSection === 'personal' || hoveredNav === 'personal') ? 'active' : ''}`}
                >
                  Personal info
                </Breadcrumb.Item>
                <Breadcrumb.Item 
                  onClick={() => setActiveSection('work')} 
                  onMouseEnter={() => setHoveredNav('work')} 
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`breadcrumb-item ${(activeSection === 'work' || hoveredNav === 'work') ? 'active' : ''}`}
                >
                  Add Work Experience
                </Breadcrumb.Item>
                <Breadcrumb.Item 
                  onClick={() => setActiveSection('education')} 
                  onMouseEnter={() => setHoveredNav('education')} 
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`breadcrumb-item ${(activeSection === 'education' || hoveredNav === 'education') ? 'active' : ''}`}
                >
                  Add Education
                </Breadcrumb.Item>
                <Breadcrumb.Item 
                  onClick={() => setActiveSection('skills')} 
                  onMouseEnter={() => setHoveredNav('skills')} 
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`breadcrumb-item ${(activeSection === 'skills' || hoveredNav === 'skills') ? 'active' : ''}`}
                >
                  Add Skills
                </Breadcrumb.Item>
                <Breadcrumb.Item 
                  onClick={() => setActiveSection('summary')} 
                  onMouseEnter={() => setHoveredNav('summary')} 
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`breadcrumb-item ${(activeSection === 'summary' || hoveredNav === 'summary') ? 'active' : ''}`}
                >
                  Add Summary
                </Breadcrumb.Item>
                {customSections.map((section) => (
                  <Breadcrumb.Item 
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    onMouseEnter={() => setHoveredNav(section.id)}
                    onMouseLeave={() => setHoveredNav(null)}
                    className={`breadcrumb-item ${(activeSection === section.id || hoveredNav === section.id) ? 'active' : ''}`}
                  >
                    <Space>
                      {section.name}
                      <Button 
                        type="text" 
                        size="small" 
                        icon={<DeleteOutlined />} 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSection(section.id);
                        }}
                        danger
                      />
                    </Space>
                  </Breadcrumb.Item>
                ))}
                <Breadcrumb.Item>
                  <Button 
                    type="dashed" 
                    size="small" 
                    icon={<PlusOutlined />} 
                    onClick={() => setIsAddSectionModalVisible(true)}
                  >
                    Add Section
                  </Button>
                </Breadcrumb.Item>
              </Breadcrumb>
              {renderFormSection()}
            </div>
          </Col>
          <Col xs={24} lg={13} xl={14}>
            <div className="preview-section">
              <div className="preview-header">
                <Title level={4} className="preview-title">Preview</Title>
                <div className="preview-actions">
                  <Dropdown overlay={colorMenu} trigger={['click']}>
                    <Tooltip title="Change theme color">
                      <Button 
                        shape="circle" 
                        size="small"
                        className="color-picker-button"
                        style={{ 
                          background: currentColor === '#ffffff' ? '#f0f0f0' : currentColor, 
                          border: `2px solid ${currentColor === '#ffffff' ? '#ddd' : currentColor}`,
                          color: currentColor === '#ffffff' ? '#000' : '#fff'
                        }}
                      >
                        🎨
                      </Button>
                    </Tooltip>
                  </Dropdown>
                  <PDFGenerator previewRef={previewRef} />
                </div>
              </div>
              <div className="preview-content">
                <TemplatePreview
                  selectedTemplate={selectedTemplate}
                  personalInfo={personalInfo}
                  workExperiences={workExperiences}
                  educations={educations}
                  skills={skills}
                  summary={summary}
                  avatarUrl={avatarUrl}
                  currentColor={currentColor}
                  previewRef={previewRef}
                  setSummary={setSummary}
                  setWorkExperiences={setWorkExperiences}
                  customSections={customSections}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <Modal
        title="Add New Section"
        open={isAddSectionModalVisible}
        onOk={() => {
          sectionForm
            .validateFields()
            .then(() => {
              handleAddSection();
              sectionForm.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={() => {
          setIsAddSectionModalVisible(false);
          sectionForm.resetFields();
        }}
        okText="Add Section"
      >
        <Form
          form={sectionForm}
          layout="vertical"
          onFinish={handleAddSection}
        >
          <Form.Item
            name="sectionName"
            label="Section Name"
            rules={[{ required: true, message: 'Please enter a section name' }]}
          >
            <Input 
              placeholder="e.g., Projects, Certificates" 
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default BuilderPage;
