import React from 'react';
import { Typography, Divider } from 'antd';
import './AcademicCV.css';

const { Title, Text, Paragraph } = Typography;

const AcademicCV = ({ personalInfo, workExperiences, educations, skills, summary, currentColor }) => {
  // Format date to show only year
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).getFullYear();
  };

  // Calculate years of experience
  const calculateExperience = () => {
    if (!workExperiences || workExperiences.length === 0) return 0;
    
    let earliestYear = new Date().getFullYear();
    workExperiences.forEach(exp => {
      if (exp.startDate) {
        const year = new Date(exp.startDate).getFullYear();
        if (year < earliestYear) {
          earliestYear = year;
        }
      }
    });
    
    const currentYear = new Date().getFullYear();
    return currentYear - earliestYear;
  };

  return (
    <div className="academic-cv">
      {/* Header Section */}
      <div className="academic-header" style={{ backgroundColor: currentColor }}>
        <div className="header-content">
          <div className="name-title">
            <Title level={1} className="name">
              {personalInfo.firstName} {personalInfo.lastName}
            </Title>
            <Title level={4} className="title">
              {personalInfo.jobTitle}
            </Title>
          </div>
          <div className="contact-info">
            {personalInfo.email && <div className="contact-item">{personalInfo.email}</div>}
            {personalInfo.phone && <div className="contact-item">{personalInfo.phone}</div>}
            {personalInfo.city && personalInfo.country && (
              <div className="contact-item">
                {personalInfo.city}, {personalInfo.country}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="academic-content">
        {/* Left Column */}
        <div className="left-column">
          {/* About Me */}
          {summary && (
            <div className="section">
              <Title level={3} className="section-title">ABOUT ME</Title>
              <Paragraph className="summary">{summary}</Paragraph>
            </div>
          )}

          {/* Experience */}
          {workExperiences && workExperiences.length > 0 && (
            <div className="section">
              <Title level={3} className="section-title">EXPERIENCE</Title>
              {workExperiences.map((exp, index) => (
                exp.company && (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <Text strong className="job-title">{exp.jobTitle}</Text>
                      <Text className="date">
                        {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </Text>
                    </div>
                    <Text className="company">{exp.company}</Text>
                    {exp.description && (
                      <Paragraph className="job-description">{exp.description}</Paragraph>
                    )}
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Education */}
          {educations && educations.length > 0 && (
            <div className="section">
              <Title level={3} className="section-title">EDUCATION</Title>
              {educations.map((edu, index) => (
                edu.school && (
                  <div key={index} className="education-item">
                    <div className="education-header">
                      <Text strong className="degree">{edu.degree}</Text>
                      <Text className="date">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </Text>
                    </div>
                    <Text className="school">{edu.school}</Text>
                    {edu.result && <Text className="result">{edu.result}</Text>}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div className="section">
              <Title level={3} className="section-title">SKILLS</Title>
              <div className="skills-container">
                {skills.split(',').map((skill, index) => (
                  <div key={index} className="skill-tag" style={{ borderColor: currentColor }}>
                    {skill.trim()}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="section">
            <Title level={3} className="section-title">ADDITIONAL INFO</Title>
            <div className="info-item">
              <Text strong>Years of Experience: </Text>
              <Text>{calculateExperience()} years</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicCV;
