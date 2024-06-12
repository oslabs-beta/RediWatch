import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

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
        on 10 June, 2024
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View metrics
        </Link>
      </div>
    </React.Fragment>
  );
}