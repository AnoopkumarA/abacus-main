import React from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Button
} from '@mui/material';
import { motion } from 'framer-motion';
import { Calculator, Square, Brain, Target, ChevronRight, Gamepad2, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MotionPaper = motion(Paper as any);
const MotionBox = motion(Box as any);

export const PracticeSelector: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Abacus Practice',
      description: 'Practice your abacus skills with various difficulty levels',
      icon: <Calculator size={32} strokeWidth={1.5} />,
      color: '#2196F3',
      onClick: () => navigate('/practice/abacus')
    },
    {
      title: 'Square Number Practice',
      description: 'Master the art of calculating squaring numbers mentally',
      icon: <Brain size={32} strokeWidth={1.5} />,
      color: '#4CAF50',
      onClick: () => navigate('/practice/square-root')
    },
    {
      title: 'Square Root Practice',
      description: 'Practice finding square roots of given numbers',
      icon: <Target size={32} strokeWidth={1.5} />,
      color: '#FF5722',
      onClick: () => navigate('/practice/square-number')
    },
    {
      title: 'Memory Game',
      description: 'Enhance memory and learning with AI assistance',
      icon: <Gamepad2 size={32} strokeWidth={1.5} />,
      color: '#9C27B0',
      onClick: () => navigate('/memory-game')
    },
    {
      title: 'Test Practice',
      description: 'Practice with 25 random 3-digit addition problems in 10 minutes',
      icon: <FileSpreadsheet size={32} strokeWidth={1.5} />,
      color: '#FF4081',
      onClick: () => navigate('/practice/test')
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          textAlign: 'center', 
          mb: { xs: 4, sm: 6 }
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
          Choose Your Practice Mode
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            maxWidth: '600px', 
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          Select the type of practice you want to focus on today
        </Typography>
      </MotionBox>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={feature.title}>
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              elevation={0}
              onClick={feature.onClick}
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
                  background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
                  zIndex: 0
                },
                '&:hover': {
                  transform: 'translateY(-8px)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  boxShadow: `0 20px 40px ${feature.color}20`,
                  '& .feature-icon': {
                    transform: 'scale(1.1) rotate(-5deg)',
                    boxShadow: `0 10px 25px ${feature.color}40`
                  },
                  '& .feature-title': {
                    background: `linear-gradient(90deg, ${feature.color}, ${feature.color}aa)`,
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
                background: `radial-gradient(circle at top left, ${feature.color}20, transparent 70%)`,
                opacity: 0.5
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle at bottom right, ${feature.color}20, transparent 70%)`,
                opacity: 0.5
              }} />

              {/* Icon Container */}
              <Box
                className="feature-icon"
                sx={{
                  p: 3,
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
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
                    background: `linear-gradient(135deg, ${feature.color}80, transparent)`,
                    opacity: 0.5,
                    filter: 'blur(4px)'
                  },
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    inset: '-2px',
                    borderRadius: '22px',
                    padding: '2px',
                    background: `linear-gradient(135deg, ${feature.color}, transparent)`,
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude'
                  }
                }}
              >
                {feature.icon}
              </Box>

              {/* Title */}
              <Typography 
                className="feature-title"
                variant="h5" 
                component="h2"
                sx={{ 
                  mb: 2,
                  fontWeight: 700,
                  transition: 'all 0.3s ease'
                }}
              >
                {feature.title}
              </Typography>

              {/* Description */}
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4,
                  color: 'text.secondary',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  maxWidth: '90%'
                }}
              >
                {feature.description}
              </Typography>

              {/* Start Button */}
              <Box
                sx={{
                  mt: 'auto',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={
                    <Box 
                      sx={{ 
                        ml: 1,
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <ChevronRight size={16} />
                    </Box>
                  }
                  sx={{
                    background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                    py: 1.5,
                    px: 4,
                    borderRadius: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: `0 8px 20px ${feature.color}30`,
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
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color})`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 12px 24px ${feature.color}40`,
                      '& .MuiButton-endIcon': {
                        transform: 'translateX(4px)',
                        '& > div': {
                          background: 'rgba(255,255,255,0.3)'
                        }
                      },
                      '&:before': {
                        transform: 'translateY(-100%)'
                      }
                    }
                  }}
                >
                  Start Practice
                </Button>
              </Box>
            </MotionPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};