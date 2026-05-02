import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import './style.css';

const highlights = [
  {
    title: 'Discover destinations',
    description:
      'Browse travel stories and destination highlights shared by fellow travelers from around the world.'
  },
  {
    title: 'Share your experience',
    description:
      'Post your own adventures with photos, location details, and tips to inspire the community.'
  },
  {
    title: 'Plan together',
    description:
      'Connect with like-minded explorers, find group-friendly ideas, and plan memorable trips together.'
  }
];

export default function About() {
  return (
    <Box className='about-page'>
      <Box className='about-hero'>
        <Typography component='h1' className='about-title'>
          About Traventure
        </Typography>
        <Typography className='about-subtitle'>
          Traventure is a social travel space where people discover new places, share real stories, and inspire each other to explore more.
        </Typography>
      </Box>

      <Grid container spacing={3} className='about-grid'>
        {highlights.map((item) => (
          <Grid item xs={12} md={4} key={item.title}>
            <Paper elevation={3} className='about-card'>
              <Typography component='h2' className='about-card-title'>
                {item.title}
              </Typography>
              <Typography className='about-card-description'>
                {item.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
