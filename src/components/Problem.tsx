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
        p: { xs: 1, sm: 1.5 },
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: 2,
        height: '100%',
        transition: 'all 0.3s ease',
        position: 'relative',
        pt: { xs: 3, sm: 4 },
        '&:hover': {
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Avatar
        sx={{
          position: 'absolute',
          top: -12,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 24,
          height: 24,
          fontSize: '0.8rem',
          bgcolor: 'primary.main',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '1px solid white',
        }}
      >
        {id}
      </Avatar>
      
      <Box sx={{ 
        mb: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 0.5
      }}>
        <Typography 
          variant="body1" 
          component="div"
          sx={{ 
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: 'text.primary',
            fontWeight: 'bold',
          }}
        >
          {formatNumber(baseNumber)}
        </Typography>
        {rows.map((num, index) => (
          <React.Fragment key={index}>
            <Box sx={{ width: '100%', height: '1px', bgcolor: 'divider', my: 0.25 }} />
            <Typography 
              variant="body1" 
              component="div"
              sx={{ 
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                color: num >= 0 ? 'text.primary' : 'error.main',
                fontWeight: 'bold',
              }}
            >
              {formatNumber(num)}
            </Typography>
          </React.Fragment>
        ))}
        <Box sx={{ width: '100%', height: '1px', bgcolor: 'primary.main', mt: 0.5, mb: 1 }} />
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Answer"
        value={answer}
        onChange={(e) => onAnswerChange(id, e.target.value)}
        onKeyPress={handleKeyPress}
        inputProps={{
          'data-problem-id': id,
          style: { 
            textAlign: 'center',
            fontSize: '0.9rem',
            padding: '4px 8px',
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            backgroundColor: 'background.paper',
            '& fieldset': {
              borderWidth: 1,
            },
          },
        }}
      />
    </Paper>
  );
};