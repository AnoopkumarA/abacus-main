import jsPDF from 'jspdf';
import { Problem } from '../types/problem';

interface TestResults {
  category: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  questionsAttempted: number;
  answers: Record<number, number>;
  problems: Problem[];
}

export const generateResultsPDF = (results: TestResults) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  
  // Add header with blue background
  pdf.setFillColor(25, 118, 210);
  pdf.rect(0, 0, pageWidth, 40, 'F');
  
  // Title with white text
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Abacus Test Results', pageWidth / 2, 25, { align: 'center' });

  // Performance Summary Box
  pdf.setDrawColor(25, 118, 210);
  pdf.setFillColor(240, 247, 255);
  pdf.roundedRect(margin, 50, pageWidth - (margin * 2), 80, 3, 3, 'FD');
  
  // Test Information with styled sections
  pdf.setTextColor(25, 118, 210);
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Performance Summary', margin + 5, 65);

  // Information grid
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  
  const leftColumn = [
    `Category: ${results.category}`,
    `Score: ${results.score}/${results.totalQuestions}`,
    `Time Spent: ${Math.floor(results.timeSpent / 60)}m ${results.timeSpent % 60}s`
  ];

  const rightColumn = [
    `Date: ${new Date().toLocaleDateString()}`,
    `Success Rate: ${((results.score / results.totalQuestions) * 100).toFixed(1)}%`,
    `Questions Attempted: ${results.questionsAttempted}/${results.totalQuestions}`
  ];

  leftColumn.forEach((text, index) => {
    pdf.text(text, margin + 10, 85 + (index * 15));
  });

  rightColumn.forEach((text, index) => {
    pdf.text(text, pageWidth / 2 + 10, 85 + (index * 15));
  });

  let y = 150;

  // Incorrect Answers Section with styled header
  if (results.questionsAttempted - results.score > 0) {
    // Section header with background
    pdf.setFillColor("white")
    pdf.roundedRect(margin, y - 5, pageWidth - (margin * 2), 25, 3, 3, 'F');
    pdf.setTextColor(244, 67, 54);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Incorrect Answers', margin + 60, y + 10);

    y += 26;
    
    
    // Table headers with blue background
    pdf.setFillColor(25, 118, 210);
    pdf.rect(margin-7, y - 5, pageWidth - (margin * 2), 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);
    
    const headers = ['Q.No', 'Question', 'Your Answer', 'Correct Answer'];
    const columnWidths = [20, 80, 30, 30];
    let x = margin;
    
    headers.forEach((header, index) => {
      pdf.text(header, x - 5, y + 5);
      x += columnWidths[index];
    });
    y += 20;

    // Table content
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    
    results.problems.forEach((problem) => {
      const userAnswer = results.answers[problem.id];
      if (userAnswer !== undefined && userAnswer !== problem.correctAnswer) {
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }

        x = margin;
        pdf.text(problem.id.toString(), x, y);
        x += columnWidths[0];
        
        const question = `${problem.baseNumber} ${problem.rows.map(r => formatNumber(r)).join(' ')}`;
        pdf.text(question, x, y);
        x += columnWidths[1];
        
        pdf.text(userAnswer.toString(), x, y);
        x += columnWidths[2];
        
        pdf.text(problem.correctAnswer.toString(), x, y);

        y += 7;
      }
    });
  }

  // Not Attempted Section with styled header
  const notAttempted = results.problems.filter(problem => !results.answers[problem.id]);
  if (notAttempted.length > 0) {
    y += 20;
    if (y > 250) {
      pdf.addPage();
      y = 20;
    }

    // Section header with background
    pdf.setFillColor("white"); // Orange background
    pdf.roundedRect(margin, y - 5, pageWidth - (margin * 2), 25, 3, 3, 'F');
    pdf.setTextColor(244, 67, 54);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text('Not Attempted Questions', margin + 60, y + 10);

    y += 26;

    // Table headers with blue background
    pdf.setFillColor(25, 118, 210);
    pdf.rect(margin-7, y - 5, pageWidth - (margin * 2), 15, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(11);
    
    const headers = ['Q.No', 'Question', 'Correct Answer'];
    const columnWidths = [20, 110, 30];
    let x = margin;
    
    headers.forEach((header, index) => {
      pdf.text(header, x - 5, y + 5);
      x += columnWidths[index];
    });
    y += 20;

    // Not attempted questions
    pdf.setTextColor(0, 0, 0);
    pdf.setFont('helvetica', 'normal');
    
    notAttempted.forEach((problem) => {
      if (y > 270) {
        pdf.addPage();
        y = 20;
      }

      x = margin;
      pdf.text(problem.id.toString(), x, y);
      x += columnWidths[0];
      
      const question = `${problem.baseNumber} ${problem.rows.map(r => formatNumber(r)).join(' ')}`;
      pdf.text(question, x, y);
      x += columnWidths[1];
      
      pdf.text(problem.correctAnswer.toString(), x, y);

      y += 7;
    });
  }

  // Footer with gradient effect
  const addFooter = (pageNum: number, totalPages: number) => {
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, pdf.internal.pageSize.height - 20, pageWidth, 20, 'F');
    pdf.setTextColor(128, 128, 128);
    pdf.setFontSize(10);
    pdf.text(
      `Page ${pageNum} of ${totalPages}`,
      pageWidth / 2,
      pdf.internal.pageSize.height - 10,
      { align: 'center' }
    );
  };

  // Add footers to all pages
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    addFooter(i, pageCount);
  }

  return pdf;
};

const formatNumber = (num: number): string => {
  return num >= 0 ? `${num}` : `${num}`;
};