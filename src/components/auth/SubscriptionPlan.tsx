import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionPaper = motion(Paper);

export const SubscriptionPlan: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to PayPal with the form data
    const form = e.currentTarget;
    form.submit();
  };

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

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <form 
            action="https://www.paypal.com/cgi-bin/webscr" 
            method="post" 
            target="_top"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="4589P8SKF2VVN" />
            <input type="hidden" name="currency_code" value="USD" />
            <Button 
              type="submit" 
              sx={{ 
                p: 0, 
                minWidth: 'auto', 
                '&:hover': { 
                  backgroundColor: 'transparent' 
                } 
              }}
            >
              <img
                src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                alt="Buy Now with PayPal"
                style={{ display: 'block' }}
              />
            </Button>
          </form>
        </Box>
      </MotionPaper>
    </Container>
  );
}; 