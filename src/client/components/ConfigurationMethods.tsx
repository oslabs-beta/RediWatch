import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Eviction Method Data
function createData(
  id: number,
  name: string,
  description: string,
) {
  return { id, name, description };
}

const rows = [
  createData(
    0,
    'noeviction',
    `New values aren't saved when memory limit is reached. When a database
    uses replication, this applies to the primary database`,
  ),
  createData(
    1,
    'allkeys-lru',
    `Keeps most recently used keys; removes least recently used (LRU) keys`,
  ),
  createData(
    2,
    'allkeys-lfu',
    `Keeps most frequently used keys; removes least frequently used (LFU) keys`,
  ),
  createData(
    3,
    'volatile-lru',
    `Removes least recently used keys with the expired field set to true`,
  ),
  createData(
    4,
    'volatile-lfu',
    `Removes least frequently used keys with the expired field set to true`,
  ),
  createData(
    5,
    'allkeys-random',
    `Randomly removes keys to make space for the new data added`,
  ),
  createData(
    6,
    'volatile-random',
    `Randomly removes keys with expire field set to true`,
  ),
  createData(
    7,
    'volatile-ttl',
    `Removes keys with expire field set to true and the shortest remaining time-to-live (TTL) value`,
  ),
];

export default function Policies() {
  return (
    <React.Fragment>
      <Title>Key Eviction Policies</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.description}</TableCell>
              {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="https://redis.io/docs/latest/develop/reference/eviction/" target="_blank" sx={{ mt: 3 }}>
        Read the docs
      </Link>
    </React.Fragment>
  );
}