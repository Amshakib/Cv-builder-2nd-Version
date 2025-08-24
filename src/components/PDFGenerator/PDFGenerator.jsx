import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './PDFGenerator.css';

const PDFGenerator = ({ previewRef, disabled = false }) => {
  const generatePDF = async () => {
    if (!previewRef.current) return;
    
    try {
      const node = previewRef.current;
      
      // Create canvas with optimized settings for PDF
      const canvas = await html2canvas(node, { 
        scale: 3, // Higher scale for better quality
        backgroundColor: '#ffffff', 
        useCORS: true,
        allowTaint: true,
        height: node.scrollHeight + 10, // Add extra height for borders
        width: node.scrollWidth + 10, // Add extra width for borders
        logging: false,
        removeContainer: false, // Keep container to capture borders
        x: -5, // Start capture slightly before element
        y: -5  // Start capture slightly before element
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // A4 dimensions in mm
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // 10mm margin on all sides
      const contentWidth = pageWidth - (2 * margin);
      const contentHeight = pageHeight - (2 * margin);
      
      // Calculate dimensions maintaining aspect ratio
      const canvasAspectRatio = canvas.width / canvas.height;
      const pageAspectRatio = contentWidth / contentHeight;
      
      let finalWidth, finalHeight;
      
      if (canvasAspectRatio > pageAspectRatio) {
        // Canvas is wider relative to its height
        finalWidth = contentWidth;
        finalHeight = contentWidth / canvasAspectRatio;
      } else {
        // Canvas is taller relative to its width
        finalHeight = contentHeight;
        finalWidth = contentHeight * canvasAspectRatio;
      }
      
      // Center the content on the page
      const xOffset = margin + (contentWidth - finalWidth) / 2;
      const yOffset = margin + (contentHeight - finalHeight) / 2;
      
      // Add the image to PDF
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight, '', 'FAST');
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      pdf.save(`resume-${timestamp}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      // You could add a notification here to inform the user of the error
    }
  };

  return (
    <Button 
      type="primary" 
      icon={<DownloadOutlined />}
      onClick={generatePDF}
      disabled={disabled}
      className="pdf-generator-button"
      size="large"
    >
      Download PDF
    </Button>
  );
};

export default PDFGenerator;
