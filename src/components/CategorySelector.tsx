import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Button,
  Container,
  LinearProgress,
  Tooltip
} from '@mui/material';
import { TEST_CATEGORIES } from '../types/testCategory';
import { motion } from 'framer-motion';
import { Brain, Star, Trophy, Target, Award } from 'lucide-react';

const MotionPaper = motion(Paper as any);
const MotionBox = motion(Box as any);

interface CategorySelectorProps {
  onSelect: (category: string) => void;
}

const getCategoryIcon = (level: number) => {
  switch(level) {
    case 1: return <Brain size={32} />;
    case 2: return <Star size={32} />;
    case 3: return <Trophy size={32} />;
    case 4: return <Target size={32} />;
    case 5: return <Award size={32} />;
    default: return <Brain size={32} />;
  }
};

const getCategoryColor = (level: number) => {
  switch(level) {
    case 1: return '#4CAF50';
    case 2: return '#2196F3';
    case 3: return '#FF9800';
    case 4: return '#F44336';
    case 5: return '#9C27B0';
    default: return '#4CAF50';
  }
};

// Calculate difficulty percentage where level 12 is 100%
const calculateDifficultyPercentage = (level: number): number => {
  return (level / 12) * 100;
};

// Get difficulty label based on percentage
const getDifficultyLabel = (percentage: number): string => {
  if (percentage <= 20) return 'Beginner';
  if (percentage <= 40) return 'Elementary';
  if (percentage <= 60) return 'Intermediate';
  if (percentage <= 80) return 'Advanced';
  return 'Expert';
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect }) => {
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          textAlign: 'center', 
          mb: { xs: 4, sm: 6 },
          mt: { xs: 3, sm: 4 }
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Choose Your Level
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            maxWidth: '600px', 
            mx: 'auto', 
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          Select the appropriate difficulty level that matches your current abacus skills
        </Typography>
      </MotionBox>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {TEST_CATEGORIES.map((category, index) => {
          const difficultyPercentage = calculateDifficultyPercentage(category.level);
          const difficultyLabel = getDifficultyLabel(difficultyPercentage);
          const categoryColor = getCategoryColor(category.level);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={category.id}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    background: `linear-gradient(135deg, ${categoryColor}20, transparent)`,
                    zIndex: 0
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: `0 20px 40px ${categoryColor}20`,
                    '& .category-icon': {
                      transform: 'scale(1.1) rotate(-5deg)',
                      boxShadow: `0 10px 25px ${categoryColor}40`
                    },
                    '& .category-title': {
                      background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}aa)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }
                  },
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* Decorative corner gradients */}
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle at top left, ${categoryColor}20, transparent 70%)`,
                  opacity: 0.5
                }} />
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle at bottom right, ${categoryColor}20, transparent 70%)`,
                  opacity: 0.5
                }} />

                {/* Icon Container */}
                <Box
                  className="category-icon"
                  sx={{
                    p: 3,
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`,
                    color: 'white',
                    mb: 3,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70px',
                    height: '70px',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-3px',
                      borderRadius: '23px',
                      background: `linear-gradient(135deg, ${categoryColor}80, transparent)`,
                      opacity: 0.5,
                      filter: 'blur(4px)'
                    },
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      inset: '-2px',
                      borderRadius: '22px',
                      padding: '2px',
                      background: `linear-gradient(135deg, ${categoryColor}, transparent)`,
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude'
                    }
                  }}
                >
                  {getCategoryIcon(category.level)}
                </Box>

                {/* Title and Level */}
                <Typography 
                  className="category-title"
                  variant="h5" 
                  component="h3"
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {category.name}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: categoryColor,
                    fontWeight: 'medium',
                    mb: 2
                  }}
                >
                  Level {category.level} • {difficultyLabel}
                </Typography>

                {/* Description */}
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ mb: 3, flexGrow: 1 }}
                >
                  {category.description}
                </Typography>

                {/* Difficulty Progress */}
                <Box sx={{ width: '100%', mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      Difficulty
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {difficultyPercentage.toFixed(0)}%
                    </Typography>
                  </Box>
                  <Tooltip title={`Level ${category.level} of 12`} arrow placement="top">
                    <LinearProgress
                      variant="determinate"
                      value={difficultyPercentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: `${categoryColor}15`,
                        '& .MuiLinearProgress-bar': {
                          bgcolor: categoryColor,
                        },
                      }}
                    />
                  </Tooltip>
                </Box>

                {/* Start Button */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => onSelect(category.id)}
                  sx={{
                    background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor}dd)`,
                    py: 1.5,
                    borderRadius: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: `0 8px 20px ${categoryColor}30`,
                    position: 'relative',
                    overflow: 'hidden',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0))',
                      clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 60%)',
                      transition: 'all 0.3s ease'
                    },
                    '&:hover': {
                      background: `linear-gradient(135deg, ${categoryColor}, ${categoryColor})`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 24px ${categoryColor}40`,
                      '&:before': {
                        transform: 'translateY(-100%)'
                      }
                    }
                  }}
                >
                  Start Practice
                </Button>
              </MotionPaper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}; 