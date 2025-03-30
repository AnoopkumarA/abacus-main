import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Paper, Button } from '@mui/material';
import { motion } from 'framer-motion';

interface CalculationQuestion {
  id: number;
  firstNumber: number;
  secondNumber: number;
  operation: '+' | '-';
  object: string;
  image: string;
  color: string;
}

const MotionPaper = motion(Paper);

export const KindergartenCalculation: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<CalculationQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const questions: CalculationQuestion[] = [
    { id: 1, firstNumber: 5, secondNumber: 2, operation: '+', object: 'elephants', image: '🐘', color: '#64B5F6' },
    { id: 2, firstNumber: 4, secondNumber: 3, operation: '+', object: 'apples', image: '🍎', color: '#E57373' },
    { id: 3, firstNumber: 6, secondNumber: 2, operation: '-', object: 'bananas', image: '🍌', color: '#FFD54F' },
    { id: 4, firstNumber: 3, secondNumber: 2, operation: '+', object: 'cars', image: '🚗', color: '#FF5722' },
    { id: 5, firstNumber: 7, secondNumber: 3, operation: '-', object: 'stars', image: '⭐', color: '#FFC107' },
    { id: 6, firstNumber: 5, secondNumber: 3, operation: '+', object: 'hearts', image: '❤️', color: '#E91E63' },
    { id: 7, firstNumber: 8, secondNumber: 4, operation: '-', object: 'flowers', image: '🌸', color: '#9C27B0' },
    { id: 8, firstNumber: 4, secondNumber: 4, operation: '+', object: 'balloons', image: '🎈', color: '#2196F3' },
    { id: 9, firstNumber: 6, secondNumber: 3, operation: '-', object: 'dogs', image: '🐕', color: '#795548' },
    { id: 10, firstNumber: 5, secondNumber: 4, operation: '+', object: 'cats', image: '🐱', color: '#FF9800' },
    { id: 11, firstNumber: 7, secondNumber: 2, operation: '-', object: 'rabbits', image: '🐰', color: '#607D8B' },
    { id: 12, firstNumber: 3, secondNumber: 3, operation: '+', object: 'pandas', image: '🐼', color: '#424242' },
    { id: 13, firstNumber: 8, secondNumber: 3, operation: '-', object: 'monkeys', image: '🐵', color: '#795548' },
    { id: 14, firstNumber: 4, secondNumber: 2, operation: '+', object: 'penguins', image: '🐧', color: '#37474F' },
    { id: 15, firstNumber: 6, secondNumber: 4, operation: '-', object: 'birds', image: '🐦', color: '#00BCD4' },
    { id: 16, firstNumber: 5, secondNumber: 5, operation: '+', object: 'fish', image: '🐠', color: '#03A9F4' },
    { id: 17, firstNumber: 9, secondNumber: 4, operation: '-', object: 'butterflies', image: '🦋', color: '#9575CD' },
    { id: 18, firstNumber: 4, secondNumber: 3, operation: '+', object: 'sunflowers', image: '🌻', color: '#FDD835' },
    { id: 19, firstNumber: 7, secondNumber: 5, operation: '-', object: 'pizzas', image: '🍕', color: '#F44336' },
    { id: 20, firstNumber: 6, secondNumber: 2, operation: '+', object: 'ice creams', image: '🍦', color: '#FFCCBC' },
    { id: 21, firstNumber: 8, secondNumber: 3, operation: '-', object: 'hamburgers', image: '🍔', color: '#8D6E63' },
    { id: 22, firstNumber: 5, secondNumber: 4, operation: '+', object: 'cakes', image: '🎂', color: '#EC407A' },
    { id: 23, firstNumber: 6, secondNumber: 3, operation: '-', object: 'lollipops', image: '🍭', color: '#AB47BC' },
    { id: 24, firstNumber: 4, secondNumber: 4, operation: '+', object: 'cookies', image: '🍪', color: '#8D6E63' },
    { id: 25, firstNumber: 7, secondNumber: 2, operation: '-', object: 'donuts', image: '🍩', color: '#FF7043' },
    { id: 26, firstNumber: 5, secondNumber: 3, operation: '+', object: 'rockets', image: '🚀', color: '#546E7A' },
    { id: 27, firstNumber: 8, secondNumber: 5, operation: '-', object: 'airplanes', image: '✈️', color: '#78909C' },
    { id: 28, firstNumber: 4, secondNumber: 2, operation: '+', object: 'trains', image: '🚂', color: '#5C6BC0' },
    { id: 29, firstNumber: 6, secondNumber: 4, operation: '-', object: 'buses', image: '🚌', color: '#43A047' },
    { id: 30, firstNumber: 5, secondNumber: 3, operation: '+', object: 'boats', image: '⛵', color: '#26A69A' },
    { id: 31, firstNumber: 7, secondNumber: 4, operation: '-', object: 'suns', image: '☀️', color: '#FFB300' },
    { id: 32, firstNumber: 4, secondNumber: 3, operation: '+', object: 'moons', image: '🌙', color: '#78909C' },
    { id: 33, firstNumber: 8, secondNumber: 3, operation: '-', object: 'rainbows', image: '🌈', color: '#7E57C2' },
    { id: 34, firstNumber: 5, secondNumber: 2, operation: '+', object: 'umbrellas', image: '☂️', color: '#5C6BC0' },
    { id: 35, firstNumber: 6, secondNumber: 4, operation: '-', object: 'snowmen', image: '⛄', color: '#90A4AE' },
    { id: 36, firstNumber: 4, secondNumber: 4, operation: '+', object: 'presents', image: '🎁', color: '#EC407A' },
    { id: 37, firstNumber: 7, secondNumber: 3, operation: '-', object: 'balloons', image: '🎈', color: '#EF5350' },
    { id: 38, firstNumber: 5, secondNumber: 2, operation: '+', object: 'soccer balls', image: '⚽', color: '#424242' },
    { id: 39, firstNumber: 6, secondNumber: 3, operation: '-', object: 'basketballs', image: '🏀', color: '#FF7043' },
    { id: 40, firstNumber: 4, secondNumber: 2, operation: '+', object: 'baseballs', image: '⚾', color: '#8D6E63' },
    { id: 41, firstNumber: 8, secondNumber: 5, operation: '-', object: 'tennis balls', image: '🎾', color: '#C0CA33' },
    { id: 42, firstNumber: 5, secondNumber: 3, operation: '+', object: 'books', image: '📚', color: '#5C6BC0' },
    { id: 43, firstNumber: 7, secondNumber: 4, operation: '-', object: 'pencils', image: '✏️', color: '#FF7043' },
    { id: 44, firstNumber: 4, secondNumber: 3, operation: '+', object: 'crayons', image: '🖍️', color: '#EC407A' },
    { id: 45, firstNumber: 6, secondNumber: 2, operation: '-', object: 'paint brushes', image: '🖌️', color: '#7E57C2' },
    { id: 46, firstNumber: 5, secondNumber: 4, operation: '+', object: 'robots', image: '🤖', color: '#78909C' },
    { id: 47, firstNumber: 8, secondNumber: 3, operation: '-', object: 'aliens', image: '👾', color: '#9575CD' },
    { id: 48, firstNumber: 4, secondNumber: 2, operation: '+', object: 'dinosaurs', image: '🦖', color: '#66BB6A' },
    { id: 49, firstNumber: 7, secondNumber: 5, operation: '-', object: 'unicorns', image: '🦄', color: '#EC407A' },
    { id: 50, firstNumber: 6, secondNumber: 3, operation: '+', object: 'dragons', image: '🐲', color: '#26A69A' }
  ];

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, []);

  const checkAnswer = () => {
    if (!currentQuestion) return;

    const correctAnswer = currentQuestion.operation === '+' 
      ? currentQuestion.firstNumber + currentQuestion.secondNumber
      : currentQuestion.firstNumber - currentQuestion.secondNumber;

    const isAnswerCorrect = parseInt(userAnswer) === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (isAnswerCorrect) {
        setCurrentQuestion(getRandomQuestion());
        setUserAnswer('');
      }
    }, 2000);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  if (!currentQuestion) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{ p: 4, borderRadius: 4 }}
      >
        <Typography variant="h3" align="center" sx={{ 
          mb: 4,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
        }}>
          Picture Math
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexDirection: 'column',
              gap: 2,
              fontSize: '2rem',
              maxWidth: '100%',
              '& > span': {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
              }
            }}>
              <Box sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1,
                maxWidth: '100%'
              }}>
                {Array(currentQuestion.firstNumber).fill(currentQuestion.image).map((emoji, i) => (
                  <motion.span
                    key={`first-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </Box>
              <span style={{ 
                color: currentQuestion.color, 
                fontWeight: 'bold',
                padding: '0 8px'
              }}>
                {currentQuestion.operation}
              </span>
              <Box sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1,
                maxWidth: '100%'
              }}>
                {Array(currentQuestion.secondNumber).fill(currentQuestion.image).map((emoji, i) => (
                  <motion.span
                    key={`second-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: (currentQuestion.firstNumber + i) * 0.1 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ 
              textAlign: 'center',
              mt: 2
            }}>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  fontSize: '1.5rem',
                  width: '120px',
                  textAlign: 'center',
                  padding: '0.75rem',
                  borderRadius: '1rem',
                  border: `2px solid ${currentQuestion.color}`,
                  outline: 'none',
                }}
                min="0"
                max="20"
              />

              <Button
                variant="contained"
                onClick={checkAnswer}
                sx={{
                  mt: { xs: 2, sm: 3 },
                  ml: { xs: 1, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  bgcolor: currentQuestion.color,
                  '&:hover': {
                    bgcolor: currentQuestion.color + 'dd'
                  }
                }}
              >
                Check Answer
              </Button>
            </Box>
          </Grid>
        </Grid>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                mt: 4,
                color: isCorrect ? 'success.main' : 'error.main',
                fontWeight: 'bold'
              }}
            >
              {isCorrect ? '🎉 Correct! Well done!' : '❌ Wrong! Try again!'}
            </Typography>
          </motion.div>
        )}
      </MotionPaper>
    </Container>
  );
};
