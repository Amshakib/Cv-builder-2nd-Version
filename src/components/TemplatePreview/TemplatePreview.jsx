import React from 'react';
import { Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { formatMonthYear } from '../../utils/textFormatting';
import InlineEditor from '../InlineEditor/InlineEditor';
import AcademicCV from '../Templates/AcademicCV/AcademicCV';
import './TemplatePreview.css';

const TemplatePreview = ({ 
  selectedTemplate, 
  personalInfo, 
  workExperiences, 
  educations, 
  skills, 
  summary, 
  avatarUrl, 
  currentColor,
  previewRef,
  setSummary,
  setWorkExperiences
}) => {
  const validWorkExperiences = workExperiences.filter(exp => (
    exp.jobTitle?.trim() || exp.company?.trim() || exp.startDate?.trim() || exp.endDate?.trim() || exp.description?.trim()
  ));
  const validEducations = educations.filter(edu => (
    edu.degree?.trim() || edu.school?.trim() || edu.result?.trim() || edu.startDate?.trim() || edu.endDate?.trim()
  ));
  const skillsList = skills.split(',').map(s => s.trim()).filter(Boolean);

  const renderModernPreview = () => (
    <Card ref={previewRef} className="template-preview modern-preview">
      <div className="modern-header" />
      <div className="modern-name-section">
        <div className="modern-name">
          {(personalInfo.firstName || personalInfo.lastName) ? 
            `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() : 'Your Name'}
        </div>
      </div>
      <div className="modern-contact-bar">
        <div>{personalInfo.email || 'email@example.com'}</div>
        <div>{personalInfo.phone || '000 000 0000'}</div>
        <div>{[personalInfo.city, personalInfo.country].filter(Boolean).join(' ') || 'City Country'}</div>
      </div>
      <div className="modern-content">
        {(summary?.trim() || setSummary) && (
          <div className="modern-section">
            <div className="modern-section-title">Summary</div>
            <InlineEditor
              content={summary}
              onSave={setSummary}
              placeholder="Add a professional summary..."
              className="modern-section-content"
            />
          </div>
        )}
        {skillsList.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Skills</div>
            <div className="modern-skills">
              {skillsList.map((s, i) => (
                <span key={i} className="modern-skill">• {s}</span>
              ))}
            </div>
          </div>
        )}
        {validWorkExperiences.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Experience</div>
            <div className="modern-experiences">
              {validWorkExperiences.map((exp, idx) => (
                <div key={idx} className="modern-experience">
                  <div className="modern-exp-dates">
                    {(exp.startDate?.trim() || exp.endDate?.trim()) && (
                      <span>{formatMonthYear(exp.startDate)} - {exp.endDate ? formatMonthYear(exp.endDate) : 'Current'}</span>
                    )}
                  </div>
                  <div className="modern-exp-details">
                    {exp.jobTitle?.trim() && (
                      <span className="modern-job-title">{exp.jobTitle}</span>
                    )}
                    {exp.company?.trim() && (
                      <span className="modern-company">, {exp.company}</span>
                    )}
                  </div>
                  <InlineEditor
                    content={exp.description}
                    onSave={(newDescription) => {
                      const updatedExperiences = workExperiences.map((experience, index) => 
                        index === idx ? { ...experience, description: newDescription } : experience
                      );
                      setWorkExperiences(updatedExperiences);
                    }}
                    placeholder="Add job description..."
                    className="modern-exp-description"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {validEducations.length > 0 && (
          <div className="modern-section">
            <div className="modern-section-title">Education and Training</div>
            <div className="modern-educations">
              {validEducations.map((edu, idx) => (
                <div key={idx} className="modern-education">
                  <div className="modern-edu-dates">
                    {(edu.startDate?.trim() || edu.endDate?.trim()) && (
                      <span>{formatMonthYear(edu.startDate)} - {edu.endDate ? formatMonthYear(edu.endDate) : 'Current'}</span>
                    )}
                  </div>
                  <div className="modern-edu-details">
                    {edu.degree?.trim() && (
                      <span className="modern-degree">{edu.degree}</span>
                    )}
                    {(edu.school?.trim() || edu.result?.trim()) && (
                      <span className="modern-school">{edu.school}{edu.result?.trim() ? `, ${edu.result}` : ''}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  const renderSidebarPreview = () => (
    <Card ref={previewRef} className="template-preview sidebar-preview">
      <div className="sidebar-layout">
        <div className="sidebar-left" style={{ background: `${currentColor}15`, borderRight: `3px solid ${currentColor}` }}>
          <div className="sidebar-name" style={{ color: currentColor }}>
            {(personalInfo.firstName || personalInfo.lastName) ? 
              `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() : 'Your Name'}
          </div>
          {personalInfo.jobTitle && <div className="sidebar-job-title">{personalInfo.jobTitle}</div>}
          <div className="sidebar-section-title" style={{ color: currentColor }}>Contact</div>
          <div className="sidebar-contact">
            <div>{personalInfo.email}</div>
            <div>{personalInfo.phone}</div>
            <div>{[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}</div>
          </div>
          {skillsList.length > 0 && (
            <>
              <div className="sidebar-section-title" style={{ color: currentColor }}>Skills</div>
              <ul className="sidebar-skills">
                {skillsList.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}
        </div>
        <div className="sidebar-right">
          {(summary?.trim() || setSummary) && (
            <div className="sidebar-section">
              <div className="sidebar-section-title" style={{ color: currentColor }}>Summary</div>
              <InlineEditor
                content={summary}
                onSave={setSummary}
                placeholder="Add a professional summary..."
                className="sidebar-section-content"
              />
            </div>
          )}
          {validWorkExperiences.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-title" style={{ color: currentColor }}>Experience</div>
              {validWorkExperiences.map((exp, idx) => (
                <div key={idx} className="sidebar-experience">
                  <div className="sidebar-exp-header">
                    <div>
                      {exp.jobTitle?.trim() && <span className="sidebar-job-title">{exp.jobTitle}</span>}
                      {exp.company?.trim() && <span> • {exp.company}</span>}
                    </div>
                    {(exp.startDate?.trim() || exp.endDate?.trim()) && (
                      <div className="sidebar-dates">{formatMonthYear(exp.startDate)} - {exp.endDate ? formatMonthYear(exp.endDate) : 'Present'}</div>
                    )}
                  </div>
                  <InlineEditor
                    content={exp.description}
                    onSave={(newDescription) => {
                      const updatedExperiences = workExperiences.map((experience, index) => 
                        index === idx ? { ...experience, description: newDescription } : experience
                      );
                      setWorkExperiences(updatedExperiences);
                    }}
                    placeholder="Add job description..."
                    className="sidebar-exp-description"
                  />
                </div>
              ))}
            </div>
          )}
          {validEducations.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-title" style={{ color: currentColor }}>Education</div>
              {validEducations.map((edu, idx) => (
                <div key={idx} className="sidebar-education">
                  <div>
                    {edu.degree?.trim() && <div className="sidebar-degree">{edu.degree}</div>}
                    {(edu.school?.trim() || edu.result?.trim()) && (
                      <div className="sidebar-school">{edu.school}{edu.result?.trim() ? ` • ${edu.result}` : ''}</div>
                    )}
                  </div>
                  {(edu.startDate?.trim() || edu.endDate?.trim()) && (
                    <div className="sidebar-dates">{formatMonthYear(edu.startDate)} - {edu.endDate ? formatMonthYear(edu.endDate) : 'Present'}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  const renderElegantPreview = () => (
    <Card ref={previewRef} className="template-preview elegant-preview" style={{ border: `1px solid ${currentColor}` }}>
      <div className="elegant-header">
        <div className="elegant-name" style={{ color: currentColor }}>
          {(personalInfo.firstName || personalInfo.lastName) ? 
            `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim() : 'Your Name'}
        </div>
        {personalInfo.jobTitle && (
          <div className="elegant-job-title">{personalInfo.jobTitle}</div>
        )}
        <div className="elegant-contact">
          {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
          {(personalInfo.phone || personalInfo.email) && ' • '}
          {[personalInfo.phone, personalInfo.email].filter(Boolean).join(' • ')}
        </div>
      </div>
      <div className="elegant-divider" style={{ background: currentColor }} />
      {(summary?.trim() || setSummary) && (
        <div className="elegant-section">
          <div className="elegant-section-title" style={{ color: currentColor }}>Summary</div>
          <InlineEditor
            content={summary}
            onSave={setSummary}
            placeholder="Add a professional summary..."
            className="elegant-section-content"
          />
        </div>
      )}
      {skillsList.length > 0 && (
        <div className="elegant-section">
          <div className="elegant-section-title" style={{ color: currentColor }}>Skills</div>
          <div className="elegant-skills">
            {skillsList.map((s, i) => 
              <span key={i} className="elegant-skill-tag" style={{ border: `1px solid ${currentColor}` }}>{s}</span>
            )}
          </div>
        </div>
      )}
      {validWorkExperiences.length > 0 && (
        <div className="elegant-section">
          <div className="elegant-section-title" style={{ color: currentColor }}>Experience</div>
          {validWorkExperiences.map((exp, idx) => (
            <div key={idx} className="elegant-experience">
              <div className="elegant-exp-header">
                <div>
                  {exp.jobTitle?.trim() && <div className="elegant-job-title">{exp.jobTitle}</div>}
                  {exp.company?.trim() && <div className="elegant-company">{exp.company}</div>}
                </div>
                {(exp.startDate?.trim() || exp.endDate?.trim()) && (
                  <div className="elegant-dates" style={{ color: currentColor }}>
                    {formatMonthYear(exp.startDate)} - {exp.endDate ? formatMonthYear(exp.endDate) : 'Present'}
                  </div>
                )}
              </div>
              <InlineEditor
                content={exp.description}
                onSave={(newDescription) => {
                  const updatedExperiences = workExperiences.map((experience, index) => 
                    index === idx ? { ...experience, description: newDescription } : experience
                  );
                  setWorkExperiences(updatedExperiences);
                }}
                placeholder="Add job description..."
                className="elegant-exp-description"
              />
            </div>
          ))}
        </div>
      )}
      {validEducations.length > 0 && (
        <div className="elegant-section">
          <div className="elegant-section-title" style={{ color: currentColor }}>Education</div>
          {validEducations.map((edu, idx) => (
            <div key={idx} className="elegant-education">
              {edu.degree?.trim() && <div className="elegant-degree">{edu.degree}</div>}
              {(edu.school?.trim() || edu.result?.trim()) && (
                <div className="elegant-school">{edu.school}{edu.result?.trim() ? ` • ${edu.result}` : ''}</div>
              )}
              {(edu.startDate?.trim() || edu.endDate?.trim()) && (
                <div className="elegant-dates" style={{ color: currentColor }}>
                  {formatMonthYear(edu.startDate)} - {edu.endDate ? formatMonthYear(edu.endDate) : 'Present'}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );

  const renderClassicPreview = () => (
    <Card ref={previewRef} className="template-preview classic-preview" style={{ border: `2px solid ${currentColor}` }}>
      <div className="classic-avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="avatar-image" />
        ) : (
          <UserOutlined className="avatar-icon" />
        )}
      </div>
      <div className="classic-header" style={{ borderBottom: `2px solid ${currentColor}` }}>
        <div className="classic-name" style={{ color: currentColor }}>
          {(personalInfo.firstName || personalInfo.lastName)
            ? `${personalInfo.firstName || ''} ${personalInfo.lastName || ''}`.trim()
            : 'Your Name'}
        </div>
        {personalInfo.jobTitle && (
          <div className="classic-job-title">{personalInfo.jobTitle}</div>
        )}
        <div className="classic-contact">
          {[personalInfo.city, personalInfo.country].filter(Boolean).join(', ')}
          {(personalInfo.phone || personalInfo.email) && ' • '}
          {[personalInfo.phone, personalInfo.email].filter(Boolean).join(' • ')}
        </div>
      </div>

      {(summary?.trim() || setSummary) && (
        <div className="classic-section">
          <div className="classic-section-title" style={{ color: currentColor }}>Professional Summary</div>
          <InlineEditor
            content={summary}
            onSave={setSummary}
            placeholder="Add a professional summary..."
            className="classic-section-content"
          />
        </div>
      )}

      {validWorkExperiences.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title" style={{ color: currentColor }}>Work Experience</div>
          {validWorkExperiences.map((exp, idx) => (
            <div key={idx} className="classic-experience">
              <div className="classic-exp-header">
                <div>
                  {exp.jobTitle?.trim() && (
                    <div className="classic-job-title">{exp.jobTitle}</div>
                  )}
                  {exp.company?.trim() && (
                    <div className="classic-company">{exp.company}</div>
                  )}
                </div>
                {(exp.startDate?.trim() || exp.endDate?.trim()) && (
                  <div className="classic-dates" style={{ color: currentColor }}>
                    {formatMonthYear(exp.startDate)} - {exp.endDate ? formatMonthYear(exp.endDate) : 'Present'}
                  </div>
                )}
              </div>
              <InlineEditor
                content={exp.description}
                onSave={(newDescription) => {
                  const updatedExperiences = workExperiences.map((experience, index) => 
                    index === idx ? { ...experience, description: newDescription } : experience
                  );
                  setWorkExperiences(updatedExperiences);
                }}
                placeholder="Add job description..."
                className="classic-exp-description"
              />
            </div>
          ))}
        </div>
      )}

      {validEducations.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title" style={{ color: currentColor }}>Education</div>
          {validEducations.map((edu, idx) => (
            <div key={idx} className="classic-education">
              <div className="classic-edu-header">
                <div>
                  {edu.degree?.trim() && <div className="classic-degree">{edu.degree}</div>}
                  {(edu.school?.trim() || edu.result?.trim()) && (
                    <div className="classic-school">{edu.school}{edu.result?.trim() ? ` • ${edu.result}` : ''}</div>
                  )}
                </div>
                {(edu.startDate?.trim() || edu.endDate?.trim()) && (
                  <div className="classic-dates" style={{ color: currentColor }}>
                    {formatMonthYear(edu.startDate)} - {edu.endDate ? formatMonthYear(edu.endDate) : 'Present'}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {skillsList.length > 0 && (
        <div className="classic-section">
          <div className="classic-section-title" style={{ color: currentColor }}>Skills</div>
          <div className="classic-skills">
            {skillsList.map((s, i) => (
              <span key={i} className="classic-skill">• {s}</span>
            ))}
          </div>
        </div>
      )}
    </Card>
  );

  // Stub functions for templates that aren't implemented yet
  const renderMinimalPreview = () => (
    <div ref={previewRef} className="template-preview">
      <p>Minimal template preview not implemented yet</p>
    </div>
  );

  const renderVibrantPreview = () => (
    <div ref={previewRef} className="template-preview">
      <p>Vibrant template preview not implemented yet</p>
    </div>
  );

  // Main render function that selects the appropriate template
  switch(selectedTemplate) {
    case 'modern':
      return renderModernPreview();
    case 'sidebar':
      return renderSidebarPreview();
    case 'elegant':
      return renderElegantPreview();
    case 'minimal':
      return renderMinimalPreview();
    case 'vibrant':
      return renderVibrantPreview();
    case 'academic':
      return (
        <div ref={previewRef} className="template-preview">
          <AcademicCV 
            personalInfo={personalInfo}
            workExperiences={workExperiences}
            educations={educations}
            skills={skills}
            summary={summary}
            currentColor={currentColor}
          />
        </div>
      );
    case 'classic':
    default:
      return renderClassicPreview();
  }
};

export default TemplatePreview;
