import React, { useState, useRef } from 'react';
import { Button, Input } from 'antd';
import { EditOutlined, BoldOutlined, UnorderedListOutlined, LinkOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { formatText, toRichListHtml } from '../../utils/textFormatting';
import './InlineEditor.css';

const InlineEditor = ({ 
  content, 
  onSave, 
  placeholder = "Enter text...",
  className = "",
  renderContent = null 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content || '');
  const textareaRef = useRef(null);

  const handleEdit = () => {
    setEditValue(content || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(content || '');
    setIsEditing(false);
  };

  const handleFormat = (format) => {
    formatText(textareaRef, format);
    // Update the state with the new value
    setTimeout(() => {
      if (textareaRef.current?.resizableTextArea?.textArea) {
        setEditValue(textareaRef.current.resizableTextArea.textArea.value);
      }
    }, 0);
  };

  if (isEditing) {
    return (
      <div className={`inline-editor editing ${className}`}>
        <div className="inline-editor-toolbar">
          <Button
            size="small"
            icon={<BoldOutlined />}
            onClick={() => handleFormat('bold')}
            className="toolbar-button"
            title="Bold text"
          />
          <Button
            size="small"
            icon={<UnorderedListOutlined />}
            onClick={() => handleFormat('bullet')}
            className="toolbar-button"
            title="Add bullet point"
          />
          <Button
            size="small"
            icon={<LinkOutlined />}
            onClick={() => handleFormat('link')}
            className="toolbar-button"
            title="Add link"
          />
          <div className="toolbar-actions">
            <Button
              size="small"
              type="primary"
              icon={<CheckOutlined />}
              onClick={handleSave}
              className="save-button"
              title="Save"
            />
            <Button
              size="small"
              icon={<CloseOutlined />}
              onClick={handleCancel}
              className="cancel-button"
              title="Cancel"
            />
          </div>
        </div>
        <Input.TextArea
          ref={textareaRef}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          placeholder={placeholder}
          autoSize={{ minRows: 2, maxRows: 8 }}
          className="inline-textarea"
          autoFocus
        />
        <div className="formatting-hint">
          Use <strong>**text**</strong> for bold, <strong>• text</strong> for bullets, and <strong>[text](url)</strong> for links
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-editor ${className}`}>
      <div className="inline-editor-content">
        {renderContent ? renderContent(content) : (
          content ? (
            <div dangerouslySetInnerHTML={{ __html: toRichListHtml(content) }} />
          ) : (
            <div className="placeholder-text">{placeholder}</div>
          )
        )}
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={handleEdit}
          className="edit-button"
          title="Edit text"
        />
      </div>
    </div>
  );
};

export default InlineEditor;
