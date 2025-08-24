// Rich text formatting utilities
export const escapeHtml = (unsafe) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

export const toRichListHtml = (text) => {
  if (!text?.trim()) return '';
  
  const formatInline = (s) => {
    let t = escapeHtml(s);
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/==(.+?)==/g, '<mark>$1</mark>');
    t = t.replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    return t;
  };
  
  const lines = text.split(/\r?\n/);
  let result = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      // Empty line - close list if open and add line break
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += '<br>';
      continue;
    }
    
    const isBulletLine = line.startsWith('•') || line.startsWith('-') || line.startsWith('*');
    
    if (isBulletLine) {
      // Bullet point line
      if (!inList) {
        result += '<ul style="margin:4px 0 0 18px; padding-left: 0;">';
        inList = true;
      }
      const withoutBullet = line.replace(/^[•\-*]\s*/, '');
      result += `<li style="margin-bottom:4px;">${formatInline(withoutBullet)}</li>`;
    } else {
      // Regular line
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += `<div style="margin-bottom:4px;">${formatInline(line)}</div>`;
    }
  }
  
  // Close list if still open
  if (inList) {
    result += '</ul>';
  }
  
  return result;
};

export const formatText = (textareaRef, format) => {
  const textarea = textareaRef.current?.resizableTextArea?.textArea;
  if (!textarea) return;
  
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = textarea.value.substring(start, end);
  const currentValue = textarea.value;
  
  let newValue = '';
  let newCursorPos = start;
  
  switch (format) {
    case 'bold': {
      if (selectedText) {
        // Wrap selected text with bold formatting
        const formattedText = `**${selectedText}**`;
        newValue = currentValue.substring(0, start) + formattedText + currentValue.substring(end);
        newCursorPos = start + formattedText.length;
      } else {
        // Insert bold placeholder
        const boldText = '**bold text**';
        newValue = currentValue.substring(0, start) + boldText + currentValue.substring(end);
        // Select the placeholder text for easy replacement
        textarea.value = newValue;
        textarea.setSelectionRange(start + 2, start + 11);
        textarea.focus();
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
        return;
      }
      break;
    }
    case 'bullet': {
      // Find the current line
      const beforeCursor = currentValue.substring(0, start);
      const afterCursor = currentValue.substring(end);
      const lines = beforeCursor.split('\n');
      const currentLineStart = beforeCursor.lastIndexOf('\n') + 1;
      const currentLine = lines[lines.length - 1];
      
      if (selectedText) {
        // If text is selected, add bullet to each line
        const selectedLines = selectedText.split('\n');
        const bulletedLines = selectedLines.map(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('•') && !trimmed.startsWith('-') && !trimmed.startsWith('*')) {
            return `• ${trimmed}`;
          }
          return line;
        });
        const formattedText = bulletedLines.join('\n');
        newValue = currentValue.substring(0, start) + formattedText + currentValue.substring(end);
        newCursorPos = start + formattedText.length;
      } else {
        // Add bullet to current line or create new bullet point
        if (currentLine.trim() === '') {
          // Empty line, add bullet
          newValue = beforeCursor + '• ' + afterCursor;
          newCursorPos = start + 2;
        } else if (!currentLine.trim().startsWith('•') && !currentLine.trim().startsWith('-') && !currentLine.trim().startsWith('*')) {
          // Line has content but no bullet, add bullet at beginning
          const lineContent = currentLine.trim();
          const newLine = `• ${lineContent}`;
          newValue = currentValue.substring(0, currentLineStart) + newLine + currentValue.substring(start + currentLine.length - lineContent.length);
          newCursorPos = currentLineStart + newLine.length;
        } else {
          // Line already has bullet, create new bullet point
          newValue = beforeCursor + '\n• ' + afterCursor;
          newCursorPos = start + 3;
        }
      }
      break;
    }
    case 'link': {
      const url = prompt('Enter URL:');
      if (!url) return;
      
      if (selectedText) {
        const formattedText = `[${selectedText}](${url})`;
        newValue = currentValue.substring(0, start) + formattedText + currentValue.substring(end);
        newCursorPos = start + formattedText.length;
      } else {
        const linkText = `[link text](${url})`;
        newValue = currentValue.substring(0, start) + linkText + currentValue.substring(end);
        // Select the placeholder text for easy replacement
        textarea.value = newValue;
        textarea.setSelectionRange(start + 1, start + 10);
        textarea.focus();
        const event = new Event('input', { bubbles: true });
        textarea.dispatchEvent(event);
        return;
      }
      break;
    }
    default:
      return;
  }
  
  textarea.value = newValue;
  textarea.setSelectionRange(newCursorPos, newCursorPos);
  textarea.focus();
  
  // Trigger change event to update React state
  const event = new Event('input', { bubbles: true });
  textarea.dispatchEvent(event);
};

export const formatMonthYear = (value) => {
  if (!value) return '';
  const [year, month] = value.split('-');
  if (!year || !month) return value;
  return `${month}/${year}`;
};
