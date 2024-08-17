import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import ScreenSearchDesktopRoundedIcon from '@mui/icons-material/ScreenSearchDesktopRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const items = [
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Real-Time Performance Metrics',
    description:
      'Get instant updates on key performance indicators like cache hit rates, memory usage, and more.',
  },
  {
    icon: <ScreenSearchDesktopRoundedIcon />,
    title: 'Efficient Cache Monitoring',
    description:
      'Quickly assess and fine-tune your Redis cache’s performance with detailed insights and visualizations.',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Smart Configuration Management',
    description:
      'Save and revisit your cache configurations, enabling you to easily compare and apply optimal setups.',
  },
  {
    icon: <AssignmentIndRoundedIcon />,
    title: 'Profile Management',
    description:
      'Save and manage multiple cache configurations for easy reference and reuse. ',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'User-Friendly Dashboard',
    description:
      'A sleek interface for easy monitoring and analysis of your Redis cache performance.',
  },
  {
    icon: <CheckRoundedIcon />,
    title: 'Seamless Integration',
    description:
      'Effortlessly integrate with your existing Redis setup for a smooth experience.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
          Discover the power of RediWatch with key features designed to optimize and simplify your Redis cache management. Effortlessly monitor your cache’s performance with real-time insights, fine-tune configurations using intuitive tools, and manage multiple setups with ease. Enjoy a seamless experience with efficient cache monitoring and smart configuration management, all from one user-friendly platform.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}