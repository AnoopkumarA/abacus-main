import React, { useEffect, useState } from 'react';
import { 
  Snackbar, 
  Button, 
  Box, 
  Typography 
} from '@mui/material';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('App is already installed');
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      console.log('beforeinstallprompt event triggered');
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the prompt to user
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Handle successful installation
    window.addEventListener('appinstalled', (e) => {
      console.log('App was successfully installed');
      setIsInstalled(true);
      setShowPrompt(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log('No deferred prompt available');
      return;
    }

    try {
      console.log('Triggering install prompt');
      // Show the install prompt
      await deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsInstalled(true);
      } else {
        console.log('User dismissed the install prompt');
      }
    } catch (error) {
      console.error('Error during installation:', error);
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleClose = () => {
    console.log('Install prompt closed by user');
    setShowPrompt(false);
  };

  // Don't show prompt if already installed
  if (isInstalled) {
    return null;
  }

  return (
    <Snackbar
      open={showPrompt}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ top: { xs: '16px', sm: '24px' } }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: '90vw',
          width: '400px'
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', mb: 0.5 }}>
            Install App
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Install our app for a better experience
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            onClick={handleClose}
            color="inherit"
            size="small"
          >
            Not now
          </Button>
          <Button
            onClick={handleInstallClick}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Download size={16} />}
          >
            Install
          </Button>
        </Box>
      </Box>
    </Snackbar>
  );
}; 