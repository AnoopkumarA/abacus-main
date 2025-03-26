import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Send as SendIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { query } from '../utils/huggingface';

const MotionPaper = motion(Paper);

const highlightKeywords = (text: string, keywords: string) => {
  const keywordArray = keywords.split(',').map(keyword => keyword.trim());
  const regex = new RegExp(`(${keywordArray.join('|')})`, 'gi');
  return text.split(regex).map((part, index) => 
    regex.test(part) ? (
      <span key={index} style={{ 
        background: 'linear-gradient(120deg, rgba(0, 198, 255, 0.3), rgba(0, 114, 255, 0.3))',
        padding: '0 4px',
        borderRadius: '4px',
        fontWeight: '600',
        color: '#0072ff'
      }}>{part}</span>
    ) : part
  );
};

export const MemoryGame = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string, keywords?: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const formattedPrompt = `Create a short story based on these keywords: ${userMessage}. The story should be easily understandable and meaningful, must be within 2-3 sentences.`;
    setInput('');
    setLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      // Get AI response
      const response = await query(formattedPrompt);
      
      // Add AI response to chat
      if (response.includes("Sorry, I'm having trouble connecting") || response.includes("Sorry, the AI service is not")) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'The AI service is currently experiencing issues. Please try again in a few moments.' 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: response, keywords: userMessage }]); // Store keywords
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ 
      py: 4,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at top left, rgba(255, 182, 193, 0.25), transparent 50%),
          radial-gradient(circle at bottom right, rgba(0, 114, 255, 0.1), transparent 50%),
          radial-gradient(circle at center, rgba(255, 192, 203, 0.15), transparent 50%)
        `,
        zIndex: -1,
      }
    }}>
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{
          p: 3,
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 114, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(255, 182, 193, 0.1), rgba(255, 255, 255, 0.05))',
            borderRadius: 4,
            zIndex: -1,
          }
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontWeight: '800',
            fontFamily: '"Poppins", sans-serif',
            letterSpacing: '1px',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60px',
              height: '4px',
              background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
              borderRadius: '2px',
            }
          }}
        >
          Memory Game AI Assistant
        </Typography>

        <Box
          sx={{
            flex: 1,
            mb: 3,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            padding: 3,
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(0, 114, 255, 0.3)',
              borderRadius: '4px',
              '&:hover': {
                background: 'rgba(0, 114, 255, 0.5)',
              },
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                animation: 'fadeIn 0.3s ease-in-out',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(10px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  background: message.role === 'user' 
                    ? 'linear-gradient(135deg, rgba(0, 198, 255, 0.95), rgba(0, 114, 255, 0.25))'
                    : 'rgba(255, 255, 255, 0.95)',
                  color: message.role === 'user' ? 'white' : '#2d3748',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  boxShadow: message.role === 'user'
                    ? '0 4px 15px rgba(0, 114, 255, 0.2)'
                    : '0 4px 15px rgba(0, 0, 0, 0.05)',
                  border: message.role === 'user'
                    ? '1px solid rgba(255, 255, 255, 0.2)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                }}
              >
                <Typography sx={{ fontWeight: 400 }}>
                  {message.role === 'assistant' 
                    ? highlightKeywords(message.content, message.keywords)
                    : message.content}
                </Typography>
              </Paper>
            </Box>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress size={24} sx={{ color: '#0072ff' }} />
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter keywords separated by commas (e.g., pen, boy, girl, bag)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.95)',
                },
                '& fieldset': {
                  border: '1px solid rgba(0, 114, 255, 0.1)',
                  transition: 'all 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 114, 255, 0.2)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(0, 114, 255, 0.3)',
                },
                '& input': {
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '1rem',
                  padding: '14px',
                  color: '#4a5568',
                },
                '&::placeholder': {
                  color: 'rgba(74, 85, 104, 0.7)',
                },
              },
              boxShadow: '0 2px 8px rgba(0, 114, 255, 0.05)',
            }}
          />
          <Button
            variant="contained"
            onClick={handleSend}
            disabled={loading || !input.trim()}
            sx={{
              background: 'linear-gradient(45deg, rgba(0, 198, 255, 0.8), rgba(0, 114, 255, 0.8))',
              color: 'white',
              borderRadius: '12px',
              padding: '0 20px',
              minWidth: '56px',
              height: '56px',
              boxShadow: '0 2px 10px rgba(0, 114, 255, 0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(45deg, rgba(0, 114, 255, 0.8), rgba(0, 198, 255, 0.8))',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 15px rgba(0, 114, 255, 0.2)',
              },
              '&:active': {
                transform: 'translateY(0)',
              },
              '&.Mui-disabled': {
                background: 'rgba(0, 114, 255, 0.2)',
              },
            }}
          >
            <SendIcon size={24} />
          </Button>
        </Box>
      </MotionPaper>
    </Container>
  );
};

export default MemoryGame;
