import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { motion } from 'framer-motion';
import { Download, Timer as TimerIcon, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { Timer } from './Timer';
import { Results } from './Results';

interface Question {
  id: number;
  numbers: number[];
  correctAnswer: number;
}

const MotionContainer = motion(Container as any);

const generateRandomNumber = (isNegative?: boolean) => {
  const num = Math.floor(Math.random() * 900) + 100;
  return isNegative ? -num : num;
};

const generateQuestionSet = (): number[] => {
  // Always generate 6 numbers for each question
  const patterns = [
    // Pattern 1: All positive numbers
    () => {
      const firstNum = generateRandomNumber(); // First number is always positive
      const others = Array.from({ length: 5 }, () => generateRandomNumber());
      return [firstNum, ...others].sort((a, b) => b - a); // Sort descending
    },

    // Pattern 2: Mix of positive and negative, ensuring proper subtraction
    () => {
      const firstNum = generateRandomNumber(); // First number is always positive
      const numbers = [firstNum];
      
      // Generate remaining 5 numbers
      for (let i = 0; i < 5; i++) {
        const prevSum = numbers.reduce((a, b) => a + b, 0);
        const isNegative = Math.random() > 0.5;
        
        if (isNegative) {
          // For negative numbers, ensure they don't make the sum negative
          const maxNegative = Math.min(prevSum - 100, 900); // Keep at least 100 positive
          const negNum = -(Math.floor(Math.random() * maxNegative) + 100);
          numbers.push(negNum);
        } else {
          numbers.push(generateRandomNumber());
        }
      }
      
      // Sort descending to ensure larger numbers come first
      return numbers.sort((a, b) => b - a);
    },

    // Pattern 3: Alternating positive and negative, maintaining positive sum
    () => {
      const firstNum = generateRandomNumber(); // First number is always positive
      const numbers = [firstNum];
      let currentSum = firstNum;

      for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) {
          // Add a negative number that won't make sum negative
          const maxNegative = Math.min(currentSum - 100, 900);
          const negNum = -(Math.floor(Math.random() * maxNegative) + 100);
          numbers.push(negNum);
          currentSum += negNum;
        } else {
          // Add a positive number
          const posNum = generateRandomNumber();
          numbers.push(posNum);
          currentSum += posNum;
        }
      }

      // Sort descending to ensure larger numbers come first
      return numbers.sort((a, b) => b - a);
    },

    // Pattern 4: Mostly positive with few negatives
    () => {
      const firstNum = generateRandomNumber(); // First number is always positive
      const numbers = [firstNum];
      let currentSum = firstNum;

      // Add 3 more positive numbers
      for (let i = 0; i < 3; i++) {
        const posNum = generateRandomNumber();
        numbers.push(posNum);
        currentSum += posNum;
      }

      // Add 2 negative numbers that won't make sum negative
      for (let i = 0; i < 2; i++) {
        const maxNegative = Math.min(currentSum - 100, 900);
        const negNum = -(Math.floor(Math.random() * maxNegative) + 100);
        numbers.push(negNum);
        currentSum += negNum;
      }

      // Sort descending to ensure larger numbers come first
      return numbers.sort((a, b) => b - a);
    }
  ];

  // Randomly select a pattern
  const selectedPattern = patterns[Math.floor(Math.random() * patterns.length)];
  return selectedPattern();
};

const generateQuestions = (): Question[] => {
  return Array.from({ length: 25 }, (_, index) => {
    const numbers = generateQuestionSet();
    return {
      id: index + 1,
      numbers,
      correctAnswer: numbers.reduce((a, b) => a + b, 0)
    };
  });
};

