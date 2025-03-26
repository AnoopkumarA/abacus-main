import jsPDF from 'jspdf';
import { Problem } from '../types/problem';

export const generateAnswerSheet = (problems: Problem[], category: string) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  
  // Header
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Answer Sheet', pageWidth / 2, 20, { align: 'center' });
  
  // Category and date
  pdf.setFontSize(12);
  pdf.text(`Category: ${category}`, margin, 40);
  pdf.text(`Date: ${new Date().toLocaleDateString()}`, margin, 50);

  // Answers table
  let y = 70;
  const colWidth = 40;
  const rowHeight = 10;
  
  // Table headers
  pdf.setFont('helvetica', 'bold');
  pdf.text('Question', margin, y);
  pdf.text('Answer', margin + colWidth, y);
  
  pdf.line(margin, y + 2, pageWidth - margin, y + 2);
  y += rowHeight;

  // Table content
  pdf.setFont('helvetica', 'normal');
  problems.forEach((problem, index) => {
    if (y > pdf.internal.pageSize.height - margin) {
      pdf.addPage();
      y = margin + 10;
    }
    
    pdf.text(`${index + 1}`, margin, y);
    pdf.text(`${problem.correctAnswer}`, margin + colWidth, y);
    y += rowHeight;
  });

  return pdf;
};
