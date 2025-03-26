import React from 'react';
import { Paper, Typography, TextField, Box, Avatar } from '@mui/material';
import { formatNumber } from '../utils/problemGenerator';

interface ProblemProps {
  id: number;
  baseNumber: number;
  rows: number[];
  answer: string | number;
  onAnswerChange: (id: number, value: string) => void;
  onEnterPress?: (currentId: number) => void;
}

export const Problem: React.FC<ProblemProps> = ({
  id,
  baseNumber,
  rows,
  answer,
  onAnswerChange,
  onEnterPress,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && onEnterPress) {
      onEnterPress(id);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        border: '3px solid',
        borderColor: 'divider',
        borderRadius: 2,
        height: '100%',
        transition: 'all 0.3s ease',
        position: 'relative',
        pt: { xs: 4, sm: 5 },
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Avatar
        sx={{
          position: 'absolute',
          top: -15,
          left: '50%',
          transform: 'translateX(-50%)',
          width: { xs: 30, sm: 40 },
          height: { xs: 30, sm: 40 },
          fontSize: { xs: '0.9rem', sm: '1.1rem' },
          bgcolor: 'primary.main',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          border: '2px solid white',
        }}
      >
        {id}
      </Avatar>
      
      <Box sx={{ 
        mb: { xs: 1, sm: 2 }, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: { xs: 0.5, sm: 1 } 
      }}>
        <Typography 
          variant="body1" 
          component="div"
          sx={{ 
            fontFamily: 'monospace',
            fontSize: { xs: '1rem', sm: '1.2rem' },
            color: 'text.primary',
            fontWeight: 'bold',
          }}
        >
          {formatNumber(baseNumber)}
        </Typography>
        {rows.map((num, index) => (
          <React.Fragment key={index}>
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', my: 0.5 }} />
            <Typography 
              variant="body1" 
              component="div"
              sx={{ 
                fontFamily: 'monospace',
                fontSize: { xs: '1rem', sm: '1.2rem' },
                color: num >= 0 ? 'text.primary' : 'error.main',
                fontWeight: 'bold',
              }}
            >
              {formatNumber(num)}
            </Typography>
          </React.Fragment>
        ))}
        <Box sx={{ width: '100%', height: '2px', bgcolor: 'primary.main', mt: 1, mb: 2 }} />
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Your answer"
        value={answer}
        onChange={(e) => onAnswerChange(id, e.target.value)}
        onKeyPress={handleKeyPress}
        inputProps={{
          'data-problem-id': id,
          style: { 
            textAlign: 'center',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            padding: { xs: '8px', sm: '12px' }
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.5,
            backgroundColor: 'background.paper',
          },
        }}
      />
    </Paper>
  );
};