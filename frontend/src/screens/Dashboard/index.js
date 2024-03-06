import React from 'react';
import Header from '../../components/Header';
import MiniCard from '../../components/MiniCard';
import { Box, Container, Grid } from '@mui/material';
import PieChart from '../../components/PieChart';

export const Dashboard = () => {
  return (
    <div>
      <Header />
      <Box sx={{ mt: 2, px: 2, height: "100vh" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={2}>
                <MiniCard title="Sales" content="Total Sales: $1000" />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <MiniCard title="Sales" content="Total Sales: $1000" />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <MiniCard title="Sales" content="Total Sales: $1000" />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <MiniCard title="Sales" content="Total Sales: $1000" />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <MiniCard title="Sales" content="Total Sales: $1000" />
              </Grid>
              <Grid item xs={12} md={4} lg={2}>
                <MiniCard title="Sales" content="Total Sales: $1000" />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <PieChart />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
