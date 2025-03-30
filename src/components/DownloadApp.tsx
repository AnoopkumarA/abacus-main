import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Download, Smartphone } from 'lucide-react';

const MotionPaper = motion(Paper);

export const DownloadApp: React.FC = () => {
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

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center'
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Smartphone size={48} color="#2196F3" />
        </Box>

        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          Get Our Mobile App
        </Typography>

        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 4 }}
        >
          Download our Android app for a better mobile experience. Access all features offline and get instant notifications.
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✓ Offline access
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✓ Better performance
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✓ Push notifications
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✓ Mobile-optimized interface
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          onClick={handleDownload}
          startIcon={<Download />}
          sx={{
            background: 'linear-gradient(45deg, #2196F3, #64B5F6)',
            py: 1.5,
            px: 4,
            borderRadius: '12px',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2, #42A5F5)'
            }
          }}
        >
          Download APK
        </Button>

        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            display: 'block', 
            mt: 2 
          }}
        >
          Android 6.0 and above required • Size: 15MB
        </Typography>
      </MotionPaper>
    </Container>
  );
}; 