import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

export const AdminDashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              {/* Add admin features */}
            </CardContent>
          </Card>
        </Grid>
        {/* Add more admin panels */}
      </Grid>
    </Container>
  );
};
