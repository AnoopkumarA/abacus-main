import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Button, 
  Box, 
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Fade
} from '@mui/material';
import { CheckCircle2, Download, Timer as TimerIcon } from 'lucide-react';
import { Timer } from './Timer';
import { Problem } from './Problem';
import { Results } from './Results';
import { generateProblems } from '../utils/problemGenerator';
import { generatePDF } from '../utils/pdfGenerator';
import { motion } from 'framer-motion';
import { CategorySelector } from './CategorySelector';
import { generateResultsPDF } from '../utils/resultsGenerator';
import { generateAnswerSheet } from '../utils/answerSheetGenerator';
import { useAuth } from '../contexts/AuthContext';
import { AnswerPasswordDialog } from './AnswerPasswordDialog';

const MotionContainer = motion(Container as any);

export const AbacusPractice: React.FC = () => {
  const [timer, setTimer] = useState(480);
  const [isActive, setIsActive] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const { user } = useAuth();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [downloadTime, setDownloadTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  
  const isAdminUser = user?.email === 'admin@abacus.com';

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setProblems(generateProblems(category));
    setIsActive(true);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      setShowResults(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (downloadTime && timeRemaining > 0) {
      interval = setInterval(() => {
        const remaining = 120 - Math.floor((Date.now() - downloadTime) / 1000);
        setTimeRemaining(Math.max(0, remaining));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [downloadTime]);

  const handleFinish = () => {
    setIsActive(false);
    setShowResults(true);
  };

  const handleAnswerChange = (id: number, value: string) => {
    // Ensure answers for Category A are single digits
    if (selectedCategory === 'A' && value.length > 1) {
      return;
    }

    setAnswers(prev => ({
      ...prev,
      [id]: value ? Number(parseInt(value)) : 0
    }));
  };

  const calculateScore = () => {
    return Object.entries(answers).reduce((acc, [id, answer]) => 
      acc + (answer === problems[parseInt(id)-1].correctAnswer ? 1 : 0), 0
    );
  };

  const calculateProgress = () => {
    return (Object.keys(answers).length / problems.length) * 100;
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      // Pass selectedCategory to generatePDF
      const pdf = generatePDF(problems, selectedCategory || 'A');
      pdf.save('abacus-exam-questions.pdf');
      setDownloadTime(Date.now());
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEnterPress = (currentId: number) => {
    const nextId = currentId + 1;
    const nextInput = document.querySelector(`input[data-problem-id="${nextId}"]`) as HTMLElement;
    if (nextInput) {
      nextInput.focus();
    }
  };

  const handleDownloadResults = () => {
    if (!selectedCategory) return;

    const results = {
      category: selectedCategory,
      score: calculateScore(),
      totalQuestions: problems.length,
      timeSpent: 480 - timer, // Calculate time spent
      questionsAttempted: Object.keys(answers).length,
      answers,
      problems,
    };

    const pdf = generateResultsPDF(results);
    pdf.save('abacus-test-results.pdf');
  };

  const handleDownloadAnswers = async () => {
    if (!selectedCategory) return;
    try {
      const pdf = generateAnswerSheet(problems, selectedCategory);
      pdf.save('abacus-answer-sheet.pdf');
    } catch (error) {
      console.error('Error generating answer sheet:', error);
    }
  };

  const handleAnswerDownloadClick = () => {
    if (isAdminUser) {
      handleDownloadAnswers();
    } else if (!downloadTime || Date.now() - downloadTime < 120000) {
      setShowPasswordDialog(true);
    } else {
      setShowPasswordDialog(true);
    }
  };

  return (
    <MotionContainer 
      maxWidth="xl" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!selectedCategory ? (
        <CategorySelector onSelect={handleCategorySelect} />
      ) : (
        <Paper elevation={0} sx={{ 
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ 
            p: 3, 
            borderBottom: '1px solid',
            borderColor: 'divider',
            background: 'linear-gradient(to right, #f8fafc, #ffffff)'
          }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  fontWeight="bold" 
                  color="primary.main"
                  sx={{ 
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } 
                  }}
                >
                  District Level Abacus Model Exam
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  color="text.secondary" 
                  sx={{ mt: 1 }}
                >
                  Complete {problems.length} problems within the time limit
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 1, sm: 1.5 }, // Slightly increased gap
                  flexDirection: { xs: 'column', sm: 'row' },
                  justifyContent: { xs: 'stretch', md: 'flex-end' },
                  alignItems: 'center',
                }}>
                  <Button
                    fullWidth={false}
                    variant="outlined"
                    startIcon={<Download size={18} />} // Increased from 16 to 18
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    sx={{ 
                      borderRadius: 2,
                      minWidth: { xs: '100%', sm: 'auto' },
                      py: 0.8, // Increased from 0.5
                      px: 2, // Increased from 1.5
                      fontSize: '0.9rem', // Increased from 0.875rem
                    }}
                  >
                    {isDownloading ? 'Generating...' : 'Questions'}
                  </Button>
                  
                  <Button
                    fullWidth={false}
                    variant="outlined"
                    startIcon={<Download size={18} />}
                    onClick={handleAnswerDownloadClick}
                    disabled={!isAdminUser && timeRemaining > 0}
                    sx={{ 
                      borderRadius: 2,
                      minWidth: { xs: '100%', sm: 'auto' },
                      py: 0.8,
                      px: 2,
                      fontSize: '0.9rem',
                    }}
                  >
                    {timeRemaining > 0 && !isAdminUser ? `Wait ${timeRemaining}s` : 'Answers'}
                  </Button>

                  <Card sx={{ 
                    minWidth: { xs: '100%', sm: 120 }, 
                    bgcolor: 'primary.main', 
                    color: 'white' 
                  }}>
                    <CardContent sx={{ 
                      p: { xs: 1, sm: 2 }, 
                      '&:last-child': { pb: { xs: 1, sm: 2 } },
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TimerIcon size={20} />
                        <Timer time={timer} />
                      </Box>
                    </CardContent>
                  </Card>
                  <Button
                    fullWidth={false}
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle2 />}
                    onClick={handleFinish}
                    sx={{ 
                      borderRadius: 2,
                      minWidth: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    Finish Test
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Object.keys(answers).length} of {problems.length} completed
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={calculateProgress()} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>
          </Box>

          <Box sx={{ p: 4 }}>
            {isActive && (
              <Fade in={isActive}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {problems.map((problem) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={problem.id}>
                      <Problem
                        id={problem.id}
                        baseNumber={problem.baseNumber}
                        rows={problem.rows}
                        answer={answers[problem.id] || ''}
                        onAnswerChange={handleAnswerChange}
                        onEnterPress={handleEnterPress}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Fade>
            )}

            {showResults && (
              <Fade in={showResults}>
                <Box sx={{ width: '100%' }}>
                  <Results
                    score={calculateScore()}
                    total={problems.length}
                    onTryAgain={() => window.location.reload()}
                  />
                  <Box sx={{ 
                    mt: 3, 
                    display: 'flex', 
                    justifyContent: 'center',
                    px: { xs: 2, sm: 0 }
                  }}>
                    <Button
                      fullWidth={false}
                      variant="contained"
                      startIcon={<Download />}
                      onClick={handleDownloadResults}
                      sx={{
                        borderRadius: 2,
                        background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
                        px: { xs: 2, sm: 4 },
                        py: 1.5,
                        width: { xs: '100%', sm: 'auto' }
                      }}
                    >
                      Download Results
                    </Button>
                  </Box>
                </Box>
              </Fade>
            )}
          </Box>
        </Paper>
      )}
      <AnswerPasswordDialog
        open={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        onSuccess={handleDownloadAnswers}
        timeRemaining={timeRemaining}
      />
    </MotionContainer>
  );
};