import * as PDFJS from 'pdfjs-dist';

// Ensure PDF.js worker is loaded
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export interface ParsedAnswerSheet {
  category: string;
  answers: { [key: number]: number };
}

export const parsePDF = async (file: File): Promise<ParsedAnswerSheet> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFJS.getDocument({ data: arrayBuffer }).promise;
  
  const answers: { [key: number]: number } = {};
  let category = 'A'; // Default category

  // Read first page for category and answers
  const page = await pdf.getPage(1);
  const textContent = await page.getTextContent();
  const text = textContent.items.map((item: any) => item.str).join(' ');

  // Extract category
  const categoryMatch = text.match(/Category\s+([A-E])/i);
  if (categoryMatch) {
    category = categoryMatch[1];
  }

  // Extract answers from the answer boxes
  // This is a simplified example - you'll need to adjust based on your exact PDF layout
  const answerPattern = /Answer:\s*(\d+)/g;
  let match;
  let questionNumber = 1;
  
  while ((match = answerPattern.exec(text)) !== null) {
    answers[questionNumber] = parseInt(match[1]);
    questionNumber++;
  }

  return {
    category,
    answers
  };
};
