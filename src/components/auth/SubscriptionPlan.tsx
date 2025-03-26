import React, { useEffect } from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    paypal: any;
  }
}

const MotionPaper = motion(Paper);

export const SubscriptionPlan: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load PayPal Script
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=AcKmwR8Zg6skkNoNmGH0yPuDaSLBzFceqUbAPtvd7Lj2LImcevF-wC1fvJzTzbgwlYg3yM4ms3-1gYr7&vault=true&intent=subscription";
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.async = true;

    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: function(data: any, actions: any) {
            return actions.subscription.create({
              plan_id: 'P-16X68761CC063753YM7SEXMY'
            });
          },
          onApprove: function(data: any, actions: any) {
            alert(`Subscription successful! Welcome to premium access!`);
            // Navigate to practice after successful subscription
            navigate('/practice');
          }
        }).render('#paypal-button-container');
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [navigate]);

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
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
            mb: 3
          }}
        >
          Premium Subscription
        </Typography>

        <Typography 
          variant="h5" 
          color="primary" 
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          $9.99/month
        </Typography>

        <Typography 
          variant="body1" 
          color="text.secondary" 
          sx={{ mb: 4 }}
        >
          Get unlimited access to all features and premium content
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✓ Unlimited practice tests
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✓ Detailed performance analytics
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✓ Advanced learning tools
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✓ Priority support
          </Typography>
        </Box>

        <Box id="paypal-button-container" sx={{ mt: 4 }} />
      </MotionPaper>
    </Container>
  );
}; 