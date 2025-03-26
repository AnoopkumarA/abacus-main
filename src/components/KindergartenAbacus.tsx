import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Grid,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box as any);
const MotionPaper = motion(Paper as any);

interface Scene {
  id: number;
  object: string;
  count: number;
  image: string;
  color: string;
}

export const KindergartenAbacus: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<Scene>({
    id: 1,
    object: 'elephants',
    count: 5,
    image: '🐘',
    color: '#64B5F6'
  });

  const [userAnswer, setUserAnswer] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const scenes: Scene[] = [
    { id: 1, object: 'elephants', count: 5, image: '🐘', color: '#64B5F6' },
    { id: 2, object: 'apples', count: 3, image: '🍎', color: '#E57373' },
    { id: 3, object: 'bananas', count: 4, image: '🍌', color: '#FFD54F' },
    { id: 4, object: 'teddy bears', count: 2, image: '🧸', color: '#81C784' },
    { id: 5, object: 'butterflies', count: 6, image: '🦋', color: '#BA68C8' },
    { id: 6, object: 'rabbits', count: 3, image: '🐰', color: '#F06292' },
    { id: 7, object: 'stars', count: 7, image: '⭐', color: '#FFA726' },
    { id: 8, object: 'hearts', count: 4, image: '❤️', color: '#EF5350' },
    { id: 9, object: 'dolphins', count: 2, image: '🐬', color: '#4FC3F7' },
    { id: 10, object: 'unicorns', count: 3, image: '🦄', color: '#CE93D8' },
    { id: 11, object: 'rainbows', count: 5, image: '🌈', color: '#7E57C2' },
    { id: 12, object: 'pizzas', count: 4, image: '🍕', color: '#FF7043' },
    { id: 13, object: 'ice creams', count: 6, image: '🍦', color: '#EC407A' },
    { id: 14, object: 'pandas', count: 3, image: '🐼', color: '#78909C' },
    { id: 15, object: 'balloons', count: 8, image: '🎈', color: '#EF5350' },
    { id: 16, object: 'flowers', count: 5, image: '🌸', color: '#F48FB1' },
    { id: 17, object: 'dinosaurs', count: 2, image: '🦖', color: '#66BB6A' },
    { id: 18, object: 'rockets', count: 3, image: '🚀', color: '#5C6BC0' },
    { id: 19, object: 'cats', count: 4, image: '🐱', color: '#8D6E63' },
    { id: 20, object: 'dogs', count: 5, image: '🐶', color: '#8D6E63' },
    { id: 21, object: 'penguins', count: 6, image: '🐧', color: '#42A5F5' },
    { id: 22, object: 'cupcakes', count: 4, image: '🧁', color: '#EC407A' },
    { id: 23, object: 'cars', count: 3, image: '🚗', color: '#EF5350' },
    { id: 24, object: 'planes', count: 2, image: '✈️', color: '#42A5F5' },
    { id: 25, object: 'suns', count: 1, image: '☀️', color: '#FFA726' },
    { id: 26, object: 'moons', count: 2, image: '🌙', color: '#7E57C2' },
    { id: 27, object: 'trees', count: 5, image: '🌳', color: '#66BB6A' },
    { id: 28, object: 'gifts', count: 4, image: '🎁', color: '#EC407A' },
    { id: 29, object: 'fish', count: 6, image: '🐠', color: '#4FC3F7' },
    { id: 30, object: 'birds', count: 3, image: '🐦', color: '#FF7043' },
    { id: 31, object: 'guitars', count: 4, image: '🎸', color: '#795548' },
    { id: 32, object: 'drums', count: 3, image: '🥁', color: '#9E9E9E' },
    { id: 33, object: 'oranges', count: 5, image: '🍊', color: '#FB8C00' },
    { id: 34, object: 'grapes', count: 7, image: '🍇', color: '#8E24AA' },
    { id: 35, object: 'buses', count: 2, image: '🚌', color: '#FDD835' },
    { id: 36, object: 'trains', count: 3, image: '🚂', color: '#546E7A' },
    { id: 37, object: 'frogs', count: 4, image: '🐸', color: '#4CAF50' },
    { id: 38, object: 'lions', count: 2, image: '🦁', color: '#FF9800' },
    { id: 39, object: 'monkeys', count: 5, image: '🐵', color: '#795548' },
    { id: 40, object: 'zebras', count: 3, image: '🦓', color: '#424242' },
    { id: 41, object: 'books', count: 6, image: '📚', color: '#5C6BC0' },
    { id: 42, object: 'crayons', count: 8, image: '🖍️', color: '#FF5722' },
    { id: 43, object: 'soccer balls', count: 4, image: '⚽', color: '#212121' },
    { id: 44, object: 'basketballs', count: 3, image: '🏀', color: '#FF5722' },
    { id: 45, object: 'snowmen', count: 2, image: '⛄', color: '#90A4AE' },
    { id: 46, object: 'umbrellas', count: 5, image: '☂️', color: '#7B1FA2' },
    { id: 47, object: 'lollipops', count: 6, image: '🍭', color: '#EC407A' },
    { id: 48, object: 'cookies', count: 7, image: '🍪', color: '#8D6E63' },
    { id: 49, object: 'butterflies', count: 4, image: '🦋', color: '#26A69A' },
    { id: 50, object: 'turtles', count: 3, image: '🐢', color: '#388E3C' }
  ];

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array: Scene[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Initialize with a random scene
  React.useEffect(() => {
    const shuffledScenes = shuffleArray([...scenes]);
    setCurrentScene(shuffledScenes[0]);
  }, []);

  const handleBeadClick = (value: number) => {
    setUserAnswer(value);
  };

  const handleCheck = () => {
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      const nextSceneIndex = scenes.findIndex(scene => scene.id === currentScene.id) + 1;
      if (nextSceneIndex < scenes.length) {
        setCurrentScene(scenes[nextSceneIndex]);
      } else {
        setCurrentScene(scenes[0]);
      }
      setUserAnswer(0);
    }, 2000);
  };

  // Add keydown event listener
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleCheck();
      } else if (event.key >= '1' && event.key <= '9') {
        handleBeadClick(parseInt(event.key));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [userAnswer]); // Add userAnswer as dependency

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ textAlign: 'center', mb: 6 }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          Fun Counting with Abacus!
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: '600px', mx: 'auto' }}
        >
          Count the objects and move the beads on the abacus!
        </Typography>
      </MotionBox>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <MotionPaper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${currentScene.color}15, ${currentScene.color}05)`,
              border: '1px solid',
              borderColor: 'divider',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, color: 'text.primary' }}>
              How many {currentScene.object} do you see?
            </Typography>
            <Box sx={{ fontSize: '4rem', lineHeight: 1.5, mb: 3 }}>
              {Array(currentScene.count).fill(currentScene.image).map((emoji, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ display: 'inline-block', margin: '0 4px' }}
                >
                  {emoji}
                </motion.span>
              ))}
            </Box>
          </MotionPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <MotionPaper
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'white',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, color: 'text.primary' }}>
              Move the beads to show your answer:
            </Typography>
            <Box sx={{ mb: 3 }}>
              {/* Enhanced abacus representation with numbers */}
              <Box 
                sx={{ 
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 1.5,
                  mb: 2,
                  maxWidth: '250px',
                  mx: 'auto'
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, null, null].map((num, index) => (
                  num !== null ? (
                    <Box
                      key={index}
                      onClick={() => handleBeadClick(num)}
                      sx={{
                        aspectRatio: '1',
                        borderRadius: '16px',
                        bgcolor: num === userAnswer ? currentScene.color : 'grey.50',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: num === userAnswer ? 'white' : 'text.primary',
                        position: 'relative',
                        border: '2px solid',
                        borderColor: num === userAnswer ? `${currentScene.color}` : 'grey.200',
                        boxShadow: num === userAnswer 
                          ? `0 8px 16px ${currentScene.color}40`
                          : '0 2px 4px rgba(0,0,0,0.05)',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: num === userAnswer
                            ? `0 12px 20px ${currentScene.color}60`
                            : '0 8px 16px rgba(0,0,0,0.1)',
                          borderColor: currentScene.color
                        }
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ 
                          fontWeight: 'bold',
                          mb: 1,
                          color: num === userAnswer ? 'white' : 'text.primary'
                        }}
                      >
                        {num}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: 0.5,
                        p: 0.5
                      }}>
                        {Array(num).fill(0).map((_, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              bgcolor: num === userAnswer ? 'white' : currentScene.color,
                              opacity: num === userAnswer ? 0.9 : 0.5
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  ) : <Box key={index} />
                ))}
              </Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  textAlign: 'center', 
                  color: currentScene.color,
                  mt: 3,
                  fontWeight: 'bold'
                }}
              >
                Your answer: {userAnswer}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheck}
              sx={{
                borderRadius: 2,
                py: 1.5,
                background: `linear-gradient(135deg, ${currentScene.color}, ${currentScene.color}dd)`,
                '&:hover': {
                  background: currentScene.color
                }
              }}
            >
              Check Answer
            </Button>

            {showFeedback && (
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                sx={{ mt: 2, textAlign: 'center' }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: userAnswer === currentScene.count ? 'success.main' : 'error.main',
                    fontWeight: 'bold'
                  }}
                >
                  {userAnswer === currentScene.count
                    ? '🎉 Correct! Well done!'
                    : '❌ Try again!'}
                </Typography>
              </MotionBox>
            )}
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
};