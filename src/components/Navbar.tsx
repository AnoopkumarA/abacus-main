import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useScrollTrigger, 
  Slide, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Brain, Info, Calculator, Menu as MenuIcon, BarChart, LogOut, Bell, BellDotIcon, BellDot, Settings, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const MotionBox = motion(Box as any);

export const Navbar = () => {
  const trigger = useScrollTrigger();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth(); // Get user and isAdmin from auth context
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const publicNavItems = [
    { path: '/', label: 'Home', icon: <HomeIcon size={20} /> },
    { path: '/about', label: 'About', icon: <Info size={20} /> },
    { path: '/signup', label: 'Sign Up', icon: <Bell size={20} /> },
  ];

  const privateNavItems = [
    { path: '/', label: 'Home', icon: <HomeIcon size={20} /> },
    { path: '/practice', label: 'Practice', icon: <Calculator size={20} /> },
    { path: '/about', label: 'About', icon: <Info size={20} /> },
    { path: '/kindergarten', label: 'Kids Zone', icon: <Gamepad2 size={20} /> },
    { path: '/analysis', label: 'Analysis', icon: <BarChart size={20} /> },
    ...(isAdmin ? [{ path: '/admin', label: 'Admin', icon: <Settings size={20} /> }] : []),
  ];

  const navItems = user ? privateNavItems : publicNavItems;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.3)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
        }}
      >
        <Box
          sx={{
            p: 1,
            borderRadius: 1,
            background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
          }}
        >
          <Brain size={24} color="white" />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.2rem' },
            background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Abacus Learning
        </Typography>
      </Box>
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.path}
            component={RouterLink}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              color: location.pathname === item.path ? 'primary.main' : 'text.primary',
              bgcolor: location.pathname === item.path ? 
                'rgba(25, 118, 210, 0.08)' : 
                'transparent',
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.04)',
                backdropFilter: 'blur(20px)',
              },
              transition: 'all 0.3s ease',
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: 'inherit', 
                minWidth: 40,
                opacity: location.pathname === item.path ? 1 : 0.7,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              }}
            />
          </ListItem>
        ))}
        {user && (
          <ListItem 
            onClick={handleLogout}
            sx={{
              color: 'error.main',
              '&:hover': {
                bgcolor: 'rgba(255, 0, 0, 0.08)',
              },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <LogOut />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              py: 1,
            }}
          >
            <MotionBox 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2 
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
                  p: 1,
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.2)',
                }}
              >
                <Brain size={32} color="white" />
              </Box>
              <Typography 
                variant="h5" 
                component={RouterLink}
                to="/"
                sx={{ 
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #1976d2, #82b1ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textDecoration: 'none',
                  letterSpacing: '-0.5px',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Abacus Learning
              </Typography>
            </MotionBox>

            {isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  color="primary"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    variant={location.pathname === item.path ? "contained" : "text"}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      color: location.pathname === item.path ? 'white' : 'text.primary',
                      background: location.pathname === item.path ? 
                        'linear-gradient(45deg, #1976d2, #82b1ff)' : 'transparent',
                      '&:hover': {
                        background: location.pathname === item.path ? 
                          'linear-gradient(45deg, #1976d2, #82b1ff)' : 
                          'rgba(25, 118, 210, 0.08)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                {user && (
                  <Button
                    color="error"
                    onClick={handleLogout}
                    startIcon={<LogOut />}
                    sx={{
                      ml: 2,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: 'error.light',
                        color: 'white',
                      },
                    }}
                  >
                    Logout
                  </Button>
                )}
              </Box>
            )}
          </Toolbar>
        </Container>

        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 250,
              background: 'transparent',
              boxShadow: 'none',
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(4px)',
            },
          }}
        >
          <Box>
            {drawer}
            {user && (
              <ListItem 
                onClick={handleLogout}
                sx={{
                  mt: 'auto',
                  color: 'error.main',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'error.light',
                    color: 'white',
                  },
                }}
              >
                <ListItemIcon>
                  <LogOut />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </Box>
        </Drawer>
      </AppBar>
    </Slide>
  );
};