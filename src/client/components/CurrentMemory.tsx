/**
 * @module CurrentMemory
 * @description user component for viewing and adjusting cache maxmemory setting
 */

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Memory() {
  let memory: number = 3;
  return (
    <React.Fragment>
      <Title>Current maxmemory Limit</Title>
      <Typography component="p" variant="h4">
        {memory}GB
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        of memory allocated
      </Typography>
      <div>
        <IconButton onClick={() => {memory -= 1}}><ArrowCircleLeftIcon /></IconButton>
        <IconButton onClick={() => {memory += 1}}><ArrowCircleRightIcon /></IconButton>
      </div>
    </React.Fragment>
  );
}