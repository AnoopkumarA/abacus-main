import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Alert,
  Box
} from '@mui/material';
import { validateAnswerPassword } from '../utils/passwordValidation';

interface AnswerPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  timeRemaining: number;
}

export const AnswerPasswordDialog: React.FC<AnswerPasswordDialogProps> = ({
  open,
  onClose,
  onSuccess,
  timeRemaining
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAnswerPassword(password)) {
      onSuccess();
      onClose();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Enter Password to Download Answers</DialogTitle>
      <DialogContent>
        {timeRemaining > 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            Please wait {timeRemaining} seconds before downloading answers
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">Submit</Button>
            </Box>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
