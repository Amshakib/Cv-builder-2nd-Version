import React from 'react';
import { Layout, Row, Col, Breadcrumb, Typography, Dropdown, Tooltip, Button, Menu } from 'antd';
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
  const sectionOrder = ['personal', 'work', 'education', 'skills', 'summary'];
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

  const renderFormSection = () => {
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
            isFirstSection={isFirstSection}
            isLastSection={isLastSection}
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
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default BuilderPage;
