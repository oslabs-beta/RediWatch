import express, { Request, Response, NextFunction } from 'express';
import { Client } from 'pg';

const app = express();
app.use(express.json());

// Database connection setup
const client = new Client({
  connectionString:
    'postgres://nenunvau:5sN2jTxq2AbK2OkLRtqJDzfu_I4NFeDG@fanny.db.elephantsql.com/nenunvau',
});

client.connect((err) => {
  if (err) {
    console.error('Could not connect to postgres', err);
  } else {
    console.log('SQL database connected');
  }
});

interface NewConnectionRequestBody {
  connectionnickname: string;
  connectionstring: string;
  user_id: number;
  config_id: number | null;
}

// Adds a connection string , config_id and nickname to existing user from homepage form input
app.post('/api/add-connection', async (req: Request, res: Response) => {
  const {
    connectionnickname,
    connectionstring,
    user_id,
    config_id,
  }: NewConnectionRequestBody = req.body;

  try {
    const result = await client.query(
      'INSERT INTO public.caches (connectionnickname, connectionstring, user_id, config_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [connectionnickname, connectionstring, user_id, config_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting connection data:', err);
    res.status(500).json({ error: 'Failed to add connection' });
  }
});

// Global error handler
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
