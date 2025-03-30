import React, { useState } from 'react';
import { Container, Typography, Button, Box, Grid, Paper, Divider, Dialog, IconButton } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Brain, Trophy, Clock, Target, ArrowRight, Users, Star, Zap, X, Download, Smartphone, Wifi, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import mathPatternImage from '/math-pattern.png';

const MotionBox = motion(Box as any);
const MotionPaper = motion(Paper as any);

export const Home = () => {
  const navigate = useNavigate();
  const [openDownloadDialog, setOpenDownloadDialog] = useState(true);

  const handleCloseDialog = () => {
    setOpenDownloadDialog(false);
  };

  const handleDownload = () => {
    try {
      // Use the correct path for Vercel deployment
      const apkUrl = '/downloads/abacus-app.apk';
      
      // Fetch to check if file exists
      fetch(apkUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('APK file not found');
          }
          return response.blob();
        })
        .then(blob => {
          // Create download link
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'abacus-app.apk';
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          
          // Close dialog after successful download
          setOpenDownloadDialog(false);
        })
        .catch(error => {
          console.error('Download failed:', error);
          alert('Sorry, the APK file is not available at the moment. Please try again later.');
        });
    } catch (error) {
      console.error('Download error:', error);
      alert('Sorry, something went wrong. Please try again later.');
    }
  };

  const features = [
    {
      icon: <Brain size={40} />,
      title: 'Mental Math',
      description: 'Enhance your mental calculation abilities through structured practice',
      color: '#2196F3',
    },
    {
      icon: <Trophy size={40} />,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed performance analytics',
      color: '#4CAF50',
    },
    {
      icon: <Clock size={40} />,
      title: 'Timed Practice',
      description: 'Build speed and accuracy with timed exercises',
      color: '#FF9800',
    },
    {
      icon: <Target size={40} />,
      title: 'Targeted Learning',
      description: 'Practice specific skills with customized exercises',
      color: '#E91E63',
    },
  ];

  const benefits = [
    {
      icon: <Zap size={24} />,
      title: 'Quick Results',
      description: 'See improvement in mental math skills within weeks',
    },
    {
      icon: <Users size={24} />,
      title: 'All Skill Levels',
      description: 'Suitable for beginners to advanced learners',
    },
    {
      icon: <Star size={24} />,
      title: 'Quality Content',
      description: 'Carefully crafted exercises by expert educators',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Download App Dialog */}
      <Dialog
        open={openDownloadDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: { xs: '16px', sm: '24px' },
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            mx: { xs: 2, sm: 'auto' },
            maxWidth: { xs: 'calc(100% - 32px)', sm: '500px' },
            p: { xs: 2, sm: 3 }
          }
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(130, 177, 255, 0.05) 100%)',
            zIndex: 0,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)',
              backgroundSize: '20px 20px',
              opacity: 0.5
            }
          }}
        />

        {/* Close Button */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 8, sm: 16 },
            right: { xs: 8, sm: 16 },
            zIndex: 2
          }}
        >
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              color: 'text.secondary',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 1)',
                color: 'error.main',
                transform: 'rotate(90deg)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* App Icon */}
          <Box
            sx={{
              width: { xs: 56, sm: 72 },
              height: { xs: 56, sm: 72 },
              borderRadius: 2,
              background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              mb: { xs: 2, sm: 3 },
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.2)',
              transform: 'rotate(-5deg)'
            }}
          >
            <Brain size={32} color="white" />
          </Box>

          <Typography
            variant="h5"
            sx={{
              mb: { xs: 1, sm: 1.5 },
              fontWeight: 'bold',
              textAlign: 'center',
              background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            Download Our Mobile App
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ 
              mb: { xs: 3, sm: 4 }, 
              textAlign: 'center',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              maxWidth: '400px',
              mx: 'auto',
              px: { xs: 1, sm: 2 }
            }}
          >
            Experience the full power of Abacus Learning on your mobile device
          </Typography>

          {/* Download Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleDownload}
            startIcon={<Download size={20} />}
            sx={{
              py: { xs: 1.25, sm: 1.5 },
              borderRadius: 2,
              background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1565c0, #1976d2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)'
              },
              transition: 'all 0.3s ease',
              mb: { xs: 2, sm: 3 }
            }}
          >
            Download APK
          </Button>

          {/* Requirements */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              textAlign: 'center',
              fontSize: { xs: '0.7rem', sm: '0.75rem' }
            }}
          >
            Compatible with Android 6.0 and above • APK Size: 15MB
          </Typography>
        </Box>
      </Dialog>

      {/* Enhanced Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(120deg, #000428, #004e92)',
          position: 'relative',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `url(${mathPatternImage})`,
            opacity: 0.1,
            zIndex: 1,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 150%, rgba(0, 78, 146, 0.8) 0%, rgba(0, 4, 40, 0.4) 100%)',
            zIndex: 2,
          },
        }}
      >
        {/* Animated background shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {[...Array(5)].map((_, i) => (
            <MotionBox
              key={i}
              sx={{
                position: 'absolute',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '50%',
                width: ['100px', '200px', '300px'][i % 3],
                height: ['100px', '200px', '300px'][i % 3],
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: [10, 15, 20][i % 3],
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h1" 
                  sx={{
                    fontSize: { xs: '2.5rem', sm: '2.5rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 800,
                    mb: 2,
                    textShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    background: 'linear-gradient(45deg, #ffffff, #82b1ff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Master the Art of Mental Math
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 4, 
                    color: 'white',
                    opacity: 0.9,
                    maxWidth: 500,
                    lineHeight: 1.5,
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Unlock your mathematical potential with our interactive abacus learning platform
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: { xs: 1, sm: 2 },
                  flexDirection: { xs: 'row', sm: 'row' },
                  flexWrap: 'wrap',
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/practice"
                    endIcon={<ArrowRight />}
                    sx={{
                      py: { xs: 1, sm: 2 },
                      px: { xs: 0.01, sm: 4 },
                      fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
                      borderRadius: '50px',
                      background: 'linear-gradient(45deg, #82b1ff, #2979ff)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      flex: { xs: '1 1 auto', sm: '0 0 auto' },
                      minWidth: { xs: '45%', sm: 'auto' },
                      '&:hover': {
                        background: 'linear-gradient(45deg, #2979ff, #82b1ff)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Start Learning
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/kindergarten"
                    sx={{
                      py: { xs: 1, sm: 2 },
                      px: { xs: 2, sm: 4 },
                      fontSize: { xs: '0.9rem', sm: '1.1rem', md: '1.2rem' },
                      borderRadius: '50px',
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                      flex: { xs: '1 1 auto', sm: '0 0 auto' },
                      minWidth: { xs: '45%', sm: 'auto' },
                      '&:hover': {
                        borderColor: 'white',
                        background: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    KinderGarden
                  </Button>
                </Box>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src="data:image/jpeg;base64,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"
                  alt="Abacus Learning"
                  sx={{
                    width: { xs: '90%', md: '80%', lg: '80%' },
                    height: 'auto',
                    maxHeight: { md: '400px', lg: '500px' },
                    objectFit: 'contain',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    transform: 'perspective(1000px) rotateY(-10deg)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'perspective(1000px) rotateY(0deg)',
                    },
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Container>
        <Box
          sx={{
            mt: 8,
            mb: 8,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 6,
              fontSize: { xs: '2rem' },
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Why Students Love Us
          </Typography>
          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} md={4} key={index}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    bgcolor: 'white',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    },
                    transition: 'all 0.3s ease',
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '16px',
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {benefit.icon}
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {benefit.description}
                    </Typography>
                  </Box>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ py: 8, px: 2, background: 'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(255,255,255,0.02) 100%)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 4,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(135deg, ${feature.color}22 0%, ${feature.color}11 100%)`,
                      opacity: 0.5,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      '&:before': {
                        opacity: 0.8,
                      },
                      '& .icon-wrapper': {
                        transform: 'scale(1.1)',
                        background: `linear-gradient(135deg, ${feature.color}44 0%, ${feature.color}22 100%)`,
                      },
                    },
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <Box
                    className="icon-wrapper"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${feature.color}33 0%, ${feature.color}11 100%)`,
                      mb: 2,
                      transition: 'all 0.3s ease',
                      '& svg': {
                        color: feature.color,
                        strokeWidth: 1.5,
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};