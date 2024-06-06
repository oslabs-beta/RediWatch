import express, { Request, Response, NextFunction } from 'express';

const app = express();

app.use(express.json());

// GET route: get current scoreboard
// app.get('/api', playerController.getScores, (req, res) =>
//   res.json(res.locals.scores)
// );

// // POST route: update scoreboard
// app.post('/api', playerController.updateScores, (req, res) =>
//   res.json(res.locals.scores)
// );

// global error handler
// app.use('/', (err, req, res, _next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// })

app.listen(3000, () => console.log('server is listening on port 3000'));
