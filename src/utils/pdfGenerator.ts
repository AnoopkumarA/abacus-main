import jsPDF from 'jspdf';
import { Problem } from '../types/problem';

export const generatePDF = (problems: Problem[], category: string, includeAnswers: boolean = false) => { // Add category parameter
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Add logo image URL
  const logoUrl = '/logo.png'; // Assuming logo.png is in public folder

  const pageWidth = pdf.internal.pageSize.width;
  const pageHeight = pdf.internal.pageSize.height;
  const margin = 5; 
  const questionWidth = 10; // reduced from 16
  const questionHeight = 35; // reduced from 45
  const questionsPerRow = 25; // increased from 15
  const questionsPerPage = 100; // increased from 30
  const spacing = 1.5; // reduced from 2
  const rowGap = 7.6; // New constant for gap between rows

  const totalWidth = (questionWidth * questionsPerRow) + (spacing * (questionsPerRow - 1));
  const startX = (pageWidth - totalWidth) / 2;

  const drawHeader = () => {
    // Blue header background
    pdf.setFillColor(25, 118, 210);
    pdf.rect(0, 0, pageWidth, 20, 'F');

    // Add logo with perfect square dimensions
    try {
      pdf.addImage(logoUrl, 'PNG', margin + 2, 2, 15, 12); // Made width and height equal (15mm)
    } catch (error) {
      console.error('Error loading logo:', error);
      // Fallback to circle if image fails to load
      
      pdf.setFillColor(255, 255, 255);
      pdf.circle(margin + 10, 10, 7.5, 'F'); // Adjusted circle radius to match new square size
    }
    
    // Exam title in center
    pdf.setTextColor(255, 255, 255);
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.text('DISTRICT LEVEL ABACUS MODEL EXAM PAPER', pageWidth / 2, 10, { align: 'center' });

    // Update category text display with proper formatting
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    const categoryText = `Category: ${category.toUpperCase()}`;
    pdf.text(categoryText, pageWidth / 2, 16, { align: 'center' });

    // Student name field on top right (without rectangle border)
    pdf.setFontSize(9);
    pdf.text('Student Name: _____________________', pageWidth - 62, 9);
    
    // Exam time under student name
    pdf.setFontSize(9);
    pdf.text('Exam Time: 08 Minutes', pageWidth - 62, 15);
    
    return 30; // Adjusted return value to account for new header elements
  };

  const drawQuestionBox = (x: number, y: number, problem: Problem, index: number) => {
    // Circle for question number with larger number
    pdf.setFillColor(25,118,210);
    pdf.circle(x + questionWidth/2, y - 2.2, 2, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(7); // increased from 5
    pdf.text(String(index + 1), x + questionWidth/2, y - 1.4, { align: 'center' }); // adjusted y position for larger font
    
    // Change border color to red
    pdf.setDrawColor("black"); // RGB for red
    pdf.setTextColor(0, 0, 0);
    
    // Main box with thicker border
    pdf.setLineWidth(0.48); // Increased from 0.3 to 0.5
    pdf.rect(x, y, questionWidth, questionHeight);
    
    // Increased font size for base number
    pdf.setFontSize(12); // increased from 8
    let numberY = y + 6; // reduced from 8
    
    pdf.setFont('helvetica', 'bold');
    pdf.text(String(problem.baseNumber), x + questionWidth/2, numberY, { align: 'center' });
    
    problem.rows.forEach((num) => {
      numberY += 5; // space for next number
      // Draw separator line halfway between numbers, moved slightly upward
      pdf.setLineWidth(0.2);
      pdf.line(
        x + 0.5,                    // slightly inset from left
        numberY - 3.4,              // adjusted upward from -2.5 to -3.2
        x + questionWidth - 0.5,    // slightly inset from right
        numberY - 3.4               // same y position as start
      );
      // Increased font size for row numbers
      pdf.setFontSize(11.6); // increased from 8
      // Draw the number after the line
      pdf.text(String(num), x + questionWidth/2, numberY, { align: 'center' });
    });

    // Answer box with thicker border
    pdf.setLineWidth(0.5); // Increased from 0.3 to 0.5
    pdf.rect(x, y + questionHeight - 8, questionWidth, 8); // reduced answer box
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(5); // reduced from 6
    
    // Add answer if includeAnswers is true
    if (includeAnswers) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 150, 0); // Green color for answers
      pdf.text(
        String(problem.correctAnswer),
        x + questionWidth/2,
        y + questionHeight - 4,
        { align: 'center' }
      );
    }
  };

  let currentPage = 1;
  let startY = drawHeader();
  let currentX = startX;
  let currentY = startY;

  problems.forEach((problem, index) => {
    if (index > 0 && index % questionsPerPage === 0) {
      pdf.addPage();
      currentPage++;
      currentY = drawHeader();
      currentX = startX;
    }

    drawQuestionBox(currentX, currentY, problem, index);

    currentX += questionWidth + spacing;

    if ((index + 1) % questionsPerRow === 0) {
      currentX = startX;
      currentY += questionHeight + rowGap; // Using new rowGap instead of spacing + 2
    }
  });

  for (let i = 1; i <= currentPage; i++) {
    pdf.setPage(i);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    pdf.setTextColor(128, 128, 128);
    
    pdf.text(
      `Page ${i} of ${currentPage}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );

    pdf.setFontSize(8);
    pdf.text(
      'Generated by Abacus Learning Platform',
      pageWidth - margin,
      pageHeight - 10,
      { align: 'right' }
    );
  }

  return pdf;
};