export const TestPractice: React.FC = () => {
  const [questions] = useState<Question[]>(generateQuestions());
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [isActive, setIsActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => {
          const newTime = timer - 1;
          if (newTime <= 60 && !showTimeWarning) {
            setShowTimeWarning(true);
          }
          return newTime;
        });
      }, 1000);
    } else if (timer === 0) {
      handleFinish();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value.replace(/\D/g, '').slice(0, 5)
    }));
  };

  const handleKeyPress = (questionId: number, event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Find the next input field
      const nextInput = document.querySelector(`input[name="question-${questionId + 1}"]`) as HTMLElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const calculateScore = () => {
    return questions.reduce((acc, question) => {
      const userAnswer = parseInt(answers[question.id] || '0');
      return acc + (userAnswer === question.correctAnswer ? 1 : 0);
    }, 0);
  };

  const handleFinish = () => {
    setIsActive(false);
    setShowResults(true);
  };

  const downloadResults = () => {
    const doc = new jsPDF();
    const score = calculateScore();
    const timeSpent = 600 - timer;
    
    // Add header with styling
    doc.setFontSize(24);
    doc.setTextColor(33, 150, 243);
    doc.text('Test Practice Results', 20, 20);
    
    // Add score and time information
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Final Score: ${score} out of ${questions.length}`, 20, 40);
    doc.text(`Time Spent: ${Math.floor(timeSpent / 60)}m ${timeSpent % 60}s`, 20, 55);
    doc.text(`Accuracy: ${((score / questions.length) * 100).toFixed(1)}%`, 20, 70);

    // Add a divider line
    doc.setLineWidth(0.5);
    doc.line(20, 80, 190, 80);

    // Categorize questions
    const incorrectQuestions: { question: Question; userAnswer: number }[] = [];
    const unattemptedQuestions: Question[] = [];

    questions.forEach(question => {
      const userAnswer = parseInt(answers[question.id] || '0');
      if (!answers[question.id]) {
        unattemptedQuestions.push(question);
      } else if (userAnswer !== question.correctAnswer) {
        incorrectQuestions.push({ question, userAnswer });
      }
    });

    let yPosition = 95;
    const lineHeight = 10;

    // Helper function to format numbers
    const formatNumbers = (numbers: number[]): string => {
      return numbers.map(num => 
        (num >= 0 ? ' ' : '') + num.toString().padStart(4, ' ')
      ).join('\n');
    };

    // Add incorrect answers section
    if (incorrectQuestions.length > 0) {
      // Add subheading for incorrect answers
      doc.setFontSize(14);
      doc.setTextColor(244, 67, 54);
      doc.text(`Incorrect Answers (${incorrectQuestions.length})`, 20, yPosition);
      yPosition += lineHeight + 10;

      // Table header
      doc.setFillColor(33, 150, 243);
      doc.rect(20, yPosition, 170, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text('Q.No', 25, yPosition + 7);
      doc.text('Question', 45, yPosition + 7);
      doc.text('Your Answer', 130, yPosition + 7);
      doc.text('Correct', 160, yPosition + 7);
      yPosition += lineHeight + 5;

      // Table content
      doc.setTextColor(0, 0, 0);
      incorrectQuestions.forEach(({ question, userAnswer }) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        // Question number
        doc.text(question.id.toString().padStart(2, '0'), 25, yPosition + 7);

        // Numbers aligned in column
        doc.setFont('courier'); // Use monospace font for alignment
        const numbers = formatNumbers(question.numbers);
        const lines = numbers.split('\n');
        lines.forEach((line, idx) => {
          doc.text(line, 45, yPosition + (idx * 5));
        });
        doc.setFont('helvetica');

        // Draw a line under the numbers
        const lineY = yPosition + (lines.length * 5) + 2;
        doc.line(45, lineY, 115, lineY);

        // Answers
        doc.text(userAnswer.toString(), 130, yPosition + 7);
        doc.text(question.correctAnswer.toString(), 160, yPosition + 7);
        
        yPosition += Math.max(lines.length * 5 + 10, lineHeight + 15);
      });
    }

    // Add unattempted questions section
    if (unattemptedQuestions.length > 0) {
      yPosition += 15;
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      // Add subheading for unattempted questions
      doc.setFontSize(14);
      doc.setTextColor(158, 158, 158);
      doc.text(`Not Attempted Questions (${unattemptedQuestions.length})`, 20, yPosition);
      yPosition += lineHeight + 10;

      // Table header
      doc.setFillColor(158, 158, 158);
      doc.rect(20, yPosition, 170, 10, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.text('Q.No', 25, yPosition + 7);
      doc.text('Question', 45, yPosition + 7);
      doc.text('Answer', 160, yPosition + 7);
      yPosition += lineHeight + 5;

      // Table content
      doc.setTextColor(0, 0, 0);
      unattemptedQuestions.forEach(question => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        // Question number
        doc.text(question.id.toString().padStart(2, '0'), 25, yPosition + 7);

        // Numbers aligned in column
        doc.setFont('courier');
        const numbers = formatNumbers(question.numbers);
        const lines = numbers.split('\n');
        lines.forEach((line, idx) => {
          doc.text(line, 45, yPosition + (idx * 5));
        });
        doc.setFont('helvetica');

        // Draw a line under the numbers
        const lineY = yPosition + (lines.length * 5) + 2;
        doc.line(45, lineY, 115, lineY);

        // Answer
        doc.text(question.correctAnswer.toString(), 160, yPosition + 7);
        
        yPosition += Math.max(lines.length * 5 + 10, lineHeight + 15);
      });
    }
    
    doc.save('test-practice-results.pdf');
  };

  return (
    <MotionContainer
      maxWidth="md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Addition Test Practice
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: 2,
          mb: 2 
        }}>
          <Timer time={timer} />
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={(timer / 600) * 100}
          sx={{ 
            height: 8, 
            borderRadius: 4,
            bgcolor: 'grey.200',
            '& .MuiLinearProgress-bar': {
              bgcolor: timer <= 60 ? 'error.main' : 'primary.main',
            }
          }}
        />
      </Box>

      {!showResults ? (
        <>
          <Grid container spacing={3}>
            {questions.map((question) => (
              <Grid item xs={12} sm={6} key={question.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Question {question.id}
                  </Typography>
                  <Box sx={{ 
                    fontFamily: 'monospace', 
                    fontSize: '1.1rem',
                    mb: 2,
                    p: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    {question.numbers.map((num, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          textAlign: 'right',
                          color: num < 0 ? 'error.main' : 'inherit',
                          mb: 0.5 // Add spacing between numbers
                        }}
                      >
                        {idx === question.numbers.length - 1 ? 
                          (num >= 0 ? '+ ' : '- ') : 
                          (num >= 0 ? '' : '- ')
                        }
                        {Math.abs(num)}
                      </Box>
                    ))}
                    <Box sx={{ 
                      borderTop: '2px solid',
                      borderColor: 'divider',
                      mt: 1,
                      pt: 1,
                      position: 'relative'
                    }} />
                  </Box>
                  
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    name={`question-${question.id}`}
                    value={answers[question.id] || ''}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === '-' || /^-?\d*$/.test(value)) {
                        handleAnswerChange(question.id, value);
                      }
                    }}
                    onKeyPress={(e) => handleKeyPress(question.id, e)}
                    disabled={!isActive}
                    placeholder="Enter answer"
                    inputProps={{ 
                      inputMode: 'numeric',
                      pattern: '-?[0-9]*',
                      style: { 
                        textAlign: 'right', 
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                        color: answers[question.id]?.startsWith('-') ? 'error.main' : 'inherit'
                      }
                    }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleFinish}
              disabled={!isActive}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem'
              }}
            >
              Finish Test
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <Results
            score={calculateScore()}
            onTryAgain={() => window.location.reload()}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<Download />}
            onClick={downloadResults}
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            Download Results
          </Button>
        </Box>
      )}

      <Dialog
        open={showTimeWarning}
        onClose={() => setShowTimeWarning(false)}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AlertCircle color="error" />
          Time Warning
        </DialogTitle>
        <DialogContent>
          <Typography>
            Less than 1 minute remaining! Please finish your answers.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTimeWarning(false)}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </MotionContainer>
  );
};