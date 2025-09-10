import React, { useState, useRef } from 'react';
import { Layout, Form } from 'antd';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import BuilderPage from './components/BuilderPage/BuilderPage';
import './App.css';

function App() {
  const [form] = Form.useForm();
  const [mode, setMode] = useState('home'); // 'home' | 'builder'
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplateId, setHoveredTemplateId] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [skills, setSkills] = useState('');
  const [summary, setSummary] = useState('');
  const [currentColor, setCurrentColor] = useState('#666666');
  const previewRef = useRef(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    jobTitle: '',
    city: '',
    country: '',
    phone: '',
    email: '',
  });
  const [workExperiences, setWorkExperiences] = useState([
    { jobTitle: '', company: '', startDate: '', endDate: '', description: '' },
    { jobTitle: '', company: '', startDate: '', endDate: '', description: '' },
  ]);
  const [educations, setEducations] = useState([
    { degree: '', school: '', result: '', startDate: '', endDate: '' },
  ]);

  // Color options for the palette button
  const colorOptions = [
    { name: 'Green', value: '#389e3d' },
    { name: 'Black', value: '#000000' },
    { name: 'Gray', value: '#666666' },
    { name: 'White', value: '#ffffff' },
    { name: 'Blue', value: '#1890ff' },
    { name: 'Red', value: '#f5222d' },
    { name: 'Purple', value: '#722ed1' },
    { name: 'Orange', value: '#fa8c16' },
  ];

  const templates = [
    { id: 'classic', name: 'Classic' },
    { id: 'modern', name: 'Modern' },
    { id: 'sidebar', name: 'Sidebar' },
    { id: 'academic', name: 'Academic' },
    { id: 'elegant', name: 'Elegant' },
    { id: 'minimal', name: 'Minimal' },
    
  ];

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
    setMode('builder');
  };

  return (
    <Layout style={{ minHeight: '100vh', width: '100vw' }}>
      <Header onLogoClick={() => setMode('home')} />
      {mode === 'home' ? (
        <HomePage
          templates={templates}
          onTemplateSelect={handleTemplateSelect}
          hoveredTemplateId={hoveredTemplateId}
          setHoveredTemplateId={setHoveredTemplateId}
        />
      ) : (
        <BuilderPage
          form={form}
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          workExperiences={workExperiences}
          setWorkExperiences={setWorkExperiences}
          educations={educations}
          setEducations={setEducations}
          skills={skills}
          setSkills={setSkills}
          summary={summary}
          setSummary={setSummary}
          avatarUrl={avatarUrl}
          setAvatarUrl={setAvatarUrl}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          hoveredNav={hoveredNav}
          setHoveredNav={setHoveredNav}
          selectedTemplate={selectedTemplate}
          currentColor={currentColor}
          colorOptions={colorOptions}
          handleColorChange={handleColorChange}
          previewRef={previewRef}
        />
      )}
    </Layout>
  );
}

export default App;
