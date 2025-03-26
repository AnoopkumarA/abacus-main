import React from 'react';
import { Container, Typography, Paper, Box, Grid, IconButton, Divider, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Award, Users, BookOpen, Target, Brain, Star,
  Facebook, Twitter, Instagram, Linkedin, Youtube, Mail,
  CheckCircle2, Rocket, Sparkles, MapPin, Phone
} from 'lucide-react';

const MotionBox = motion(Box as any);
const MotionPaper = motion(Paper as any);
const MotionTypography = motion(Typography as any);

export const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const features = [
    {
      icon: <Brain size={32} />,
      title: 'Expert Instruction',
      description: 'Learn from experienced abacus instructors with proven teaching methods',
      color: theme.palette.primary.main
    },
    {
      icon: <Target size={32} />,
      title: 'Structured Learning',
      description: 'Progressive curriculum designed for optimal skill development',
      color: theme.palette.secondary.main
    },
    {
      icon: <Users size={32} />,
      title: 'Personalized Approach',
      description: 'Adaptive learning paths tailored to individual progress',
      color: '#FF9800'
    }
  ];

  const achievements = [ 
    { number: '10K+', label: 'Students Trained', icon: <Users size={24} /> },
    { number: '95%', label: 'Success Rate', icon: <CheckCircle2 size={24} /> },
    { number: '50+', label: 'Expert Instructors', icon: <Star size={24} /> },
    { number: '100+', label: 'Learning Centers', icon: <Target size={24} /> }
  ];

  const clients = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      testimonial: 'The transformation in my daughter\'s mathematical abilities has been remarkable. The structured approach and dedicated instructors make all the difference.',
      image: 'data:image/jpeg;base64,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'
    },
    {
      name: 'Michael Chen',
      role: 'School Principal',
      testimonial: 'Implementing this program in our school has led to a significant improvement in our students\' analytical and problem-solving skills.',
      image: 'data:image/jpeg;base64,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'
    },
    {
      name: 'Emma Davis',
      role: 'Education Consultant',
      testimonial: 'A comprehensive learning methodology that effectively combines traditional wisdom with modern teaching techniques.',
      image: 'data:image/jpeg;base64,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'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
          color: 'white',
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 6 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Typography 
                  variant="h1" 
                  sx={{
                    fontSize: { xs: '2rem', md: '2.8rem' },
                    fontWeight: 800,
                    mb: 2,
                    lineHeight: 1.2
                  }}
                >
                  Transforming Lives Through
                  <Box component="span" sx={{ display: 'block', color: '#FFD700' }}>
                    Mental Mathematics
                  </Box>
                </Typography>
                <Typography variant="h5" sx={{ mb: 3, opacity: 0.9, fontSize: { xs: '1rem', md: '1.2rem' } }}>
                  Empowering minds with ancient wisdom and modern techniques
                </Typography>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img 
                  src="/abacuspic.png" 
                  alt="Abacus Learning"
                  style={{
                    maxWidth: '40%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                  }}
                />
              </MotionBox>
            </Grid>
          </Grid>
        </Container>

        {/* Animated Background Elements */}
        <Box
          component={motion.div}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          sx={{
            position: 'absolute',
            right: '5%',
            top: '10%',
            width: '150px',
            height: '150px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            zIndex: 0
          }}
        />
      </Box>

      {/* Achievement Stats Section */}
      <Container maxWidth="lg">
        <Box sx={{ 
          mt: 4, 
          mb: 8,
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          p: { xs: 2, md: 4 }
        }}>
          <Grid container spacing={2}>
            {achievements.map((stat, index) => (
              <Grid item xs={6} md={3} key={stat.label}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <Box sx={{ 
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}>
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      color: 'primary.main',
                      mb: 0.5
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    {stat.label}
                  </Typography>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 12 }}>
        <MotionBox
          style={{ opacity }}
          sx={{ textAlign: 'center', mb: 8 }}
        >
          <Typography 
            variant="h2" 
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 2
            }}
          >
            Why Choose Us
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Experience excellence in abacus education through our unique approach
          </Typography>
        </MotionBox>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <MotionPaper
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                elevation={2}
                sx={{
                  p: 4,
                  height: '100%',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <Box sx={{ color: feature.color, mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 12
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: 6
            }}
          >
            Success Stories
          </Typography>
          
          <Grid container spacing={4}>
            {clients.map((client, index) => (
              <Grid item xs={12} md={4} key={client.name}>
                <MotionPaper
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'white'
                  }}
                >
                  <MotionBox
                    component="img"
                    src={client.image}
                    alt={client.name}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      mb: 3,
                      objectFit: 'cover',
                      border: '4px solid white',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {client.name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="primary" 
                    gutterBottom 
                    sx={{ fontWeight: 500 }}
                  >
                    {client.role}
                  </Typography>
                  <Typography 
                    color="text.secondary" 
                    align="center" 
                    sx={{ 
                      mt: 2,
                      fontStyle: 'italic',
                      lineHeight: 1.6
                    }}
                  >
                    "{client.testimonial}"
                  </Typography>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <MotionTypography
              variant="h2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 3
              }}
            >
              Ready to Start Your Journey?
            </MotionTypography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Join thousands of successful students who have transformed their mathematical abilities with our proven methodology.
            </Typography>
            <Box sx={{ mt: 4 }}>
              {[
                { icon: <Facebook size={24} />, color: '#1877F2' },
                { icon: <Twitter size={24} />, color: '#1DA1F2' },
                { icon: <Instagram size={24} />, color: '#E4405F' },
                { icon: <Linkedin size={24} />, color: '#0A66C2' },
                { icon: <Youtube size={24} />, color: '#FF0000' },
                { icon: <Mail size={24} />, color: '#EA4335' }
              ].map((social, index) => (
                <IconButton
                  key={index}
                  component={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    mr: 2,
                    color: social.color,
                    '&:hover': {
                      backgroundColor: `${social.color}15`
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                
              </MotionBox>

              {/* Contact Information */}
              <Box sx={{ 
                width: '100%',
                ml: 40, 
                mt: 4, 
                p: 3, 
                borderRadius: 2, 
                bgcolor: 'transparent',
               
              }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4, mr:20 }}>
                  Contact Information
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Address */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: 1, 
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <MapPin size={24} color="white" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Address
                      </Typography>
                      <Typography color="text.secondary">
                        123 Education Street, Knowledge City
                        <br />
                        State, Country - 12345
                      </Typography>
                    </Box>
                  </Box>

                  {/* Email */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: 1, 
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Mail size={24} color="white" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Email
                      </Typography>
                      <Typography color="text.secondary">
                        info@abacuslearning.com
                        <br />
                        support@abacuslearning.com
                      </Typography>
                    </Box>
                  </Box>

                  {/* Phone */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: 1, 
                      bgcolor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Phone size={24} color="white" />
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Phone
                      </Typography>
                      <Typography color="text.secondary">
                        +1 (555) 123-4567
                        <br />
                        +1 (555) 987-6543
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};