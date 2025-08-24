import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import './TemplateThumbnail.css';

const TemplateThumbnail = ({ templateId }) => {
  const textLine = (w, h = 3, mt = 4, color = '#d0d0d0') => (
    <div style={{ height: h, width: w, background: color, borderRadius: 2, marginTop: mt }} />
  );
  
  const profileCircle = (size = 20) => (
    <div style={{ width: size, height: size, background: '#e0e0e0', borderRadius: '50%' }} />
  );
  
  switch (templateId) {
    case 'modern':
      return (
        <div className="thumbnail modern-thumbnail">
          <div className="modern-header" />
          <div className="modern-name-section">
            <div className="modern-name">JOHN SMITH</div>
          </div>
          <div className="modern-contact-bar">
            <div className="contact-dot" />
            <div className="contact-dot" />
            <div className="contact-dot" />
          </div>
          <div className="modern-content">
            {textLine('85%', 3, 0)}
            {textLine('92%', 3)}
            {textLine('78%', 3)}
            <div className="section-title">EXPERIENCE</div>
            {textLine('70%', 2, 2)}
            {textLine('88%', 2, 2)}
            {textLine('65%', 2, 2)}
            <div className="section-title">EDUCATION</div>
            {textLine('75%', 2, 2)}
            {textLine('82%', 2, 2)}
          </div>
        </div>
      );
    case 'sidebar':
      return (
        <div className="thumbnail sidebar-thumbnail">
          <div className="sidebar-left">
            <div className="sidebar-name">JOHN SMITH</div>
            <div className="sidebar-job">Developer</div>
            <div className="sidebar-section-title">CONTACT</div>
            {textLine('90%', 2, 1, '#ccc')}
            {textLine('75%', 2, 1, '#ccc')}
            <div className="sidebar-section-title">SKILLS</div>
            {textLine('85%', 2, 1, '#ccc')}
            {textLine('70%', 2, 1, '#ccc')}
            {textLine('80%', 2, 1, '#ccc')}
          </div>
          <div className="sidebar-right">
            <div className="sidebar-section-title">SUMMARY</div>
            {textLine('95%', 2, 1)}
            {textLine('88%', 2, 1)}
            <div className="sidebar-section-title">EXPERIENCE</div>
            {textLine('85%', 2, 1)}
            {textLine('92%', 2, 1)}
            {textLine('78%', 2, 1)}
            <div className="sidebar-section-title">EDUCATION</div>
            {textLine('80%', 2, 1)}
            {textLine('75%', 2, 1)}
          </div>
        </div>
      );
    case 'elegant':
      return (
        <div className="thumbnail elegant-thumbnail">
          <div className="elegant-header">
            <div className="elegant-name">JOHN SMITH</div>
            <div className="elegant-job">Software Developer</div>
            <div className="elegant-contact">john@email.com • +1234567890</div>
          </div>
          <div className="elegant-divider" />
          <div className="elegant-content">
            <div className="elegant-section-title">SUMMARY</div>
            {textLine('100%', 2, 1)}
            {textLine('95%', 2, 1)}
            <div className="elegant-section-title">SKILLS</div>
            <div className="elegant-skills">
              <div className="skill-tag">React</div>
              <div className="skill-tag">Node.js</div>
              <div className="skill-tag">Python</div>
            </div>
            <div className="elegant-section-title">EXPERIENCE</div>
            {textLine('90%', 2, 1)}
            {textLine('85%', 2, 1)}
            {textLine('78%', 2, 1)}
          </div>
        </div>
      );
    case 'minimal':
      return (
        <div className="thumbnail minimal-thumbnail">
          <div className="minimal-header">
            {profileCircle(24)}
            <div className="minimal-info">
              <div className="minimal-name">John Smith</div>
              <div className="minimal-job">Software Developer</div>
            </div>
          </div>
          <div className="minimal-contact">john@email.com • +1234567890 • City, Country</div>
          <div className="minimal-content">
            {textLine('100%', 2, 0)}
            {textLine('95%', 2, 2)}
            {textLine('88%', 2, 2)}
            <div className="minimal-section-title">Experience</div>
            {textLine('85%', 2, 1)}
            {textLine('92%', 2, 2)}
            {textLine('78%', 2, 2)}
            <div className="minimal-section-title">Education</div>
            {textLine('80%', 2, 1)}
            {textLine('75%', 2, 2)}
          </div>
        </div>
      );
    case 'vibrant':
      return (
        <div className="thumbnail vibrant-thumbnail">
          <div className="vibrant-content">
            <div className="vibrant-header">
              <div className="vibrant-avatar" />
              <div className="vibrant-info">
                <div className="vibrant-name">John Smith</div>
                <div className="vibrant-job">Creative Designer</div>
              </div>
            </div>
            <div className="vibrant-contact">john@email.com • +1234567890</div>
            <div className="vibrant-divider" />
            <div className="vibrant-section-title">ABOUT</div>
            <div className="vibrant-line full" />
            <div className="vibrant-line partial" />
            <div className="vibrant-section-title">EXPERIENCE</div>
            <div className="vibrant-line large" />
            <div className="vibrant-line medium" />
          </div>
        </div>
      );
    default: // classic
      return (
        <div className="thumbnail classic-thumbnail">
          <div className="classic-header">
            <div className="classic-name">JOHN SMITH</div>
            <div className="classic-job">Software Developer</div>
            <div className="classic-contact">john@email.com • +1234567890 • City, Country</div>
          </div>
          <div className="classic-content">
            <div className="classic-section-title">PROFESSIONAL SUMMARY</div>
            {textLine('100%', 2, 1)}
            {textLine('95%', 2, 2)}
            <div className="classic-section-title">WORK EXPERIENCE</div>
            {textLine('85%', 2, 1)}
            {textLine('92%', 2, 2)}
            {textLine('78%', 2, 2)}
            <div className="classic-section-title">EDUCATION</div>
            {textLine('80%', 2, 1)}
            {textLine('75%', 2, 2)}
          </div>
        </div>
      );
  }
};

export default TemplateThumbnail;
