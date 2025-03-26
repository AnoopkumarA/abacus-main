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
import { Results } from './Results';
import { motion } from 'framer-motion';
import { generateResultsPDF } from '../utils/resultsGenerator';

const MotionContainer = motion(Container as any);

interface Problem {
  id: number;
  number: number;
  correctAnswer: number;
}

export const SquareNumber: React.FC = () => {
  const [timer, setTimer] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(true);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [problems, setProblems] = useState<Problem[]>([]);

  useEffect(() => {
    // Generate 20 random problems with perfect squares
    const generatedProblems = Array.from({ length: 20 }, (_, index) => {
      const root = Math.floor(Math.random() * 15) + 1; // Smaller range for reasonable squares
      return {
        id: index + 1,
        number: root * root, // The square number to find root of
        correctAnswer: root
      };
    });
    setProblems(generatedProblems);
  }, []);

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

  const handleFinish = () => {
    setIsActive(false);
    setShowResults(true);
  };

  const handleAnswerChange = (id: number, value: string) => {
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

  const handleDownloadResults = () => {
    const results = {
      category: 'Square Root Practice',
      score: calculateScore(),
      totalQuestions: problems.length,
      timeSpent: 300 - timer,
      questionsAttempted: Object.keys(answers).length,
      answers,
      problems: problems.map(problem => ({
        id: problem.id,
        baseNumber: problem.number,
        rows: [],
        correctAnswer: problem.correctAnswer
      }))
    };

    const pdf = generateResultsPDF(results);
    pdf.save('square-number-practice-results.pdf');
  };

  const handleEnterPress = (currentId: number) => {
    const nextId = currentId + 1;
    const nextInput = document.querySelector(`input[data-problem-id="${nextId}"]`) as HTMLElement;
    if (nextInput) {
      nextInput.focus();
    }
  };

  return (
    <MotionContainer 
      maxWidth="xl" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
                Square Root Practice
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary" 
                sx={{ 
                  mt: 1,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                Find the square root of {problems.length} numbers within the time limit
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 1.5 },
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: { xs: 'stretch', md: 'flex-end' },
                alignItems: 'center',
              }}>
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
                  <Grid item xs={12} sm={6} md={4} lg={3} key={problem.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 3,
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                          background: 'rgba(255, 255, 255, 0.9)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 3
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: 'primary.main',
                            fontSize: { xs: '1rem', sm: '1.25rem' }
                          }}
                        >
                          Question {problem.id}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          mb: 4,
                          fontWeight: 700,
                          background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          color: 'transparent',
                          fontSize: { xs: '2rem', sm: '2.5rem' }
                        }}
                      >
                        √{problem.number}
                      </Typography>
                      <Box sx={{ mt: 'auto' }}>
                        <input
                          type="number"
                          value={answers[problem.id] || ''}
                          onChange={(e) => handleAnswerChange(problem.id, e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleEnterPress(problem.id)}
                          data-problem-id={problem.id}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '2px solid #e0e0e0',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            transition: 'all 0.2s ease',
                            outline: 'none'
                          }}
                          placeholder="Enter square root"
                          onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                        />
                      </Box>
                    </Paper>
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
    </MotionContainer>
  );
};