import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(
  id: number,
  connection: string,
  port: string,
  password: string,
  nickName: string,
  configs: {name:string, value: string}[],
) {
  return { id, connection, port, password, nickName, configs };
}

const rows = [
  createData(
    0,
    'redis-17515.c60.us-west-1-2.ec2.redns.redis-cloud.com',
    '17515',
    'lBz890STemdFFlKctFBP6NdUVpmJ2ZMS',
    'test1',
    [{"name": 'LTT',"value":'30'}, {"name": 'LLU',"value":'false'},{"name": 'LKU',"value":'true'},{"name": 'memoryalloct',"value":'50gb'}]
  ),
  createData(
    1,
    'redis-17516.c60.us-west-1-2.ec2.redns.redis-cloud.com',
    '17515',
    'lBz890STemdFFlKctFBP6NdUVpmJ2ZMS',
    'test2',
    [{"name": 'LTT',"value":'30'}, {"name": 'LLU',"value":'true'},{"name": 'LKU',"value":'false'}]
  ),
  createData(
    2,
    'redis-17517.c60.us-west-1-2.ec2.redns.redis-cloud.com',
    '17515',
    'lBz890STemdFFlKctFBP6NdUVpmJ2ZMS',
    'test3',
    [{"name": 'LTT',"value":'30'}, {"name": 'LLU',"value":'true'}]
  ),
  createData(
    3,
    'redis-17518.c60.us-west-1-2.ec2.redns.redis-cloud.com',
    '17515',
    'lBz890STemdFFlKctFBP6NdUVpmJ2ZMS',
    'test4',
    [{"name": 'LTT',"value":'30'}, {"name": 'LLU',"value":'true'}]
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function ConfigurationMethods1() {
  return (
    <React.Fragment>
      <Title>Profile</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Connection</TableCell>
            <TableCell>Config</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.nickName}</TableCell>
              <TableCell>{row.connection}</TableCell>
              <TableCell>{row.configs.map(({ name, value }) => `${name}:${value}`).join(',')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Show more
      </Link>
    </React.Fragment>
  );
}