import React, { useEffect } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    paypal: any;
  }
}

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);

export const PayPalPayment: React.FC = () => {
  useEffect(() => {
    // Create and append PayPal script
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=BAA2-hjajyLYdqwb_Z6eOvGvS4ql_Kp8tIePcg8BVzvyRINEZUV0-j5-vpgCfRCIUiiKc9dF4lvkrQ4_9w&components=hosted-buttons&disable-funding=venmo&currency=USD";
    script.crossOrigin = "anonymous";
    script.async = true;
    
    script.onload = () => {
      if (window.paypal) {
        window.paypal.HostedButtons({
          hostedButtonId: "PBASYPB3AB6BQ"
        }).render("#paypal-container-PBASYPB3AB6BQ");
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <MotionContainer
      maxWidth="md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MotionPaper
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
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 4
          }}
        >
          Premium Subscription
        </Typography>

        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Get access to all premium features and unlimited practice sessions
        </Typography>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 150 
          }}
        >
          <div id="paypal-container-PBASYPB3AB6BQ"></div>
        </Box>
      </MotionPaper>
    </MotionContainer>
  );
}; 