import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  Grid,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Shape {
  name: string;
  color: string;
  path: string;
}

interface Question {
  shape: Shape;
  shapeOptions: string[];
  colorOptions: string[];
  correctShape: string;
  correctColor: string;
}

const MotionContainer = motion(Container as any);
const MotionPaper = motion(Paper as any);

const shapes: Shape[] = [
  { name: 'Circle', color: 'Red', path: 'M50,50 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0 -90,0' },
  { name: 'Square', color: 'Blue', path: 'M10,10 h80 v80 h-80 Z' },
  { name: 'Triangle', color: 'Green', path: 'M50,10 L90,90 L10,90 Z' },
  { name: 'Rectangle', color: 'Pink', path: 'M10,20 h80 v60 h-80 Z' },
  { name: 'Star', color: 'Yellow', path: 'M50,10 L61,44 L97,44 L68,66 L79,100 L50,77 L21,100 L32,66 L3,44 L39,44 Z' },
  { name: 'Heart', color: 'Red', path: 'M50,80 C90,40 90,20 50,10 C10,20 10,40 50,80' },
  { name: 'Pentagon', color: 'Violet', path: 'M50,10 L90,40 L80,90 L20,90 L10,40 Z' },
  { name: 'Hexagon', color: 'Black', path: 'M50,10 L90,35 L90,65 L50,90 L10,65 L10,35 Z' },
  { name: 'Octagon', color: 'Blue', path: 'M30,10 L70,10 L90,30 L90,70 L70,90 L30,90 L10,70 L10,30 Z' },
  { name: 'Diamond', color: 'Pink', path: 'M50,10 L90,50 L50,90 L10,50 Z' },
  { name: 'Oval', color: 'Green', path: 'M50,20 A40,30 0 1,0 50,80 A40,30 0 1,0 50,20' },
  { name: 'Crescent', color: 'Yellow', path: 'M50,10 A40,40 0 1,1 50,90 A30,30 0 1,0 50,10' },
  { name: 'Cross', color: 'Red', path: 'M40,20 H60 V40 H80 V60 H60 V80 H40 V60 H20 V40 H40 Z' },
  { name: 'Arrow', color: 'Violet', path: 'M50,10 L90,50 L50,90 L50,70 L10,70 L10,30 L50,30 Z' },
  { name: 'Cloud', color: 'Blue', path: 'M25,60 A20,20 0 0,1 25,30 A20,20 0 0,1 50,20 A20,20 0 0,1 75,30 A20,20 0 0,1 75,60 Z' },
  { name: 'Moon', color: 'Yellow', path: 'M50,10 A40,40 0 1,1 50,90 A30,30 0 1,0 50,10' },
  { name: 'Parallelogram', color: 'Green', path: 'M20,70 L70,70 L80,30 L30,30 Z' },
  { name: 'Trapezoid', color: 'Pink', path: 'M30,70 L70,70 L80,30 L20,30 Z' },
  { name: 'Kite', color: 'Black', path: 'M50,10 L80,50 L50,90 L20,50 Z' },
  { name: 'Rhombus', color: 'Violet', path: 'M50,10 L85,50 L50,90 L15,50 Z' }
];

const colors = ['Red', 'Blue', 'Green', 'Pink', 'Yellow', 'Violet', 'Black'];

export const MagicalShapes: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<{ shape: boolean; color: boolean } | null>(null);

  const generateQuestion = (): Question => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const otherShapes = shapes.filter(s => s.name !== shape.name);
    const shapeOptions = [
      shape.name,
      ...otherShapes
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map(s => s.name)
    ].sort(() => Math.random() - 0.5);

    const colorOptions = [
      shape.color,
      ...colors
        .filter(c => c !== shape.color)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
    ].sort(() => Math.random() - 0.5);

    return {
      shape,
      shapeOptions,
      colorOptions,
      correctShape: shape.name,
      correctColor: shape.color
    };
  };

  useEffect(() => {
    const newQuestions = Array.from({ length: 5 }, () => generateQuestion());
    setQuestions(newQuestions);
  }, []);

  const checkAnswer = (type: 'shape' | 'color', value: string) => {
    const question = questions[currentQuestion];
    const isCorrect = type === 'shape' ? 
      value === question.correctShape : 
      value === question.correctColor;

    setFeedback(prev => ({
      ...prev,
      [type]: isCorrect
    }));

    if (isCorrect) {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    return isCorrect;
  };

  const handleShapeSelect = (value: string) => {
    setSelectedShape(value);
    checkAnswer('shape', value);
  };

  const handleColorSelect = (value: string) => {
    setSelectedColor(value);
    checkAnswer('color', value);
  };

  const handleNext = () => {
    const question = questions[currentQuestion];
    const isShapeCorrect = selectedShape === question.correctShape;
    const isColorCorrect = selectedColor === question.correctColor;

    if (isShapeCorrect && isColorCorrect) {
      setScore(score + 1);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedShape('');
        setSelectedColor('');
        setFeedback(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleTryAgain = () => {
    const newQuestions = Array.from({ length: 5 }, () => generateQuestion());
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setSelectedShape('');
    setSelectedColor('');
    setScore(0);
    setShowResult(false);
  };

  if (!questions.length) return null;

  return (
    <MotionContainer
      maxWidth="md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom
        sx={{ 
          mb: 4,
          background: 'linear-gradient(45deg, #FF5722, #FFC107)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 'bold'
        }}
      >
        Magical Shapes
      </Typography>

      {!showResult ? (
        <MotionPaper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <svg width="200" height="200" viewBox="0 0 100 100">
              <path
                d={questions[currentQuestion].shape.path}
                fill={questions[currentQuestion].shape.color}
              />
            </svg>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">What shape is this?</FormLabel>
                <RadioGroup
                  value={selectedShape}
                  onChange={(e) => handleShapeSelect(e.target.value)}
                >
                  {questions[currentQuestion].shapeOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                {feedback?.shape !== undefined && (
                  <Typography
                    color={feedback.shape ? 'success.main' : 'error.main'}
                    sx={{ mt: 1, fontWeight: 'bold' }}
                  >
                    {feedback.shape ? 'Correct!' : 'Try again!'}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">What color is this shape?</FormLabel>
                <RadioGroup
                  value={selectedColor}
                  onChange={(e) => handleColorSelect(e.target.value)}
                >
                  {questions[currentQuestion].colorOptions.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
                {feedback?.color !== undefined && (
                  <Typography
                    color={feedback.color ? 'success.main' : 'error.main'}
                    sx={{ mt: 1, fontWeight: 'bold' }}
                  >
                    {feedback.color ? 'Correct!' : 'Try again!'}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleNext}
              disabled={!selectedShape || !selectedColor || !(feedback?.shape && feedback?.color)}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem'
              }}
            >
              Next Shape
            </Button>
          </Box>
        </MotionPaper>
      ) : (
        <MotionPaper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Great Job!
          </Typography>
          <Typography variant="h5" gutterBottom>
            You got {score} out of {questions.length} correct!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleTryAgain}
            sx={{ mt: 3 }}
          >
            Try Again
          </Button>
        </MotionPaper>
      )}
    </MotionContainer>
  );
}; 