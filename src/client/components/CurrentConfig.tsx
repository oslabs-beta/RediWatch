import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Current maxmemory Limit</Title>
      <Typography component="p" variant="h4">
        3GB
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        of memory allocated
      </Typography>
      <div>
        <IconButton><ArrowCircleLeftIcon /></IconButton>
        <IconButton><ArrowCircleRightIcon /></IconButton>
      </div>
    </React.Fragment>
  );
}